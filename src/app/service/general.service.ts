import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TrainingCordinator } from '../class/training-cordinator';
import { TrainingRoom } from '../class/training-room';
import { Location } from '../class/location';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private baseURLtrainerCordinators = "http://localhost:8080/generalapi/trainerCordinators";

  private baseURLlocations = "http://localhost:8080/generalapi/locations";

  private baseURLtrainingRooms = "http://localhost:8080/generalapi/trainingRooms";

  constructor(private httpClient: HttpClient) { }

  getAlltrainerCordinators(): Observable<TrainingCordinator[]> {
    return this.httpClient.get<TrainingCordinator[]>(`${this.baseURLtrainerCordinators}`)
  }

  addtrainerCordinators(trainingCordinators: TrainingCordinator): Observable<Object> {
    return this.httpClient.post(`${this.baseURLtrainerCordinators}`, trainingCordinators);
  }


  getAlllocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(`${this.baseURLlocations}`)
  }


  addLocation(location: Location): Observable<Object> {
    return this.httpClient.post(`${this.baseURLlocations}`, location);
  }

  trainingRooms(): Observable<TrainingRoom[]> {
    return this.httpClient.get<TrainingRoom[]>(`${this.baseURLtrainingRooms}`)
  }


  addTrainingRoom(trainingRoom: TrainingRoom): Observable<Object> {
    return this.httpClient.post(`${this.baseURLtrainingRooms}`, trainingRoom);
  }


}
