const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest;
  xhr.responseType = "json";

  if (options.method === "GET") {
    let strUrl = `${options.url}?`;
    console.log(options.url);
    for (let key in options.data) {
      strUrl += `${key}=${options.data[key]}&`;
      // console.log(key);
      // console.log(options.data);
    }
    const url = strUrl.slice(0, -1);

    xhr.open(options.method, url);
    
    xhr.send();
    // console.log(options);
    } else {
    let formData = new FormData();

    for (let key in options.data){
      formData.append(key, options.data[key]);
    }

    xhr.open(options.method, options.url);

    xhr.send(formData);
    // console.log(options);
  }

  xhr.addEventListener("readystatechange", function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      options.callback(null, xhr.response);
      // console.log("Всё ок");
      // console.log(xhr);
    }

    if(xhr.readyState === 4 && xhr.status !== 200){
      options.callback(xhr.response.error, xhr.response);
      // console.log("Всё не ок");
      // console.log(xhr.response);
    }
  });
};


