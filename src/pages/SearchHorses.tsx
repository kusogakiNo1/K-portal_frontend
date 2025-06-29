// src/pages/About.tsx
import React from "react";
import { SearchComponent } from "../components/SearchComponent";

const SearchHorses: React.FC = () => {
  return (
    <div>
      <h1>馬検索画面</h1>
      <p>この画面では馬を検索することができるよん</p>
      <SearchComponent />
    </div>
  );
};

export default SearchHorses;
