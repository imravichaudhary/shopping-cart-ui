import {Injectable} from '@angular/core';
import {Product} from '../model/product.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Cart} from '../model/cart.model';

const endpoint = 'http://localhost:4200/api/';
const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class RestService {

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.httpClient.get(`${endpoint}product`).pipe(map(this.extractData));
  }

  getProduct(id): Observable<any> {
    return this.httpClient.get(`${endpoint}product/${id}`).pipe(map(this.extractData));
  }

  addProductToCart(userId: string, cartItem: Cart): Observable<any> {
    console.log(cartItem);
    return this.httpClient
      .post<any>(`${endpoint}cart/${userId}`, JSON.stringify(cartItem), httpOptions)
      .pipe(
        tap((cart) => console.log(`Added product with id=${cart.id}`)),
        catchError(this.handleError<any>('addProductToCart'))
      );
  }

  updateProductInCart(userId: string, cartItem: Cart): Observable<any> {
    return this.httpClient
      .put(`${endpoint}cart/${userId}`, JSON.stringify(cartItem), httpOptions)
      .pipe(
        tap(_ => console.log(`Updated product with id=${cartItem.productId}`)),
        catchError(this.handleError<any>('updateProductInCart'))
      );
  }

  deleteProductFromCart(userId: string, cartId: string): Observable<any> {
    return this.httpClient
      .delete<any>(`{${endpoint}cart/${userId}?cartId=${cartId}`, httpOptions)
      .pipe(
        tap(_ => console.log(`Deleted cart id=${cartId}`)),
        catchError(this.handleError<any>('deleteProductFromCart'))
      );
  }

  private extractData(res: Response) {
    return res || { };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
