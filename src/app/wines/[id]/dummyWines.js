/**
 * 테스트를 위한 더미 리뷰 생성 함수
 * @param {number} count - 생성할 리뷰의 개수
 * @param {number} startId - 리뷰 ID 시작 번호
 * @returns {Array} - 생성된 리뷰 객체 배열
 */
const generateMockReviews = (count, startId = 101) => {
  const reviews = [];
  const aromas = [
    ['CHERRY', 'OAK', 'BERRY'],
    ['LEATHER', 'EARTH'],
    ['TROPICAL', 'CITRUS', 'PEACH'],
    ['VANILLA', 'CHOCOLATE'],
    ['FLOWER', 'MINERAL'],
  ];
  const contents = [
    '기대했던 것보다 훨씬 좋았어요. 과일 향이 풍부하고 목넘김이 부드러웠습니다.',
    '특별한 날에 마시기 좋은 와인입니다! 맛의 균형이 정말 인상적이네요.',
    '가성비가 훌륭합니다. 이 가격에 이런 맛이라니, 친구들에게도 추천했어요.',
    '탄닌감이 조금 강하게 느껴졌지만, 스테이크와 함께하니 환상적이었습니다.',
    '향이 정말 독특해요. 호불호는 갈릴 수 있겠지만 저는 아주 만족했습니다.',
  ];

  for (let i = 0; i < count; i++) {
    const reviewId = startId + i;
    const userId = 201 + i;
    const date = new Date();
    date.setDate(date.getDate() - i * 3); // 3일 간격으로 과거 날짜 생성

    reviews.push({
      id: reviewId,
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 ~ 5.0 랜덤
      lightBold: Math.floor(Math.random() * 5) + 1,      // 1 ~ 5 랜덤
      smoothTannic: Math.floor(Math.random() * 5) + 1,   // 1 ~ 5 랜덤
      drySweet: Math.floor(Math.random() * 5) + 1,       // 1 ~ 5 랜덤
      softAcidic: Math.floor(Math.random() * 5) + 1,     // 1 ~ 5 랜덤
      aroma: aromas[i % aromas.length],
      content: `${i + 1}번째 테스트 리뷰입니다. ${contents[i % contents.length]}`,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      user: {
        id: userId,
        nickname: `와인러버${userId}`,
        image: '/assets/images/profile/profile.png',
      },
      isLiked: i % 2 === 0, // 짝수 번째 리뷰는 '좋아요'
    });
  }
  return reviews;
};

/**
 * 와인 상세 정보 더미 데이터
 */
export const wineDetailData = [
  {
    "id": 1,
    "name": "Sentinel Cabernet Sauvignon 2016",
    "region": "Western Cape, South Africa",
    "image": "/assets/images/wine/wine1.png",
    "price": 64990,
    "type": "RED",
    "avgRating": 4.5,
    "reviewCount": 1900,
    "recentReview": {
      "id": 101,
      "user": { "id": 201, "nickname": "와인사랑22", "image": "/assets/images/profile/profile.png" },
      "updatedAt": "2025-08-28T14:30:00.000Z",
      "createdAt": "2025-08-28T14:30:00.000Z",
      "content": "향이 정말 풍부하고 맛의 균형이 좋았어요. 특별한 날에 마시기 좋은 와인입니다!",
      "aroma": ["CHERRY", "OAK", "BERRY"],
      "rating": 5
    },
    "userId": 301,
    // ✨ 기존 reviews 배열을 새로 만든 함수로 교체합니다.
    "reviews": generateMockReviews(25), // 25개의 테스트 리뷰 생성
    "avgRatings": { "1": 100, "2": 400, "3": 700, "4": 500, "5": 200 }
  },
  {
    "id": 2,
    "name": "Cloudy Bay Sauvignon Blanc 2024",
    "region": "Marlborough, New Zealand",
    "image": "/assets/images/wine/wine2.png",
    "price": 48000,
    "type": "WHITE",
    "avgRating": 4.8,
    "reviewCount": 1900,
    "recentReview": {
      "id": 201,
      "user": { "id": 203, "nickname": "여름조아", "image": "/images/user_profile_3.jpg" },
      "updatedAt": "2025-09-01T10:00:00.000Z",
      "createdAt": "2025-09-01T10:00:00.000Z",
      "content": "여름에 마시기 딱 좋은 소비뇽 블랑! 상큼한 과일향이 입안 가득 퍼져요. 해산물이랑 드셔보세요.",
      "aroma": ["TROPICAL", "CITRUS"],
      "rating": 5
    },
    "userId": 302,
    "reviews": [ // 두 번째 와인은 기존 리뷰 데이터 유지
      {
        "id": 201,
        "rating": 5, "lightBold": 2, "smoothTannic": 1, "drySweet": 1, "softAcidic": 5,
        "aroma": ["TROPICAL", "CITRUS"],
        "content": "여름에 마시기 딱 좋은 소비뇽 블랑! 상큼한 과일향이 입안 가득 퍼져요. 해산물이랑 드셔보세요.",
        "createdAt": "2025-09-01T10:00:00.000Z",
        "updatedAt": "2025-09-01T10:00:00.000Z",
        "user": { "id": 203, "nickname": "여름조아", "image": "/images/user_profile_3.jpg" },
        "isLiked": true
      }
    ],
    "avgRatings": { "1": 100, "2": 400, "3": 700, "4": 500, "5": 200 }
  }
];