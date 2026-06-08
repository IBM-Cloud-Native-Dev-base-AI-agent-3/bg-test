const PAJU_THUMB_1 =
  "https://i.namu.wiki/i/zJ2SWtCwjyKCN18ufUq2R9AZQlO6uFWC3eYEeQst1czNvNC9NHBWKsO83Pbsl1uGnvLTI9Gj6EBDJtS5dkGg5EI6g01Q-DnKTbYxTkltlnBXOiVd1a7TkiV0gNpMQXQwD-3KmZhhCSh2GAuf1NUpyw.webp";

const PAJU_THUMB_2 =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80";

const PAJU_THUMB_3 =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80";

const SAMPLE_FLOOR_PLAN =
  "https://placehold.co/900x560/eef4ff/0057ff?text=Floor+Plan";

export const announcements = [
  {
    id: "ann-paju-20260605",

    announcementName: "파주시 행복주택 예비입주자 모집공고(26.06.05)",
    announcementType: "행복주택",
    region: "경기도 파주시",
    source: "LH",
    postedDate: "2026.06.05",
    status: "모집중",

    thumbnailUrl: PAJU_THUMB_1,

    originalUrl:
      "https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancInfo.do",
    applyUrl:
      "https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancInfo.do",
    attachmentUrl: "#",
    hasAttachment: true,

    targetGroups: [
      "대학생",
      "신혼부부",
      "주거취약계층",
      "저소득층",
      "무주택자",
    ],

    housingType: "아파트",

    inquiry: {
      agency: "LH 콜센터",
      phone: "1600-1004",
      operatingHours: "평일 09:00 ~ 18:00",
    },

    eligibilityImages: [
      {
        id: "eligibility-paju-1",
        imageUrl: "",
        alt: "파주시 행복주택 신청자격 이미지",
      },
    ],

    eligibilityTable: {
      columns: ["구분", "신청자격", "세부조건"],
      rows: [
        [
          "대학생·청년",
          "무주택 요건 충족",
          "공고문 기준 소득·자산 및 계층 요건 확인 필요",
        ],
        [
          "신혼부부",
          "무주택세대구성원",
          "혼인기간, 자녀 여부, 소득·자산 기준 확인 필요",
        ],
        [
          "주거취약계층·저소득층",
          "관련 자격 보유자",
          "수급자, 차상위 등 증빙서류 확인 필요",
        ],
      ],
    },

    winnerSelectionImages: [
      {
        id: "winner-paju-1",
        imageUrl: "",
        alt: "파주시 행복주택 입주자 선정기준 이미지",
      },
    ],

    winnerSelectionTable: {
      columns: ["구분", "선정기준", "비고"],
      rows: [
        [
          "1순위",
          "계층별 우선순위 및 배점 적용",
          "세부 기준은 원문 공고문 확인",
        ],
        ["2순위", "배점 합산 후 고득점자 선정", "동점 시 추첨 가능"],
        [
          "예비입주자",
          "공가 발생 시 순번에 따라 입주",
          "계약 포기 시 후순위 진행",
        ],
      ],
    },

    schedule: {
      announcementDate: "2026.06.05",
      applyStart: "2026.06.19",
      applyEnd: "2026.06.22",
      winnerAnnounce: "2026.09.30",
      contractStart: "",
      contractEnd: "",
    },

    specialNotes:
      "금회 모집은 인터넷/모바일 신청이 원칙이며, 장애인 및 만 65세 이상 고령자 등 인터넷 사용이 어려운 신청자에 한해 현장 방문접수를 병행합니다. 실제 신청 전 반드시 LH 원문 공고문을 확인해야 합니다.",

    houseInfoList: [
      {
        id: "house-paju-1",
        complexName: "운정산내1",
        complexFullName: "파주운정A21 산내1 행복주택",
        housingType: "16형 ~ 36형",
        sizeSqm: 16.06,
        sizeRange: "16.06~36.22㎡",
        rooms: 1,
        bathrooms: 1,
        priceMillionWon: 0,
        deposit: "공고문 확인",
        monthlyRent: "공고문 확인",
        maintenanceFee: "별도",
        supplyCount: 0,
        totalHouseholds: 1700,
        heatingType: "지역난방",
        moveInDate: "2017.12",
      },
      {
        id: "house-paju-2",
        complexName: "운정가람14",
        complexFullName: "파주운정A39BL 가람14 행복주택",
        housingType: "16A / 26A / 36A",
        sizeSqm: 16.67,
        sizeRange: "16.67~36.51㎡",
        rooms: 1,
        bathrooms: 1,
        priceMillionWon: 0,
        deposit: "공고문 확인",
        monthlyRent: "공고문 확인",
        maintenanceFee: "별도",
        supplyCount: 0,
        totalHouseholds: 580,
        heatingType: "지역난방",
        moveInDate: "2020.07",
      },
      {
        id: "house-paju-3",
        complexName: "운정초롱꽃3",
        complexFullName: "파주운정3 A34BL 초롱꽃3 행복주택",
        housingType: "24A / 26A / 46A",
        sizeSqm: 24.66,
        sizeRange: "24.66~46.79㎡",
        rooms: 1,
        bathrooms: 1,
        priceMillionWon: 0,
        deposit: "공고문 확인",
        monthlyRent: "공고문 확인",
        maintenanceFee: "별도",
        supplyCount: 0,
        totalHouseholds: 1448,
        heatingType: "지역난방",
        moveInDate: "2022.08",
      },
    ],

    houseImages: [
      {
        id: "house-img-paju-1",
        houseId: "house-paju-1",
        imageUrl: PAJU_THUMB_1,
        alt: "운정산내1 행복주택 이미지",
      },
      {
        id: "house-img-paju-2",
        houseId: "house-paju-2",
        imageUrl: PAJU_THUMB_2,
        alt: "운정가람14 행복주택 이미지",
      },
      {
        id: "house-img-paju-3",
        houseId: "house-paju-3",
        imageUrl: PAJU_THUMB_3,
        alt: "운정초롱꽃3 행복주택 이미지",
      },
    ],

    floorPlans: [
      {
        id: "floor-paju-1",
        houseId: "house-paju-1",
        imageUrl:
          "https://cfgwjnavbbck16272555.cdn.ntruss.com/Bimages/202004/2105792699_Ctl8AaoX_1587437073.png",
        alt: "운정산내1 평면도",
      },
      {
        id: "floor-paju-2",
        houseId: "house-paju-2",
        imageUrl: SAMPLE_FLOOR_PLAN,
        alt: "운정가람14 평면도",
      },
      {
        id: "floor-paju-3",
        houseId: "house-paju-3",
        imageUrl: SAMPLE_FLOOR_PLAN,
        alt: "운정초롱꽃3 평면도",
      },
    ],

    addresses: [
      {
        id: "addr-paju-1",
        houseId: "house-paju-1",
        complexName: "운정산내1",
        address: "경기도 파주시 교하로 20(목동동, 산내마을1단지)",
        coordinates: {
          latitude: 37.7248,
          longitude: 126.7356,
        },
      },
      {
        id: "addr-paju-2",
        houseId: "house-paju-2",
        complexName: "운정가람14",
        address: "경기도 파주시 소리천로 203(와동동) 가람마을14단지",
        coordinates: {
          latitude: 37.7327,
          longitude: 126.7545,
        },
      },
      {
        id: "addr-paju-3",
        houseId: "house-paju-3",
        complexName: "운정초롱꽃3",
        address: "경기도 파주시 초롱꽃로 17(동패동) 초롱꽃마을3단지",
        coordinates: {
          latitude: 37.7155,
          longitude: 126.7338,
        },
      },
    ],
  },
];

// 기존 import가 아직 complexes를 보고 있으면 깨지지 않게 임시 유지
export const complexes = announcements;
