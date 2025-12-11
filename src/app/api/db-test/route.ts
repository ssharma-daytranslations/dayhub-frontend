
import { db } from "@/lib/db";
import { interpreters } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Try to fetch just one record to verify connection and schema
    const result = await db.select().from(interpreters).limit(1);
    
    // Also get generic server version info if possible, or just return success
    const [version] = await db.execute(sql`SELECT VERSION() as version`);

    return Response.json({
      ok: true,
      message: "DB connection successful",
      database_version: (version as any).version,
      sampleData: result,
      env_check: {
        has_db_url: !!process.env.DATABASE_URL,
        node_env: process.env.NODE_ENV
      }
    });
  } catch (error: any) {
    console.error("DB Connection Error:", error);
    return Response.json({
      ok: false,
      message: "DB connection failed",
      error: error.message,
      code: error.code,
      details: "Check Vercel Logs for full stack trace"
    }, { status: 500 });
  }
}
