import axios from "axios";

const API = "http://localhost:5000/api/mentors";

export const getMentors = () =>
  axios.get(API);

export const addMentor = (data) =>
  axios.post(API, data);

export const deleteMentor = (id) =>
  axios.delete(`${API}/${id}`);