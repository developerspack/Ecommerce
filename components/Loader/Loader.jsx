import { CirclesWithBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed w-full space-y-2 h-screen z-50 bg-dark flex flex-col items-center justify-center">
      <div className="mt-6 rounded-lg mb-24 md:mb-12 flex">
        <div className="flex items-center justify-center gap-3">
          <CirclesWithBar
            height={70}
            width={70}
            visible={true}
            ariaLabel="circles-with-bar-loading"
          />
          <h2 className="text-center text-xl font-semibold">Loading...</h2>
        </div>
      </div>
      <p className="w-1/3 text-center hidden lg:block">
        This May Take a few seconds. Please don't close this page.
      </p>
    </div>
  );
};

export default Loader;
