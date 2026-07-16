import { NextResponse } from "next/server";
import { upsertAgentVector } from "@/lib/vectorSearch";

export async function POST(req: Request) {
  const uid = req.headers.get("x-user-id");
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { agentId, text } = await req.json();

    if (!agentId || typeof agentId !== "string" || agentId.trim().length === 0) {
      return NextResponse.json({ error: "agentId is required and must be a non-empty string" }, { status: 400 });
    }
    if (agentId.length > 200) {
      return NextResponse.json({ error: "agentId must be 200 characters or fewer" }, { status: 400 });
    }
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "text is required and must be a non-empty string" }, { status: 400 });
    }
    if (text.length > 5000) {
      return NextResponse.json({ error: "text must be 5000 characters or fewer" }, { status: 400 });
    }

    await upsertAgentVector(agentId, text);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
