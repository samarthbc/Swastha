import { useState } from "react";
import urlcontext from "./urlcontext";

const UrlState = (props) =>{
    // let [server_url, setServer_url] = useState("http://localhost:5000")
    // let server_url = "http://localhost:5000" // For local computer 
    let server_url = "https://swasthaserver.vercel.app/"

    return(
        <urlcontext.Provider value={{server_url}}>
            {props.children}
        </urlcontext.Provider>
    )
}

export default UrlState;