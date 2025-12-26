// src/pages/Home.tsx
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { getNews, News } from "../api/news";
import { getAllMembers, getAllMembersAPIResponse } from "../api/member";
import { categories } from "../const/newsCategory";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [members, setMembers] = useState<getAllMembersAPIResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "ホーム - K-Portal";

    // データ取得
    const fetchData = async () => {
      try {
        setLoading(true);
        // 最新のニュースを4件取得
        const newsResponse = await getNews(undefined, 4, 0);
        setLatestNews(newsResponse.news);

        // 全メンバーを取得
        const membersResponse = await getAllMembers();
        setMembers(membersResponse);
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション + CTAセクション */}
      <section className="relative">
        <img
          src="/images/home/ajito_securebase.png"
          alt="K-Portal"
          className="w-full h-[400px] md:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

        {/* CTAセクション（ヒーローの上に重ねて表示） */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              K-Portalへようこそ
            </h2>
            <p className="text-white text-lg md:text-xl mb-8 drop-shadow-md">
              最新の情報とメンバーの活動をチェックしよう
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center"></div>
          </div>
        </div>
      </section>

      {/* お知らせ情報セクション */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              最新情報
            </h2>
            <p className="text-gray-600">Latest News</p>
          </div>
          <button
            onClick={() => navigate("/news")}
            className="group flex items-center gap-2 px-6 py-3 bg-[#213a37] text-white rounded-lg hover:bg-[#2d514c] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            もっと見る
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-xl" />
                <div className="bg-white p-6 rounded-b-xl">
                  <div className="h-4 bg-gray-200 rounded mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((news) => (
              <article
                key={news.id}
                className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={news.thumbnailPath}
                    alt={news.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                      Number(news.category) === 2
                        ? "bg-purple-500 text-white"
                        : Number(news.category) === 1
                        ? "bg-blue-500 text-white"
                        : Number(news.category) === 3
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {categories[Number(news.category)].name}
                  </span>
                </div>
                <div className="p-5 bg-white">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    {news.date}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-[#213a37] transition-colors">
                    {news.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* メンバー紹介セクション */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                メンバー紹介
              </h2>
              <p className="text-gray-600">Meet Our Members</p>
            </div>
            <button
              onClick={() => navigate("/members")}
              className="group flex items-center gap-2 px-6 py-3 bg-[#213a37] text-white rounded-lg hover:bg-[#2d514c] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              もっと見る
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-xl" />
                  <div className="mt-3 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="group cursor-pointer"
                  onClick={() => navigate("/members")}
                >
                  <div
                    className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    style={{
                      backgroundColor: member.color,
                    }}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={member.imagePath}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-lg mb-1">
                          {member.name}
                        </h3>
                        <p className="text-white/90 text-xs line-clamp-2">
                          {member.catchCopy}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
