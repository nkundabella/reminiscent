import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEFAULT_PASSCODE = "admin123";

export async function GET() {
  const cookieStore = await cookies();
  const isUnlocked = cookieStore.get("alter_ego_owner")?.value === "authenticated";
  return NextResponse.json({ authenticated: isUnlocked });
}

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    const expectedPasscode = process.env.OWNER_PASSCODE || DEFAULT_PASSCODE;

    if (passcode && passcode.trim() === expectedPasscode.trim()) {
      const response = NextResponse.json({ success: true, message: "Unlocked successfully" });
      
      // Store authenticated cookie for 30 days
      response.cookies.set("alter_ego_owner", "authenticated", {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return response;
    }

    return NextResponse.json({ success: false, message: "Incorrect passcode" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Locked" });
  response.cookies.set("alter_ego_owner", "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 0,
  });
  return response;
}
