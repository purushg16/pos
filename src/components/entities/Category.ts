export interface Category {
  _id: string;
  name: string;
  children: Category[];
}
