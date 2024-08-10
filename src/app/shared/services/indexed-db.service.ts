import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { CashflowDB } from '../models/database/cashflow.db';
import { DatabaseTable } from '../constants/database-table.enum';


@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase<CashflowDB>>;

  constructor() {
    this.dbPromise = openDB<CashflowDB>('cashflow', 1, {
      upgrade(db) {
        db.createObjectStore('professions', {
          keyPath: 'id',
          autoIncrement: true
        });
        db.createObjectStore('sessions', {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    });
  }

  async addData(storeName: DatabaseTable, data: any) {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.add(data);
    await tx.done;
  }

  async getData(storeName: DatabaseTable, key: number) {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    return store.get(key);
  }

  async getAllData(storeName: DatabaseTable) {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    return store.getAll();
  }

  async deleteData(storeName: DatabaseTable, key: number) {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.delete(key);
    await tx.done;
  }

  async clearData(storeName: DatabaseTable) {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.clear();
    await tx.done;
  }
}