import { Injectable } from '@angular/core';
import { StorageCache } from '../interfaces/storage-cache.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements StorageCache {


  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
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
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
  
}
