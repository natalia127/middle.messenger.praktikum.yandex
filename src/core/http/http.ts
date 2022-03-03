import { HTTPTransport } from './HTTPTransport';

export const mainUrl = 'https://ya-praktikum.tech/api/v2';
export const mainUrlForStatic = mainUrl + '/resources';
export const apiInstanceYaPracticum = new HTTPTransport(mainUrl);
