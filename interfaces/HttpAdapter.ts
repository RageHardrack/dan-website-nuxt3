export interface HttpAdapter {
  getDatabase<T>(databaseId: string): Promise<T>;
}
