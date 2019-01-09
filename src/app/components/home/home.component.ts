import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private dir = 'C:\FFOutput';
  constructor(private router: Router) { }

  ngOnInit() {


  }

  public organize() {
    this.router.navigate(['/your-path']);
  }
}
