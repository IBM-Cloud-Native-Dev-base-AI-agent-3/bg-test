import axios from "axios";
import { complexes } from "../data/complexes";

const USE_MOCK = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  timeout: 5000,
});

export async function getComplexes() {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(complexes);
      }, 300);
    });
  }

  const response = await api.get("/api/complexes");
  return response.data;
}

export async function getComplexDetail(id) {
  if (USE_MOCK) {
    const result = complexes.find((item) => item.id === Number(id));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("단지 정보를 찾을 수 없습니다."));
        }
      }, 300);
    });
  }

  const response = await api.get(`/api/complexes/${id}`);
  return response.data;
}
