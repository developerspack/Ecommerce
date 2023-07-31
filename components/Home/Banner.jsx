import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = ({ imageUrl, FirstLine, SecondLine }) => {
  return (
    <div className="object-cover rounded-lg">
      <div className="container">
        <div className="lg:ml-80">
          <div>
            <div className="object-cover">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="rounded-lg"
              >
                {imageUrl.map((image, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={image}
                      height={500}
                      width={500}
                      className="block w-full object-cover h-[350px] lg:h-[500px]"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="flex pr-3 pl-3 pb-3 lg:pb-[17%] lg:pl-[8%] relative justify-end
            z-10 -top-60 lg:-top-72 flex-col gap-2"
            >
              <h4
                className="font-semibold text-base w-fit p-2 text-white bg-dark 
              rounded-md"
              >
                New Fashion
              </h4>
              <h2 className="text-black">
                <span className="text-4xl lg:text-5xl">{FirstLine}</span>
                <br />
                <span className="text-3xl lg:text-4xl">{SecondLine}</span>
              </h2>
              <Link
                href={"/Shop"}
                className="bg-primary text-lg font-bold w-fit p-4 rounded-lg text-black"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
