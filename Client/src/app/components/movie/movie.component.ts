import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedSearchResult } from 'src/app/model/advanced-search-data';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  modalReference:any;

  constructor(private modalService: NgbModal) { }
  @Input() movieResult: AdvancedSearchResult = {};
  ngOnInit(): void {
    console.log(this.movieResult);
  }

  moreInfo(content:any){
    this.modalReference =  this.modalService.open(content);
  }

  close(){
    this.modalReference.close();
  }

  dismiss(){
    this.modalReference.close();
  }



}
