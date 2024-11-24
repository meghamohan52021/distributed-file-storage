import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import { localDbConnection, rdsDbConnection } from './db.mjs'; 

try {
  // Initialize S3 client
  const s3 = new S3Client({ region: 'eu-west-2' });

  const fileName = "test_file2.txt";
  const bucketName = "file-storage-buckett";

  // Upload text file to S3 bucket
  fs.readFile(fileName, async (err, data) => {
    if (err) {
      console.error("File read error:", err);
      return;
    }

    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: data,
      });

      const response = await s3.send(command);
      console.log(`File uploaded successfully. Response:`, response);

      
      const s3Location = `https://${bucketName}.s3.eu-west-2.amazonaws.com/${fileName}`;
      const fileSize = data.length;

      const insertQuery = `
        INSERT INTO files (file_name, file_size, s3_location) 
        VALUES (?, ?, ?)
      `;

      //Insert values to local database for testing purpose
      localDbConnection.execute(insertQuery, [fileName, fileSize, s3Location], (err, results) => {
        if (err) {
          console.error("Error inserting data into the local database:", err);
        } else {
          console.log("File metadata inserted into local database successfully.");
        }
      });

      //Insert values to RDS database
      rdsDbConnection.execute(insertQuery, [fileName, fileSize, s3Location], (err, results) => {
        if (err) {
          console.error("Error inserting data into the RDS database:", err);
        } else {
          console.log("File metadata inserted into RDS database successfully.");
        }
      });

    } catch (err) {
      console.error("Upload error:", err);
    }
  });

} catch (error) {
  console.error("Unexpected error:", error);
}
