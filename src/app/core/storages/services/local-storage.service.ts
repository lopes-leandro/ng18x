import { Injectable } from '@angular/core';
import { StorageCache } from '../interfaces/storage-cache.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements StorageCache {

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    try {
      return JSON.parse(item) as T;
    } catch (e) {
      console.error('Error parsing stored item', e);      
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
