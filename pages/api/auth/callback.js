import { google } from "googleapis";
import { withIronSessionApiRoute } from "iron-session/next";
import { loginUser } from "../../../dbService/user.db";
import { ironOptions } from "../../../lib/ironOptions";

export default withIronSessionApiRoute(GoogleCallback, ironOptions);

async function GoogleCallback(req, res) {
  const code = req.query.code;

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );

  let { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const user = JSON.parse(
    Buffer.from(tokens.id_token.split(".")[1].split(".")[0], "base64").toString(
      "ascii"
    )
  );

  const { sub, name, picture, email, locale } = user;

  try {
    await loginUser({ sub, name, picture, email, locale });
  } catch (_) {}

  req.session.user = user;
  await req.session.save();
  res.writeHead(302, {
    Location: "/",
  });
  res.end();
}
