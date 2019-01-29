import {Component, OnInit} from '@angular/core';
import {AlertService} from '@app/_services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(alertService: AlertService) {
  }

  ngOnInit() {
  }

}
