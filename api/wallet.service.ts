import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { WalletContract } from '../model/walletContract';
import { WalletInfoArray } from '../model/walletInfoArray';
import { WalletParameters } from '../model/walletParameters';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class WalletService {
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
   * Create new wallet
   * Create new wallet
   * @param walletParameters
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createWallet(
    walletParameters?: WalletParameters,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<WalletContract>;
  public createWallet(
    walletParameters?: WalletParameters,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<WalletContract>>;
  public createWallet(
    walletParameters?: WalletParameters,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<WalletContract>>;
  public createWallet(
    walletParameters?: WalletParameters,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
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
    const consumes: string[] = ['application/json-patch+json', 'application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<WalletContract>(`${this.basePath}/api/wallets`, walletParameters, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Deletes the wallet async.
   * Deletes the wallet async.
   * @param walletId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteWallet(walletId?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteWallet(walletId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteWallet(walletId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteWallet(walletId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    if (walletId !== undefined && walletId !== null) {
      queryParameters = queryParameters.set('walletId', walletId as any);
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
    const httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.delete<any>(`${this.basePath}/api/wallets`, {
      params: queryParameters,
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Lists the wallets async.
   * Lists the wallets async.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listWallets(observe?: 'body', reportProgress?: boolean): Observable<WalletInfoArray>;
  public listWallets(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WalletInfoArray>>;
  public listWallets(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WalletInfoArray>>;
  public listWallets(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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

    return this.httpClient.get<WalletInfoArray>(`${this.basePath}/api/wallets`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
}
