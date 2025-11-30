import { News } from "../../api/news";
import { Calendar } from "lucide-react";
import { categories } from "../../const/newsCategory";

interface ChildProps {
  news: News;
  key: number;
  onCardClick: (id: number) => void;
}

export function NewsCard({ news, key, onCardClick }: ChildProps) {
  return (
    <article
      key={key}
      className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={() => onCardClick(news.id)}
    >
      <div className="relative overflow-hidden">
        <img
          src={news.thumbnailPath}
          alt={news.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
      <div className="p-6 bg-white">
        <div className="flex items-center gap-3 text-sm mb-3">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {news.date}
          </div>
          <span
            className={`px-2 py-1 rounded text-xs font-medium border-2 ${
              Number(news.category) === 2
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : Number(news.category) === 1
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : Number(news.category) === 3
                ? "bg-green-50 text-green-700 border-green-200"
                : Number(news.category) === 4
                ? "bg-gray-50 text-gray-700 border-gray-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >
            {categories[Number(news.category)].name}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {news.title}
        </h3>
        <button
          className="mt-4 text-[#213a37] font-medium text-sm hover:underline transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onCardClick(news.id);
          }}
        >
          続きを読む →
        </button>
      </div>
    </article>
  );
}
