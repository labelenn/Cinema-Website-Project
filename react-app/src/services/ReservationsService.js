import http from "../http-common";

const getAll = () => {
  return http.get("/reservation");
};

const get = reservationID => {
  return http.get(`/reservation/${reservationID}`);
};

const create = data => {
  return http.post("/reservation", data);
};

const update = (reservationID, data) => {
  return http.put(`/reservation/update/${reservationID}`, data);
};

const remove = reservationID => {
  return http.delete(`/reservation/${reservationID}`);
};

const removeAll = () => {
  return http.delete(`/reservation`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
