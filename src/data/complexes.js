const PAJU_THUMBNAIL =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80";

const HOUSE_IMAGE_1 =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80";

const HOUSE_IMAGE_2 =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80";

const HOUSE_IMAGE_3 =
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80";

const FLOOR_PLAN_1 =
  "https://placehold.co/900x560/eef4ff/0057ff?text=Unjeong+Sannae+1+Floor+Plan";

const FLOOR_PLAN_2 =
  "https://placehold.co/900x560/eef4ff/0057ff?text=Unjeong+Garam+14+Floor+Plan";

const FLOOR_PLAN_3 =
  "https://placehold.co/900x560/eef4ff/0057ff?text=Unjeong+Chorongkkot+3+Floor+Plan";

export const announcements = [
  {
    id: "ann-paju-20260605",

    announcementName: "파주시 행복주택 예비입주자 모집공고(26.06.05)",
    announcementType: "행복주택",
    region: "경기도 파주시",
    source: "LH",
    postedDate: "2026.06.05",
    status: "모집중",

    thumbnailUrl:
      "https://i.namu.wiki/i/zJ2SWtCwjyKCN18ufUq2R9AZQlO6uFWC3eYEeQst1czNvNC9NHBWKsO83Pbsl1uGnvLTI9Gj6EBDJtS5dkGg5EI6g01Q-DnKTbYxTkltlnBXOiVd1a7TkiV0gNpMQXQwD-3KmZhhCSh2GAuf1NUpyw.webp",

    originalUrl:
      "https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancInfo.do",
    applyUrl:
      "https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancInfo.do",
    attachmentUrl: "#",
    hasAttachment: true,

    eligibilityImages: [],

    eligibilityTable: {
      format: "html",
      value: `
        <div style=width:100%;">
          <div style="font-size:18px; font-weight:800; margin-bottom:14px;">
            신청자격 세부내역
          </div>

          <table style="width:100%; border-collapse:collapse; text-align:center; border-top:2px solid #111; border-bottom:2px solid #111;">
            <thead>
              <tr style="background:#f3f7ff;">
                <th style="padding:14px; border:1px solid #ddd;">구분</th>
                <th style="padding:14px; border:1px solid #ddd;">신청자격</th>
                <th style="padding:14px; border:1px solid #ddd;">세부조건</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style="padding:14px; border:1px solid #ddd; font-weight:700;">대학생·청년</td>
                <td style="padding:14px; border:1px solid #ddd; font-weight:700;">무주택 요건 충족</td>
                <td style="padding:14px; border:1px solid #ddd; text-align:left;">
                  공고일 기준 무주택 요건을 충족하고, 계층별 소득·자산 기준을 만족하는 자
                </td>
              </tr>

              <tr>
                <td style="padding:14px; border:1px solid #ddd; font-weight:700;">신혼부부</td>
                <td style="padding:14px; border:1px solid #ddd; font-weight:700;">무주택세대구성원</td>
                <td style="padding:14px; border:1px solid #ddd; text-align:left;">
                  혼인기간, 자녀 여부, 소득·자산 기준 등 세부 조건 확인 필요
                </td>
              </tr>

              <tr>
                <td style="padding:14px; border:1px solid #ddd; font-weight:700;">주거취약계층</td>
                <td style="padding:14px; border:1px solid #ddd; font-weight:700;">관련 자격 보유자</td>
                <td style="padding:14px; border:1px solid #ddd; text-align:left;">
                  수급자, 차상위계층, 주거지원 필요 계층 등 증빙서류 확인 필요
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
    },

    winnerSelectionImages: [],

    winnerSelectionTable: {
      format: "markdown",
      value:
        "| 순위 | 선정기준 | 비고 |\n" +
        "|---|---|---|\n" +
        "| 1순위 | 계층별 우선순위 및 배점 적용 | 세부 기준은 원문 공고문 확인 |\n" +
        "| 2순위 | 배점 합산 후 고득점자 선정 | 동점 시 추첨 가능 |\n" +
        "| 예비입주자 | 공가 발생 시 순번에 따라 입주 | 계약 포기 시 후순위 진행 |",
    },

    schedule: {
      announcementDate: "2026-06-05",
      applyStart: "2026-06-19",
      applyEnd: "2026-06-22",
      winnerAnnounce: "2026-09-30",
      contractStart: "",
      contractEnd: "",
    },

    specialNotes:
      "인터넷 및 모바일 신청이 원칙이며, 실제 신청 전 반드시 LH 원문 공고문을 확인해야 합니다. 자격 검증 결과에 따라 당첨 또는 계약이 취소될 수 있습니다.",

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
        houseId: "house-paju-1",
        name: "unjeong-sannae-1.png",
        size: "820.4 KB",
        type: "image/png",
        imageUrl: HOUSE_IMAGE_1,
      },
      {
        houseId: "house-paju-2",
        name: "unjeong-garam-14.png",
        size: "790.1 KB",
        type: "image/png",
        imageUrl: HOUSE_IMAGE_2,
      },
      {
        houseId: "house-paju-3",
        name: "unjeong-chorongkkot-3.png",
        size: "845.7 KB",
        type: "image/png",
        imageUrl: HOUSE_IMAGE_3,
      },
    ],

    floorPlans: [
      {
        houseId: "house-paju-1",
        name: "floor-plan-sannae-1.png",
        size: "246.7 KB",
        type: "image/png",
        imageUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDA1MDFfMSAg/MDAxNTg4MzAxNDU4MjMz.m-BKmWLrElCRaVrQS-WCq1Bq_4JBrhwX45kCR3x8nQsg.LZeP18YkmDksqxXLpLBRsopDXaWrIPEMV1vRG_jG5Xsg.PNG.kh7162/20200501_114944.png?type=w800",
      },
      {
        houseId: "house-paju-2",
        name: "floor-plan-garam-14.png",
        size: "251.2 KB",
        type: "image/png",
        imageUrl: FLOOR_PLAN_2,
      },
      {
        houseId: "house-paju-3",
        name: "floor-plan-chorongkkot-3.png",
        size: "263.5 KB",
        type: "image/png",
        imageUrl: FLOOR_PLAN_3,
      },
    ],

    addresses: [
      {
        id: "addr-paju-1",
        houseId: "house-paju-1",
        address: "경기도 파주시 교하로 20(목동동, 산내마을1단지)",
        coordinates: {
          latitude: 37.7248,
          longitude: 126.7356,
        },
      },
      {
        id: "addr-paju-2",
        houseId: "house-paju-2",
        address: "경기도 파주시 소리천로 203(와동동) 가람마을14단지",
        coordinates: {
          latitude: 37.7327,
          longitude: 126.7545,
        },
      },
      {
        id: "addr-paju-3",
        houseId: "house-paju-3",
        address: "경기도 파주시 초롱꽃로 17(동패동) 초롱꽃마을3단지",
        coordinates: {
          latitude: 37.7155,
          longitude: 126.7338,
        },
      },
    ],
  },
];

export const complexes = announcements;
