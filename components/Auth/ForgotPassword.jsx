import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaKey } from "react-icons/fa";
import { ImMail3 } from "react-icons/im";
import { CirclesWithBar } from "react-loader-spinner";
import { toast } from "react-toastify";

import { auth } from "@/utils/firebase";
const ForgotPassword = ({ setActiveComponent }) => {
  const [email, setEmail] = useState("");
  const [formIsLoading, setFormIsLoading] = useState(false);

  const ResetPassword = (e) => {
    setFormIsLoading(true);
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setFormIsLoading(false);
        setActiveComponent(1);
        toast.success("Check your email for the reset link");
      })
      .catch((error) => {
        setFormIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="max-w-lg mx-auto my-1 text-white p-4 rounded-xl">
      <h1 className="text-4xl font-medium text-primary">Reset Password</h1>
      <p className="text-gray-400">Fill up the form to reset the password</p>
      <form className="my-6" onSubmit={ResetPassword}>
        <div className="flex flex-col space-y-5">
          {/* email */}
          <div>
            <label className="text-xl block font-semibold">Your Email</label>
            <div className="relative">
              <input
                className="input"
                type="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute right-4 top-4">
                <ImMail3 className="fill-current h-6 w-6 text-black" />
              </span>
            </div>
          </div>
          {/* btn */}
          <button
            className="w-full bg-primary text-black rounded-lg hover:bg-green-400
          text-xl font-semibold px-5 py-2.5 inline-flex items-center justify-center gap-3
          disabled:bg-green-300 disabled:cursor-wait"
            disabled={formIsLoading}
          >
            {formIsLoading ? (
              <>
                <CirclesWithBar
                  height={"30"}
                  width={"30"}
                  color="#000"
                  visible={true}
                  ariaLabel="circles-with-bar-loading"
                />
                Sending you an email .....
              </>
            ) : (
              <>
                <FaKey className="h-6 w-6" />
                Reset Password
              </>
            )}
          </button>
          <p className="text-center text-lg font-semibold">
            Not Registered yet?
            <div
              className="
            text-primary cursor-pointer font-medium hover:underline inline-flex 
            space-x-1 items-center
              "
            >
              <span onClick={() => setActiveComponent(2)}>Register now!</span>
              <span>
                <BsBoxArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
