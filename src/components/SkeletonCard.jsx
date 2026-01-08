const SkeletonCard = () => {
  return (
    <div className="w-full sm:w-[300px] md:w-[340px] bg-white dark:bg-gray-800 rounded-xl shadow animate-pulse">
      <div className="h-44 bg-gray-300 dark:bg-gray-700 rounded-t-xl"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
