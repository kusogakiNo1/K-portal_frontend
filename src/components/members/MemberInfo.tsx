import React, { useState } from "react";
import { getAllMembersAPIResponse } from "../../types/getAllMembersAPIResponse";

interface ChildProps {
  memberInfo: getAllMembersAPIResponse;
  isAnimating: boolean;
}

export function MemberInfo({ memberInfo, isAnimating }: ChildProps) {
  console.log(memberInfo.imagePath);
  return (
    <div className="relative z-10 flex flex-col">
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
                  background: `linear-gradient(135deg, ${memberInfo.color}60, ${memberInfo.accentColor}40)`,
                }}
              />
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                <img
                  src={memberInfo.imagePath}
                  alt={memberInfo.name}
                  className="w-full h-96 md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>

            {/* 詳細情報エリア */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                  {memberInfo.name}
                </h2>
                <p
                  className="text-xl md:text-2xl font-medium mb-4"
                  style={{ color: memberInfo.color }}
                >
                  {memberInfo.catchCopy}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span
                  className="px-3 py-1 rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: memberInfo.color + "40",
                    backgroundColor: memberInfo.color + "10",
                  }}
                >
                  誕生日: {memberInfo.birthday}
                </span>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {memberInfo.description}
                </p>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: memberInfo.color }}
                >
                  関連要素
                </h3>
                <div className="flex flex-wrap gap-2">
                  {memberInfo.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="px-3 py-1 text-white rounded-full text-sm font-medium transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${memberInfo.color}, ${memberInfo.accentColor})`,
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
