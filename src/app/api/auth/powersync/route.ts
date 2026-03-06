import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, importPKCS8 as joseImportPKCS8 } from 'jose';
// import { prisma } from '../../../../lib/db/prisma'; // Optional, to verify user logic

// Generating an authorization token for PowerSync to access the logical replication server
export async function GET(req: NextRequest) {
  try {
    // 1. In a real application, you would first verify the request is from an authenticated user.
    // E.g., const user = await getCurrentUser(req);
    // If you don't use Auth yet, we can generate a demo token for anonymous/sync access.
    const userId = "demo-user-123"; // Replace with real auth user ID

    // 2. Fetch the PowerSync Private Key from env 
    // This key is given to you when you set up PowerSync Cloud
    const privateKey = process.env.POWERSYNC_PRIVATE_KEY;

    if (!privateKey) {
      console.warn("Missing POWERSYNC_PRIVATE_KEY in .env");
      return NextResponse.json({ error: "PowerSync not configured" }, { status: 500 });
    }

    // Decode the base64 or PEM private key depending on how PowerSync provided it
    // Note: Assuming a PEM/base64 PKCS8 key according to typical Next.js/Jose setups
    const secretKey = await importPKCS8(privateKey, 'RS256');
    const POWERSYNC_URL = process.env.NEXT_PUBLIC_POWERSYNC_URL;

    // 3. Issue the PowerSync JWT
    const token = await new SignJWT({
      iss: POWERSYNC_URL, // Optional depending on config
      sub: userId,
      aud: 'powersync', // identifies what service this token is for
    })
      .setProtectedHeader({ alg: 'RS256', typ: 'JWT', kid: 'my-powersync-key-id' })
      .setIssuedAt()
      .setExpirationTime('1h') // Token validity
      .sign(secretKey);

    return NextResponse.json({ token, endpoint: POWERSYNC_URL });
  } catch (error) {
    console.error("PowerSync Token Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}

// Helpers for crypto keys
async function importPKCS8(pem: string, alg: string) {
  return await joseImportPKCS8(pem, alg);
}
