export interface IPagination<DataType> {
  per_page: number;
  total: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  data: DataType[];
}
