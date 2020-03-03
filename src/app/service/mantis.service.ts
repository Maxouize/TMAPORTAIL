import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

const token = 'cMvj6eVN5Tabm-152RIFXCwu3KRDGM-u';

@Injectable({
  providedIn: 'root'
})
export class MantisService {

  private baseUrl = environment.contextMantisUrl;
  private allProjectUrl = this.baseUrl + 'projects';
  private allIssueUrl = this.baseUrl + 'issues';

  constructor(private http: HttpClient) {
  }

  /**
   *
   */
  getAllProject(): Observable<any[]> {
    const header = new HttpHeaders({ Authorization: token,
  });
    const options = {
      headers: header,
    };
    return this.http.get<any[]>(this.allProjectUrl, options);
  }

  /**
   *
   */
  getAllIssue(): Observable<any[]> {
    const header = new HttpHeaders({ Authorization: token,
  });
    const options = {
      headers: header,
    };
    return this.http.get<any[]>(this.allIssueUrl, options);
  }

 }
