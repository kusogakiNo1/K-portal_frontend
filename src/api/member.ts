// メンバー情報を取得する系APIを実行するための関数をまとめたファイル
import { apiClient } from "./axiosClient";

export interface getAllMembersAPIResponse {
  id: number;
  name: string;
  birthday: string;
  imagePath: string;
  catchCopy: string;
  description: string;
  color: string;
  accentColor: string;
  tags: MemberTag[];
}

interface Member {
  id: number;
  name: string;
  birthday: string;
  imagePath: string;
  catchCopy: string;
  description: string;
  color: string;
  accentColor: string;
  tags: MemberTag[];
}

interface MemberTag {
  id: number;
  name: string;
}

/**
 * 全メンバーのリストを取得する
 * @returns メンバーの配列と総数を含むレスポンス
 */
export const getAllMembers = async (): Promise<getAllMembersAPIResponse[]> => {
  try {
    const response = await apiClient.get<getAllMembersAPIResponse[]>(
      "/members"
    );
    return response.data;
  } catch (error) {
    // 適切なエラーハンドリング (例: ロギング、特定のエラーコードの再 throw)
    console.error("メンバーリスト取得エラー:", error);
    throw error;
  }
};
