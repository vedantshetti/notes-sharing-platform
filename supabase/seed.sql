-- Insert data into 'years' table
INSERT INTO years (year_name) VALUES
('First Year'),
('Second Year'),
('Third Year'),
('Fourth Year');

-- Insert data into 'departments' table
INSERT INTO departments (department_name) VALUES
('Computer Engineering'),
('Electronics and Telecommunication Engineering'),
('Information Technology'),
('Instrumentation and Control Engineering'),
('Mechanical Engineering'),
('Civil Engineering'),
('Artificial Intelligence and Data Science'),
('Robotics and Automation');

-- Insert data into 'subjects' table (example with 3 subjects for each department)
INSERT INTO subjects (subject_name, year_id, department_id) VALUES
('Mathematics I', 1, 1),
('Physics I', 1, 1),
('Programming Fundamentals', 1, 1),
('Digital Electronics', 2, 2),
('Signals and Systems', 2, 2),
('Electromagnetic Fields', 2, 2),
('Data Structures', 3, 3),
('Database Management Systems', 3, 3),
('Software Engineering', 3, 3),
('Engineering Mechanics', 4, 4),
('Strength of Materials', 4, 4),
('Fluid Mechanics', 4, 4);

-- Insert data into 'notes' table (example with random notes for each subject)
INSERT INTO notes (title, file_url, subject_id) VALUES
('Math Notes - Calculus', 'https://example.com/math_notes_calculus.pdf', 1),
('Physics Notes - Thermodynamics', 'https://example.com/physics_notes_thermo.pdf', 2),
('Programming Notes - C Programming', 'https://example.com/programming_notes_c.pdf', 3),
('Digital Electronics Notes', 'https://example.com/digital_notes.pdf', 4),
('Signals Notes - Fourier Transforms', 'https://example.com/signals_notes_fourier.pdf', 5),
('Data Structures Notes', 'https://example.com/data_structures_notes.pdf', 7),
('Database Notes - SQL', 'https://example.com/db_notes_sql.pdf', 8),
('Software Engineering Notes', 'https://example.com/se_notes.pdf', 9),
('Mechanics Notes - Statics', 'https://example.com/mechanics_notes.pdf', 10),
('Fluid Mechanics Notes', 'https://example.com/fluids_notes.pdf', 11);
