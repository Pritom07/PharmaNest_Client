export type T_medicineData = {
  name: string;
  price: number;
  stock: number;
  manufacturer: string;
  category_id: number;
  seller_id: string | undefined;
  img_url: string;
  id?: string;
  description?: string | undefined;
  category?: {
    name: string;
  };
  createdAt?: string;
  updatedAt?: string | null;
  quantity?: number;
};
