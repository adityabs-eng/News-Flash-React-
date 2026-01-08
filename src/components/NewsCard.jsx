const NewsCard = ({ article }) => {
  return (
    <div
      onClick={() => window.open(article.link, "_blank")}
      className="w-full sm:w-[300px] md:w-[340px] bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fadeUp"
    >
      <img
        src={article.image_url}
        alt="news"
        onError={(e) => {
        e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
    }}
  className="h-44 w-full object-cover rounded-t-xl"
/>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
          {article.description || "No description available"}
        </p>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {article.source_id}
        </span>
      </div>
    </div>
  );
};

export default NewsCard;
