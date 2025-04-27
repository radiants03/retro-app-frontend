export type ApiResponse = { data?: any; error?: any };

export type TDashboardBoard = [
  {
    id: number;
    title: string;
    created_date: string;
    cardCountPerCategory: number[];
  }
];

export type TBoard = {
  title: string;
  show_names: boolean;
  show_likes: boolean;
  show_comments: boolean;
  is_public: boolean;
  created_date: string;
  updated_date: string;
};

export type TCard = [
  {
    id: number;
    content: string;
    like_count: number;
    dislike_count: number;
    username: string;
    created_date: string;
    updated_date: string;
  }
];

export type TComment = {
  id: number;
  username: string;
  content: string;
};

export type TCategory = {
  id: number;
  category_name: string;
};
