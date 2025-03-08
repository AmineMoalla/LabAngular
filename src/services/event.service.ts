import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/modeles/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http :HttpClient) { }

  getAllEvents() : Observable<Evt[]>  {
return this.http.get<Evt[]>('http://localhost:3000/evts');  }


deleteEvents(id:String):Observable<void>
{
 return this.http.delete<void>(`http://localhost:3000/evts/${id}`) ;
 
}

  addEvent(evt:Evt): Observable<void>{
    return this.http.post<void>('http://localhost:3000/evts',evt);
  }


  updateEvent(id: string, evt: Evt): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/evts/${id}`, evt);
  }

  getEventById(id:String):Observable<Evt>   
  {
    return this.http.get<Evt>(`http://localhost:3000/evts/${id}`);
  }

}
