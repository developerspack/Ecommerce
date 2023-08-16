import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CirclesWithBar } from "react-loader-spinner";
import { useSelector } from "react-redux";

import CheckoutForm from "./CheckoutForm";
import { SelectTotal } from "@/Redux/slice/cartSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Stripe() {
  const [clientSecret, setClientSecret] = useState("");
  const TotalAmount = useSelector(SelectTotal);

  const CheckoutSession = {
    CheckoutAmount: TotalAmount,
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: CheckoutSession }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "night",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <CirclesWithBar
            height={40}
            width={40}
            color="#4acd8d"
            visible={true}
            ariaLabel="circles-with-bar-loading"
          />
          <h2 className="text-center text-xl font-semibold">Loading...</h2>
        </div>
      )}
    </div>
  );
}
