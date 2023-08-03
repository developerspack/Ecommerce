import { SocialIcon } from "react-social-icons";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="bg-[#474949] mb-8 lg:mb-0 p-10 mt-4">
      <div className="flex flex-col items-center">
        {/* img logo */}
        <div className="mb-5">
          <img src="/logo.png" alt="logo" className="h-16 w-18" />
        </div>
        {/* social icons */}
        <div>
          <ul className="flex items-center justify-center">
            <li className="hover:-rotate-180">
              <SocialIcon url="https://github.com/" />
            </li>
            <li className="hover:-rotate-180">
              <SocialIcon url="https://twitter.com/" />
            </li>
            <li className="hover:-rotate-180">
              <SocialIcon url="https://discord.com/" />
            </li>
            <li className="hover:-rotate-180">
              <SocialIcon url="https://facebook.com/" />
            </li>
            <li className="hover:-rotate-180">
              <SocialIcon url="https://youtube.com/" />
            </li>
          </ul>
        </div>
        {/* cp */}
        <div className="flex mt-4 text-center items-center justify-center">
          CopyRight {year} C .DPShop. All Right Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
