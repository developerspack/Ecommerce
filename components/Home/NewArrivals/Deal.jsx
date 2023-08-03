import Countdown from "react-countdown";

import DealCard from "./DealCard";
import FetchProductsReviews from "@/Hooks/FetchProductsReviews";

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
  // filter based on maxRating
  const filteredProducts = products.filter(
    (product) => product.rating === maxRating
  );
  // slice
  const slicedProduct = filteredProducts.slice(0, 1);

  const Renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
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
      return (
        <div className="relative w-[370px] p-4 bg-cards rounded-xl  border border-gray-800">
          <p className="flex justify-center items-center uppercase mb-4 font-semibold text-2xl">
            Offer Ends After:
          </p>
          <ul className="flex justify-center items-center gap-3 shadow-lg">
            <span className="countdownBox">{days}</span>:
            <span className="countdownBox">{hours}</span>:
            <span className="countdownBox">{minutes}</span>:
            <span className="countdownBox">{seconds}</span>
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
