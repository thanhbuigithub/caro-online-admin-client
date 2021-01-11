import Cookies from "universal-cookie";

const cookies = new Cookies();

const cookieService = {
  get: function (key) {
    return cookies.get(key);
  },
  set: function (key, value) {
    cookies.set(key, value);
  },
  remove: function (key) {
    cookies.remove(key);
  },
};

export default cookieService;
