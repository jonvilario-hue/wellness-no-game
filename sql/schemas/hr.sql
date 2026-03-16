-- Generic Human Resources Relational Pattern
CREATE TABLE departments (
    id integer PRIMARY KEY,
    name varchar(50) NOT NULL,
    location varchar(50)
);

CREATE TABLE employees (
    id integer PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(100) UNIQUE,
    hire_date date,
    job_id varchar(20),
    salary numeric,
    manager_id integer REFERENCES employees(id),
    department_id integer REFERENCES departments(id)
);

CREATE TABLE projects (
    id integer PRIMARY KEY,
    name varchar(100),
    start_date date,
    end_date date,
    budget numeric
);

CREATE TABLE employee_projects (
    employee_id integer REFERENCES employees(id),
    project_id integer REFERENCES projects(id),
    role varchar(50),
    PRIMARY KEY (employee_id, project_id)
);