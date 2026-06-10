import * as mockData from "../data/complexes";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

const ANNOUNCEMENTS_PATH =
  import.meta.env.VITE_ANNOUNCEMENTS_PATH || "/api/announcements";

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

function getApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

function pick(source, keys, fallback = "") {
  if (!source) return fallback;

  for (const key of keys) {
    const value = source[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return fallback;
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function toNumberOrNull(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : null;
}

function normalizeCoordinates(source = {}) {
  const coordinates =
    source.coordinates || source.coordinate || source.location || {};

  const latitude =
    pick(coordinates, ["latitude", "lat", "y"], null) ??
    pick(source, ["latitude", "lat", "y"], null);

  const longitude =
    pick(coordinates, ["longitude", "lng", "lon", "x"], null) ??
    pick(source, ["longitude", "lng", "lon", "x"], null);

  return {
    latitude: toNumberOrNull(latitude),
    longitude: toNumberOrNull(longitude),
  };
}

function normalizeSchedule(source = {}) {
  const schedule = source.schedule || source;

  return {
    announcementDate:
      pick(schedule, [
        "announcementDate",
        "announcement_date",
        "postedDate",
        "posted_date",
        "noticeDate",
        "notice_date",
      ]) ||
      pick(source, [
        "announcementDate",
        "announcement_date",
        "postedDate",
        "posted_date",
        "noticeDate",
        "notice_date",
      ]),

    applyStart:
      pick(schedule, [
        "applyStart",
        "apply_start",
        "receptionStart",
        "reception_start",
        "applicationStart",
        "application_start",
      ]) ||
      pick(source, [
        "applyStart",
        "apply_start",
        "receptionStart",
        "reception_start",
        "applicationStart",
        "application_start",
      ]),

    applyEnd:
      pick(schedule, [
        "applyEnd",
        "apply_end",
        "receptionEnd",
        "reception_end",
        "applicationEnd",
        "application_end",
      ]) ||
      pick(source, [
        "applyEnd",
        "apply_end",
        "receptionEnd",
        "reception_end",
        "applicationEnd",
        "application_end",
      ]),

    winnerAnnounce:
      pick(schedule, [
        "winnerAnnounce",
        "winner_announce",
        "winnerAnnouncement",
        "winner_announcement",
        "resultDate",
        "result_date",
      ]) ||
      pick(source, [
        "winnerAnnounce",
        "winner_announce",
        "winnerAnnouncement",
        "winner_announcement",
        "resultDate",
        "result_date",
      ]),

    contractStart:
      pick(schedule, ["contractStart", "contract_start"]) ||
      pick(source, ["contractStart", "contract_start"]),

    contractEnd:
      pick(schedule, ["contractEnd", "contract_end"]) ||
      pick(source, ["contractEnd", "contract_end"]),
  };
}

function normalizeImage(image = {}, index = 0) {
  if (typeof image === "string") {
    return {
      id: `image-${index}`,
      houseId: "",
      name: "",
      imageUrl: image,
      alt: "",
    };
  }

  return {
    id: pick(image, ["id", "imageId", "image_id"], "") || `image-${index}`,

    houseId: pick(image, ["houseId", "house_id", "complexId", "complex_id"]),

    name: pick(image, ["name", "title", "imageName", "image_name"]),

    imageUrl: pick(image, [
      "imageUrl",
      "image_url",
      "url",
      "fileUrl",
      "file_url",
      "src",
    ]),

    alt: pick(image, ["alt", "name", "title"]),
  };
}

function normalizeTable(table) {
  if (!table) return null;

  if (typeof table === "string") {
    return {
      format: "markdown",
      value: table,
    };
  }

  if (table.columns && table.rows) {
    return {
      columns: table.columns,
      rows: table.rows,
    };
  }

  return {
    format: pick(table, ["format"], table.html ? "html" : "markdown"),
    value: pick(table, [
      "value",
      "content",
      "text",
      "markdown",
      "html",
      "body",
    ]),
    columns: table.columns,
    rows: table.rows,
  };
}

function normalizeUnitType(unit = {}, index = 0) {
  return {
    id:
      pick(unit, ["id", "unitTypeId", "unit_type_id", "typeId", "type_id"]) ||
      `unit-${index}`,

    name: pick(
      unit,
      ["name", "unitTypeName", "unit_type_name", "typeName", "type_name"],
      "주택형",
    ),

    sizeSqm: pick(
      unit,
      [
        "sizeSqm",
        "size_sqm",
        "area",
        "exclusiveArea",
        "exclusive_area",
        "supplyArea",
        "supply_area",
      ],
      0,
    ),

    rooms: pick(unit, ["rooms", "roomCount", "room_count"], 0),

    bathrooms: pick(unit, ["bathrooms", "bathroomCount", "bathroom_count"], 0),

    priceMillionWon: pick(
      unit,
      ["priceMillionWon", "price_million_won", "price", "deposit"],
      0,
    ),

    images: toArray(unit.images || unit.imageList || unit.image_list).map(
      normalizeImage,
    ),

    floorPlans: toArray(
      unit.floorPlans ||
        unit.floor_plans ||
        unit.floorPlanImages ||
        unit.floor_plan_images ||
        unit.planImages ||
        unit.plan_images,
    ).map(normalizeImage),
  };
}

function normalizeHouseInfo(house = {}, index = 0) {
  return {
    id:
      pick(house, ["id", "houseId", "house_id", "complexId", "complex_id"]) ||
      `house-${index}`,

    complexName: pick(
      house,
      [
        "complexName",
        "complex_name",
        "name",
        "houseName",
        "house_name",
        "buildingName",
        "building_name",
      ],
      "공급정보",
    ),

    address: pick(house, ["address", "addr", "roadAddress", "road_address"]),

    sizeRange: pick(house, [
      "sizeRange",
      "size_range",
      "areaRange",
      "area_range",
    ]),

    totalHouseholds: pick(
      house,
      [
        "totalHouseholds",
        "total_households",
        "households",
        "totalCount",
        "total_count",
      ],
      0,
    ),

    heatingType: pick(house, ["heatingType", "heating_type"]),

    moveInDate: pick(house, [
      "moveInDate",
      "move_in_date",
      "moveInMonth",
      "move_in_month",
    ]),

    coordinates: normalizeCoordinates(house),

    images: toArray(house.images || house.imageList || house.image_list).map(
      normalizeImage,
    ),

    unitTypes: toArray(
      house.unitTypes ||
        house.unit_types ||
        house.units ||
        house.supplyTypes ||
        house.supply_types ||
        house.housingTypes ||
        house.housing_types,
    ).map(normalizeUnitType),
  };
}

function normalizeAnnouncement(data = {}) {
  return {
    id:
      pick(data, [
        "id",
        "announcementId",
        "announcement_id",
        "noticeId",
        "notice_id",
        "panId",
        "pan_id",
      ]) || "unknown-id",

    announcementName: pick(
      data,
      [
        "announcementName",
        "announcement_name",
        "title",
        "name",
        "noticeName",
        "notice_name",
      ],
      "모집공고",
    ),

    announcementType: pick(
      data,
      [
        "announcementType",
        "announcement_type",
        "type",
        "category",
        "noticeType",
        "notice_type",
      ],
      "공공임대",
    ),

    region: pick(data, ["region", "area", "location"], "지역 정보 없음"),

    source: pick(data, ["source", "provider"], "LH"),

    postedDate: pick(data, [
      "postedDate",
      "posted_date",
      "announcementDate",
      "announcement_date",
      "noticeDate",
      "notice_date",
    ]),

    status: pick(data, ["status"], "공고"),

    thumbnailUrl: pick(data, [
      "thumbnailUrl",
      "thumbnail_url",
      "imageUrl",
      "image_url",
      "mainImageUrl",
      "main_image_url",
    ]),

    originalUrl: pick(
      data,
      ["originalUrl", "original_url", "noticeUrl", "notice_url"],
      "#",
    ),

    applyUrl: pick(data, ["applyUrl", "apply_url"], "#"),

    attachmentUrl: pick(
      data,
      ["attachmentUrl", "attachment_url", "fileUrl", "file_url"],
      "#",
    ),

    hasAttachment:
      data.hasAttachment ?? data.has_attachment ?? Boolean(data.attachmentUrl),

    eligibilityImages: toArray(
      data.eligibilityImages || data.eligibility_images,
    ).map(normalizeImage),

    eligibilityTable: normalizeTable(
      data.eligibilityTable || data.eligibility_table,
    ),

    winnerSelectionImages: toArray(
      data.winnerSelectionImages || data.winner_selection_images,
    ).map(normalizeImage),

    winnerSelectionTable: normalizeTable(
      data.winnerSelectionTable || data.winner_selection_table,
    ),

    schedule: {
      ...defaultSchedule,
      ...normalizeSchedule(data),
    },

    specialNotes: pick(data, ["specialNotes", "special_notes", "notice"]),

    houseInfoList: toArray(
      data.houseInfoList ||
        data.house_info_list ||
        data.supplyInfoList ||
        data.supply_info_list ||
        data.houses ||
        data.houseList ||
        data.house_list ||
        data.complexes ||
        data.complexList ||
        data.complex_list,
    ).map(normalizeHouseInfo),

    houseImages: toArray(data.houseImages || data.house_images).map(
      normalizeImage,
    ),

    floorPlans: toArray(data.floorPlans || data.floor_plans).map(
      normalizeImage,
    ),

    addresses: toArray(data.addresses || data.address_list),
  };
}

function unwrapListPayload(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  const list =
    payload.announcements ||
    payload.items ||
    payload.results ||
    payload.content ||
    payload.data;

  if (Array.isArray(list)) {
    return list;
  }

  if (Array.isArray(list?.items)) {
    return list.items;
  }

  if (Array.isArray(list?.announcements)) {
    return list.announcements;
  }

  if (Array.isArray(list?.content)) {
    return list.content;
  }

  return [];
}

function unwrapDetailPayload(payload) {
  if (!payload) return null;

  if (payload.announcement) return payload.announcement;
  if (payload.item) return payload.item;
  if (payload.result && !Array.isArray(payload.result)) return payload.result;
  if (payload.data && !Array.isArray(payload.data)) return payload.data;

  return payload;
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

  const response = await fetch(getApiUrl(ANNOUNCEMENTS_PATH), {
    method: "GET",
    credentials: "include",
  });

  const data = await handleResponse(response);
  const list = unwrapListPayload(data);

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

  const response = await fetch(getApiUrl(`${ANNOUNCEMENTS_PATH}/${id}`), {
    method: "GET",
    credentials: "include",
  });

  const data = await handleResponse(response);
  const detail = unwrapDetailPayload(data);

  return normalizeAnnouncement(detail);
}
