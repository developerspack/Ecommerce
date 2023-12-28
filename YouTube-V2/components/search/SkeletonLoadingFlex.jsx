const SkeletonLoadingFlex = () => {
  return (
    <div className="flex space-x-3 w-[80%]">
      <div className="h-24 relative mb-3 dark:bg-loadingDark bg-loadingLight rounded-xl w-[200px]"></div>
      <div className="flex gap-3">
        <div className="h-14 w-14 rounded-full dark:bg-loadingDark bg-loadingLight hidden"></div>
        <div className="gap-2 mt-2">
          <div className="h-5 w-[18%] absolute mb-3 dark:bg-loadingDark bg-loadingLight rounded-md"></div>
          <div className="h-5 w-[12%] absolute mt-6 dark:bg-loadingDark bg-loadingLight  rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingFlex;
