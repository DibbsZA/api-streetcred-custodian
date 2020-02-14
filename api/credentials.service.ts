import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs/Observable';

import { CredentialContractArray } from '../model/credentialContractArray';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class CredentialsService {

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
   * Accepts the credential offer.
   * Accepts the credential offer.
   * @param walletId
   * @param credentialId The credential identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public acceptCredentialOffer(walletId: string, credentialId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public acceptCredentialOffer(walletId: string, credentialId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public acceptCredentialOffer(walletId: string, credentialId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public acceptCredentialOffer(walletId: string, credentialId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (walletId === null || walletId === undefined) {
      throw new Error('Required parameter walletId was null or undefined when calling acceptCredentialOffer.');
    }

    if (credentialId === null || credentialId === undefined) {
      throw new Error('Required parameter credentialId was null or undefined when calling acceptCredentialOffer.');
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
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.post<any>(`${this.basePath}/api/${encodeURIComponent(String(walletId))}/credentials/${encodeURIComponent(String(credentialId))}`,
      null,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }

  /**
   * Lists the credentials.
   * Lists the credentials.
   * @param walletId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listCredentials(walletId: string, observe?: 'body', reportProgress?: boolean): Observable<CredentialContractArray>;
  public listCredentials(walletId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CredentialContractArray>>;
  public listCredentials(walletId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CredentialContractArray>>;
  public listCredentials(walletId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (walletId === null || walletId === undefined) {
      throw new Error('Required parameter walletId was null or undefined when calling listCredentials.');
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

    return this.httpClient.get<CredentialContractArray>(`${this.basePath}/api/${encodeURIComponent(String(walletId))}/credentials`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }

  /**
   * Lists the credentials for connection identifier.
   * Lists the credentials for connection identifier.
   * @param walletId
   * @param connectionId The connection identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listCredentialsForConnectionId(walletId: string, connectionId: string, observe?: 'body', reportProgress?: boolean): Observable<CredentialContractArray>;
  public listCredentialsForConnectionId(walletId: string, connectionId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CredentialContractArray>>;
  public listCredentialsForConnectionId(walletId: string, connectionId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CredentialContractArray>>;
  public listCredentialsForConnectionId(walletId: string, connectionId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (walletId === null || walletId === undefined) {
      throw new Error('Required parameter walletId was null or undefined when calling listCredentialsForConnectionId.');
    }

    if (connectionId === null || connectionId === undefined) {
      throw new Error('Required parameter connectionId was null or undefined when calling listCredentialsForConnectionId.');
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

    return this.httpClient.get<CredentialContractArray>(`${this.basePath}/api/${encodeURIComponent(String(walletId))}/credentials/connection/${encodeURIComponent(String(connectionId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }

}
