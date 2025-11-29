// お知らせ情報を取得する系APIを実行するための関数をまとめたファイル
import { apiClient } from "./axiosClient";

export interface getNewsAPIResponse {
  totalcount: number;
  count: number;
  news: News[];
}

export interface News {
  id: number;
  title: string;
  category: string;
  date: number;
  thumbnailPath: string;
}

/**
 * お知らせリストを取得する
 * @returns お知らせ情報、取得したお知らせの数、お知らせの総数を含むレスポンス
 */
export const getNews = async (
  category: number,
  limit: number,
  offset: number
): Promise<getNewsAPIResponse> => {
  try {
    const response = await apiClient.get<getNewsAPIResponse>("/news", {
      // クエリパラメータ
      params: {
        category: category ?? undefined, // 渡したいキーと値
        limit: limit ?? undefined,
        offset: offset ?? undefined,
      },
    });
    return response.data;
  } catch (error) {
    // 適切なエラーハンドリング (例: ロギング、特定のエラーコードの再 throw)
    console.error("お知らせ情報取得エラー:", error);
    throw error;
  }
};
