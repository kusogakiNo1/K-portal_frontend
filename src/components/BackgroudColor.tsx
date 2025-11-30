import React, { useState } from "react";

interface ChildProps {
  color: string;
}

export function BackgroudColor({ color }: ChildProps) {
  return (
    <div>
      {/* スマホ */}
      <div className="block md:hidden">
        <div
          className="absolute transition-all duration-100" // inset-0は使わない場合がある
          style={{
            // 位置を指定
            top: "0px",
            left: "0px",
            // 三角形を内包できるだけのサイズを確保
            width: "1000px",
            height: "1000px",
            backgroundColor: color,
            opacity: 0.4,
            // pxで頂点を指定
            clipPath: "polygon(0px 0px, 600px 0px, 0px 800px)",
          }}
        />
        <div
          className="absolute transition-all duration-100" // inset-0は使わない場合がある
          style={{
            // 位置を指定
            // 親要素の右下隅に配置
            bottom: "0px",
            right: "0px",
            // 三角形を内包できるだけのサイズを確保
            width: "1000px",
            height: "1000px",
            backgroundColor: color,
            opacity: 0.4,
            // pxで頂点を指定
            clipPath: "polygon(700px 1000px, 1000px 600px, 1000px 1000px)",
          }}
        />
      </div>
      {/* それ以外 */}
      <div className="hidden md:block">
        <div
          className="absolute transition-all duration-100" // inset-0は使わない場合がある
          style={{
            // 位置を指定
            top: "0px",
            left: "0px",
            // 三角形を内包できるだけのサイズを確保
            width: "1000px",
            height: "1000px",
            backgroundColor: color,
            opacity: 0.4,
            // pxで頂点を指定
            clipPath: "polygon(0px 0px, 600px 0px, 0px 800px)",
          }}
        />
        <div
          className="absolute transition-all duration-100" // inset-0は使わない場合がある
          style={{
            // 位置を指定
            // 親要素の右下隅に配置
            bottom: "0px",
            right: "0px",
            // 三角形を内包できるだけのサイズを確保
            width: "1000px",
            height: "1000px",
            backgroundColor: color,
            opacity: 0.4,
            // pxで頂点を指定
            clipPath: "polygon(400px 1000px, 1000px 200px, 1000px 1000px)",
          }}
        />
      </div>
    </div>
  );
}
