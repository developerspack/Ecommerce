import { useEffect } from "react";

import { store } from "@/Redux/store";
import { hydrateUser } from "@/Redux/slice/authSlice";
import { hydrateCart } from "@/Redux/slice/cartSlice";

const Layout = ({ children }) => {
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
    // hydrateCart
    store.subscribe(() => {
      localStorage.setItem("cart", JSON.stringify(store.getState().cart));
    });
    let cart = localStorage.getItem("cart");
    cart = auth
      ? JSON.parse(cart)
      : {
          items: [],
        };
    store.dispatch(hydrateCart(cart));
  }, []);

  return <>{children}</>;
};

export default Layout;
