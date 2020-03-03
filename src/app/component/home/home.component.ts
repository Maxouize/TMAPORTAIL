import { Component, OnInit } from '@angular/core';
import { MantisService } from 'src/app/service/mantis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isLoading: boolean;

  constructor() {
    this.isLoading = true;
  }

  ngOnInit() {
    setTimeout(res => {
      this.isLoading = false;
    }, 2000);
  }

}
