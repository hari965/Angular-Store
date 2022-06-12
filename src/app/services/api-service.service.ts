import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://fakestoreapi.com/products';
  getProduct() {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
