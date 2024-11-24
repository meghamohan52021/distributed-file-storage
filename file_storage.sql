CREATE DATABASE file_storage;
USE file_storage;

CREATE TABLE files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  file_name VARCHAR(255),
  file_size INT,
  s3_location VARCHAR(255)
);

SELECT * FROM files;
