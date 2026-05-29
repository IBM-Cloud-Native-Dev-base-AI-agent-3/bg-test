const SAMPLE_HOUSE_IMAGE_1 =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80";

const SAMPLE_HOUSE_IMAGE_2 =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80";

const SAMPLE_HOUSE_IMAGE_3 =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80";

const SAMPLE_HOUSE_IMAGE_4 =
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80";

const SAMPLE_FLOOR_PLAN =
  "https://placehold.co/900x560/eef4ff/0057ff?text=Floor+Plan";

const commonHousingTypes = [
  {
    type: "104A",
    exclusiveArea: "104.81㎡",
    pyeong: "44.1평",
    householdCount: 318,
    deposit: "467,000,000원",
    monthlyRent: "0원",
    commonArea: "40.66㎡",
    supplyArea: "145.47㎡",
    conversionDeposit: "-",
    floorPlanImage: SAMPLE_FLOOR_PLAN,
  },
  {
    type: "84A",
    exclusiveArea: "84.87㎡",
    pyeong: "35.9평",
    householdCount: 278,
    deposit: "387,000,000원",
    monthlyRent: "0원",
    commonArea: "35.21㎡",
    supplyArea: "120.08㎡",
    conversionDeposit: "-",
    floorPlanImage: SAMPLE_FLOOR_PLAN,
  },
  {
    type: "84B",
    exclusiveArea: "84.98㎡",
    pyeong: "36.2평",
    householdCount: 121,
    deposit: "382,000,000원",
    monthlyRent: "0원",
    commonArea: "35.32㎡",
    supplyArea: "120.30㎡",
    conversionDeposit: "-",
    floorPlanImage: SAMPLE_FLOOR_PLAN,
  },
];

function createComplex(overrides) {
  return {
    id: 0,
    region: "서울",
    supplyType: "민간",
    rentType: "민간임대",
    name: "샘플 단지",
    address: "서울특별시 강남구",
    imageUrl: SAMPLE_HOUSE_IMAGE_1,
    priceText: "조건 확인",
    locationShort: "서울",
    badges: ["NEW"],

    latitude: 37.5665,
    longitude: 126.978,

    isRecruiting: false,
    statusMessage: "현재 모집중이 아닙니다.",
    nextRecruitmentMessage: "다음 모집공고를 기다려 주세요",

    basicInfo: [
      { label: "임대종류", value: "민간임대" },
      { label: "세대수", value: "897" },
      { label: "입주예정", value: "2029.06" },
      { label: "건물형태", value: "-" },
      { label: "승강기", value: "전체동 설치" },
      { label: "주차수", value: "-" },
      { label: "난방 방식", value: "지역난방" },
      { label: "건설사", value: "(주)포스코이앤씨" },
    ],

    housingTypes: commonHousingTypes,

    competitionRates: [
      { date: "26.01.26", average: 0 },
      { date: "26.03.25", average: 2.2 },
    ],

    recruitmentHistory: [
      {
        id: 1,
        title: "해당단지는 최근 1년간 2회 모집하였습니다.",
        description: "공고이력으로 다음 모집일을 예상해보세요",
      },
    ],

    nearbyInfo: [
      { label: "지하철", value: "인근 지하철역 위치 확인 가능" },
      { label: "학교", value: "주변 초·중·고 위치" },
      { label: "생활시설", value: "마트, 공원, 병원 등 생활 인프라" },
    ],

    nearestStation: {
      name: "오산역",
      line: "수도권 1호선",
      distance: "약 1.2km",
      walkingTime: "도보 약 18분",
      latitude: 37.1459,
      longitude: 127.0667,
    },

    ...overrides,
  };
}

export const complexes = [
  createComplex({
    id: 1,
    region: "경기 오산시",
    supplyType: "민간",
    rentType: "민간임대",
    name: "더샵오산역아크시티",
    address: "경기도 오산시 가수동 453번지",
    imageUrl: SAMPLE_HOUSE_IMAGE_1,
    priceText: "4.67억/0",
    locationShort: "경기 오산시",
    badges: ["민간임대", "NEW"],
    latitude: 37.1469,
    longitude: 127.0705,
    nearestStation: {
      name: "오산역",
      line: "수도권 1호선",
      distance: "약 1.2km",
      walkingTime: "도보 약 18분",
      latitude: 37.1459,
      longitude: 127.0667,
    },
  }),

  createComplex({
    id: 2,
    region: "서울 강남구",
    supplyType: "장기전세",
    rentType: "공공임대",
    name: "강남 브리즈힐",
    address: "서울특별시 강남구 자곡동",
    imageUrl: SAMPLE_HOUSE_IMAGE_2,
    priceText: "1.2억/15만",
    locationShort: "강남구 자곡동",
    badges: ["장기전세", "NEW"],
    latitude: 37.4765,
    longitude: 127.1052,
    nearestStation: {
      name: "수서역",
      line: "수도권 3호선",
      distance: "약 1.0km",
      walkingTime: "도보 약 15분",
      latitude: 37.4875,
      longitude: 127.1011,
    },
  }),

  createComplex({
    id: 3,
    region: "마포구 공덕동",
    supplyType: "행복주택",
    rentType: "공공임대",
    name: "마포 펜트하우스",
    address: "서울특별시 마포구 공덕동",
    imageUrl: SAMPLE_HOUSE_IMAGE_3,
    priceText: "8천/24만",
    locationShort: "마포구 공덕동",
    badges: ["행복주택", "모집예정"],
    latitude: 37.5446,
    longitude: 126.9519,
    nearestStation: {
      name: "공덕역",
      line: "수도권 5호선",
      distance: "약 700m",
      walkingTime: "도보 약 10분",
      latitude: 37.5445,
      longitude: 126.951,
    },
  }),

  createComplex({
    id: 4,
    region: "김포시 구래동",
    supplyType: "장기전세",
    rentType: "공공임대",
    name: "수서 에센셜 1단지",
    address: "경기도 김포시 구래동",
    imageUrl: SAMPLE_HOUSE_IMAGE_4,
    priceText: "2.5억/0",
    locationShort: "김포시 구래동",
    badges: ["장기전세", "모집중"],
    latitude: 37.6457,
    longitude: 126.6288,
    nearestStation: {
      name: "구래역",
      line: "김포골드라인",
      distance: "약 900m",
      walkingTime: "도보 약 13분",
      latitude: 37.6451,
      longitude: 126.6286,
    },
  }),

  createComplex({
    id: 5,
    region: "김포시 구래동",
    supplyType: "장기전세",
    rentType: "공공임대",
    name: "수서 에센셜 1단지",
    address: "경기도 김포시 구래동",
    imageUrl: SAMPLE_HOUSE_IMAGE_4,
    priceText: "2.5억/0",
    locationShort: "김포시 구래동",
    badges: ["장기전세", "모집중"],
    latitude: 37.6457,
    longitude: 126.6288,
    nearestStation: {
      name: "구래역",
      line: "김포골드라인",
      distance: "약 900m",
      walkingTime: "도보 약 13분",
      latitude: 37.6451,
      longitude: 126.6286,
    },
  }),
];
