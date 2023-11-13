import http from "../http-common";

const getAll = () => {
  return http.get("/session");
};

const get = sessionID => {
  return http.get(`/session/${sessionID}`);
};

const create = data => {
  return http.post("/session", data);
};

const update = (sessionID, data) => {
  return http.put(`/session/update/${sessionID}`, data);
};

const remove = sessionID => {
  return http.delete(`/session/${sessionID}`);
};

const removeAll = () => {
  return http.delete(`/session`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
