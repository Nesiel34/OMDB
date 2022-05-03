import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdvancedSearchResult } from 'src/app/model/advanced-search-data';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent implements OnInit {

  constructor() { }
  @Input() movieResultModal: AdvancedSearchResult = {};
  @Output() dismissModal = new EventEmitter<boolean>();
  @Output() closeModal = new EventEmitter<boolean>();
  ngOnInit(): void {
  }

  dismiss(){
    this.dismissModal.emit(true);
  }

  close(){
    this.closeModal.emit(true);
  }

}
