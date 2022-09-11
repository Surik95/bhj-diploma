/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  if (options.method === 'GET') {
    if (options.method == 'GET') {
      if (options.data && options.data !== undefined) {
        let params = [];
        for (const [key, value] of Object.entries(options.data)) {
          params.push(`${key}=${value}`);
        }
        options.url = options.url + '?' + params.join('&');
      }
    }
    try {
      xhr.open(options.method, options.url);
      xhr.responseType = 'json';
      xhr.send();
    } catch (e) {
      callback(e);
    }
  } else {
    const formData = new FormData();
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
    try {
      xhr.open(options.method, options.url);
      xhr.responseType = 'json';
      xhr.send(formData);
    } catch (e) {
      callback(e);
    }
  }
  xhr.onload = () => {
    options.callback(xhr.response.error, xhr.response);
  };
};
