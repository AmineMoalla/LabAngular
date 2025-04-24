import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-modal-pub',
  templateUrl: './modal-pub.component.html',
  styleUrls: ['./modal-pub.component.css']
})


export class ModalPubComponent implements OnInit {
  //selectedValue !: string;
  form!: FormGroup;
  types: Type[] = [
    {value: 'Conf', viewValue: 'Conf'},
    {value: 'Journal', viewValue: 'Journal'},
    {value: 'Magazine', viewValue: 'Magazine'},
  ];

constructor(private dialogRef: MatDialogRef<ModalPubComponent>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null),
      titre: new FormControl(null),
      date: new FormControl(null),
      lien: new FormControl(null),
      sourcePdf: new FormControl(null)
    });
  }
 save() {
  this.dialogRef.close(this.form.value);}

  close() {
    this.dialogRef.close();
  }

  
  
}
