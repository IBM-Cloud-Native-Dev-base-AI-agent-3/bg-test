import { announcements } from "../data/complexes";

const USE_MOCK = true;

export async function getComplexes() {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(announcements);
      }, 300);
    });
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/announcements`,
  );

  if (!response.ok) {
    throw new Error("모집공고 목록을 불러오지 못했습니다.");
  }

  return response.json();
}

export async function getComplexDetail(id) {
  if (USE_MOCK) {
    const result = announcements.find((item) => String(item.id) === String(id));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("모집공고를 찾을 수 없습니다."));
        }
      }, 300);
    });
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/announcements/${id}`,
  );

  if (!response.ok) {
    throw new Error("모집공고 상세 정보를 불러오지 못했습니다.");
  }

  return response.json();
}
