import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('basePath');
export const SC_API_KEY = new InjectionToken<string>('apiKeys');
export const SC_SUBS_KEY = new InjectionToken<string>('accessToken');
export const COLLECTION_FORMATS = {
  'csv': ',',
  'tsv': '   ',
  'ssv': ' ',
  'pipes': '|'
}
