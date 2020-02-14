import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs/Observable';

import { VerificationContractArray } from '../model/verificationContractArray';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class PresentationService {

  protected basePath = 'https://api.streetcred.id/custodian/v1';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }


  /**
   * Lists the verifications for connection.
   * Lists the verifications for connection.
   * @param walletId
   * @param connectionId The connection identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listVerificationsForConnection(walletId: string, connectionId: string, observe?: 'body', reportProgress?: boolean): Observable<VerificationContractArray>;
  public listVerificationsForConnection(walletId: string, connectionId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VerificationContractArray>>;
  public listVerificationsForConnection(walletId: string, connectionId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VerificationContractArray>>;
  public listVerificationsForConnection(walletId: string, connectionId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (walletId === null || walletId === undefined) {
      throw new Error('Required parameter walletId was null or undefined when calling listVerificationsForConnection.');
    }

    if (connectionId === null || connectionId === undefined) {
      throw new Error('Required parameter connectionId was null or undefined when calling listVerificationsForConnection.');
    }

    let headers = this.defaultHeaders;

    // authentication (accessToken) required
    if (this.configuration.apiKeys) {
      headers = headers.set('Authorization', this.configuration.apiKeys);
    }

    // authentication (subscriptionKey) required
    if (this.configuration.accessToken) {
      headers = headers.set('X-Streetcred-Subscription-Key', this.configuration.accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.get<VerificationContractArray>(`${this.basePath}/api/${encodeURIComponent(String(walletId))}/presentations/connection/${encodeURIComponent(String(connectionId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }

}
