import { API_URL } from "../../config";
import cookie from "cookie";

export default async function postOrder(req, res) {
  if (req.method === "POST") {
    const { token } = cookie.parse(req.headers.cookie);
    if (token) {
      const { address, user, products } = req.body;

      const strapiRes = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            address,
            user,
            products,
          },
        }),
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
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
