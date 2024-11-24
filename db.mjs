import mysql from 'mysql2';

// Create a connection for local MySQL Workbench
const localDbConnection = mysql.createConnection({
  host: 'file-storage-database.ch0qw2awgqc4.eu-west-2.rds.amazonaws.com', 
  user: 'admin',       
  password: 'Meghamohan123',  
  database: 'file_storage'   
});

// Create a connection for remote RDS instance
const rdsDbConnection = mysql.createConnection({
  host: 'file-storage-database.ch0qw2awgqc4.eu-west-2.rds.amazonaws.com', 
  user: 'admin',          
  password: 'Meghamohan123',  
  database: 'file_storage',  
  port: 3306           
});

// Connect to the local database
localDbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the local database:', err);
    return;
  }
  console.log('Connected to the local database.');
});

// Connect to the remote RDS database
rdsDbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the RDS database:', err);
    return;
  }
  console.log('Connected to the RDS database.');
});

// Exporting both connections for use in other modules
export { localDbConnection, rdsDbConnection };
