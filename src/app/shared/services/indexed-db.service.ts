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
    return db.add(storeName, data);
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
    return db.delete(storeName, key);
  }

  async updateData(storeName: DatabaseTable, key: number, data: any) {
    const db = await this.dbPromise;
    return db.put(storeName, data, key);
  }

  async clearData(storeName: DatabaseTable) {
    const db = await this.dbPromise;
    return db.clear(storeName);
  }
}