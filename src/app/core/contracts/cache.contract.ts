export interface CacheContract {
    save(key: string, data: unknown): void;
    get(key: string): unknown;
    delete(key: string): void;
}
