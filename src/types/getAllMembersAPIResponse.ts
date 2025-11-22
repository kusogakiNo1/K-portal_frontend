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
