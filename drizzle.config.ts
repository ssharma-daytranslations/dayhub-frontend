import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import fs from 'fs';
import path from 'path';

// Manually load .env.local because drizzle-kit doesn't do it automatically
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envConfig = fs.readFileSync(envLocalPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
       process.env[key.trim()] = value.trim().replace(/^"|"$/g, '');
    }
  });
}


export default defineConfig({
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
