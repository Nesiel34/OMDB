import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AdvancedSearchData } from '../model/advanced-search-data';

@Injectable()
export class MovieService {
  constructor(private httpClient: HttpClient) { }

  getMovieByFreeText(param:string,query:string) {
    const url = `${environment.servrUrl}/api/OMDB/getMovieByFreeText`;
    let data = {
      query:query,
      searchValue:param
    }
    return this.httpClient.post<AdvancedSearchData>(url,data);
  }
}
