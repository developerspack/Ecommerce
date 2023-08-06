import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { store } from "@/Redux/store";
import { Layout } from "@/components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
