import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  listColumns = [
    {
      field: "account_number",
      label: "account number",
      width: "100px"
    },
    {
      field: "balance",
      label: "balance",
      width: "100px"
    },
    {
      field: "firstname",
      label: "firstname",
      width: "100px"
    },
    {
      field: "lastname",
      label: "lastname",
      width: "100px"
    },
    {
      field: "age",
      label: "age",
      width: "100px"
    },
    {
      field: "gender",
      label: "gender",
      width: "100px"
    },
    {
      field: "address",
      label: "address",
      width: "100px"
    },
    {
      field: "employer",
      label: "employer",
      width: "100px"
    },
    {
      field: "email",
      label: "email",
      width: "100px"
    },
    {
      field: "city",
      label: "city",
      width: "100px"
    },
    {
      field: "state",
      label: "state",
      width: "100px"
    },
  ];
  isLoading: false;
  data : [];
  page: 1;
  total: 0;
  mode: "paging";
  pageSize: 10;
  pageSizeOptions:[10, 20, 50, 100];

  ngOnInit() {
    console.log(environment.api_url);
    console.log('worked!');
    fetch('http://localhost:5001/api/accounts', {
      method: 'POST',
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVmZTFlY2YzZTYyNDJmMDRlOWQ3NjE1MyIsImV4cCI6MTYxNjQzNDE0OX0.r9gltENlnSeGuP-q4cmVbKmMm2fX4jDhkBSazrFQ0ZU',
      },
    })
      .then((res) => res.json())
      .then((data) => this.data = data.data);
  }

  onLoad() {}
}
