/**
 * 와인 상세 정보 더미 데이터
 */
export const wineDetailData = [
  {
    "id": 1,
    "name": "Sentinel Cabernet Sauvignon 2016",
    "region": "Western Cape, South Africa",
    "image": "/assets/images/wine/wine1.png", // public 폴더 기준 이미지 경로
    "price": 64990,
    "type": "RED",
    "avgRating": 4.5,
    "reviewCount": 128,
    "recentReview": {
      "id": 101,
      "user": {
        "id": 201,
        "nickname": "와인사랑22",
        "image": "/images/user_profile_1.jpg"
      },
      "updatedAt": "2025-08-28T14:30:00.000Z",
      "createdAt": "2025-08-28T14:30:00.000Z",
      "content": "향이 정말 풍부하고 맛의 균형이 좋았어요. 특별한 날에 마시기 좋은 와인입니다!",
      "aroma": ["CHERRY", "OAK", "BLACKBERRY"],
      "rating": 5
    },
    "userId": 301,
    "reviews": [
      {
        "id": 101,
        "rating": 5,
        "lightBold": 4,       // 1(Light) ~ 5(Bold)
        "smoothTannic": 3,  // 1(Smooth) ~ 5(Tannic)
        "drySweet": 2,      // 1(Dry) ~ 5(Sweet)
        "softAcidic": 3,    // 1(Soft) ~ 5(Acidic)
        "aroma": ["CHERRY", "OAK", "BLACKBERRY"],
        "content": "향이 정말 풍부하고 맛의 균형이 좋았어요. 특별한 날에 마시기 좋은 와인입니다!",
        "createdAt": "2025-08-28T14:30:00.000Z",
        "updatedAt": "2025-08-28T14:30:00.000Z",
        "user": {
          "id": 201,
          "nickname": "와인사랑22",
          "image": "/images/user_profile_1.jpg"
        },
        "isLiked": true
      },
      {
        "id": 102,
        "rating": 4,
        "lightBold": 5,
        "smoothTannic": 4,
        "drySweet": 1,
        "softAcidic": 4,
        "aroma": ["LEATHER", "EARTH"],
        "content": "묵직하고 탄닌감이 강렬해서 스테이크랑 정말 잘 어울렸습니다. 호불호는 갈릴 수 있겠네요.",
        "createdAt": "2025-08-15T18:00:00.000Z",
        "updatedAt": "2025-08-15T18:00:00.000Z",
        "user": {
          "id": 202,
          "nickname": "고기매니아",
          "image": "/images/user_profile_2.jpg"
        },
        "isLiked": false
      }
    ],
    // 리뷰 항목들의 평균값이라고 가정하여 이름을 변경했습니다.
    "avgRatings": {
      "lightBold": 4.5,
      "smoothTannic": 3.5,
      "drySweet": 1.5,
      "softAcidic": 3.5
    }
  },
  {
    "id": 2,
    "name": "Cloudy Bay Sauvignon Blanc 2024",
    "region": "Marlborough, New Zealand",
    "image": "/assets/images/wine/wine2.png", // public 폴더 기준 이미지 경로
    "price": 48000,
    "type": "WHITE",
    "avgRating": 4.8,
    "reviewCount": 256,
    "recentReview": {
      "id": 201,
      "user": {
        "id": 203,
        "nickname": "여름조아",
        "image": "/images/user_profile_3.jpg"
      },
      "updatedAt": "2025-09-01T10:00:00.000Z",
      "createdAt": "2025-09-01T10:00:00.000Z",
      "content": "여름에 마시기 딱 좋은 소비뇽 블랑! 상큼한 과일향이 입안 가득 퍼져요. 해산물이랑 드셔보세요.",
      "aroma": ["PASSION_FRUIT", "GRAPEFRUIT", "LIME"],
      "rating": 5
    },
    "userId": 302,
    "reviews": [
      {
        "id": 201,
        "rating": 5,
        "lightBold": 2,
        "smoothTannic": 1,
        "drySweet": 1,
        "softAcidic": 5,
        "aroma": ["PASSION_FRUIT", "GRAPEFRUIT", "LIME"],
        "content": "여름에 마시기 딱 좋은 소비뇽 블랑! 상큼한 과일향이 입안 가득 퍼져요. 해산물이랑 드셔보세요.",
        "createdAt": "2025-09-01T10:00:00.000Z",
        "updatedAt": "2025-09-01T10:00:00.000Z",
        "user": {
          "id": 203,
          "nickname": "여름조아",
          "image": "/images/user_profile_3.jpg"
        },
        "isLiked": true
      }
    ],
    "avgRatings": {
      "lightBold": 2.0,
      "smoothTannic": 1.0,
      "drySweet": 1.0,
      "softAcidic": 5.0
    }
  }
];