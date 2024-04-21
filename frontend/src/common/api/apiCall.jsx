import { fetchUser, userLogin, userRegister } from "./routes";

export const userRegisterApi = {
    path: userRegister,
    method: "POST",
}

export const userLoginApi = {
    path: userLogin,
    method: "POST"
}
export const fetchUserAPI = {
    path: fetchUser,
    method: "POST"
}