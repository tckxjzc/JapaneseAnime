// const urls=new Set();
/**
 * 请求
 * @param url
 * @param options
 */
export function xhttp(url: string, options?: RequestInit){
    const defaultOptions = <RequestInit>{credentials: "include"};
    url =`${url}`;
    options = options ? Object.assign({}, defaultOptions, options) : defaultOptions;
    let request = new Request(url, options);

    let promise = fetch(request);

    // urls.add(request);

    return promise.then((response) => {
        // urls.delete(request);
        if(response.ok){
            return response.text();
        }
        throw new Error(response.statusText);
    },(e)=>{
        // urls.delete(request);
        throw e;
    });
}

/**
 * 处理请求错误
 * @param e
 */
export function handleFetchError(e) {
    console.log(e);
    alert(e.toString());
}

/**
 * 获取详情
 * @param id
 */
export function getDetails(id) {
    return xhttp(`/details/${id}.txt`);
}
