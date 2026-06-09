import * as mockData from "../data/complexes";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

const mockAnnouncements =
  mockData.announcements || mockData.complexes || mockData.default || [];

const defaultSchedule = {
  announcementDate: "",
  applyStart: "",
  applyEnd: "",
  winnerAnnounce: "",
  contractStart: "",
  contractEnd: "",
};

function normalizeAnnouncement(data) {
  return {
    id: data.id || data.announcementId || "unknown-id",

    announcementName:
      data.announcementName || data.title || data.name || "모집공고",

    announcementType:
      data.announcementType || data.type || data.category || "공공임대",

    region: data.region || data.area || "지역 정보 없음",

    source: data.source || data.provider || "LH",

    postedDate:
      data.postedDate ||
      data.createdAt ||
      data.schedule?.announcementDate ||
      "",

    status: data.status || "공고",

    thumbnailUrl: data.thumbnailUrl || data.imageUrl || "",

    originalUrl: data.originalUrl || data.noticeUrl || "#",

    applyUrl: data.applyUrl || "#",

    attachmentUrl: data.attachmentUrl || "#",

    hasAttachment: data.hasAttachment ?? false,

    eligibilityImages: data.eligibilityImages || [],

    eligibilityTable: data.eligibilityTable || null,

    winnerSelectionImages: data.winnerSelectionImages || [],

    winnerSelectionTable: data.winnerSelectionTable || null,

    schedule: {
      ...defaultSchedule,
      ...(data.schedule || {}),
    },

    specialNotes: data.specialNotes || "",

    houseInfoList: data.houseInfoList || [],

    houseImages: data.houseImages || [],

    floorPlans: data.floorPlans || [],

    addresses: data.addresses || [],
  };
}

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
}

export async function getComplexes() {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnnouncements.map(normalizeAnnouncement));
      }, 300);
    });
  }

  const response = await fetch(`${API_BASE_URL}/api/announcements`, {
    method: "GET",
    credentials: "include",
  });

  const data = await handleResponse(response);

  const list = Array.isArray(data)
    ? data
    : data.announcements || data.items || data.data || [];

  return list.map(normalizeAnnouncement);
}

export async function getComplexDetail(id) {
  if (USE_MOCK) {
    const result = mockAnnouncements.find(
      (item) => String(item.id) === String(id),
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (result) {
          resolve(normalizeAnnouncement(result));
        } else {
          reject(new Error("모집공고를 찾을 수 없습니다."));
        }
      }, 300);
    });
  }

  const response = await fetch(`${API_BASE_URL}/api/announcements/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await handleResponse(response);

  return normalizeAnnouncement(data);
}
