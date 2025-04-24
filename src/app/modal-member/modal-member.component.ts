import { Component } from '@angular/core';
import { Member } from 'src/modeles/Member';
import { MemberService } from 'src/services/member.service';
import { ModalPubComponent } from '../modal-pub/modal-pub.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-member',
  templateUrl: './modal-member.component.html',
  styleUrls: ['./modal-member.component.css']
})
export class ModalMemberComponent {
  membres:Member[]=[];
  form!: FormGroup;
constructor(private MS :MemberService,private dialogRef: MatDialogRef<ModalPubComponent> ) {
this.MS.getAllMembers().subscribe((data:any)=>{
  //console.log(data);
  this.membres=data;
});
}

ngOnInit(): void {
    this.form = new FormGroup({
      idmember: new FormControl(null),
     
    });
  }

save() {
  this.dialogRef.close(this.form.value);}

  close() {
    this.dialogRef.close();
  }


}
