import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evt } from 'src/modeles/Event';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],


})
export class EventDetailsComponent {

  EvtGlobal!:Evt;
constructor(public dialogRef: MatDialogRef<EventDetailsComponent>,
@Inject(MAT_DIALOG_DATA) data: any, public ES:EventService) //recuperation de donnees
{ 
  this.ES.getEventById(data).subscribe((evtRecup) => {
    this.EvtGlobal = evtRecup;
  });
}

}
