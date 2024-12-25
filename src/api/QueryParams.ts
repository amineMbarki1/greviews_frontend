export interface QueryParams {
    filters?: Record<string, unknown>;
    sort?: { by: string; order: 1 | -1 };
    page?: number;
    limit?: number;
  }