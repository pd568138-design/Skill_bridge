import axios from "axios";

const API = "http://localhost:5000/api/challenges";

export const getChallenges = async () => {
  return await axios.get(API);
};

export const addChallenge = async (data) => {
  return await axios.post(API, data);
};

export const deleteChallenge = async (id) => {
  return await axios.delete(`${API}/${id}`);
};