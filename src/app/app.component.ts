import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bank-portal-angular';

  ngOnInit() {
    console.log(environment.api_url)
    console.log('worked!')
    fetch('http://localhost:5001/users').then(res => res.json()).then(data => console.log(data));
  }
}
