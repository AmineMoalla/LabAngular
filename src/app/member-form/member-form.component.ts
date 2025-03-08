import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
   
  form!:FormGroup
  constructor(private ms:MemberService,private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
//recuperer la route active 
const id_courant=this.activatedRoute.snapshot.params['id'];
console.log(id_courant);
//tester
if(id_courant)
{
  console.log('je suis dans edit');
  this.ms.getMembetById(id_courant).subscribe((data)=>
  {
    console.log(data);
    this.form = new FormGroup({
      cin: new FormControl(data.cin,[Validators.required]),
      name: new FormControl(data.name,[Validators.required]),
      type: new FormControl(data.type,[Validators.required]),
      createDate: new FormControl(data.createDate,[Validators.required])
    })
  }
  
  )//////////
}

///si id existe et aune valeur 
//getElementById()=>Member => extraire et placer dans la form 
//sinon je suis dans create 
else{




    this.form = new FormGroup({
      cin: new FormControl(null,[Validators.required]),
      name: new FormControl(null,[Validators.required]),
      type: new FormControl(null,[Validators.required]),
      createDate: new FormControl(null,[Validators.required])

    })
  }
  }
  onSubmit():void {
    console.log(this.form.value);
    
   const idc=this.activatedRoute.snapshot.params['id'];
    if(idc)
    {
      this.ms.updateMember(idc,this.form.value).subscribe(()=>{this.router.navigate([''])});
    }
    else
{
    this.ms.addMember(this.form.value).subscribe(()=>{this.router.navigate([''])});
}
  }
}
