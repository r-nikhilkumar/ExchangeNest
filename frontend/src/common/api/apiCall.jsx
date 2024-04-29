import { fetchPortfolio, fetchUser, squareOffPort, trade, userLogin, userRegister } from "./routes";

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

export const tradeAPI = {
    path: trade,
    method: "POST"
}

export const fetchPortfolioAPI = {
    path: fetchPortfolio,
    method: "POST"
}

export const squareOffPortAPI = {
    path: squareOffPort,
    method: "POST"
}