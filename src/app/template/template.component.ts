import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit{
  isLogin:boolean=false;

ngOnInit(): void {
 // souscrite sur les routes 
   // si la route contient /login => true 
   this.router.events.subscribe(() => {
    this.isLogin = this.router.url.includes('/login'); // Vérifie si l'URL contient "/login"
  console.log("isLogin",  this.isLogin )
  });
}
constructor(private auth:AuthService,private router:Router){}
logout(): void {
  this.auth.signOut().then(() => {
    this.router.navigate(['/login']);
  });
}
}
