import { allNews, fetchPortfolio, fetchUser, forgotPassword, resetPassword, squareOffPort, topNews, trade, updateProfile, userLogin, userRegister } from "./routes";

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

export const forgotPasswordAPI = {
    path: forgotPassword,
    method: "POST"
}

export const resetPasswordAPI = {
    path: resetPassword,
    method: "POST"
}

export const updateProfileAPI = {
    path: updateProfile,
    method: "POST"
}

export const getTopNewsAPI = {
    path: topNews,
    method: "GET"
}

export const getAllNewsAPI = {
    path: allNews,
    method: "GET"
}