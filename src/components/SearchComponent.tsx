import React, { useState } from "react";
import axios from "axios";

interface SearchResponse {
  // APIのレスポンスの型を定義します。
  // 例えば、nameプロパティとdescriptionプロパティを持つオブジェクトの配列だと仮定します。
  id: number;
  name: string;
  email: string;
  age: number;
  deletedFlag: boolean;
}

export const SearchComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    setLoading(true);
    setError(null);
    setSearchResults(undefined);

    try {
      const apiUrl = `http://localhost:5000/user/${inputValue}`;

      const response = await axios.get<SearchResponse>(apiUrl); // axios.getを使用\

      setSearchResults(response.data); // レスポンスデータは response.data に格納されています
    } catch (e: any) {
      setError("検索中にエラーが発生しました。");
      console.error("検索エラー:", e);
      if (axios.isAxiosError(e)) {
        // axiosのエラーの場合、より詳細な情報をログに出力できます
        console.error(
          "Axios error details:",
          e.response?.data,
          e.response?.status,
          e.response?.headers
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="検索キーワードを入力"
        />
        <button onClick={handleSearchButtonClick} disabled={loading}>
          検索
        </button>
      </div>

      {loading && <p>検索中...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {searchResults && (
        <div>
          <div>
            <h2>検索結果</h2>
            <p>ID: {searchResults.id}</p>
            <p>名前: {searchResults.name}</p>
            <p>年齢: {searchResults.age}</p>
            <p>メール: {searchResults.email}</p>
            <p>削除フラグ: {searchResults.deletedFlag ? "true" : "false"}</p>
          </div>
        </div>
      )}

      {!searchResults && !loading && !error && !inputValue && (
        <p>検索結果はありません。</p>
      )}
    </div>
  );
};
