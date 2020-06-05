import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private http: HttpClient
  ) {}

  public getEndpoint(version = 1) {
    let endpoint  = environment.apiUrl + '/v' + version + '/';

    return endpoint;
  }

  public composeHeaders() {
    const token = 'ya29.a0AfH6SMA6Wxi3Jh4cXIGKK-uTKZCcSPMgV04s5yxokxWRoinIEADBtCxaJmoi8vDQWxqyjHyDYJhZtiMF1wob1Vqe0NbAdIXK9UsP82xD1GIHm35h6zUa7KVK5FWZyI-wlsOfL5NVFu421a_hsH2Obj108dlQqzV2Xo4V';
    return new HttpHeaders()
      .set("Authorization", token)
      .set("Company", 'app')
      .set("Content-Type", "application/json; charset=UTF-8");
  }

  /**
   * Sends a GET request to the specified action
   * @param action
   */
  public get<T>(action: string) {
    return this.http.get<T>(this.getEndpoint(1) + action, { headers: this.composeHeaders() });
  }

  /**
   * Submits data via POST to the specified action endpoint
   * @param action
   * @param data
   */
  public post<T>(action: string, data: T) {
    return this.http.post<T>(this.getEndpoint(1) + action, data, { headers: this.composeHeaders() });
  }

  /**
   * Sends a DELETE request to the specified action and id
   * @param action
   * @param id
   */
  public delete<T>(action: string, id: number) {
    return this.http.delete<T>(this.getEndpoint(1) + action + '/' + id, { headers: this.composeHeaders() });
  }

}
