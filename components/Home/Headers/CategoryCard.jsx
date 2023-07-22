import Image from "next/image";

const CategoryCard = ({ Category, imageUrl }) => {
  return (
    <>
      <div className="py-1 px-3.5">
        <Image
          src={imageUrl}
          height={500}
          width={500}
          className="h-10 w-10 rounded-full"
        />
      </div>
      <p className="text-lg">{Category}</p>
      <div className="items-center ml-auto pr-6 text-lg">10</div>
    </>
  );
};

export default CategoryCard;
