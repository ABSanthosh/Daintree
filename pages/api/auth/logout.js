import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";

export default withIronSessionApiRoute(GoogleLogout, ironOptions);

async function GoogleLogout(req, res) {
  req.session.destroy();
  res.send({ status: 200, ok: true });
  res.end();
}
