import { useEffect, useState } from "react";

export const useFetch = (url) =>{

 const [data, setData] = useState(null);

 const [config, setConfig] = useState(null);
 const [method, setMethod] = useState(null);
 const [callFetch, setCallFetch] = useState(false);
  
 const [itemId, setItemId] = useState(null)

 const httpConfig = (data, method) => {

        if (method === 'POST') {
            setConfig({
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(data)
            })
            setMethod(method);
        } else if (method === 'DELETE') {
            setConfig({
                method: 'DELETE',
                headers: {"Content-Type":"application/json"},
            });

            setMethod(method);
            setItemId(data);
        }
            
        
 };


    useEffect (() => {

        const fetchData = async () => {

            const res = await fetch(url);

            const json = await res.json();

            setData(json);
    
        }
        fetchData();
    }, [url, callFetch]);

    
    useEffect (() => {

        const httpRequest = async () => {
            if (method === 'POST') {

            let fetchOptions = [url, config];

            const res = await fetch(...fetchOptions);

            const json = await res.json()

            setCallFetch(json);
            } else if (method === 'DELETE') {
                
            const deleteUrl = `${url}/${itemId}`

            const res = await fetch(deleteUrl, config);

            const json = await res.json();

            setCallFetch(json)
            }
        }

        httpRequest();
    }, [config, url, method, itemId])

    return { data, httpConfig };
};
     
