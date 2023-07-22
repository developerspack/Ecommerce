import { db } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { jsonIBrand } from "./json/brands";

const UploadBrand = () => {
  // console.log(jsonIBrand);
  const [isLoading, setIsLoading] = useState(false);
  const uploadItems = () => {
    try {
      setIsLoading(true);
      for (const brand of jsonIBrand) {
        addDoc(collection(db, "brand"), {
          ...brand,
        });
      }
      console.log("Successfully Uploaded");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  return (
    <button
      onClick={uploadItems}
      className="text-black rounded-lg text-xl font-semibold bg-primary px-5 py-2.5 text-center inline-flex
   items-center justify-center gap-3 mr-2 mb-2 disabled:bg-blue-300 disabled:cursor-wait"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <CirclesWithBar
            height="30"
            width="30"
            color="#000000"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
          Creating Brand...
        </>
      ) : (
        <>Uplaod Brands</>
      )}
    </button>
  );
};

export default UploadBrand;
