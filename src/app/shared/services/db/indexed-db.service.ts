import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { CashflowDB } from '../../models/database/cashflow.db';
import { DatabaseTable } from '../../constants/database-table.enum';


@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase<CashflowDB>>;

  constructor() {
    this.dbPromise = openDB<CashflowDB>('cashflow', 1.2, {
      upgrade(db) {
        db.createObjectStore('professions', {
          keyPath: 'id',
          autoIncrement: true
        });
        db.createObjectStore('sessions', {
          keyPath: 'id',
          autoIncrement: true
        });
        db.createObjectStore('fastTrackSessions', {
          keyPath: 'id',
          autoIncrement: true
        });
        db.createObjectStore('logs', {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    });
  }

  async addData(storeName: DatabaseTable, data: any) {
    const db = await this.dbPromise;
    const dbData = { ...data, createdAt: new Date() };
    return db.add(storeName, dbData);
  }

  async getData(storeName: DatabaseTable, key: number) {
    const db = await this.dbPromise;
    return db.get(storeName, key);
  }

  async getAllData(storeName: DatabaseTable) {
    const db = await this.dbPromise;
    return db.getAll(storeName);
  }

  async deleteData(storeName: DatabaseTable, key: number) {
    const db = await this.dbPromise;
    const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
    return store.delete(key);
  }

  async updateData(storeName: DatabaseTable, data: any) {
    const db = await this.dbPromise;
    const store= db.transaction(storeName, 'readwrite').objectStore(storeName);

    return store.put(data);
  }

  async clearData(storeName: DatabaseTable) {
    const db = await this.dbPromise;
    return db.clear(storeName);
  }
}