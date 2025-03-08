import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-modal-evt',
  templateUrl: './modal-evt.component.html',
  styleUrls: ['./modal-evt.component.css']
})
export class ModalEvtComponent  {

form!:FormGroup;
//Forcage de type => MODAL

constructor(public dialogRef:MatDialogRef<ModalEvtComponent>,private se:EventService,   
  @Inject(MAT_DIALOG_DATA) data:any) {
if(data){
  console.log(data);
  this.form= new FormGroup({
    titre:new FormControl(data.titre),
    dateDebut:new FormControl(data.dateDebut),
    dateFin:new FormControl(data.dateFin),
    lieu:new FormControl(data.lieu)
  });
  
}
else{
  this.form= new FormGroup({
    titre:new FormControl(null),
    dateDebut:new FormControl(null),
    dateFin:new FormControl(null),
    lieu:new FormControl(null)
  });

}
} 
//intilaisation de form
// ngOnInit(): void {
//   this.form= new FormGroup({
//     titre:new FormControl(null),
//     dateDebut:new FormControl(null),
//     dateFin:new FormControl(null),
//     lieu:new FormControl(null)
//   });
// }

//save et close

save() {
  this.dialogRef.close(this.form.value);
 
}

close() {
  this.dialogRef.close();
}

   

}
