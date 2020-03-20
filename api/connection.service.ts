import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { ConnectionContract } from '../model/connectionContract';
import { ConnectionContractArray } from '../model/connectionContractArray';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class ConnectionService {
  protected basePath = 'https://api.streetcred.id/custodian/v1';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
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
   * Accepts the invitation.
   * Accepts the invitation.
   * @param walletId identifier of the wallet
   * @param invitation The invitation.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public acceptInvitation(
    walletId: string,
    invitation: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ConnectionContract>;
  public acceptInvitation(
    walletId: string,
    invitation: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ConnectionContract>>;
  public acceptInvitation(
    walletId: string,
    invitation: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ConnectionContract>>;
  public acceptInvitation(
    walletId: string,
    invitation: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (walletId === null || walletId === undefined) {
      throw new Error('Required parameter walletId was null or undefined when calling acceptInvitation.');
    }

    if (invitation === null || invitation === undefined) {
      throw new Error('Required parameter invitation was null or undefined when calling acceptInvitation.');
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
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['multipart/form-data'];

    const canConsumeForm = this.canConsumeForm(consumes);

    let formParams: { append(param: string, value: any): void };
    const useForm = false;
    const convertFormParamsToString = false;
    if (useForm) {
      formParams = new FormData();
    } else {
      formParams = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    }

    if (undefined !== invitation) {
      formParams = formParams.append('invitation', invitation as any) || formParams;
    }

    return this.httpClient.post<ConnectionContract>(
      `${this.basePath}/api/${encodeURIComponent(String(walletId))}/connections/invitation`,
      convertFormParamsToString ? formParams.toString() : formParams,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * Creates the connections.
   * Creates the connections.
   * @param walletId identifier of the wallet
   * @param connectionId The connection identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getConnection(
    walletId: string,
    connectionId: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ConnectionContract>;
  public getConnection(
    walletId: string,
    connectionId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ConnectionContract>>;
  public getConnection(
    walletId: string,
    connectionId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ConnectionContract>>;
  public getConnection(
    walletId: string,
    connectionId: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (walletId === null || walletId === undefined) {
      throw new Error('Required parameter walletId was null or undefined when calling getConnection.');
    }

    if (connectionId === null || connectionId === undefined) {
      throw new Error('Required parameter connectionId was null or undefined when calling getConnection.');
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
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<ConnectionContract>(
      `${this.basePath}/api/${encodeURIComponent(String(walletId))}/connections/${encodeURIComponent(String(connectionId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * Gets the connections.
   * Retrieves a list of connections that are in &#39;Connected&#39; state.
   * @param walletId identifier of the wallet
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getConnections(walletId: string, observe?: 'body', reportProgress?: boolean): Observable<ConnectionContractArray>;
  public getConnections(
    walletId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ConnectionContractArray>>;
  public getConnections(
    walletId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ConnectionContractArray>>;
  public getConnections(walletId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (walletId === null || walletId === undefined) {
      throw new Error('Required parameter walletId was null or undefined when calling getConnections.');
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
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<ConnectionContractArray>(
      `${this.basePath}/api/${encodeURIComponent(String(walletId))}/connections`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * Gets the invitations.
   * Gets the invitations.
   * @param walletId identifier of the wallet
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getInvitations(walletId: string, observe?: 'body', reportProgress?: boolean): Observable<ConnectionContractArray>;
  public getInvitations(
    walletId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ConnectionContractArray>>;
  public getInvitations(
    walletId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ConnectionContractArray>>;
  public getInvitations(walletId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (walletId === null || walletId === undefined) {
      throw new Error('Required parameter walletId was null or undefined when calling getInvitations.');
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
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<ConnectionContractArray>(
      `${this.basePath}/api/${encodeURIComponent(String(walletId))}/connections/invitations`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }
}
