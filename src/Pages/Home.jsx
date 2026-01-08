import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import LoadMore from "../components/LoadMore";
import SkeletonCard from "../components/SkeletonCard";

const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;
const BASE_URL = "https://newsdata.io/api/1/latest";
const PAGE_SIZE = 9;

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("india");
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("india");

  // store unique article links OUTSIDE render logic
  const [seenLinks, setSeenLinks] = useState(new Set());

  const fetchNews = async (reset = false) => {
    if (loading) return;

    setLoading(true);

    let url = `${BASE_URL}?apikey=${API_KEY}&q=${query}&language=en`;
    if (!reset && nextPage) {
      url += `&page=${nextPage}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.results) {
        setLoading(false);
        return;
      }

      const newArticles = [];
      const updatedLinks = reset ? new Set() : new Set(seenLinks);

      for (let article of data.results) {
        if (
          article.link &&
          !updatedLinks.has(article.link) &&
          newArticles.length < PAGE_SIZE
        ) {
          updatedLinks.add(article.link);
          newArticles.push(article);
        }
      }

      setArticles((prev) =>
        reset ? newArticles : [...prev, ...newArticles]
      );
      setSeenLinks(updatedLinks);
      setNextPage(data.nextPage || null);
    } catch (error) {
      console.error("Failed to fetch news", error);
    }

    setLoading(false);
  };

  // when query/category changes → reset everything
  useEffect(() => {
    setArticles([]);
    setSeenLinks(new Set());
    setNextPage(null);
    fetchNews(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={(cat) => {
          setActiveCategory(cat);
          setQuery(cat);
        }}
        onSearch={(text) => {
          setActiveCategory("");
          setQuery(text);
        }}
      />

      {/* News Cards */}
      <div className="pt-36 max-w-7xl mx-auto px-4 flex flex-wrap gap-6 justify-center">
        {articles.map((article) => (
          <NewsCard key={article.link} article={article} />
        ))}

        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
      </div>

      {/* Load More */}
      {nextPage && !loading && (
        <div className="pb-10">
          <LoadMore onClick={() => fetchNews(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;
