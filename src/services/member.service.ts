import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Member } from 'src/modeles/Member';
import { Pub } from 'src/modeles/Pub';


@Injectable({
  providedIn: 'root'
})

//le decorateur qui indique que le service pourrait etre injecté dans un autre service ou dans un composant

export class MemberService {
  tabPub:Pub[]=[];
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


AddMemberToPub(pubId: string, memberId: string): Observable<void> {
  return this.http.get<any>(`http://localhost:3000/members/${memberId}`).pipe(
    switchMap(member => {
      const updatedTabPubs = member.tabPubs || [];
      if (!updatedTabPubs.includes(pubId)) {
        updatedTabPubs.push(pubId);
        return this.http.patch<void>(`http://localhost:3000/members/${memberId}`, {
          tabPubs: updatedTabPubs
        });
      } else {
        // Si déjà présent, retourner un Observable vide
        return of(void 0);
      }
    })
  );
}



}