export interface Item {
  id: number;
  name: string;
}

export interface RewardCategory {
  type: number;
  name: string;
  allowMultiple: boolean;
  items: Item[];
}

export interface GeneratedOutput {
  id: number;
  itemName: string;
  text: string;
  copied: boolean;
}