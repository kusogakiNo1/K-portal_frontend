// src/pages/About.tsx
import React from "react";
import { PageTitle } from "../components/PageTitle";
import { BackgroudColor } from "../components/BackgroudColor";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: "news" | "announcement" | "event";
  image: string;
  featured?: boolean;
}

const newsData: NewsArticle[] = [
  {
    id: 1,
    title: "プロジェクト新バージョン2.1リリースのお知らせ",
    summary:
      "新機能の追加とパフォーマンス向上を含む大型アップデートを実施いたします。",
    content: "詳細な内容については公式ドキュメントをご確認ください。",
    date: "2025-01-27",
    category: "announcement",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "オンラインイベント開催決定",
    summary:
      "ユーザー交流イベントを来月開催いたします。参加者には特典もご用意しております。",
    content: "イベント詳細は後日発表予定です。",
    date: "2025-01-26",
    category: "event",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop",
    featured: true,
  },
  {
    id: 3,
    title: "メンテナンス完了のお知らせ",
    summary: "定期メンテナンスが予定通り完了いたしました。",
    content: "サービスが正常に復旧しております。",
    date: "2025-01-25",
    category: "news",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop",
  },
  {
    id: 4,
    title: "ユーザーアンケート実施中",
    summary: "サービス向上のためのアンケートにご協力ください。",
    content: "アンケート期間は今月末まで。",
    date: "2025-01-24",
    category: "announcement",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=300&fit=crop",
  },
  {
    id: 5,
    title: "新機能β版テスト開始",
    summary: "限定ユーザー向けに新機能のβ版テストを開始いたします。",
    content: "テスト参加者は事前登録が必要です。",
    date: "2025-01-23",
    category: "news",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=300&fit=crop",
  },
  {
    id: 6,
    title: "システム障害復旧報告",
    summary: "昨日発生したシステム障害について復旧完了をお知らせいたします。",
    content: "ご迷惑をおかけして申し訳ございませんでした。",
    date: "2025-01-22",
    category: "announcement",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=300&fit=crop",
  },
  {
    id: 7,
    title: "週末メンテナンスのお知らせ",
    summary: "来週末にシステムメンテナンスを実施予定です。",
    content: "メンテナンス時間中はサービスがご利用いただけません。",
    date: "2025-01-21",
    category: "announcement",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop",
  },
  {
    id: 8,
    title: "新コンテンツ追加発表",
    summary: "来月より新しいコンテンツを順次追加予定です。",
    content: "詳細は続報をお待ちください。",
    date: "2025-01-20",
    category: "news",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop",
  },
  {
    id: 9,
    title: "プライバシーポリシー更新",
    summary: "プライバシーポリシーの一部を更新いたしました。",
    content: "変更内容をご確認ください。",
    date: "2025-01-19",
    category: "announcement",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=300&fit=crop",
  },
  {
    id: 10,
    title: "ユーザー感謝キャンペーン開始",
    summary: "日頃のご愛顧に感謝して、特別キャンペーンを開催します。",
    content: "キャンペーン期間は今月末まで。",
    date: "2025-01-18",
    category: "event",
    image:
      "https://images.unsplash.com/photo-1573495627169-b17b7c3f4c7d?w=600&h=300&fit=crop",
  },
];

const categories = [
  { id: "all", name: "最新", filter: () => true },
  {
    id: "news",
    name: "ニュース",
    filter: (article: NewsArticle) => article.category === "news",
  },
  {
    id: "announcement",
    name: "お知らせ",
    filter: (article: NewsArticle) => article.category === "announcement",
  },
  {
    id: "event",
    name: "イベント",
    filter: (article: NewsArticle) => article.category === "event",
  },
];

const categoryLabels = {
  news: "ニュース",
  announcement: "お知らせ",
  event: "イベント",
};

const ITEMS_PER_PAGE = 6;

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const featuredNews = newsData.filter((article) => article.featured);
  const filteredNews = newsData.filter(
    categories.find((cat) => cat.id === selectedCategory)?.filter ||
      (() => true)
  );

  // コンポーネントマウント時の自動実行
  useEffect(() => {
    // ページタイトルを動的に設定する
    document.title = "ニュース情報";
  }, []);

  // ページング計算
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentNews = filteredNews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredNews.length) % featuredNews.length
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // カテゴリー変更時は1ページ目に戻る
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ページ変更時は上にスクロール
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsCardClick = (articleId: number) => {
    navigate(`/news/${articleId}`);
  };

  const handleSlideClick = (articleId: number) => {
    navigate(`/news/${articleId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // ページネーション用のページ番号配列を生成
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 対角線背景レイヤー */}
      <BackgroudColor color="#c0c0c0"></BackgroudColor>
      {/* ヘッダー */}
      <PageTitle
        title="ニュース情報"
        color="#a9a9a9"
        accentColor="#696969"
      ></PageTitle>
      {/* メインニュースのスライダー(スマホ画面では非表示)*/}
      {featuredNews.length > 0 && (
        <div className="relative z-10 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredNews.map((article) => (
                    <div key={article.id} className="min-w-full bg-white">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="relative h-64 md:h-80 group cursor-pointer">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </div>
                        <div className="p-6 flex flex-col justify-center bg-white">
                          <div className="flex items-center gap-4 text-sm mb-2">
                            <div className="flex items-center text-gray-500">
                              <Calendar className="w-4 h-4 mr-2" />
                              {formatDate(article.date)}
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full font-medium border ${
                                article.category === "event"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : article.category === "announcement"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                              }`}
                            >
                              {categoryLabels[article.category]}
                            </span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            {article.title}
                          </h2>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {article.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* スライダーコントロール */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>

              {/* ドット表示 */}
              <div className="flex justify-center space-x-2 mt-6">
                {featuredNews.map((_, index) => (
                  <button
                    key={`slide-${index}`}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-[#213a37]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* カテゴリータブ */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center">
            <div className="flex rounded-lg bg-white shadow-sm border overflow-hidden">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-3 font-medium text-sm transition-all duration-200 relative ${
                    selectedCategory === category.id
                      ? "bg-[#213a37] text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } ${
                    index !== categories.length - 1
                      ? "border-r border-gray-200"
                      : ""
                  }`}
                >
                  {category.name}
                  {selectedCategory === category.id && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 ${
                        category.id === "event"
                          ? "bg-purple-400"
                          : category.id === "announcement"
                          ? "bg-blue-400"
                          : category.id === "news"
                          ? "bg-green-400"
                          : "bg-gray-400"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* ニュース記事一覧 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {currentNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentNews.map((article) => (
                <article
                  key={article.id}
                  className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleNewsCardClick(article.id)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center gap-3 text-sm mb-3">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(article.date)}
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium border-2 ${
                          article.category === "event"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : article.category === "announcement"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }`}
                      >
                        {categoryLabels[article.category]}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                    <button
                      className="mt-4 text-[#213a37] font-medium text-sm hover:underline transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNewsCardClick(article.id);
                      }}
                    >
                      続きを読む →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex space-x-1">
                  {getPageNumbers().map((pageNum, index) => (
                    <div key={index}>
                      {pageNum === "..." ? (
                        <span className="px-4 py-2 text-gray-500">...</span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(pageNum as number)}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                            pageNum === currentPage
                              ? "bg-[#213a37] text-white"
                              : "border border-gray-300 text-gray-600 hover:bg-green-50 bg-white"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              該当する記事が見つかりません。
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
