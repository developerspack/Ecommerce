import { useRef, useState } from "react";
import { ImMail3 } from "react-icons/im";
import { RiLock2Fill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { CirclesWithBar } from "react-loader-spinner";
import { BsBoxArrowUpRight } from "react-icons/bs";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useDispatch } from "react-redux";

import { auth, db, storage } from "@/utils/firebase";

const SignUp = ({ setActiveComponent, close }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [file, setFile] = useState("");
  const [fileType, setFileType] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const FilePickerRef = useRef(null);

  // redux dispatch fn
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
  // handle sign password and email
  const HandleSignIn = async (e) => {
    setFormIsLoading(true);
    e.preventDefault();
    if (fileType === false) {
      toast.error("Wrong Type of Image. Please Try Again");
      setFormIsLoading(false);
    } else if (password !== confirmPassword) {
      toast.error("Passwords don not match. Please Try Again");
      setFormIsLoading(false);
    } else {
      try {
        const signup = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", signup.user.uid), {
          email: signup.user.email,
          userStatus: "User",
          timeStamp: serverTimestamp(),
        });
        const imageRef = ref(storage, `userImage/${signup.user.uid}`);
        if (file) {
          await uploadString(imageRef, file, "data_url").then(async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "users", signup.user.uid), {
              userImageUrl: downloadURL,
            });
          });
        }
        setFormIsLoading(false);
        setActiveComponent(1);
        toast.success("Sign Up Successful");
      } catch (error) {
        toast.error(error.message);
        setFormIsLoading(false);
      }
    }
  };

  // add image
  const AddUserImage = (e) => {
    const selectedFile = e.target.files[0];

    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/jpg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/tiff"
    ) {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        setFile(readerEvent.target.result);
      };
    } else {
      setFileType(false);
    }
  };
  // "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
  return (
    <div className="flex flex-col items-center justify-center mx-auto text-white">
      <div className="w-full rounded-lg">
        <div className="p-2 space-y-2">
          {/* form */}
          <form onSubmit={HandleSignIn} className="space-y-3">
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
            {/* confirm password */}
            <div>
              <label className="text-xl block font-semibold">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="input"
                  placeholder="Confirm Your Password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="absolute right-4 top-4">
                  <RiLock2Fill className="fill-current h-6 w-6 text-black" />
                </span>
              </div>
            </div>
            {/* image */}
            <div className="flex justify-between">
              <span>
                <label className="block text-xl font-semibold">
                  Choose Your Image
                </label>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2
                  file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50
                  file:text-black hover:file:bg-blue-100"
                  ref={FilePickerRef}
                  onChange={AddUserImage}
                  required
                />
              </span>
              <img
                src={
                  file
                    ? file
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                className="rounded-lg h-12 w-12 mt-6"
                alt=""
              />
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
                <>Create Account</>
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
            <span className="font-medium text-lg">Login Here!</span>
            <span
              className="hover:text-primary cursor-pointer"
              onClick={() => setActiveComponent(1)}
            >
              <BsBoxArrowUpRight className="h-4 w-4" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
