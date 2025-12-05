export interface Alternative {
  name: string;
  price: number;
  link?: string;
  description?: string;
}

export interface PredictionResult {
  id: number;
  itemName: string;
  price: number;
  regretScore: number;
  reasons: string;
  alternatives?: Alternative[];
}

export type FormData = {
  itemName: string;
  price: number;
};
