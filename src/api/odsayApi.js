const ODSAY_API_KEY = import.meta.env.VITE_ODSAY_API_KEY;
const ODSAY_BASE_URL = "https://api.odsay.com/v1/api";

function checkOdsayKey() {
  if (!ODSAY_API_KEY) {
    throw new Error("VITE_ODSAY_API_KEY가 없습니다.");
  }
}

/**
 * 대중교통 길찾기 API
 * 출발지 좌표 → 도착지 좌표 기준으로 대중교통 경로를 가져옵니다.
 */
export async function getOdsayTransitPath({ startLocation, endLocation }) {
  checkOdsayKey();

  const params = new URLSearchParams({
    apiKey: ODSAY_API_KEY,
    SX: String(startLocation.longitude),
    SY: String(startLocation.latitude),
    EX: String(endLocation.longitude),
    EY: String(endLocation.latitude),
    SearchPathType: "0",
  });

  const response = await fetch(
    `${ODSAY_BASE_URL}/searchPubTransPathT?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("ODsay 대중교통 길찾기 API 호출에 실패했습니다.");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || "ODsay 경로 결과가 없습니다.");
  }

  return data;
}

/**
 * ODsay 노선 그래픽 API
 * 길찾기 결과의 mapObj 값으로 노선 좌표 데이터를 가져옵니다.
 */
export async function getOdsayRouteGraphic(mapObj) {
  checkOdsayKey();

  if (!mapObj) {
    throw new Error("ODsay mapObj 값이 없습니다.");
  }

  const params = new URLSearchParams({
    apiKey: ODSAY_API_KEY,
    mapObject: mapObj,
  });

  const response = await fetch(
    `${ODSAY_BASE_URL}/loadLane?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("ODsay 노선 그래픽 API 호출에 실패했습니다.");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || "ODsay 노선 그래픽 결과가 없습니다.");
  }

  return data;
}

/**
 * 선택한 주택 좌표 기준 주변 대중교통 POI 조회
 * 가까운 지하철역을 찾기 위해 사용합니다.
 */
export async function getNearbyStations({
  latitude,
  longitude,
  radius = 5000,
}) {
  checkOdsayKey();

  const params = new URLSearchParams({
    apiKey: ODSAY_API_KEY,
    x: String(longitude),
    y: String(latitude),
    radius: String(radius),
  });

  const response = await fetch(
    `${ODSAY_BASE_URL}/pointSearch?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("ODsay 주변 대중교통 POI API 호출에 실패했습니다.");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || "ODsay 주변 역 결과가 없습니다.");
  }

  return data;
}
