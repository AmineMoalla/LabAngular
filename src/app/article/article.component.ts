import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Pub } from 'src/modeles/Pub';
import { PubService } from 'src/services/pub.service';
import { ModalPubComponent } from '../modal-pub/modal-pub.component';
import { FormGroup } from '@angular/forms';
import { ModalMemberComponent } from '../modal-member/modal-member.component';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})


export class ArticleComponent implements OnInit {
//  dataSource:Pub[]=[];
  // dataSource = new MatTableDataSource();
  pubForm!: FormGroup; // Define the FormGroup
  idEvent!: string;

  dataSource !: MatTableDataSource<any>;
ngOnInit() {
    this.fetchData();
  }
  // constructor(private se: EventService, public dialog: MatDialog) { }
constructor(private PS:PubService,public dialog:MatDialog, private MS:MemberService) {

}
  fetchData(){
    this.PS.getAllPubs().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      //  this.dataSource=res;
       console.log(this.dataSource);
    });
  }
  displayedColumns: string[] = ['id', 'type', 'titre', 'date', 'lien','sourcePdf','member' ,'icon'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit() {
    if (this.pubForm.valid) {
      console.log('Form Submitted:', this.pubForm.value);
      // Add logic to handle form submission
    }
  }
  
   open() {
      //lancer le modal 
      let dialogRef = this.dialog.open(ModalPubComponent);
      dialogRef.afterClosed().subscribe(data => {
        console.log("Dialog output:", data);
        this.PS.AddPub(data).subscribe(() => {
          this.fetchData();
        });
      });
    }

    openmodal(idEvent: string): void {
      let dialogRef = this.dialog.open(ModalMemberComponent);
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.MS.AddMemberToPub(idEvent, data).subscribe(() => {
            this.fetchData();
          });
        }
      });
    }
    

}
