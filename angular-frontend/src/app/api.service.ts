import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = "http://127.0.0.1:5000/"
  
  constructor(private http: HttpClient) { }
  fetch(data: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}task/${data}`);
  }

  create(data: any): Observable<any[]>{
    return this.http.post<any[]>(`${this.url}task`,data);
  }

  save(data: any): Observable<any[]>{
    return this.http.put<any[]>(`${this.url}task`,data);
  }

  check(data: string): Observable<boolean>{
    const params = new HttpParams().set('task',data);
    return this.http.get<boolean>(`${this.url}check`,{params});
  }

  remove(data: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}remove/${data}`)
  }
}
