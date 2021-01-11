import cookieService from "../../../service/cookieService";
import jwt_decode from "jwt-decode";
const Auth = {
  setAccessToken: function (token, next) {
    cookieService.set("access_token", token);
    localStorage.setItem("access_token", token);
    next();
    // return cookieService.set("access_token", token);
  },
  getAccessToken: function () {
    return localStorage.getItem("access_token");
    // return cookieService.get("access_token");
  },
  isAuthenticated: function () {
    return localStorage.getItem("access_token") ? true : false;
    // return cookieService.get("access_token") ? true : false;
  },
  logout: function (next) {
    cookieService.remove("access_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("isSocial");
    next();
    // return cookieService.remove("access_token");
  },
  isSocialLogin: function () {
    return localStorage.getItem("isSocial") ? true : false;
  },
  getCurrentUser: function () {
    const token = this.getAccessToken();
    return jwt_decode(token);
  },
  getCurrentUser: function () {
    const token = this.getAccessToken();
    return jwt_decode(token);
  },
};

export default Auth;
