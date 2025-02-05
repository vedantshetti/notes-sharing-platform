-- Create the years table
CREATE TABLE IF NOT EXISTS years (
  id SERIAL PRIMARY KEY,
  year_name TEXT NOT NULL
);

-- Create the departments table
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  department_name TEXT NOT NULL
);

-- Create the subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id SERIAL PRIMARY KEY,
  subject_name TEXT NOT NULL,
  year_id INT REFERENCES years(id),
  department_id INT REFERENCES departments(id)
);

-- Create the notes table with subject_name, year_name, and department_name
CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  year_name TEXT NOT NULL,
  department_name TEXT NOT NULL
);
