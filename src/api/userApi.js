import axiosClient from "./axiosClient";

const userApi = {
  login: (userName, password) => {
    const url = "/admin/login";
    return axiosClient.post(url, { username: userName, password: password });
  },

  register: (email, userName, fullName, password) => {
    const url = "/admin/register";
    return axiosClient.post(url, {
      username: userName,
      password: password,
      name: fullName,
      email: email,
    });
  },

  updateProfile: (newName, newEmail, newUserName) => {
    const url = `/admin/update`;
    return axiosClient.put(url, {
      newName: newName,
      newEmail: newEmail,
      newUserName: newUserName,
    });
  },

  loadAvatar: (filename) => {
    const url = `/image/avatar/${filename}`;
    return axiosClient.get(url);
  },

  getAvatar: (filename) => {
    const url = `/image/get/${filename}`;
    return axiosClient.get(url);
  },

  uploadAvatar: (data) => {
    const url = "/image";
    return axiosClient.post(url, data);
  },

  getProfile: () => {
    const url = `/admin/profile`;
    return axiosClient.get(url);
  },

  changePassword: (oldPassword, newPassword) => {
    const url = `/admin/change_password`;
    return axiosClient.put(url, {
      oldPassword: oldPassword,
      newPassword: newPassword
    });
  },

  forgotPassword: (email) => {
    const url = `/admin/forgot_password`;
    return axiosClient.post(url, {
      email: email,
    });
  },

  resetPassword: (new_password, reset_password_link) => {
    const url = `/admin/reset_password`;
    return axiosClient.put(url, {
      newPassWord: new_password,
      resetPassWordLink: reset_password_link,
    });
  },

  active: (token) => {
    const url = "/admin/active";
    return axiosClient.post(url, { token: token });
  },
};

export default userApi;
