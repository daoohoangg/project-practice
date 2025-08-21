import axios from "axios";

const API_URL = "http://localhost:8081/api/pets";

export async function getPetsApi() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function addPetApi(pet: { name: string; weight: number; type: string }) {
  const res = await axios.post(API_URL, pet);
  return res.data;
}
