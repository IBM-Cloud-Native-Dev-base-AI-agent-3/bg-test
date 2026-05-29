import axios from "axios";

const ODSAY_API_KEY = import.meta.env.VITE_ODSAY_API_KEY;

export async function getPublicTransitRoute({
  startLongitude,
  startLatitude,
  endLongitude,
  endLatitude,
}) {
  if (!ODSAY_API_KEY) {
    throw new Error("VITE_ODSAY_API_KEY가 설정되지 않았습니다.");
  }

  const response = await axios.get(
    "https://api.odsay.com/v1/api/searchPubTransPathT",
    {
      params: {
        apiKey: ODSAY_API_KEY,
        SX: startLongitude,
        SY: startLatitude,
        EX: endLongitude,
        EY: endLatitude,
      },
    },
  );

  if (response.data?.error) {
    throw new Error(response.data.error.msg || "ODsay API 오류입니다.");
  }

  return response.data;
}

export async function getRouteGraphic(mapObject) {
  if (!mapObject) {
    return null;
  }

  if (!ODSAY_API_KEY) {
    throw new Error("VITE_ODSAY_API_KEY가 설정되지 않았습니다.");
  }

  const response = await axios.get("https://api.odsay.com/v1/api/loadLane", {
    params: {
      apiKey: ODSAY_API_KEY,
      mapObject,
    },
  });

  if (response.data?.error) {
    throw new Error(
      response.data.error.msg || "ODsay loadLane API 오류입니다.",
    );
  }

  return response.data;
}
