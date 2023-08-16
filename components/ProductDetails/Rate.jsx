import { Rating } from "@mui/material";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { db } from "@/utils/firebase";
import { selectUserImageUrl, selectUserName } from "@/Redux/slice/authSlice";
const Rate = ({ productID }) => {
  const router = useRouter();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");

  // redux
  const userImage = useSelector(selectUserImageUrl);
  const userName = useSelector(selectUserName);
  const today = new Date();
  const reviewDate = today.toDateString();

  const HandleSubmit = (e) => {
    e.preventDefault();
    const reviewInput = {
      rate,
      review,
      reviewDate,
      userImage,
      userName,
      productID,
    };

    try {
      addDoc(collection(db, "reviews"), reviewInput);
      toast.success("Review Submit Successfully");
      router.push(`/productDetails/${productID}`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={HandleSubmit} className="p-4 space-y-2">
      {/* stars */}
      <div className="flex items-center gap-2">
        <p className="font-bold text-lg">Rate Product</p>
        <Rating
          size="large"
          required
          emptyIcon={
            <AiFillStar style={{ color: "#fff" }} fontSize="inherit" />
          }
          value={rate}
          onChange={(e, rate) => setRate(rate)}
          starcount={5}
        />
      </div>
      {/* input/textare */}
      <label className="block mb-2 text-lg font-bold text-white">
        Your Message:
      </label>
      <textarea
        rows="4"
        required
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your message here!"
        className="block focus:ring-primary focus:outline-none focus:ring-2 p-2.5 w-full text-lg bg-lightDark rounded-md text-white"
      />
      {/* btn */}
      <button className="bg-primary hover:bg-green-500 rounded-md p-3 text-black text-lg font-bold mt-3">
        Submit Your Review
      </button>
    </form>
  );
};

export default Rate;
