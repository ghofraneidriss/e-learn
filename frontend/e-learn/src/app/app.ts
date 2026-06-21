import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import {
  AppApiService,
  Course,
  CoursePayload,
  Quiz,
  QuizPayload,
} from './app-api.service';

type LoginRole = 'student' | 'teacher' | 'admin';

interface SessionProfile {
  username: string;
  roles: string[];
}

type PopupKind = 'error' | 'success' | 'info';

interface PopupState {
  visible: boolean;
  kind: PopupKind;
  title: string;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App implements OnInit {
  token = '';
  tokenPreview = '';
  session: SessionProfile | null = null;

  loginForm = {
    username: 'testuser',
    password: 'password',
    clientId: 'elearn-client',
  };

  courseForm: CoursePayload = {
    title: 'Architecture Microservices',
    description: 'Course created from the Angular frontend',
    duration: 12,
    level: 'BEGINNER',
    teacherName: 'Teacher',
  };

  quizForm = {
    title: 'Quiz Frontend',
    description: 'Created from the Angular frontend',
    questionsText: 'What is Eureka?\nWhat does the gateway do?',
  };

  assignForm = {
    quizId: '',
    courseId: '',
  };

  courses: Course[] = [];
  quizzes: Quiz[] = [];

  loading = false;
  loadingCourses = false;
  loadingQuizzes = false;
  message = '';
  error = '';
  popup: PopupState = {
    visible: false,
    kind: 'info',
    title: '',
    message: '',
  };

  constructor(private api: AppApiService) {}

  get canWrite(): boolean {
    return this.session?.roles.some((role) => role === 'TEACHER' || role === 'ADMIN') ?? false;
  }

  ngOnInit(): void {
    const savedToken = localStorage.getItem('elearn-token');
    if (savedToken) {
      this.setSession(savedToken);
      this.refreshData();
    }
  }

  login(role?: LoginRole): void {
    const presets: Record<LoginRole, { username: string; password: string }> = {
      student: { username: 'testuser', password: 'password' },
      teacher: { username: 'teacheruser', password: 'password' },
      admin: { username: 'adminuser', password: 'password' },
    };

    if (role) {
      this.loginForm.username = presets[role].username;
      this.loginForm.password = presets[role].password;
    }

    this.loading = true;
    this.clearFeedback();

    this.api
      .login(this.loginForm.username, this.loginForm.password, this.loginForm.clientId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.setSession(response.access_token);
          this.message = `Connected as ${this.session?.username ?? this.loginForm.username}`;
          this.refreshData();
        },
        error: (err) => {
          this.reportError(err, 'Login failed');
        },
      });
  }

  logout(): void {
    this.token = '';
    this.tokenPreview = '';
    this.session = null;
    this.courses = [];
    this.quizzes = [];
    localStorage.removeItem('elearn-token');
    this.message = 'Session cleared';
  }

  refreshData(): void {
    if (!this.token) {
      return;
    }

    this.loadCourses();
    this.loadQuizzes();
  }

  loadCourses(): void {
    if (!this.token) {
      return;
    }

    this.loadingCourses = true;
    this.api
      .getCourses(this.token)
      .pipe(finalize(() => (this.loadingCourses = false)))
      .subscribe({
        next: (courses) => {
          this.courses = courses;
        },
        error: (err) => {
          this.reportError(err, 'Unable to load courses');
        },
      });
  }

  loadQuizzes(): void {
    if (!this.token) {
      return;
    }

    this.loadingQuizzes = true;
    this.api
      .getQuizzes(this.token)
      .pipe(finalize(() => (this.loadingQuizzes = false)))
      .subscribe({
        next: (quizzes) => {
          this.quizzes = quizzes;
        },
        error: (err) => {
          this.reportError(err, 'Unable to load quizzes');
        },
      });
  }

  createCourse(): void {
    if (!this.token) {
      this.showPopup('error', 'Action blocked', 'Please login first');
      this.error = 'Please login first';
      return;
    }
    if (!this.canWrite) {
      this.showPopup(
        'error',
        'Action blocked',
        'Write access required (TEACHER or ADMIN)'
      );
      this.error = 'Write access required (TEACHER or ADMIN)';
      return;
    }

    this.loading = true;
    this.clearFeedback();

    this.api
      .createCourse(this.token, this.courseForm)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (course) => {
          this.message = `Course created: ${course.title}`;
          this.courses = [course, ...this.courses];
        },
        error: (err) => {
          this.reportError(err, 'Unable to create course');
        },
      });
  }

  createQuiz(): void {
    if (!this.token) {
      this.showPopup('error', 'Action blocked', 'Please login first');
      this.error = 'Please login first';
      return;
    }
    if (!this.canWrite) {
      this.showPopup(
        'error',
        'Action blocked',
        'Write access required (TEACHER or ADMIN)'
      );
      this.error = 'Write access required (TEACHER or ADMIN)';
      return;
    }

    this.loading = true;
    this.clearFeedback();

    const payload: QuizPayload = {
      title: this.quizForm.title,
      description: this.quizForm.description,
      questions: this.quizForm.questionsText
        .split('\n')
        .map((question) => question.trim())
        .filter((question) => question.length > 0),
    };

    this.api
      .createQuiz(this.token, payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (quiz) => {
          this.message = `Quiz created: ${quiz.title}`;
          this.quizzes = [quiz, ...this.quizzes];
        },
        error: (err) => {
          this.reportError(err, 'Unable to create quiz');
        },
      });
  }

  assignQuiz(): void {
    if (!this.token) {
      this.showPopup('error', 'Action blocked', 'Please login first');
      this.error = 'Please login first';
      return;
    }
    if (!this.canWrite) {
      this.showPopup(
        'error',
        'Action blocked',
        'Write access required (TEACHER or ADMIN)'
      );
      this.error = 'Write access required (TEACHER or ADMIN)';
      return;
    }

    const quizId = Number(this.assignForm.quizId);
    const courseId = Number(this.assignForm.courseId);

    if (!quizId || !courseId) {
      this.showPopup('error', 'Invalid assignment', 'Quiz id and course id are required');
      this.error = 'Quiz id and course id are required';
      return;
    }

    const quizExists = this.quizzes.some((quiz) => quiz.id === quizId);
    const courseExists = this.courses.some((course) => course.id === courseId);

    if (!quizExists || !courseExists) {
      this.showPopup(
        'error',
        'Invalid assignment',
        'The quiz id or the course id does not exist in the loaded data.'
      );
      this.error = 'The quiz id or the course id does not exist in the loaded data.';
      return;
    }

    this.loading = true;
    this.clearFeedback();

    this.api
      .assignQuiz(this.token, quizId, courseId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (quiz) => {
          this.message = `Quiz ${quiz.id} assigned to course ${quiz.courseId}`;
          this.loadQuizzes();
        },
        error: (err) => {
          this.reportError(err, 'Unable to assign quiz');
        },
      });
  }

  deleteQuiz(quizId: number): void {
    if (!this.token) {
      this.showPopup('error', 'Action blocked', 'Please login first');
      this.error = 'Please login first';
      return;
    }
    if (!this.canWrite) {
      this.showPopup(
        'error',
        'Action blocked',
        'Write access required (TEACHER or ADMIN)'
      );
      this.error = 'Write access required (TEACHER or ADMIN)';
      return;
    }

    this.loading = true;
    this.clearFeedback();

    this.api
      .deleteQuiz(this.token, quizId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.message = `Quiz ${quizId} deleted`;
          this.quizzes = this.quizzes.filter((quiz) => quiz.id !== quizId);
        },
        error: (err) => {
          this.reportError(err, 'Unable to delete quiz');
        },
      });
  }

  loginAs(role: LoginRole): void {
    this.login(role);
  }

  private setSession(token: string): void {
    this.token = token;
    this.tokenPreview = `${token.slice(0, 24)}...`;
    this.session = this.parseJwt(token);
    localStorage.setItem('elearn-token', token);

    if (this.session?.username?.toLowerCase().includes('teacher')) {
      this.courseForm.teacherName = 'Teacher';
    } else if (this.session?.username) {
      this.courseForm.teacherName = this.session.username;
    }
  }

  private parseJwt(token: string): SessionProfile {
    try {
      const payload = token.split('.')[1] ?? '';
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
      const decoded = JSON.parse(atob(padded)) as Record<string, any>;
      const roles = decoded?.['realm_access']?.['roles'] ?? [];
      return {
        username: decoded['preferred_username'] ?? decoded['sub'] ?? 'unknown',
        roles,
      };
    } catch {
      return {
        username: 'unknown',
        roles: [],
      };
    }
  }

  private extractError(error: any, fallback: string): string {
    const status = error?.status ? `HTTP ${error.status}` : '';
    const serverMessage =
      error?.error?.message || error?.error?.error_description || error?.error?.error || error?.message;
    return [fallback, status, serverMessage].filter(Boolean).join(' - ');
  }

  private reportError(error: any, fallback: string): void {
    const message = this.extractError(error, fallback);
    const status = Number(error?.status || 0);
    this.error = message;

    if (status === 401 || status === 403) {
      return;
    }

    this.showPopup('error', fallback, message);
  }

  private showPopup(kind: PopupKind, title: string, message: string): void {
    this.popup = {
      visible: true,
      kind,
      title,
      message,
    };
  }

  closePopup(): void {
    this.popup.visible = false;
  }

  private clearFeedback(): void {
    this.message = '';
    this.error = '';
  }
}
