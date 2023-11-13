import http from "../http-common";

const getAll = () => {
  return http.get("/review");
};

const getAllByEmail = email => {
  return http.get(`/review/all-by-email/${email}`);
};

const get = reviewID => {
  return http.get(`/review/${reviewID}`);
};

const create = data => {
  return http.post("/review", data);
};

const update = (reviewID, data) => {
  return http.put(`/review/update/${reviewID}`, data);
};

const remove = reviewID => {
  return http.delete(`/review/${reviewID}`);
};

const removeAll = () => {
  return http.delete(`/review`);
};

export default {
  getAll,
  getAllByEmail,
  get,
  create,
  update,
  remove,
  removeAll,
};
