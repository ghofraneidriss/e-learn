import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'frontoffice/index' },
  { path: 'frontoffice', pathMatch: 'full', redirectTo: 'frontoffice/index' },

  // Admin Routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'courses' },
      {
        path: 'courses',
        loadComponent: () => import('./courses/courses-list/courses-list.component').then(m => m.CoursesListComponent)
      },
      {
        path: 'courses/new',
        loadComponent: () => import('./courses/course-form/course-form.component').then(m => m.CourseFormComponent)
      },
      {
        path: 'courses/edit/:id',
        loadComponent: () => import('./courses/course-form/course-form.component').then(m => m.CourseFormComponent)
      },
      {
        path: 'courses/:id',
        loadComponent: () => import('./courses/course-detail/course-detail.component').then(m => m.CourseDetailComponent)
      }
    ]
  },

  { path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
  { path: 'feedbacks', loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule) },
  { path: 'reclamations', loadChildren: () => import('./reclamation/reclamation.module').then(m => m.ReclamationModule) },
  { path: 'frontoffice/feedbacks', loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule) },
  { path: 'frontoffice/reclamations', loadChildren: () => import('./reclamation/reclamation.module').then(m => m.ReclamationModule) },
  { path: 'frontoffice/about-us', loadComponent: () => import('./frontoffice-pages/about-us/about-us.component').then((m) => m.AboutUsFrontofficePageComponent) },
  { path: 'frontoffice/add-course', loadComponent: () => import('./frontoffice-pages/add-course/add-course.component').then((m) => m.AddCourseFrontofficePageComponent) },
  { path: 'frontoffice/become-an-instructor', loadComponent: () => import('./frontoffice-pages/become-an-instructor/become-an-instructor.component').then((m) => m.BecomeAnInstructorFrontofficePageComponent) },
  { path: 'frontoffice/blog-2-grid', loadComponent: () => import('./frontoffice-pages/blog-2-grid/blog-2-grid.component').then((m) => m.Blog2GridFrontofficePageComponent) },
  { path: 'frontoffice/blog-3-grid', loadComponent: () => import('./frontoffice-pages/blog-3-grid/blog-3-grid.component').then((m) => m.Blog3GridFrontofficePageComponent) },
  { path: 'frontoffice/blog-carousal', loadComponent: () => import('./frontoffice-pages/blog-carousal/blog-carousal.component').then((m) => m.BlogCarousalFrontofficePageComponent) },
  { path: 'frontoffice/contact-us', loadComponent: () => import('./frontoffice-pages/contact-us/contact-us.component').then((m) => m.ContactUsFrontofficePageComponent) },
  { path: 'frontoffice/cours', loadComponent: () => import('./frontoffice-2-pages/student-courses/student-courses.component').then((m) => m.StudentCoursesPageComponent) },
  { path: 'frontoffice/events', loadComponent: () => import('./frontoffice-pages/event-showcase/event-showcase.component').then((m) => m.EventShowcaseFrontofficePageComponent) },
  { path: 'frontoffice/events.html', pathMatch: 'full', redirectTo: 'frontoffice/events' },
  { path: 'frontoffice/course-category', loadComponent: () => import('./frontoffice-pages/course-category/course-category.component').then((m) => m.CourseCategoryFrontofficePageComponent) },
  { path: 'frontoffice/course-category-2', loadComponent: () => import('./frontoffice-pages/course-category-2/course-category-2.component').then((m) => m.CourseCategory2FrontofficePageComponent) },
  { path: 'frontoffice/course-category-3', loadComponent: () => import('./frontoffice-pages/course-category-3/course-category-3.component').then((m) => m.CourseCategory3FrontofficePageComponent) },
  { path: 'frontoffice/course-details', loadComponent: () => import('./frontoffice-pages/course-details/course-details.component').then((m) => m.CourseDetailsFrontofficePageComponent) },
  { path: 'frontoffice/course-details-2', loadComponent: () => import('./frontoffice-pages/course-details-2/course-details-2.component').then((m) => m.CourseDetails2FrontofficePageComponent) },
  { path: 'frontoffice/course-grid', loadComponent: () => import('./frontoffice-pages/course-grid/course-grid.component').then((m) => m.CourseGridFrontofficePageComponent) },
  { path: 'frontoffice/course-list', loadComponent: () => import('./frontoffice-pages/course-list/course-list.component').then((m) => m.CourseListFrontofficePageComponent) },
  { path: 'frontoffice/course-resume', loadComponent: () => import('./frontoffice-pages/course-resume/course-resume.component').then((m) => m.CourseResumeFrontofficePageComponent) },
  { path: 'frontoffice/course-watch', loadComponent: () => import('./frontoffice-pages/course-watch/course-watch.component').then((m) => m.CourseWatchFrontofficePageComponent) },
  { path: 'frontoffice/cours.html', pathMatch: 'full', redirectTo: 'frontoffice/cours' },
  { path: 'frontoffice/course.html', pathMatch: 'full', redirectTo: 'frontoffice/course' },
  { path: 'frontoffice/error-404', loadComponent: () => import('./frontoffice-pages/error-404/error-404.component').then((m) => m.Error404FrontofficePageComponent) },
  { path: 'frontoffice/error-500', loadComponent: () => import('./frontoffice-pages/error-500/error-500.component').then((m) => m.Error500FrontofficePageComponent) },
  { path: 'frontoffice/faq', loadComponent: () => import('./frontoffice-pages/faq/faq.component').then((m) => m.FaqFrontofficePageComponent) },
  { path: 'frontoffice/forgot-password', loadComponent: () => import('./frontoffice-pages/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordFrontofficePageComponent) },
  { path: 'frontoffice/index', loadComponent: () => import('./frontoffice-pages/index/index.component').then((m) => m.IndexFrontofficePageComponent) },
  { path: 'frontoffice/index-2', loadComponent: () => import('./frontoffice-pages/index-2/index-2.component').then((m) => m.Index2FrontofficePageComponent) },
  { path: 'frontoffice/index-3', loadComponent: () => import('./frontoffice-pages/index-3/index-3.component').then((m) => m.Index3FrontofficePageComponent) },
  { path: 'frontoffice/index-4', loadComponent: () => import('./frontoffice-pages/index-4/index-4.component').then((m) => m.Index4FrontofficePageComponent) },
  { path: 'frontoffice/index-5', loadComponent: () => import('./frontoffice-pages/index-5/index-5.component').then((m) => m.Index5FrontofficePageComponent) },
  { path: 'frontoffice/index.html', pathMatch: 'full', redirectTo: 'frontoffice/index' },
  { path: 'frontoffice/instructor-details', loadComponent: () => import('./frontoffice-pages/instructor-details/instructor-details.component').then((m) => m.InstructorDetailsFrontofficePageComponent) },
  { path: 'frontoffice/instructor-details.html', pathMatch: 'full', redirectTo: 'frontoffice/instructor-details' },
  { path: 'frontoffice/login', loadComponent: () => import('./frontoffice-pages/login/login.component').then((m) => m.LoginFrontofficePageComponent) },
  { path: 'frontoffice/login.html', pathMatch: 'full', redirectTo: 'frontoffice/login' },
  { path: 'frontoffice/my-account', loadComponent: () => import('./frontoffice-pages/my-account/my-account.component').then((m) => m.MyAccountFrontofficePageComponent) },
  { path: 'frontoffice/news', loadComponent: () => import('./frontoffice-pages/news/news.component').then((m) => m.NewsFrontofficePageComponent) },
  { path: 'frontoffice/news-details', loadComponent: () => import('./frontoffice-pages/news-details/news-details.component').then((m) => m.NewsDetailsFrontofficePageComponent) },
  { path: 'frontoffice/news-details.html', pathMatch: 'full', redirectTo: 'frontoffice/news-details' },
  { path: 'frontoffice/news.html', pathMatch: 'full', redirectTo: 'frontoffice/news' },
  { path: 'frontoffice/pricing', loadComponent: () => import('./frontoffice-pages/pricing/pricing.component').then((m) => m.PricingFrontofficePageComponent) },
  { path: 'frontoffice/registration', loadComponent: () => import('./frontoffice-pages/registration/registration.component').then((m) => m.RegistrationFrontofficePageComponent) },
  { path: 'frontoffice/registration.html', pathMatch: 'full', redirectTo: 'frontoffice/registration' },
  { path: 'frontoffice/shop-details', loadComponent: () => import('./frontoffice-pages/shop-details/shop-details.component').then((m) => m.ShopDetailsFrontofficePageComponent) },
  { path: 'frontoffice/shop-details.html', pathMatch: 'full', redirectTo: 'frontoffice/shop-details' },
  { path: 'frontoffice/shop', loadComponent: () => import('./frontoffice-pages/shop/shop.component').then((m) => m.ShopFrontofficePageComponent) },
  { path: 'frontoffice/shop.html', pathMatch: 'full', redirectTo: 'frontoffice/shop' },
  { path: 'frontoffice/team', loadComponent: () => import('./frontoffice-pages/team/team.component').then((m) => m.TeamFrontofficePageComponent) },
  { path: 'frontoffice/team.html', pathMatch: 'full', redirectTo: 'frontoffice/team' },
  { path: '**', redirectTo: 'frontoffice/error-404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
