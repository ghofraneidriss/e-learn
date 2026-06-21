const { pool } = require('./db');

function mapCourse(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    duration: row.duration,
    level: row.level,
    teacherName: row.teacher_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function listCourses() {
  const result = await pool.query('SELECT * FROM courses ORDER BY id ASC');
  return result.rows.map(mapCourse);
}

async function getCourseById(id) {
  const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
  return mapCourse(result.rows[0]);
}

async function createCourse(course) {
  const result = await pool.query(
    `INSERT INTO courses (title, description, duration, level, teacher_name)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [course.title, course.description || null, course.duration || null, course.level || null, course.teacherName || null]
  );
  return mapCourse(result.rows[0]);
}

async function updateCourse(id, course) {
  const result = await pool.query(
    `UPDATE courses
     SET title = $1,
         description = $2,
         duration = $3,
         level = $4,
         teacher_name = $5,
         updated_at = NOW()
     WHERE id = $6
     RETURNING *`,
    [course.title, course.description || null, course.duration || null, course.level || null, course.teacherName || null, id]
  );
  return mapCourse(result.rows[0]);
}

async function deleteCourse(id) {
  const result = await pool.query('DELETE FROM courses WHERE id = $1 RETURNING id', [id]);
  return result.rowCount > 0;
}

module.exports = {
  listCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
