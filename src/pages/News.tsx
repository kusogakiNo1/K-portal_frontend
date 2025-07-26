// src/pages/About.tsx
import React from "react";
import { SearchComponent } from "../components/SearchComponent";
import { PageTitle } from "../components/PageTitle";

const News: React.FC = () => {
  return (
    <div className="mt-16 ml-16 mr-16">
      <PageTitle title="ニュース情報"></PageTitle>
      <div>この画面には、さまざまなニュースを表示させたいんですよ〜〜〜</div>
    </div>
  );
};

export default News;
