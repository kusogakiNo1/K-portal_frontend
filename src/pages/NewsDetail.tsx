import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import { BackgroudColor } from "../components/BackgroudColor";

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: "news" | "announcement" | "event";
  image: string;
  featured?: boolean;
  detailContent?: {
    period?: string;
    conditions?: string;
    details: string;
    imageUrl?: string;
  };
}

// 同じニュースデータを使用（実際のアプリケーションではAPIから取得）
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
    detailContent: {
      period: "2025年1月27日（月）メンテナンス後 ～ 常設",
      conditions:
        "インターゾーンレベル15以上、アンマッション機能「プロジェクト」インポッシブル（上）、をクリアすることを参加条件とします。",
      details: `新バージョン2.1では、以下の新機能と改善が含まれています：

• 新しいプロジェクト管理ダッシュボード
プロジェクトの進捗を一目で確認できる包括的なダッシュボードを追加しました。リアルタイムの統計情報、タスクの状況、チームメンバーの活動状況を視覚的に把握できます。

• パフォーマンス最適化
システム全体のパフォーマンスを大幅に向上させました。特に大規模なデータセットを扱う際の応答速度が50%以上改善されています。

• ユーザーインターフェース刷新
より直感的で使いやすいインターフェースに改良しました。ユーザビリティテストの結果を基に、ワークフローを最適化しています。

• 新しいコラボレーション機能
チームメンバー間のコミュニケーションを促進する新機能を追加。リアルタイムチャット、ファイル共有、コメント機能が強化されました。

このアップデートにより、皆様の作業効率がさらに向上することを期待しております。`,
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
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
    detailContent: {
      period: "2025年2月15日（土）14:00 ～ 2025年2月15日（土）18:00",
      conditions: "どなたでも参加可能（事前登録が必要）",
      details: `今回のオンラインイベントでは、以下のコンテンツをご用意しております：

• オープニングセッション
プロダクトマネージャーによる最新情報の発表と今後のロードマップについてお話しします。

• ユーザー成功事例発表
実際にサービスを活用して成果を上げているユーザー様に、その取り組みについてご紹介いただきます。

• ライブQ&Aセッション
参加者の皆様からの質問にリアルタイムでお答えします。事前質問も受け付けております。

• ネットワーキングタイム
参加者同士の交流を促進するバーチャルネットワーキング時間を設けています。

参加者特典として、限定ステッカーセットと次回バージョンのベータアクセス権をプレゼントいたします。`,
      imageUrl:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    },
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
    detailContent: {
      period: "2025年1月25日（土）2:00 ～ 2025年1月25日（土）6:00",
      details: `本日早朝に実施いたしました定期メンテナンスが予定通り完了いたしました。

メンテナンス内容：
• サーバーインフラの安定性向上
• セキュリティアップデートの適用
• データベースの最適化
• バックアップシステムの強化

メンテナンス期間中はサービスをご利用いただけず、ご不便をおかけいたしました。
現在、全ての機能が正常に動作していることを確認しております。

今後ともサービスの安定運用に努めてまいりますので、引き続きご愛顧のほどよろしくお願いいたします。`,
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    },
  },
  // 他の記事も同様に詳細情報を追加...
  {
    id: 4,
    title: "ユーザーアンケート実施中",
    summary: "サービス向上のためのアンケートにご協力ください。",
    content: "アンケート期間は今月末まで。",
    date: "2025-01-24",
    category: "announcement",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=300&fit=crop",
    detailContent: {
      period: "2025年1月24日（金）～ 2025年1月31日（金）",
      conditions: "現在サービスをご利用中のユーザー様",
      details: `より良いサービス提供のため、ユーザーアンケートを実施しております。

アンケート内容：
• サービスの使いやすさについて
• 新機能への要望
• サポートの満足度
• 全体的な評価

ご回答いただいた方の中から抽選で50名様に、オリジナルグッズをプレゼントいたします。
アンケートは約5分程度で完了いたします。

皆様の貴重なご意見をサービス改善に活かしてまいりますので、ぜひご協力をお願いいたします。`,
      imageUrl:
        "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop",
    },
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
    detailContent: {
      period: "2025年1月23日（木）～ 2025年2月23日（日）",
      conditions: "β版テスト参加申込を完了されたユーザー様（先着100名）",
      details: `新機能のβ版テストを開始いたします。

テスト対象機能：
• AI搭載の自動レポート生成
• リアルタイム共同編集機能
• 高度な分析ダッシュボード
• モバイルアプリ連携

参加者の皆様には、テスト期間中の使用感やバグ報告をお願いしております。
フィードバックは専用フォームからお送りください。

β版テスト参加者には、正式リリース後の機能を無料でご利用いただける特典をご用意しております。`,
      imageUrl:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    },
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
    detailContent: {
      period:
        "障害発生：2025年1月21日（火）15:30 ～ 復旧完了：2025年1月21日（火）18:45",
      details: `昨日発生いたしましたシステム障害について、ご報告いたします。

障害の概要：
• 発生時刻：1月21日 15:30頃
• 影響範囲：サービス全体へのアクセス不可
• 原因：データベースサーバーの予期しない高負荷
• 復旧時刻：1月21日 18:45

対応内容：
• 即座に障害対応チームを招集
• 原因の特定と緊急対応の実施
• システムの段階的復旧
• 全機能の動作確認完了

再発防止策：
• サーバー監視体制の強化
• 負荷分散システムの改善
• 緊急時対応プロセスの見直し

この度はご利用の皆様に多大なご迷惑をおかけし、心よりお詫び申し上げます。`,
      imageUrl:
        "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&h=600&fit=crop",
    },
  },
];

const categoryLabels = {
  news: "ニュース",
  announcement: "お知らせ",
  event: "イベント",
};

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const article = newsData.find((item) => item.id === Number(id));

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16 relative">
      {/* 対角線背景レイヤー */}
      <BackgroudColor color="#c0c0c0"></BackgroudColor>
      {/* ヘッダー部分*/}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex justify-start ">
          <Link
            to="/news"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#213a37] text-white rounded-xl hover:bg-[#1a2e2b] transition-colors font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            戻る
          </Link>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* タイトルセクション */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>
          <div
            className="w-24 h-1 mx-auto transition-all duration-500"
            style={{
              background: "linear-gradient(to right, #a9a9a9, #696969)",
            }}
          />

          {/* カテゴリーと日付情報 */}
          <div className="flex items-center justify-center gap-6 text-sm mb-8">
            <div className="flex items-center text-gray-600">
              <Tag className="w-4 h-4 mr-2" />
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${
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
            <div className="text-right opacity-90">
              <div className="text-sm">{formatDate(article.date)}</div>
            </div>
          </div>
        </div>

        {/* メイン画像 */}
        {article.detailContent?.imageUrl && (
          <div className="mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-4xl">
              <img
                src={article.detailContent.imageUrl}
                alt={article.title}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        )}

        {/* 詳細情報セクション */}
        <div className="space-y-8">
          {/* 期間情報 */}
          {article.detailContent?.period && (
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-6 border-[#213a37]">
              <div className="flex items-start gap-4">
                <div className="bg-[#213a37] text-white p-3 rounded-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    開催期間
                  </h2>
                  <p className="text-lg text-gray-700 font-medium">
                    {article.detailContent.period}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 参加条件 */}
          {article.detailContent?.conditions && (
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-6 border-yellow-500">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-500 text-white p-3 rounded-lg">
                  <Tag className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    参加条件
                  </h2>
                  <p className="text-lg text-gray-700">
                    {article.detailContent.conditions}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 詳細内容 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-[#213a37] to-[#2a4d48] text-white px-4 py-2 rounded-lg text-lg mr-4">
                詳細
              </span>
              詳細内容
            </h2>
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {article.detailContent?.details || article.content}
              </div>
            </div>
          </div>

          {/* 基本画像（詳細画像が無い場合） */}
          {!article.detailContent?.imageUrl && (
            <div className="mb-8">
              <div className="relative rounded-xl overflow-hidden shadow-lg border max-w-3xl mx-auto">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
