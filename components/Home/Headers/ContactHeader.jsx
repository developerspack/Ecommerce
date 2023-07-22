import Link from "next/link";

const ContactHeader = () => {
  return (
    <div className="hidden lg:block p-2 bg-[#181823]">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <ul className="flex items-center gap-4 text-gray-300 font-semibold text-base">
              <li>developerspack@gmail.com</li>
              <li>+2547088**222</li>
            </ul>
          </div>
          <div>
            <ul className="flex items-center gap-4 text-gray-300 font-semibold text-base">
              <li className="hover:text-primary cursor-pointer">
                <Link href="/MyOrders">My Orders</Link>
              </li>
              <li>My Account</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
