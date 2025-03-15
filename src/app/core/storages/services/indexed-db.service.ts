import { Injectable } from '@angular/core';
import { StorageCache } from '../interfaces';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService implements StorageCache{

  private readonly DB_NAME = 'formApp';
  private readonly STORE_NAME = 'formData';
  private readonly DB_VERSION = 1;
  private db: IDBDatabase | null = null;

  constructor() { 
    this.initDB();
  }

  private initDB(): void {
    const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if(!db.objectStoreNames.contains(this.STORE_NAME)) {
        db.createObjectStore(this.STORE_NAME);
      }
    }

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    }

    request.onerror = (event) => {
      console.error('IndexDB error:', (event.target as IDBOpenDBRequest).error);
      
    }
  }

  getObjectStore(mode: IDBTransactionMode): IDBObjectStore | null {
    if (!this.db) {
      return null;
    }
    const transaction = this.db.transaction(this.STORE_NAME, mode);
    return transaction.objectStore(this.STORE_NAME);
  }

  getItem<T>(key: string): T | null {
    const store = this.getObjectStore('readwrite');
    if (!store) {
      console.error('ObjectStore not abailable!');      
      return null;
    }

    let result: T | null = null;
    const request = store.get(key);

    if (request.readyState === 'done') {
      return request.result as T;
    }

    request.onsuccess = (event) => {
      result = (event.target as IDBRequest<T>).result;
    }

    request.onerror = (event) => {
      console.error('Error getting data from IndexedDB', (event.target as IDBRequest).error);      
    }

    return result;
  }

  setItem<T>(key: string, value: T): void {
    const store = this.getObjectStore('readwrite');
    if (!store) {
      console.error('ObjectStore not available');
      return;      
    }

    const request = store.put(value, key);

    request.onerror = (event) => {
      console.error('Error saving to IndexedDB', (event.target as IDBRequest).error);      
    }    
  }

  removeItem(key: string): void {
    const store = this.getObjectStore('readonly');
    if (!store) {
      console.error('ObjectStore not Available');
      return;
    }

    const request = store.delete(key);

    request.onerror = (event) => {
      console.error('Error removing from IndexedDB', (event.target as IDBRequest).error);      
    };
  }

  clear(): void {
    const store = this.getObjectStore('readwrite');

    if (!store) {
      console.error('ObjectStore not available');
      return;
    }

    const request = store.clear();

    request.onerror = (event) => {
      console.error('Error clearing IndexedDB', (event.target as IDBRequest).error);      
    };
    
  }
}
