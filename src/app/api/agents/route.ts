import { NextResponse } from "next/server";
import { getAgents, createAgent } from "@/lib/firestore";

export async function GET() {
  try {
    const agents = await getAgents();
    return NextResponse.json(agents);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const uid = req.headers.get("x-user-id");
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();

    if (!data.name || !data.description || !data.endpointUrl) {
      return NextResponse.json(
        { error: "name, description, and endpointUrl are required" },
        { status: 400 }
      );
    }

    const newId = await createAgent(data);
    return NextResponse.json({ id: newId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
