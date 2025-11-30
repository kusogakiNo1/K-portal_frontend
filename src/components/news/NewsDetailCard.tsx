import { categories } from "../../const/newsCategory";
import { NewsDetail } from "../../api/news";
import { Tag } from "lucide-react";

interface ChildProps {
  newsDetail: NewsDetail;
}

export function NewsDetailCard({ newsDetail }: ChildProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
      {/* カテゴリーと日付情報 */}
      <div className="flex items-center justify-center gap-6 text-sm mb-8">
        <div className="flex items-center text-gray-600">
          <Tag className="w-4 h-4 mr-2" />
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${
              newsDetail.category === "event"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : newsDetail.category === "announcement"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >
            {categories[Number(newsDetail.category)].name}
          </span>
        </div>
        <div className="text-right opacity-90">
          <div className="text-sm">{newsDetail.date}</div>
        </div>
      </div>

      {/* 詳細情報セクション */}
      <div className="space-y-8">
        {/* 詳細内容 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {newsDetail.detail}
            </div>
          </div>
        </div>

        {/* 画像 */}
        {newsDetail.thumbnailPath && (
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={newsDetail.thumbnailPath}
              alt={newsDetail.title}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
