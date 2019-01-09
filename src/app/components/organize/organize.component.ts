import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.scss']
})
export class OrganizeComponent implements OnInit {

  constructor(private fileService: FileService) {

  }

  ngOnInit() {
   this.test();
  }

  async test() {
    console.log('Movies', await this.fileService.findMovies('E:\\'));
  }
}
