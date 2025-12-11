
export const dynamic = 'force-dynamic'; // Ensure this is not cached at build time

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  
  // Security: Don't reveal the full secret, just hints
  const status = dbUrl ? "Loaded" : "Not Loaded";
  const protocol = dbUrl ? dbUrl.split(':')[0] : "N/A";
  const hostHint = dbUrl ? dbUrl.split('@')[1]?.split(':')[0] : "N/A";
  
  return Response.json({
    env_vars_check: {
      DATABASE_URL: status,
      PROTOCOL_CHECK: protocol, // Should be 'mysql' or 'mysql2'
      HOST_HINT: hostHint,      // Verify this matches the Remote IP, not 'localhost'
      NODE_ENV: process.env.NODE_ENV,
    },
    timestamp: new Date().toISOString()
  });
}
