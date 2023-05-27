import { API_URL } from "../../../config";
import cookie from "cookie";

export default async function viewOrder(req, res) {
  if (req.method === "GET") {
    const { token } = cookie.parse(req.headers.cookie);
    if (token) {
      const strapiRes = await fetch(`${API_URL}/api/orders/${req.query.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await strapiRes.json();

      if (strapiRes.ok) {
        res.status(200).json({ data });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    } else {
      res.status(403).json({ message: `You're not allowed to do this` });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
