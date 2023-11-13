import http from "../http-common";

const getAll = () => {
  return http.get("/movie");
};

const get = movieID => {
  return http.get(`/movie/${movieID}`);
};

const create = data => {
  return http.post("/movie", data);
};

const update = (movieID, data) => {
  return http.put(`/movie/update/${movieID}`, data);
};

const remove = movieID => {
  return http.delete(`/movie/${movieID}`);
};

const removeAll = () => {
  return http.delete(`/movie`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
