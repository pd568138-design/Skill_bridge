import axios from "axios";

const API = "http://localhost:5000/api/learners";

// GET all learners
export const getLearners = () => axios.get(API);

// CREATE learner
export const addLearner = (data) => axios.post(API, data);

// DELETE learner
export const deleteLearner = (id) => axios.delete(`${API}/${id}`);

// UPDATE learner
export const updateLearner = (id, data) =>
  axios.put(`${API}/${id}`, data);