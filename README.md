# Distributed File Storage System

This project is a distributed file storage system, designed to store files securely in Amazon S3 while keeping metadata in both a local MySQL database and an Amazon RDS instance. The system aims to demonstrate seamless integration of cloud-based services with local databases, suitable for scenarios involving file backup, distributed storage, and cloud computing.

## Project Overview

The distributed file storage system allows users to upload files to an Amazon S3 bucket while saving metadata, such as file name, size, and storage location, in both a local database and a cloud-based RDS instance. The entire setup uses AWS services, Node.js for backend scripting, and MySQL databases for metadata storage. The project is implemented on an Amazon EC2 instance, enabling smooth access to other AWS services.

### Features
- **File Upload**: Uploads files to an Amazon S3 bucket using AWS SDK for JavaScript.
- **Database Integration**: Stores file metadata, including file name, size, and S3 URL, in both a local MySQL database and an Amazon RDS MySQL instance.
- **Cloud Computing**: Uses an EC2 instance to host the Node.js application, providing easy access to S3 and RDS.

## Technologies Used
- **Amazon S3**: For secure file storage in the cloud.
- **Amazon EC2**: To host the backend application and provide access to other AWS services.
- **Amazon RDS**: To store file metadata in a cloud-based relational database.
- **Node.js**: Backend scripting language.
- **MySQL**: Used for metadata storage in both local and RDS databases.

## Setup Instructions

1. **AWS Configuration**
   - Launch an EC2 instance with Amazon Linux.
   - Attach an IAM role to the EC2 instance with AmazonS3FullAccess and AmazonRDSFullAccess.
   - Create an Amazon S3 bucket for file storage.
   - Set up an Amazon RDS MySQL database for metadata storage.

2. **File Transfer to EC2**
   - Use `scp` to transfer the application code (e.g., `app.js` and `db.js`) to the EC2 instance.
   - Ensure that the required Node.js dependencies (`@aws-sdk/client-s3` and `mysql2`) are installed on the EC2 instance using `npm install`.

3. **Database Setup**
   - Create a MySQL database named `file_storage` in both local MySQL Workbench and Amazon RDS.
   - Create a table called `files` to store metadata, using the following schema:
     ```sql
     CREATE TABLE files (
       id INT AUTO_INCREMENT PRIMARY KEY,
       file_name VARCHAR(255),
       file_size INT,
       s3_location VARCHAR(255)
     );
     ```

4. **Running the Application**
   - Connect to the EC2 instance via SSH.
   - Run the application using the command:
     ```bash
     node app.mjs
     ```
   - The application will upload the specified file to S3 and insert metadata into both the RDS and local databases.

## Usage

The application reads a local file (e.g., `test_file2.txt`), uploads it to an Amazon S3 bucket, and stores metadata in both the local MySQL database and Amazon RDS instance. The metadata includes:
- **File Name**: The name of the uploaded file.
- **File Size**: Size of the file in bytes.
- **S3 Location**: The URL of the file in the S3 bucket.

## How to Verify
- **S3 Bucket**: Check the S3 bucket to verify that the file was uploaded successfully.
- **Local Database**: Connect to the local MySQL Workbench and verify that the metadata is present in the `files` table.
- **RDS Database**: Use an SQL client to connect to the Amazon RDS instance and verify that the metadata was inserted correctly.

## Important Notes
- Make sure to configure the IAM role with the necessary permissions to access S3 and RDS.
- When transferring files to the EC2 instance, ensure that the private key is specified correctly for authentication.
- The application uses environment variables for database credentials and configuration.

## Future Improvements
- **User Authentication**: Add user authentication for enhanced security.
- **Web Interface**: Develop a user-friendly interface for uploading files and viewing metadata.
- **Scalability**: Use AWS Lambda and other serverless technologies to improve scalability.



## License
This project is licensed under the MIT License.

