import { TResponse } from '../typeDate';
enum EMETHODS {
  GET = 'GET',
  POST ='POST',
  PUT ='PUT',
  DELETE ='DELETE'
}

type possibleMethods = EMETHODS.GET | EMETHODS.POST | EMETHODS.PUT | EMETHODS.DELETE
type TOptions = Record<string, any>

function queryStringify(data : Document) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[(key as keyof Document)]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get = (url: string, options: TOptions = { timeout: 0 }) => {
    return this.request(this.baseUrl + url, { ...options, method: EMETHODS.GET }, options.timeout);
  };

  post = (url: string, options: TOptions = { timeout: 0 }) => {
    return this.request(this.baseUrl + url, { ...options, method: EMETHODS.POST }, options.timeout);
  };

  put = (url: string, options: TOptions = { timeout: 0 }) => {
    return this.request(this.baseUrl + url, { ...options, method: EMETHODS.PUT }, options.timeout);
  };

  delete = (url: string, options: TOptions = { timeout: 0 }) => {
    return this.request(
      this.baseUrl + url,
      { ...options, method: EMETHODS.DELETE },

      options.timeout
    );
  };

  request = (
    url: string,
    options: {
      headers? : Record<string, string>,
      method?: possibleMethods, data?:Document },
    timeout = 5000
  ) : Promise<TResponse>=> {
    let { headers, method, data } = options;
    if (!headers && !(data instanceof FormData)) {
      headers = { ['content-type']: 'application/json' };
    }

    return new Promise(function (resolve, reject) {
      if (!method) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === EMETHODS.GET;

      xhr.open(
        method,

        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url
      );
      if (headers) {
        Object.keys(headers).forEach(key => {
          if (!headers) {
            return;
          }
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
