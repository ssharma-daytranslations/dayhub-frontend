# Request for Deployment Credentials

**To:** DevOps Team / System Administrator
**From:** Frontend Developer / DayHub

**Subject:** Action Required: Database Connection for Vercel Deployment

I am currently deploying the DayHub frontend to **Vercel**. 
The application requires a database connection, but the current configuration is set to `localhost`.

Since Vercel is a cloud environment, it cannot connect to `localhost`. It requires a publicly accessible database URL.

**Please provide the following:**

1.  **Public Database Hostname/IP**: (e.g., `db.example.com` or `159.203.x.x`)
2.  **Port**: (if not 3306)
3.  **Updated Connection String**:
    
    Current (Invalid for Vercel):
    `mysql://dayhub_u:password@localhost:3306/dayhub_db`

    Required Format:
    `mysql://dayhub_u:password@PUBLIC_IP:3306/dayhub_db`

**Note:** Ensure that the database server's firewall allows incoming connections from Vercel's IP ranges (or `0.0.0.0/0` if verifying strictly with credentials).

Thank you.
