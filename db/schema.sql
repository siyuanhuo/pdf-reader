DROP DATABASE IF EXISTS skills_db;

CREATE DATABASE skills_db;

USE skills_db;

CREATE TABLE candidate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  number VARCHAR(30),
  email VARCHAR(50)
);

CREATE TABLE ability (
  candidate_id INT NOT NULL,
  skill VARCHAR(30) NOT NULL
);

