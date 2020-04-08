import { Component } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient, private router: Router ) {

  }
  incorrectCreds: boolean = false;
  email: any;

  onLogin(form: NgForm) {
    this.email = form.value.Email;
    const sn = form.value.SerialNumber;
//?email=lacey@torx.com&sn=100017730
    this.http.get("http://buds2software.com/api/values", { responseType: 'text', observe: 'response', params: { email: this.email, sn: sn } }).subscribe((data) => {
      console.log(data);  
      console.log(data.status);
 
        this.incorrectCreds = false;
        console.log(data); 
        sessionStorage.setItem('isUserAuthenticated', 'true');
        sessionStorage.setItem('userName', sn);
        
        window.location.href='http://downloads.buds2software.com';
 

    }, (error) => {

      this.incorrectCreds = true;
    })


  }
}
