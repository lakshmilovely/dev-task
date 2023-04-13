import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HeaderserviceService {

  constructor(private http:HttpClient) { }
  projectinfo(){
    return this.http.get(`${environment.apiUrl}User/projinfo`)
  }
}
