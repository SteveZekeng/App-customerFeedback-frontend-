export interface Page<T> {
  content: T[];
  totalPages: number;
  totalItems: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
}
