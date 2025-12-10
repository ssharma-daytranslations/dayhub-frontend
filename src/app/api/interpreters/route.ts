import { db } from "@/lib/db";
import { interpreters } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allInterpreters = await db.select().from(interpreters);
    return Response.json(allInterpreters);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Basic validation
    const [firstName, ...lastNameParts] = (body.name || "").split(" ");
    const lastName = lastNameParts.join(" ") || "";

    const result = await db.insert(interpreters).values({
        firstName: body.firstName || firstName,
        lastName: body.lastName || lastName,
        email: body.email,
        phone: body.phone,
        sourceLanguage: body.sourceLanguage,
        targetLanguage: body.targetLanguage,
        city: body.location, // Mapping location to city for backward compat
        state: body.state,
    }).$returningId();

    return Response.json({ success: true, id: result[0].id });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
