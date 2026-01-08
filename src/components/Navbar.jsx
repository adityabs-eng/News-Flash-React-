import { useTheme } from "../context/ThemeContext";

const categories = ["finance", "politics", "entertainment", "technology"];

const Navbar = ({ onCategoryChange, onSearch, activeCategory }) => {
  const { dark, setDark } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        {/* Logo */}
        <div className="flex items-center justify-between">
              <img
                src="/logo.svg"
                alt="News Flash"
                className={`
                  h-14 md:h-14 lg:h-16
                  cursor-pointer
                  transition-transform duration-300
                  hover:scale-105
                  ${dark ? "invert brightness-200" : ""}
                `}
                onClick={() => onCategoryChange("india")}
              />
              
          {/* Dark mode toggle (mobile) */}
          <button
            onClick={() => setDark(!dark)}
            className="
              md:hidden px-3 py-1 rounded-full
              bg-gray-200 dark:bg-gray-700
              text-gray-900 dark:text-white
              transition
            "
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Categories */}
        <ul className="flex gap-3 flex-wrap justify-center text-sm">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`
                cursor-pointer capitalize px-4 py-1 rounded-full
                transition-all duration-300 font-bold
                ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                }
              `}
            >
              {cat}
            </li>
          ))}
        </ul>

        {/* Search + Dark toggle (desktop) */}
        <div className="flex gap-3 items-center justify-center">
          <input
            type="text"
            placeholder="Search news..."
            className="
              px-4 py-2 rounded-lg
              outline-none
              transition-all duration-300
              border-2 border-gray-400 p-2  focus:border-gray-900 focus:outline-none
              focus:ring-2 focus:ring-blue-500 focus:shadow-lg
              dark:bg-gray-800 dark:text-white dark:border-gray-700
            "
            onKeyDown={(e) =>
              e.key === "Enter" && onSearch(e.target.value)
            }
          />

          <button
            onClick={() => setDark(!dark)}
            className="
              hidden md:block px-3 py-1 rounded-full
              bg-gray-200 dark:bg-gray-700
              text-gray-900 dark:text-white
              transition
            "
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
