
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrls: string[];
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
