// src/pages/About.tsx
import image from "../images/members/nunogawara/card.png";
import nunostandimage from "../images/members/nunogawara/stand.png";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BackgroudColor } from "../components/BackgroudColor";

interface Member {
  id: number;
  name: string;
  position: string;
  image: string;
  description: string;
  skills: string[];
  experience: string;
  themeColor: string;
  accentColor: string;
}

const members: Member[] = [
  {
    id: 1,
    name: "布河原 よしかず",
    position: "...みんなの安全基地になりたい。",
    image: image,
    description:
      "10年以上のプロジェクト管理経験を持ち、チームを成功に導くリーダーシップと戦略的思考を兼ね備えています。複数の大規模プロジェクトを同時進行で管理し、常に期限内での高品質な成果物の提供を実現しています。",
    skills: [
      "プロジェクト管理",
      "チームリーダーシップ",
      "戦略立案",
      "リスク管理",
    ],
    experience: "15年",
    themeColor: "#3B82F6", // ブルー
    accentColor: "#1E40AF",
  },
  {
    id: 2,
    name: "佐藤 花子",
    position: "UI/UXデザイナー",
    image: nunostandimage,
    description:
      "ユーザー体験を最優先に考えたデザインで、使いやすく美しいインターフェースを創造することを得意としています。デザイン思考を活用し、ユーザーのニーズを深く理解した上で、革新的なソリューションを提供します。",
    skills: [
      "UI/UXデザイン",
      "プロトタイピング",
      "ユーザーリサーチ",
      "デザインシステム",
    ],
    experience: "8年",
    themeColor: "#EC4899", // ピンク
    accentColor: "#BE185D",
  },
  {
    id: 3,
    name: "山田 次郎",
    position: "フロントエンド開発者",
    image:
      "https://www.shutterstock.com/image-photo/headshot-close-portrait-indian-latin-600nw-2343004301.jpg",
    description:
      "React、TypeScript、Vue.jsなどの最新技術に精通し、パフォーマンスと保守性を重視した開発を行います。モダンなフロントエンド技術を駆使して、ユーザーにとって快適で直感的なWebアプリケーションを構築しています。",
    skills: ["React", "TypeScript", "Vue.js", "Node.js"],
    experience: "7年",
    themeColor: "#10B981", // エメラルド
    accentColor: "#047857",
  },
  {
    id: 4,
    name: "鈴木 美咲",
    position: "バックエンド開発者",
    image:
      "https://media.istockphoto.com/id/1934800957/vector/man-empty-avatar-vector-photo-placeholder-for-social-networks-resumes-forums-and-dating.jpg?s=612x612&w=0&k=20&c=uegpkq9-EgMlLR2MjUOgYV5Ev4hftQ_X4CONfDInjE8=",
    description:
      "スケーラブルなサーバーサイドアーキテクチャの設計と実装に長けており、高性能なAPIの開発を専門としています。クラウドネイティブな技術を活用し、可用性と拡張性を兼ね備えたシステムを構築しています。",
    skills: ["Python", "Go", "AWS", "Docker"],
    experience: "9年",
    themeColor: "#8B5CF6", // バイオレット
    accentColor: "#5B21B6",
  },
  {
    id: 5,
    name: "高橋 健一",
    position: "データサイエンティスト",
    image:
      "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    description:
      "機械学習とデータ分析のエキスパートとして、ビジネス価値を創出するインサイトの発見と予測モデルの構築を担当しています。複雑なデータから意味のあるパターンを見つけ出し、データドリブンな意思決定をサポートします。",
    skills: ["Machine Learning", "Python", "SQL", "TensorFlow"],
    experience: "6年",
    themeColor: "#F59E0B", // アンバー
    accentColor: "#D97706",
  },
  {
    id: 6,
    name: "中村 雅子",
    position: "マーケティングマネージャー",
    image:
      "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=",
    description:
      "デジタルマーケティング戦略の立案と実行において豊富な経験を持ち、ブランド価値向上と顧客獲得に貢献しています。データ分析に基づいたマーケティング施策により、ROIの最大化を実現しています。",
    skills: [
      "デジタルマーケティング",
      "SEO/SEM",
      "データ分析",
      "ブランディング",
    ],
    experience: "10年",
    themeColor: "#EF4444", // レッド
    accentColor: "#DC2626",
  },
];

const MemberShowcase = () => {
  const [selectedMember, setSelectedMember] = useState<Member>(members[0]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, members.length - itemsPerView);

  const handleMemberSelect = (member: Member) => {
    if (member.id === selectedMember.id) return;

    setIsAnimating(true);
    setTimeout(() => {
      setSelectedMember(member);
      setIsAnimating(false);
    }, 200);
  };

  const handleCarouselMove = (direction: "left" | "right") => {
    if (direction === "left" && carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    } else if (direction === "right" && carouselIndex < maxIndex) {
      setCarouselIndex(carouselIndex + 1);
    }
  };

  const visibleMembers = members.slice(
    carouselIndex,
    carouselIndex + itemsPerView
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden relative">
      {/* 動的背景エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 対角線背景レイヤー */}
        <BackgroudColor color={selectedMember.themeColor}></BackgroudColor>
        {/* メインのグラデーション背景 */}
        <div
          className="absolute inset-0 opacity-10 transition-all duration-700"
          style={{
            background: `linear-gradient(135deg, ${selectedMember.themeColor}15 0%, transparent 50%, ${selectedMember.accentColor}08 100%)`,
          }}
        />
        {/* 左上の装飾的な形状 */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${selectedMember.themeColor}40 0%, ${selectedMember.themeColor}10 50%, transparent 100%)`,
          }}
        />
        {/* 右下の装飾的な形状 */}
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] opacity-15 transition-all duration-700"
          style={{
            background: `linear-gradient(45deg, ${selectedMember.accentColor}30 0%, ${selectedMember.themeColor}20 50%, transparent 100%)`,
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 15% 100%)",
          }}
        />
        {/* 中央の微妙なアクセント */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-5 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse, ${selectedMember.themeColor}20 0%, transparent 70%)`,
            transform: "translate(-50%, -50%) rotate(-15deg)",
          }}
        />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ヘッダー */}
        <div className="pt-8 pb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-16">
            メンバー紹介
          </h1>
          <div
            className="w-24 h-1 mx-auto transition-all duration-500"
            style={{
              background: `linear-gradient(to right, ${selectedMember.themeColor}, ${selectedMember.accentColor})`,
            }}
          />
        </div>

        {/* メイン表示エリア */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8">
          <div
            className={`max-w-6xl w-full transition-all duration-300 ${
              isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* 画像エリア */}
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${selectedMember.themeColor}60, ${selectedMember.accentColor}40)`,
                  }}
                />
                <div className="relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-96 md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* 画像上の装飾的なアクセント */}
                  <div
                    className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20"
                    style={{
                      background: `radial-gradient(circle, ${selectedMember.themeColor}, ${selectedMember.accentColor})`,
                    }}
                  />
                </div>
              </div>

              {/* 詳細情報エリア */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                    {selectedMember.name}
                  </h2>
                  <p
                    className="text-xl md:text-2xl font-medium mb-4"
                    style={{ color: selectedMember.themeColor }}
                  >
                    {selectedMember.position}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <span
                      className="px-3 py-1 rounded-full border-2 transition-all duration-300"
                      style={{
                        borderColor: selectedMember.themeColor + "40",
                        backgroundColor: selectedMember.themeColor + "10",
                      }}
                    >
                      経験年数: {selectedMember.experience}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {selectedMember.description}
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: selectedMember.themeColor }}
                  >
                    主なスキル
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-white rounded-full text-sm font-medium transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${selectedMember.themeColor}, ${selectedMember.accentColor})`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* カルーセル */}
        <div className="pb-8 pt-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative flex items-center justify-center">
              {/* 左矢印 */}
              <button
                onClick={() => handleCarouselMove("left")}
                disabled={carouselIndex === 0}
                className={`absolute left-0 z-10 p-2 rounded-full transition-all ${
                  carouselIndex === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "opacity-70 hover:opacity-100 hover:bg-gray-100 text-gray-600"
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* カルーセルアイテム */}
              <div className="flex space-x-4 mx-12">
                {visibleMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handleMemberSelect(member)}
                    className={`relative group transition-all duration-300 ${
                      selectedMember.id === member.id
                        ? "scale-110"
                        : "scale-100 hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 transition-all duration-300 ${
                        selectedMember.id === member.id
                          ? "shadow-lg"
                          : "ring-2 ring-gray-200"
                      }`}
                      style={{
                        boxShadow:
                          selectedMember.id === member.id
                            ? `0 0 0 4px ${member.accentColor}33, 0 10px 15px -3px rgba(0, 0, 0, 0.1)`
                            : undefined,
                      }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <p className="text-xs font-medium whitespace-nowrap text-gray-700">
                        {member.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* 右矢印 */}
              <button
                onClick={() => handleCarouselMove("right")}
                disabled={carouselIndex >= maxIndex}
                className={`absolute right-0 z-10 p-2 rounded-full transition-all ${
                  carouselIndex >= maxIndex
                    ? "opacity-30 cursor-not-allowed"
                    : "opacity-70 hover:opacity-100 hover:bg-gray-100 text-gray-600"
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* インジケーター */}
            <div className="flex justify-center mt-12 space-x-2">
              {[...Array(maxIndex + 1)].map((_, index) => (
                <button
                  key={`carousel-page-${index}`}
                  onClick={() => setCarouselIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300`}
                  style={{
                    backgroundColor:
                      index === carouselIndex
                        ? selectedMember.themeColor
                        : "#9CA3AF",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberShowcase;
