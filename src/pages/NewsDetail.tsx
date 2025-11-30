import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { BackgroudColor } from "../components/BackgroudColor";
import { getNewsDetail } from "../api/news";
import { NewsDetail } from "../api/news";
import { PageTitle } from "../components/PageTitle";
import { NewsDetailCard } from "../components/news/NewsDetailCard";

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  // お知らせ詳細情報
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);

  // お知らせ詳細情報取得APIを実行するための関数
  const fetchNewsDetail = async (id: number) => {
    try {
      const newsDetail = await getNewsDetail(id);
      setNewsDetail(newsDetail);
    } catch (err) {
      console.error("お知らせ詳細情報取得エラー:", err);
    }
  };

  // コンポーネントマウント時に自動実行される処理
  useEffect(() => {
    if (id) {
      // お知らせ詳細情報取得
      fetchNewsDetail(Number(id));
    }
  }, [id]);

  // ページタイトルを動的に設定
  useEffect(() => {
    document.title = newsDetail?.title || "お知らせ詳細情報";
  }, [newsDetail?.title]);

  if (!newsDetail) {
    return <p></p>;
  } else {
    return (
      <div className="min-h-screen bg-gray-50 relative">
        {/* 対角線背景レイヤー */}
        <BackgroudColor color="#c0c0c0"></BackgroudColor>

        {/* ヘッダーセクション: 戻るボタンとタイトルを横並びに配置 */}
        <div className="pt-4 pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-center">
              {/* 左側: 戻るボタン */}
              <div className="absolute left-0">
                <Link
                  to="/news"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#213a37] text-white rounded-xl hover:bg-[#1a2e2b] transition-colors font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  戻る
                </Link>
              </div>
              {/* 中央: タイトル */}
              <div className="flex-1 flex justify-center">
                <PageTitle
                  title={newsDetail.title}
                  color="#a9a9a9"
                  accentColor="#696969"
                ></PageTitle>
              </div>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <NewsDetailCard newsDetail={newsDetail} />
      </div>
    );
  }
};

export default NewsDetailPage;
