const LoadMore = ({ onClick }) => {
  return (
    <div className="text-center my-12">
      <button
        onClick={onClick}
        className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 active:scale-95 transition shadow-lg"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMore;
