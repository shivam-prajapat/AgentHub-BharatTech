import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, getDoc, addDoc, Timestamp, doc, updateDoc } from "firebase/firestore";
import crypto from "crypto";

export async function GET(req: Request) {
  const uid = req.headers.get("x-user-id");
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const q = query(collection(db, "api_keys"), where("userId", "==", uid));
    const snaps = await getDocs(q);
    const keys = snaps.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json(keys);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const uid = req.headers.get("x-user-id");
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { label } = await req.json();
    const rawKey = "ah_" + crypto.randomBytes(24).toString('hex');
    const keyHash = crypto.createHash("sha256").update(rawKey).digest('hex');
    const keyPrefix = rawKey.substring(0, 8);

    const newKey = {
      userId: uid,
      keyHash,
      keyPrefix,
      label: label || "Default Key",
      lastUsedAt: null,
      createdAt: Timestamp.now(),
      isActive: true
    };

    const docRef = await addDoc(collection(db, "api_keys"), newKey);

    return NextResponse.json({ id: docRef.id, ...newKey, rawKey });
    // ONLY returned once!
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Revoke
export async function PUT(req: Request) {
  const uid = req.headers.get("x-user-id");
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { keyId } = await req.json();
    if (!keyId) return NextResponse.json({ error: "keyId is required" }, { status: 400 });

    // Verify the key belongs to the requesting user before revoking
    const keyRef = doc(db, "api_keys", keyId);
    const keySnap = await getDoc(keyRef);
    if (!keySnap.exists()) return NextResponse.json({ error: "Key not found" }, { status: 404 });
    if (keySnap.data().userId !== uid) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await updateDoc(keyRef, { isActive: false });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
