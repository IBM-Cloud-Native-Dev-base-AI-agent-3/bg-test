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

const defaultNoticeAnalysis = {
  summary: {
    target: "무주택자, 대학생(청년)",
    supplyAreas: ["서울 강서구", "서울 마포구", "서울 성북구"],
    recruitmentAreaText: "3개 지역",
    totalSupplyCount: 18,
    maxResidencePeriod: "최장 20년",
    depositRange: "1,090,000원",
    monthlyRentRange: "90,900원 ~ 145,300원",
    keyPoint: "서울 주요 지역 청년 대상 원룸형 임대주택 공급",
  },

  recruitmentRegions: [
    {
      district: "강서구",
      address: "서울특별시 강서구 수명로 1길 131 (내발산 공공기숙사)",
      housingType: "원룸형-(장애인/일반)",
      supplyCount: 1,
    },
    {
      district: "성북구",
      address: "서울특별시 성북구 정릉로 199 (정릉 희망하우징)",
      housingType: "원룸형",
      supplyCount: 6,
    },
    {
      district: "마포구",
      address: "서울특별시 마포구 성미산로 17길 79 (연남 공공원룸텔)",
      housingType: "원룸형",
      supplyCount: 11,
    },
  ],

  scheduleSteps: [
    {
      title: "입주자 모집공고",
      date: "26.5.11.(월)",
      desc: "SH 홈페이지 게시",
      isHighlight: false,
    },
    {
      title: "사전 주택공개",
      date: "26.5.20.(수) ~ 5.22.(금)",
      desc: "10:00~17:00 / 12~13시 제외",
      isHighlight: false,
    },
    {
      title: "신청접수",
      date: "26.5.26.(화) 10:00 ~ 5.28.(목) 17:00",
      desc: "순위무관 동시접수",
      isHighlight: false,
    },
    {
      title: "서류심사 대상자발표",
      date: "26.6.2.(화)",
      desc: "심사서류 제출: 26.6.8.(월) ~ 6.10.(수)",
      isHighlight: false,
    },
    {
      title: "입주자격 검증 및 소명",
      date: "26.6월 ~ 7월",
      desc: "당첨자 최종발표: 26.8.10.(월)",
      isHighlight: false,
    },
    {
      title: "주택공개",
      date: "26.8.12.(수) ~ 8.14.(금)",
      desc: "사전점검 / 당첨자에 한함",
      isHighlight: false,
    },
    {
      title: "계약체결",
      date: "26.8.19.(수) ~ 8.21.(금)",
      desc: "입주: 26.8.31.(월) ~ 10.30.(금)",
      isHighlight: true,
    },
  ],

  priorityConditions: [
    {
      rank: "1순위",
      qualification: "생계·의료급여 수급자 가구",
      description:
        "국민기초생활보장법 기준에 따른 수급자 가구 및 차상위계층 등 우선공급 대상",
    },
    {
      rank: "1순위",
      qualification: "지원대상 한부모가족",
      description:
        "한부모가족지원법 시행규칙 기준에 해당하는 지원대상 한부모가족",
    },
    {
      rank: "2순위",
      qualification: "일반",
      description:
        "본인 및 부모의 월평균소득이 전년도 도시근로자 가구당 월평균소득의 100% 이하인 자",
    },
    {
      rank: "3순위",
      qualification: "일반",
      description:
        "본인의 월평균소득이 전년도 도시근로자 가구당 월평균소득의 100% 이하인 자",
    },
  ],

  supplyTargets: [
    {
      housingName: "내발산 공공기숙사",
      housingType: "원룸형 1인실",
      exclusiveArea: "23.3㎡",
      gender: "여성",
      supplyCount: 1,
    },
    {
      housingName: "정릉 희망하우징",
      housingType: "원룸형 1인실",
      exclusiveArea: "14.2㎡",
      gender: "남성/여성",
      supplyCount: 6,
    },
    {
      housingName: "연남 공공원룸텔",
      housingType: "원룸형 1인실",
      exclusiveArea: "13.4㎡",
      gender: "남성/여성",
      supplyCount: 11,
    },
  ],

  rentConditions: [
    {
      housingName: "내발산 공공기숙사",
      deposit: "-",
      monthlyRent: "-",
      maintenanceFee: "120,000원",
    },
    {
      housingName: "정릉 희망하우징",
      deposit: "1,090,000원",
      monthlyRent: "90,900원",
      maintenanceFee: "-",
    },
    {
      housingName: "연남 공공원룸텔",
      deposit: "1,090,000원",
      monthlyRent: "145,300원",
      maintenanceFee: "-",
    },
  ],

  originalNotice: {
    pdfUrl: "#",
    applyUrl: "#",
  },
};

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

    noticeAnalysis: defaultNoticeAnalysis,

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
