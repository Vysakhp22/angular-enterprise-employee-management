import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.error('Failed to parse storage item', { key, error: e });
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      const raw = JSON.stringify(value);
      localStorage.setItem(key, raw);
    } catch (e) {
      console.error('Failed to stringify storage item', { key, value, error: e });
    }
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }
}
