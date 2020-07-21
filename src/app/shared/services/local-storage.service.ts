import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StorageMap} from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor(private storage: StorageMap) {
  }

  public addDataToStorage(key: string, data: any): void {
    this.storage.set(key, data).subscribe();
  }

  public getDataFromStorageById(key: string): Observable<any> {
    return this.storage.get(key);
  }
}
