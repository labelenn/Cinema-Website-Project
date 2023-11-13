import http from "../http-common";

const getAll = () => {
  return http.get("/user");
};

const get = email => {
  return http.get(`/user/${email}`);
};

const create = data => {
  return http.post("/user", data);
};

const update = (email, data) => {
  return http.put(`/user/update/${email}`, data);
};

const remove = email => {
  return http.delete(`/user/${email}`);
};

const removeAll = () => {
  return http.delete(`/user`);
};

const login = (email, data) => {
  return http.put(`/user/login/${email}`, data);
}

const loggedInUser = (email) => {
  return http.get(`/user/loggedIn`);
};

const logout = (email, data) => {
  return http.put(`/user/logout/${email}`, data);
}


export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  login,
  loggedInUser,
  logout
};
