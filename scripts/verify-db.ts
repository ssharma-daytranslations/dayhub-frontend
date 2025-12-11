
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

// Manually load .env.local to ensure we have the exact values
const envPath = path.resolve(process.cwd(), '.env.local');
console.log(`Loading env from ${envPath}`);

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
       const value = valueParts.join('=').trim();
       process.env[key.trim()] = value;
    }
  });
}

const dbUrl = process.env.DATABASE_URL;
console.log('DATABASE_URL:', dbUrl);

async function testConnection() {
  if (!dbUrl) {
    console.error('DATABASE_URL is missing!');
    return;
  }

  try {
    console.log('Attempting to connect to database...');
    const connection = await mysql.createConnection(dbUrl);
    console.log('Successfully connected to database!');
    
    // Test a simple query
    const [rows] = await connection.execute('SHOW TABLES;');
    console.log('Tables found:', (rows as any[]).map(r => Object.values(r)[0]));
    
    // If there are tables, maybe count records in one? 
    // We don't know the table names yet, but 'SHOW TABLES' will reveal them.
    
    await connection.end();
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
}

testConnection();
