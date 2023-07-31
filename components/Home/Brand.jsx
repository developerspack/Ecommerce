import Marquee from "react-fast-marquee";
import Image from "next/image";

import FetchCollection from "@/Hooks/FetchCollection";

const Brand = () => {
  const { data: brand } = FetchCollection("brand");
  return (
    <div className="-mt-40 lg:-mt-80">
      <div className="container">
        <Marquee speed={35} gradient={false} direction="left">
          <div className="flex space-x-3">
            {brand.map((item) => (
              <Image
                src={item.imageUrl}
                key={item.id}
                width={500}
                height={500}
                className="h-[60px] lg:h-[100px] w-full rounded-[200px]"
              />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Brand;
