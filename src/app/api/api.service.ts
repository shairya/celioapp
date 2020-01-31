import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) {

  }

  login(data: any) {
    return this.http.post(environment.apiUrl + '/login', data);
  }

  signOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getReportData(daterange: string, fileType: string) {
    const headers = new  HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(environment.apiUrl + '/download/' + fileType + '/' + daterange, {headers});
  }
}
