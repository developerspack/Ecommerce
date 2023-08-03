import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { ForgotPassword, Login, SignUp } from "..";

const Auth = ({ setAuthModal }) => {
  const [activeComponent, setActiveComponent] = useState(1);
  // handle toggle
  const HandleToggle = (componentIndex) => {
    setActiveComponent(componentIndex);
  };
  return (
    <div className="flex justify-center items-center">
      <div
        className="absolute max-w-[480px] w-full items-center justify-center rounded-lg
        top-4 lg:top-24 bg-dark p-8"
      >
        {/* close Icon */}
        <div className="float-right cursor-pointer -mt-3">
          <AiFillCloseCircle
            className="text-white hover:text-red-600 h-8 w-8"
            onClick={() => setAuthModal(false)}
          />
        </div>
        {/* header login signUp */}
        <header
          className={
            activeComponent === 3
              ? "hidden"
              : "text-white flex items-center justify-center gap-4 mb-4 space-x-2 font-extrabold text-3xl tracking-wider"
          }
        >
          {/* login */}
          <div
            className={
              activeComponent === 1
                ? "underline underline-offset-8 decoration-4 text-xl font-bold text-primary"
                : "text-xl font-bold cursor-pointer"
            }
            onClick={() => HandleToggle(1)}
          >
            Login
          </div>
          {/* SignUp */}
          <div
            className={
              activeComponent === 2
                ? "underline underline-offset-8 decoration-4 text-xl font-bold text-primary"
                : "text-xl font-bold cursor-pointer"
            }
            onClick={() => HandleToggle(2)}
          >
            Sign Up
          </div>
        </header>
        {/* component */}
        {/* login */}
        {activeComponent === 1 && (
          <Login setActiveComponent={setActiveComponent} close={setAuthModal} />
        )}
        {/* sign up */}
        {activeComponent === 2 && (
          <SignUp
            setActiveComponent={setActiveComponent}
            close={setAuthModal}
          />
        )}
        {/* forgot password */}
        {activeComponent === 3 && (
          <ForgotPassword
            setActiveComponent={setActiveComponent}
            close={setAuthModal}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
