import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdvancedSearchData } from './model/advanced-search-data';
import { MovieService } from './service/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[MovieService]
})
export class AppComponent implements OnInit {

  constructor(private movieService:MovieService){}
  searchControl: FormControl = new FormControl('', Validators.required);
  noResult:boolean = false;
  errMsg:string = "";

  public result:AdvancedSearchData ={
    queryString: '',
    results: [],
    errorMessage: ''
  };
  pageSize:number = 10;
  page:number = 1;

  ngOnInit(): void {
    this.movieService.getMovieByFreeText("top_100","groups").subscribe(s=>{
      this.result = s;
      if(this.result.results.length == 0 ||this.result.errorMessage ){
        this.noResult = true;
        if(this.result.errorMessage){
          this.errMsg = this.result.errorMessage;
        }
        if(this.result.results.length == 0 ){
          this.errMsg = "לא נמצאו תוצאות חיפוש";
        }
      }
      else {
        this.noResult = false;
        this.errMsg = "";
      }
    });
  }

  search(){
    if(this.searchControl.valid){
      this.movieService.getMovieByFreeText(this.searchControl.value,"title").subscribe(s=>{
        this.result = s;
        if(this.result.results.length == 0 ||this.result.errorMessage ){
          this.noResult = true;
          if(this.result.errorMessage){
            this.errMsg = this.result.errorMessage;
          }
          if(this.result.results.length == 0 ){
            this.errMsg = "לא נמצאו תוצאות חיפוש";
          }
        }
        else {
          this.noResult = false;
          this.errMsg = "";
        }
      });
    }
  }


}
