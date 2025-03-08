import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/modeles/Member';


@Injectable({
  providedIn: 'root'
})

//le decorateur qui indique que le service pourrait etre injecté dans un autre service ou dans un composant

export class MemberService {
  //fonction qui envoie la requete en mode get 
  constructor(private http :HttpClient) { }

  getAllMembers() : Observable<Member[]> { 
return this.http.get<Member[]>('http://localhost:3000/members');

  }

addMember(member:Member):Observable<void>{
return this.http.post<void>('http://localhost:3000/members',member);
}

deleteMember(id:String):Observable<void>
{
 return this.http.delete<void>(`http://localhost:3000/members/${id}`) ;
 
}

getMembetById(id:String):Observable<Member>
{
  return this.http.get<Member>(`http://localhost:3000/members/${id}`);

}

updateMember(id: string, member: Member): Observable<void> {
  return this.http.put<void>(`http://localhost:3000/members/${id}`, member);
}
}