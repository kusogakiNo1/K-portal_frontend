import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageTitle } from "../components/PageTitle";
import { BackgroudColor } from "../components/BackgroudColor";
import { MemberInfo } from "../components/members/MemberInfo";
import { getAllMembers } from "../api/member";
import { getAllMembersAPIResponse } from "../api/member";

const MemberShowcase: React.FC = () => {
  const [allMembers, setMembers] = useState<getAllMembersAPIResponse[]>([]);
  const [selectedMember, setSelectedMember] =
    useState<getAllMembersAPIResponse>();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 1. データ取得ロジック本体
  const fetchMembers = async () => {
    try {
      // メンバー情報全件取得APIを実行
      const allMembers = await getAllMembers();
      setMembers(allMembers);
      const defaultMember = allMembers[0];
      setSelectedMember(defaultMember);
    } catch (err) {
      setMembers([]);
    } finally {
    }
  };
  // コンポーネントマウント時の自動実行
  useEffect(() => {
    // ページタイトルを動的に設定する
    document.title = "メンバー情報";
    fetchMembers();
  }, []);

  const itemsPerView = 10;
  const maxIndex = Math.max(0, allMembers.length - itemsPerView);

  const visibleMembers = allMembers.slice(
    carouselIndex,
    carouselIndex + itemsPerView
  );

  const handleMemberSelect = (member: getAllMembersAPIResponse) => {
    if (selectedMember === undefined) return;
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

  if (!(allMembers.length > 0) || !selectedMember) {
    return <p></p>;
  } else {
    return (
      <div className="min-h-screen bg-white text-gray-900 overflow-hidden relative">
        {/* 動的背景エフェクト */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 対角線背景レイヤー */}
          <BackgroudColor color={selectedMember.color}></BackgroudColor>
        </div>
        {/* メインコンテンツ */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* ヘッダー */}
          <PageTitle
            title="メンバー紹介"
            color={selectedMember.color}
            accentColor={selectedMember.accentColor}
          ></PageTitle>
          {/* メンバー情報 */}
          <MemberInfo
            memberInfo={selectedMember}
            isAnimating={isAnimating}
          ></MemberInfo>
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
                              ? `0 0 0 4px ${member.accentColor}90, 0 10px 15px -3px rgba(0, 0, 0, 0.25)`
                              : undefined,
                        }}
                      >
                        <img
                          src={member.imagePath}
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
                          ? selectedMember.color
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
  }
};

export default MemberShowcase;
