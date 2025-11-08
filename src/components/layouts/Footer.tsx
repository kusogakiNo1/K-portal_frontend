// src/components/Footer.tsx
import React from "react";
// import "./Footer.css"; // 必要であればCSSをインポート

function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
