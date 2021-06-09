import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveInfo } from '../auth/leave-info';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private baseURL = "http://localhost:8080/api/v1/leave/all";

  private baseoneURL = "http://localhost:8080/api/v1/leave/pending";

  private basetwoURL = "http://localhost:8080/api/v1/count";

  constructor(private httpClient: HttpClient) { }

  getLeaves(): Observable<LeaveInfo[]> {
    return this.httpClient.get<LeaveInfo[]>(`${this.baseURL}`)
  }
  
  getLeavesPending(): Observable<LeaveInfo[]> {
    return this.httpClient.get<LeaveInfo[]>(`${this.baseoneURL}`)
  }

  getLeaveCount(): Observable<LeaveInfo[]> {
    return this.httpClient.get<LeaveInfo[]>(`${this.basetwoURL}`)
  }


}
