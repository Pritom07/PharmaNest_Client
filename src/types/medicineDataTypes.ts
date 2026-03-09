export type T_medicineData = {
  name: string;
  price: number;
  stock: number;
  manufacturer: string;
  category_id: number;
  user_id: string | undefined;
  img_url: string;
  id?: string;
  description?: string | undefined;
  medicine_Category?: {
    name: string;
  };
  createdAt?: string;
  updatedAt?: string | null;
  quantity?: number;
};
