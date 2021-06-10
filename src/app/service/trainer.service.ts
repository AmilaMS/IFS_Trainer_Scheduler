import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupInfo } from '../auth/signup-info';
import { Observable } from 'rxjs';
import { Trainer } from '../class/trainer';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private baseURL ="http://localhost:8080/api/users";
  private trainerURL = "http://localhost:8080/api/trainers";
  private trainerbyNameURL ="http://localhost:8080/api/trainerByname";
  private tainerbyUserNameURL = "http://localhost:8080/api/trainerByUserName";

  constructor(private httpClient: HttpClient) { }

  getUserList():Observable<SignupInfo[]>{
    return this.httpClient.get<SignupInfo[]>(`${this.baseURL}`)
  }


  getTrainerList():Observable<Trainer[]>{
    return this.httpClient.get<Trainer[]>(`${this.trainerURL}`)
  }
  
  getAvailableTrainerList(type : string , date:Date,duration:number):Observable<Trainer[]>{
    return this.httpClient.get<Trainer[]>(`${this.trainerURL}/${type}/${date}/${duration}`)
  }


  addTrainer(trainer:Trainer):Observable<Object>{
    return this.httpClient.post(`${this.trainerURL}`, trainer);
  }



  getTrainerbyId( trainerId: number):Observable<Trainer>{
    return this.httpClient.get<Trainer>(`${this.trainerURL}/${trainerId}`)
  }

  getTrainerbyName(trainerName: string):Observable<Trainer>{
    return this.httpClient.get<Trainer>(`${this.trainerbyNameURL}/${trainerName}`)
  }

  getTrainerbyUserName( trainerUserName : string):Observable<Trainer>{
    return this.httpClient.get<Trainer>(`${this.tainerbyUserNameURL}/${trainerUserName}`)
  }

}
