import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable()
export class CommonService {

  constructor(private http: Http) { }

  saveUser(user) {
    return this.http.post('http://localhost:8080/api/saveUser/', user)
      .pipe(map((response: Response) => response.json()))
  }

  getUser() {
    return this.http.get('http://localhost:8080/api/getUser/')
      .pipe(map((response: Response) => response.json()))
  }
  deleteUser(id) {
    return this.http.post('http://localhost:8080/api/deleteUser/', { 'id': id })
      .pipe(map((response: Response) => response.json()))
  }

}  
