enum EMETHODS {
  GET = 'GET',
  POST ='POST',
  PUT ='PUT',
  DELETE ='DELETE'
}

type possibleMethods = EMETHODS.GET | EMETHODS.POST | EMETHODS.PUT | EMETHODS.DELETE

function queryStringify(data : Document) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  get = (url: string, options = { timeout: 0 }) => {
    return this.request(url, { ...options, method: EMETHODS.GET }, options.timeout);
  };

  post = (url: string, options = { timeout: 0 }) => {
    return this.request(url, { ...options, method: EMETHODS.POST }, options.timeout);
  };

  put = (url: string, options = { timeout: 0 }) => {
    return this.request(url, { ...options, method: EMETHODS.PUT }, options.timeout);
  };

  delete = (url: string, options = { timeout: 0 }) => {
    return this.request(url, { ...options, method: EMETHODS.DELETE }, options.timeout);
  };

  request = (
    url: string,
    options: { headers? : {[key: string]: string},
    method?: possibleMethods, data?:Document },
    timeout = 5000
  ) => {
    const { headers, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
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

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
