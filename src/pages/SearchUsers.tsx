// src/pages/About.tsx
import React from "react";
import { SearchComponent } from "../components/SearchComponent";

const SearchUsers: React.FC = () => {
  return (
    <div>
      <h1>ユーザー一覧画面</h1>
      <p>この画面では、ユーザーを検索することができるよん</p>
      <SearchComponent />
    </div>
  );
};

export default SearchUsers;
