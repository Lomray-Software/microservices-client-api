export interface IStorageOptions {
  isAccess?: boolean;
}

export interface IStorage {
  setItem: (
    name: string,
    value: string,
    options?: IStorageOptions,
  ) => Promise<string | undefined> | void;
  getItem: (name: string, options?: IStorageOptions) => Promise<string | undefined> | null | string;
  deleteItem: (name: string, options?: IStorageOptions) => Promise<string | undefined> | void;
}
