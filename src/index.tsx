import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Members from "./pages/Members";
import Dummy from "./pages/Dummy";
import Layout from "./components/layouts/Layout";
import ScrollToTop from "./components/ScrollToTop";

// ルーティングを行っています
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} /> {/* ホームパス */}
          <Route path="/members" element={<Members />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/dummy" element={<Dummy />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
