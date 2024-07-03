-- no 1 
SELECT
    s."name" as student_name,
    c."name" as class_name,
    t."name" as teacher_name
FROM students s
JOIN classes c ON s.class_id = c.id
JOIN teachers t ON c.teacher_id = t.id; 

-- 2
SELECT
    t."name" as teacher_name,
    c."name" as class_name
FROM teachers t
JOIN classes c ON t.id = c.teacher_id
GROUP BY t."name", c."name";

-- 3
CREATE VIEW student_class_teacher AS
SELECT
    s."name" as student_name,
    c."name" as class_name,
    t."name" as teacher_name
FROM students s
JOIN classes c ON s.class_id = c.id
JOIN teachers t ON c.teacher_id = t.id;


SELECT * FROM student_class_teacher;

-- 4
CREATE OR REPLACE FUNCTION get_students_classes_teachers()
RETURNS TABLE(student_name VARCHAR, class_name VARCHAR, teacher_name VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        s."name" as student_name,
        c."name" as class_name,
        t."name" as teacher_name
    FROM students s
    JOIN classes c ON s.class_id = c.id
    JOIN teachers t ON c.teacher_id = t.id;
END;
$$;

--5 
CREATE OR REPLACE FUNCTION prevent_duplicate_student()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM students WHERE name: = NEW.name) THEN
        RAISE EXCEPTION 'Duplicate student name: %', NEW.name;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_duplicate_student
BEFORE INSERT ON students
FOR EACH ROW
EXECUTE FUNCTION prevent_duplicate_student();