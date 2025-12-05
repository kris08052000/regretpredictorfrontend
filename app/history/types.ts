// Types
export interface Alternative {
  name: string;
  price: number;
  link?: string;
  description?: string;
}

export interface Prediction {
  id: number;
  itemName: string;
  price: number;
  regretScore: number;
  reasons: string;
  createdAt: string;
  alternatives?: Alternative[];
}