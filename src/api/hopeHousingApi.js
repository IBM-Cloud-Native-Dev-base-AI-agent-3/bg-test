const AI_API_BASE_URL =
  import.meta.env.VITE_AI_API_BASE_URL || "http://localhost:8000";

export async function predictHopeHousing(requestBody) {
  const response = await fetch(`${AI_API_BASE_URL}/predict/hope-housing`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("당첨 확률 예측 API 호출에 실패했습니다.");
  }

  return response.json();
}
