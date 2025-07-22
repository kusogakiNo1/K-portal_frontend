// src/components/Layout.tsx
import React from "react";
import Header from "./Header"; // 作成したHeaderコンポーネントをインポート
import Footer from "./Footer"; // 作成したFooterコンポーネントをインポート
// import "./Layout.css"; // レイアウト用のCSS (ボディのスタイルなど)

// childrenは、このLayoutコンポーネントに囲まれたコンテンツを指します
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="app-container">
      <Header /> {/* ヘッダーを配置 */}
      <main className="app-main-content">
        {children} {/* 各ページのコンテンツがここに表示されます */}
      </main>
      <Footer /> {/* フッターを配置 */}
    </div>
  );
}

export default Layout;
