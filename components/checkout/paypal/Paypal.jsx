import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CirclesWithBar } from "react-loader-spinner";

import { selectUserEmail, selectUserID } from "@/Redux/slice/authSlice";
import { EMPTY_CART, SelectItems, SelectTotal } from "@/Redux/slice/cartSlice";
import { db } from "@/utils/firebase";

// This value is from the props in the UI
const style = { layout: "vertical" };

function onApprove(data) {
  const router = useRouter();
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
          imageUrl: product.imageUrl
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
      orderID: data.orderId,
      createdAt: serverTimestamp(),
    });
    toast.success("Order Saved");
    dispatch(EMPTY_CART());
    router.push("/CheckoutSuccess");
  } catch (error) {
    toast.error(error.message);
  }
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const TotalAmount = useSelector(SelectTotal);

  return (
    <>
      {showSpinner && isPending && (
        <div className="flex items-center justify-center gap-3">
          <CirclesWithBar
            height={40}
            width={40}
            visible={true}
            ariaLabel="circles-with-bar-loading"
          />
          <h2 className="text-center text-xl font-semibold">Loading...</h2>
        </div>
      )}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: TotalAmount,
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            });
        }}
        onApprove={onApprove}
      />
    </>
  );
};

export default function App() {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENTID,
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
