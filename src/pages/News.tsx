import { PageTitle } from "../components/PageTitle";
import { BackgroudColor } from "../components/BackgroudColor";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNews, getNewsAPIResponse } from "../api/news";
import { NewsCard } from "../components/news/NewsCard";
import { Pagination } from "../components/Pagination";
import { categories } from "../const/newsCategory";
import { CategorySelect } from "../components/CategorySelect";

export interface NewsCard {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: number;
  thumbnailPath: string;
  featured?: boolean;
}

// １ページに表示させるお知らせ件数
const ITEMS_PER_PAGE = 9;

const NewsPage = () => {
  // お知らせ情報
  const [newsList, setNewsList] = useState<getNewsAPIResponse>({
    totalcount: 0,
    count: 0,
    news: [],
  });
  // 選択中のカテゴリー
  const [selectedCategory, setSelectedCategory] = useState(0);
  // 現在のページ番号 (1始まり)
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // コンポーネントマウント時に自動実行される処理
  useEffect(() => {
    // ページタイトルを動的に設定する
    document.title = "お知らせ情報";
    // お知らせ情報取得
    // 初回表示時は、limit指定してページネーション用のデータを取得
    fetchNews(undefined, ITEMS_PER_PAGE, 0);
  }, []);

  // お知らせ情報取得APIを実行するための関数
  const fetchNews = async (
    category?: number,
    limit?: number,
    offset?: number
  ) => {
    try {
      const allNews = await getNews(category, limit, offset);
      setNewsList(allNews);
    } catch (err) {
      setNewsList({
        totalcount: 0,
        count: 0,
        news: [],
      });
    }
  };

  // 総ページ数
  const totalPages = Math.ceil(newsList.totalcount / ITEMS_PER_PAGE);

  // カテゴリー変更時の処理
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // カテゴリー変更時は1ページ目に戻る
    // カテゴリーIDを指定してAPIを呼び出す（offset=0で1ページ目から）
    fetchNews(categoryId === 0 ? undefined : categoryId, ITEMS_PER_PAGE, 0);
  };

  // ページ変更時の処理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ページ変更時は上にスクロール
    window.scrollTo({ top: 0, behavior: "smooth" });
    // ページネーションでAPIを呼び出す
    const offset = (page - 1) * ITEMS_PER_PAGE;
    fetchNews(
      selectedCategory === 0 ? undefined : selectedCategory,
      ITEMS_PER_PAGE,
      offset
    );
  };

  const handleNewsCardClick = (articleId: number) => {
    navigate(`/news/${articleId}`);
  };

  // ページネーション用のページ番号配列を生成
  const getPageNumbers = (): (number | string)[] => {
    const maxVisiblePages = 5;

    // 総ページ数が少ない場合はすべて表示
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 前半: 1〜3ページ目
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    // 後半: 最後から2ページ以内
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // 中間: 現在のページ ± 1
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 対角線背景レイヤー */}
      <BackgroudColor color="#c0c0c0"></BackgroudColor>
      {/* ヘッダー */}
      <PageTitle
        title="お知らせ情報"
        color="#a9a9a9"
        accentColor="#696969"
      ></PageTitle>

      {/* カテゴリータブ */}
      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />

      {/* ニュース記事一覧 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {newsList.news.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsList.news.map((news) => (
                <NewsCard
                  news={news}
                  key={news.id}
                  onCardClick={handleNewsCardClick}
                ></NewsCard>
              ))}
            </div>

            {/* ページネーション */}
            {totalPages > 0 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                getPageNumbers={getPageNumbers}
              ></Pagination>
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
