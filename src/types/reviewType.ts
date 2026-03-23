export type T_review = {
  id?: string;
  customer_id: string;
  order_id: string;
  comment: string;
  customer?: {
    name: string;
    image?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
