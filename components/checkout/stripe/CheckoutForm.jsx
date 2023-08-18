import { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CirclesWithBar } from "react-loader-spinner";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { selectUserEmail, selectUserID } from "@/Redux/slice/authSlice";
import { EMPTY_CART, SelectItems, SelectTotal } from "@/Redux/slice/cartSlice";
import { db } from "@/utils/firebase";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // redux
  const items = useSelector(SelectItems);
  const userId = useSelector(selectUserID);
  const userEmail = useSelector(selectUserEmail);
  const TotalAmount = useSelector(SelectTotal);
  const dispatch = useDispatch();

  // dates
  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();
  // 10items productsNo 6
  const extraItems = [];

  const SaveOrder = () => {
    try {
      for (const product of items) {
        if (product.qty <= product.productNo) {
          updateDoc(doc(db, "products", product.id), {
            productNo: product.productNo - product.qty,
          });
        } else {
          const Item = {
            extraItems: product.qty - product.productNo,
            productId: product.id,
            productName: product.Name,
            productNo: product.productNo,
            productQty: product.qty,
            imageUrl: product.imageUrl,
          };
          extraItems.push(Item);
        }
      }

      // save order
      addDoc(collection(db, "orders"), {
        userId,
        userEmail,
        orderDate: date,
        orderTime: time,
        orderAmount: TotalAmount,
        orderStatus: "Processing",
        extraItems,
        items,
        createdAt: serverTimestamp(),
      });
      toast.success("Order Saved");
      dispatch(EMPTY_CART());
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    const { error } = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${process.env.NEXT_PUBLIC_URL}/CheckoutSuccess`,
        },
      })
      .then(SaveOrder());

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-2">
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="bg-primary text-black p-4 w-full rounded-lg cursor-pointer font-bold"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <CirclesWithBar
                height={40}
                width={40}
                color="#000000"
                visible={true}
                ariaLabel="circles-with-bar-loading"
              />
              <h2 className="text-center text-xl font-semibold">Loading...</h2>
            </div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
