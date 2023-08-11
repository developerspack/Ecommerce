import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Head from "next/head";

import { hydrateUser } from "@/Redux/slice/authSlice";
import { store } from "@/Redux/store";
import { CheckoutProducts, PaymentMethods } from "@/components";

const Checkout = () => {
  const router = useRouter();
  useEffect(() => {
    // HYDRATE USER
    store.subscribe(() => {
      localStorage.setItem("auth", JSON.stringify(store.getState().auth));
    });
    let auth = localStorage.getItem("auth");
    auth = auth
      ? JSON.parse(auth)
      : {
          isLoggedIn: false,
          userName: null,
          userEmail: null,
          userImageUrl: null,
          userID: null,
        };
    store.dispatch(hydrateUser(auth));

    if (!auth || !auth.isLoggedIn) {
      router.push("/");
      toast.error("Sign In To Access The Page");
    }
  }, []);

  return (
    <div className="text-white">
      <Head>
        <title>Dp Shop | Checkout</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="container">
        <div className="lg:flex block mt-24 h-[650px]">
          <CheckoutProducts />
          <PaymentMethods />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
