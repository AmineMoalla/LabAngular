import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth:AuthService,private router:Router){}
email: string="";
password: string="";
 sub() :void
 {
  console.log(this.email,this.password);
this.auth.signInWithEmailAndPassword(this.email,this.password).then(()=>{
console.log("Connexion reussie"); 
this.router.navigate(['/member']);
});
}
}
