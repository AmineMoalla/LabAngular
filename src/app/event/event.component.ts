import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evt } from 'src/modeles/Event';
import { EventService } from 'src/services/event.service';
import { ModalEvtComponent } from '../modal-evt/modal-evt.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {


  displayedColumns: string[] = ['id', 'titre', 'dateDebut', 'dateFin', 'lieu', 'icon'];
  // dataSource : Evt []= [];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private se: EventService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchData();

  }

  fetchData(): void {
    this.se.getAllEvents().subscribe((a) => {
      //this.dataSource = a;
      this.dataSource = new MatTableDataSource(a);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: String): void {
    this.se.deleteEvents(id).subscribe(() => {
      this.fetchData();
    });
  }

  //lancer l'ouverture du Modal
  open() {
    //lancer le modal 
    let dialogRef = this.dialog.open(ModalEvtComponent);
    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output:", data);
      this.se.addEvent(data).subscribe(() => {
        this.fetchData();
      });
    });
  }

  openEdit(id: string) {
    const dialogConfig = new MatDialogConfig();
    ////EventByID
    this.se.getEventById(id).subscribe((evtRecup) => {
      dialogConfig.data = evtRecup;
      const dialogRef = this.dialog.open(ModalEvtComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((data) => {
        console.log("Dialog output:", data);
        this.se.updateEvent(id, data).subscribe(() => {
          this.fetchData();
        });

      })
    });

    //lancer l'ouverture dela boite 


    ////et envoyer EventByID



  }
  openVis(id: string) {
    //la boite de dialogue
    const dialogConfig = new MatDialogConfig();
    //EventByID
    dialogConfig.data = id;
    this.dialog.open(EventDetailsComponent, dialogConfig);
  }

}