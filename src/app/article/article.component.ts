import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Pub } from 'src/modeles/Pub';
import { PubService } from 'src/services/pub.service';
import { ModalPubComponent } from '../modal-pub/modal-pub.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})


export class ArticleComponent implements OnInit {
//  dataSource:Pub[]=[];
  // dataSource = new MatTableDataSource();
  dataSource !: MatTableDataSource<any>;
ngOnInit() {
    this.fetchData();
  }
  // constructor(private se: EventService, public dialog: MatDialog) { }
constructor(private PS:PubService,public dialog:MatDialog) {

}
  fetchData(){
    this.PS.getAllPubs().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      //  this.dataSource=res;
       console.log(this.dataSource);
    });
  }
  displayedColumns: string[] = ['id', 'type', 'titre', 'date', 'lien','sourcePdf' ,'icon'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
   open() {
      //lancer le modal 
      let dialogRef = this.dialog.open(ModalPubComponent);
      // dialogRef.afterClosed().subscribe(data => {
      //   console.log("Dialog output:", data);
      //   this.se.addEvent(data).subscribe(() => {
      //     this.fetchData();
      //   });
      // });
    }
}
