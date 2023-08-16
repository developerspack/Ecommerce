import { useEffect } from "react";

import { store } from "@/Redux/store";
import { hydrateUser } from "@/Redux/slice/authSlice";
import { hydrateCart } from "@/Redux/slice/cartSlice";
import { hydrateFav } from "@/Redux/slice/favSlice";

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
    cart = cart
      ? JSON.parse(cart)
      : {
          items: [],
        };
    store.dispatch(hydrateCart(cart));
    // hydrateFav
    store.subscribe(() => {
      localStorage.setItem("fav", JSON.stringify(store.getState().fav));
    });
    let fav = localStorage.getItem("fav");
    fav = fav
      ? JSON.parse(fav)
      : {
          items: [],
        };
    store.dispatch(hydrateFav(fav));
  }, []);

  return <>{children}</>;
};

export default Layout;
