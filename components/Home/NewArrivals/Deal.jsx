import Countdown from "react-countdown";

import FetchProductsReviews from "../../../Hooks/FetchProductsReviews";
import DealCard from "./DealCard";

const Deal = ({
  id,
  Name,
  Price,
  Discount,
  productNo,
  Category,
  Description,
  Brand,
  imageUrl,
  rating,
  reviewers,
  ExpiryTime,
}) => {
  // best rated product
  const { products } = FetchProductsReviews("products");
  // get maxrating
  const maxRating = products.reduce((max, product) => {
    return product.rating > max ? product.rating : max;
  }, -Infinity);
  const filteredProducts = products.filter(
    (product) => product.rating === maxRating
  );
  const slicedProduct = filteredProducts.slice(0, 1);

  // Renderer callback with condition
  const Renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <>
          {slicedProduct?.map((best) => (
            <div className="relative w-[370px] p-4 bg-cards rounded-xl  border border-gray-800">
              <p className="flex justify-center items-center uppercase mb-2 font-semibold text-xl">
                the best rated product
              </p>
              <DealCard {...best} key={best.id} />
            </div>
          ))}
        </>
      );
    } else {
      // Render a countdown
      return (
        <div className="relative w-[370px] p-4 bg-cards rounded-xl  border border-gray-800">
          <p className="flex justify-center items-center uppercase mb-4 font-semibold text-2xl">
            Offer Ends After:
          </p>
          <ul className="flex justify-center items-center gap-3 shadow-lg">
            {/* .countDownBox {
        @apply w-[34px] h-[34px] p-2 bg-primary rounded-lg text-black text-lg 
        font-semibold flex justify-center items-center;} */}
            <span className="countDownBox">{days}</span>:
            <span className="countDownBox">{hours}</span>:
            <span className="countDownBox">{minutes}</span>:
            <span className="countDownBox">{seconds}</span>
          </ul>
          <DealCard
            id={id}
            Name={Name}
            Price={Price}
            Discount={Discount}
            productNo={productNo}
            Category={Category}
            Description={Description}
            Brand={Brand}
            imageUrl={imageUrl}
            rating={rating}
            reviewers={reviewers}
          />
        </div>
      );
    }
  };
  return <Countdown date={ExpiryTime} renderer={Renderer} />;
};

export default Deal;
