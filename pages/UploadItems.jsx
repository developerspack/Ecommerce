import UploadBanner from "@/components/upload/UploadBanner";
import UploadBrand from "@/components/upload/UploadBrand";
import UploadCategory from "@/components/upload/UploadCategory";
import UploadProducts from "@/components/upload/UploadProducts";
import UploadReviews from "@/components/upload/UploadReviews";

const UploadItems = () => {
  return (
    <div className="space-x-2">
      <h1 className="text-white font-extrabold text-2xl">
        Uplaod All the Required Items To firebase(Firestore)
      </h1>
      <div className="flex">
        <UploadBanner />
        <UploadBrand />
        <UploadCategory />
        <UploadProducts />
        <UploadReviews />
      </div>
    </div>
  );
};

export default UploadItems;
