import { useState } from "react";
import { ImMail3 } from "react-icons/im";
import { RiLock2Fill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { CirclesWithBar } from "react-loader-spinner";
import { BsBoxArrowUpRight } from "react-icons/bs";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { auth, db } from "@/utils/firebase";
import { SET_ACTIVE_USER } from "@/Redux/slice/authSlice";

const Login = ({ setActiveComponent, close }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // REDUX DISPATCH FN
  const dispatch = useDispatch();

  // login with google
  const provider = new GoogleAuthProvider();
  const SignInWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // redux UserState
        dispatch(
          SET_ACTIVE_USER({
            userName: result.user.displayName,
            userEmail: result.user.email,
            userImageUrl: result.user.photoURL,
            userID: result.user.uid,
          })
        );
        const GetUser = async () => {
          const DocRef = doc(db, "users", result.user.uid);
          const DocSnap = await getDoc(DocRef);
          if (!DocSnap.exists()) {
            setDoc(doc(db, "users", result.user.uid), {
              email: result.user.email,
              userImageUrl: result.user.photoURL,
              userStatus: "User",
              timeStamp: serverTimestamp(),
            });
            setIsLoading(false);
          }
        };
        GetUser();
        setIsLoading(false);
        toast.success("Login Successful");
        close(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // login user using email password
  const LoginUser = (e) => {
    e.preventDefault();
    setFormIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const GetUser = async () => {
          const DocRef = doc(db, "users", user.uid);
          const DocSnap = await getDoc(DocRef);
          // bensonraro@gmail.com
          const UserNameSlice = user.email.slice(0, -10);
          const UserName =
            UserNameSlice.charAt(0).toUpperCase() + UserNameSlice.slice(1);
          if (DocSnap.exists()) {
            const UserInfo = { ...DocSnap.data() };
            // redux store => auth state
            dispatch(
              SET_ACTIVE_USER({
                userName: UserName,
                userEmail: user.email,
                userImageUrl: UserInfo.userImageUrl,
                userID: user.uid,
              })
            );
            setFormIsLoading(false);
          } else {
            console.log("Doc Not Found");
          }
        };
        GetUser();
        setFormIsLoading(false);
        toast.success("Login Successful");
        close(false);
      })
      .catch((error) => {
        setFormIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center mx-auto text-white">
      <div className="w-full rounded-lg">
        <div className="p-2 space-y-2">
          {/* form */}
          <form onSubmit={LoginUser} className="space-y-3">
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
            {/* password */}
            <div>
              <label className="text-xl block font-semibold">Password</label>
              <div className="relative">
                <input
                  className="input"
                  placeholder="Your Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute right-4 top-4">
                  <RiLock2Fill className="fill-current h-6 w-6 text-black" />
                </span>
              </div>
            </div>
            {/* forgot password */}
            <div className="float-right items-center">
              <p
                className="text-lg cursor-pointer hover:text-primary font-medium hover:underline"
                onClick={() => setActiveComponent(3)}
              >
                Forgot Passoword?
              </p>
            </div>
            {/* create btn */}
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
                  Signing you in .....
                </>
              ) : (
                <>Login</>
              )}
            </button>
            {/* or line */}
            <div
              className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t
          before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:bg-neutral-300
          "
            >
              <p className="mx-4 mb-0 text-center font-semibold">Or</p>
            </div>
          </form>
          {/* google btn */}
          <button
            className="w-full bg-[#4a89ee] text-black rounded-lg hover:bg-blue-600
          text-xl font-semibold px-5 py-2.5 inline-flex items-center justify-center gap-3
          disabled:bg-blue-400 disabled:cursor-wait"
            disabled={isLoading}
            onClick={SignInWithGoogle}
          >
            {isLoading ? (
              <>
                <CirclesWithBar
                  height={"30"}
                  width={"30"}
                  color="#000"
                  visible={true}
                  ariaLabel="circles-with-bar-loading"
                />
                Signing you in .....
              </>
            ) : (
              <>
                <FcGoogle className="h-8 w-8" />
                Sign in With Google
              </>
            )}
          </button>
          {/* login link */}
          <p className="space-x-1 flex items-center mt-1">
            <span className="font-medium text-lg">Sign Up Here!</span>
            <span
              className="hover:text-primary cursor-pointer"
              onClick={() => setActiveComponent(2)}
            >
              <BsBoxArrowUpRight className="h-4 w-4" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
