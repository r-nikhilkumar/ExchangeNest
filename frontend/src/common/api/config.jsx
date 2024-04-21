import Notification from "../Notification/Notification"
import { userRegister } from "./routes"

export const configHeader = () => {
    let headers = {
        "Content-Type": "application/json",
        "auth-token" : null
    }
    if(window.localStorage.getItem("isLoggedIn")){
        headers["auth-token"] = window.localStorage.getItem("authToken")
        return headers
    }
    return headers
}

export const request = async (api, body=null)=>{
    try {
        let headers;
        if(api.method == "POST"){
            headers = configHeader()
        }
        if(headers){
            const url = "http://localhost:3001"+api.path
            const res = await fetch(url, {
                method: api.method,
                headers: headers,
                body: body ? JSON.stringify(body) : undefined
            })
            const response = await res.json()
            console.log(response)
            if(response.authToken){
                window.localStorage.setItem("authToken", response.authToken)
                window.localStorage.setItem("isLoggedIn", true)
            }
            return response
        }
    } catch (error) {
        return error
    }
}