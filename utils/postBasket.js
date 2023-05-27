import { NEXT_URL } from "../config";

export const handleSubmit = async (
  e,
  { address, items, user, stripePromise }
) => {
  e.preventDefault();

  if (
    !items.length ||
    !user ||
    !address.name ||
    !address.street ||
    !address.postCode
  )
    throw "Either you're not logged in or you have left some fields empty.";

  const stripe = await stripePromise;

  const strapiRes = await fetch(`${NEXT_URL}/api/postOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products: items, address: address, user: user }),
    credentials: "include",
  });

  const { data } = await strapiRes.json();

  await stripe.redirectToCheckout({
    sessionId: data.session.id,
  });
};
