import { Component, OnInit} from '@angular/core';
import { Member } from 'src/modeles/Member';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  //injection de dependenace : mecanisme qui permet a un composant d'utiliser un service 
  //le service doit contenir le decorateur @injectable
  constructor(private service:MemberService,private dialog:MatDialog) { }

  dataSource : Member []= [];

  ngOnInit(): void {

    this.service.getAllMembers().subscribe((a)=>{
      this.dataSource = a
    });
     
  }


  delete(id:String):void{
//lancer la boite de dialogue
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    //su user fait un click sur le bouton confirm
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
      if(result){
        this.service.deleteMember(id).subscribe(()=>{
          this.service.getAllMembers().subscribe((a)=>{
            this.dataSource = a
          });
        });
      }
    });
  }



  

  
  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'createDate','icon'];
  

}
