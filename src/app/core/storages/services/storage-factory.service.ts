import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { IndexedDBService } from './indexed-db.service';
import { StorageCache } from '../interfaces';

export enum StorageType {
  LOCAL = 'local',
  SESSION = 'session',
  INDEXED_DB = 'indexexDB'
}

@Injectable({
  providedIn: 'root'
})
export class StorageFactoryService {

  private readonly localStorage = inject(LocalStorageService);
  private readonly sessionStorage = inject(SessionStorageService);
  private readonly indexexDBStorage = inject(IndexedDBService);

  getStorage(type: StorageType): StorageCache {
    switch (type) {
      case StorageType.LOCAL:
        return this.localStorage;
      case StorageType.SESSION:
        return this.sessionStorage;
      case StorageType.INDEXED_DB:
        return this.indexexDBStorage;
      default:
        return this.localStorage;
    }
  }
}
