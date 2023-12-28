const SkeletonLoading = () => {
  return (
    <div className="pb-3">
      <div className="h-52 w-[90%] relative mb-3 dark:bg-loadingDark bg-loadingLight rounded-xl"></div>
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full dark:bg-loadingDark bg-loadingLight"></div>
        <div className="gap-2">
          <div className="h-5 2xl:w-[13%] xl:w-[10%] lg:w-[17%] md:w-[22.5%] w-[36.5%] absolute mb-3 dark:bg-loadingDark bg-loadingLight rounded-md"></div>
          <div className="h-5 2xl:w-[8%] xl:w-[8%] lg:w-[13%]  md:w-[18%] w-[31%] absolute mt-6 dark:bg-loadingDark bg-loadingLight  rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
