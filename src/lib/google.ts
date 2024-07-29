import 'server-only'
import {importPKCS8, SignJWT} from "jose";

export async function getAccessToken() {
  const jwt = await createJwt(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    process.env.GOOGLE_PRIVATE_KEY || ''
  );

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  return await tokenResponse.json();
}

async function createJwt(email: string, privateKey: string) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600; // 1 hour

  const payload = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp,
    iat,
  };

  const key = await importPKCS8(privateKey.replace(/\\n/g, '\n'), "RS256");

  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'RS256', typ: 'JWT'})
    .sign(key);
}