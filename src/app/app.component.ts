import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
 
  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
 
  constructor( private http: HttpClient ) { }
 
  ngOnInit() {
    this.addRecaptchaScript();
  }

  response: any;
 
  renderReCaptch() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : '6LfcytIUAAAAAKofzqGYVEfLGGjj6tPjiMkLGAFw',
      'callback': (response) => {
          console.log(response);
          this.response = response;
      }
    });
  }

  enviar(){
    this.http.post('https://www.google.com/recaptcha/api/siteverify', {
            'secret': '6LfcytIUAAAAAKS9q_SOtXIbwhZmFlI8gVH4FwxZ',
            'response': this.response
          }).subscribe(r => console.log(r));
  }
 
  addRecaptchaScript() {
 
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    }
 
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
 
  }
 
}