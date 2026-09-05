import { OAuth2Client } from "google-auth-library";
import ApiError from "../errors/ApiErrors";

const client = new OAuth2Client();

export async function verifyGoogleIdToken(idToken: string) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience:
      "158645084435-jmelb2fellj4r4cks53equ4narhj11c0.apps.googleusercontent.com",
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new ApiError(400, "Invalid Google ID token");
  }

  return payload;
}
