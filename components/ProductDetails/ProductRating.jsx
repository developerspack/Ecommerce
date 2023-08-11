import { Rating } from "@mui/material";
import { AiFillStar } from "react-icons/ai";

const ProductRating = ({ rate, review, reviewDate, userImage, userName }) => {
  return (
    <div className="px-2">
      <div className="max-w-lg p-3 rounded-md shadow-lg bg-linkCard">
        {/* rating */}
        <>
          <div className="flex mt-1 mb-2 items-center gap-2">
            <Rating
              value={rate}
              readOnly
              precision={0.5}
              emptyIcon={
                <AiFillStar className="text-white" fontSize="inherit" />
              }
            />
          </div>
          <p className="-mt-7 text-sm font-medium float-right text-gray-400">
            {reviewDate}
          </p>
        </>
        {/* review/feedback*/}
        <div className="space-y-1 text-sm font-medium leading-5">{review}</div>
        {/* userImage + name */}
        <div className="mt-6 flex items-center space-x-2">
          <div className="flex flex-shrink-0 rounded-full border border-gray-200">
            <img
              src={userImage}
              alt="userImage"
              className="w-8 h-8 object-cover rounded-full"
            />
          </div>
          <span className="text-sm font-semibold leading-5 text-gray-500">
            {userName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductRating;
