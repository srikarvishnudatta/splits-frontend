export async function customFetch(url: string, method: string, data?: any){
    return await fetch("http://localhost:8081"+url, {
        method: method,
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(data)
    });
}