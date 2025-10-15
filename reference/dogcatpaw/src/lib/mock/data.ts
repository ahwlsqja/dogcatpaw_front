export const mockAdoptionPosts = [
  {
    id: 1,
    petName: '골든이',
    petDid: 'KR-2025-001',
    breed: 'GOLDEN_RETRIEVER' as const,
    age: 2,
    gender: 'MALE' as const,
    images: '/placeholder-pet.jpg',
    title: '사랑스러운 골든이를 가족으로 맞이해주세요',
    shelterName: '서울동물보호소',
    region: '서울',
    district: '강남구',
    adoptionStatus: 'AVAILABLE' as const,
    deadline: '2025-12-31'
  },
  {
    id: 2,
    petName: '럭키',
    petDid: 'KR-2025-002',
    breed: 'LABRADOR' as const,
    age: 3,
    gender: 'FEMALE' as const,
    images: '/placeholder-pet.jpg',
    title: '활발한 럭키와 함께 행복한 일상을',
    shelterName: '부산동물사랑센터',
    region: '부산',
    district: '해운대구',
    adoptionStatus: 'AVAILABLE' as const,
    deadline: '2025-12-31'
  },
  {
    id: 3,
    petName: '바둑이',
    petDid: 'KR-2025-003',
    breed: 'OTHER' as const,
    age: 1,
    gender: 'MALE' as const,
    images: '/placeholder-pet.jpg',
    title: '귀여운 바둑이의 새로운 가족을 찾습니다',
    shelterName: '대구유기동물보호센터',
    region: '대구',
    district: '중구',
    adoptionStatus: 'AVAILABLE' as const,
    deadline: '2025-12-31'
  }
];

export const mockClosingSoonDonations = [
  {
    thumbnail: '/placeholder-pet.jpg',
    title: '비글 초코의 수술비 후원',
    currentAmount: 450000,
    targetAmount: 800000,
    donationStatus: 'ACTIVE' as const,
    patronCount: 23,
    progress: 56,
    dday: 'D-1'
  },
  {
    thumbnail: '/placeholder-pet.jpg',
    title: '보더 콜리 보리의 치료비 지원',
    currentAmount: 320000,
    targetAmount: 600000,
    donationStatus: 'ACTIVE' as const,
    patronCount: 18,
    progress: 53,
    dday: 'D-1'
  },
  {
    thumbnail: '/placeholder-pet.jpg',
    title: '골든 리트리버 해피의 재활 치료',
    currentAmount: 680000,
    targetAmount: 1000000,
    donationStatus: 'ACTIVE' as const,
    patronCount: 35,
    progress: 68,
    dday: 'D-1'
  }
];

export const mockPopularReviews = [
  {
    profileUrl: '/placeholder-profile.jpg',
    memberName: '모진영',
    images: '/placeholder-pet.jpg',
    title: '새 가족을 만난 골든이',
    content: '골든이가 저희 가족이 된지 2주가 지났습니다🧡 산책과 장난감을 너무너무 좋아하고 엄마 아빠에게 꼬리를 흔들며 애교를 부리는 멋진 강아지가 되었어요.',
    breed: 'GOLDEN_RETRIEVER' as const,
    petName: '골든이',
    likeCount: 89,
    liked: false,
    commentCount: 23
  },
  {
    profileUrl: '/placeholder-profile.jpg',
    memberName: '모진영',
    images: '/placeholder-pet.jpg',
    title: '지푸라기 한줄기 희망에 럭키',
    content: '럭키와 함께한 지 한 달이 되었어요. 처음엔 낯가림이 심했는데 이제는 완전히 적응해서 매일 즐겁게 지내고 있어요!',
    breed: 'LABRADOR' as const,
    petName: '럭키',
    likeCount: 89,
    liked: false,
    commentCount: 23
  },
  {
    profileUrl: '/placeholder-profile.jpg',
    memberName: '모진영',
    images: '/placeholder-pet.jpg',
    title: '보호소 털복숭이를 바둑이',
    content: '바둑이는 정말 특별한 아이예요. 처음 만났을 때부터 저와 눈이 마주쳤고, 지금은 우리 가족의 소중한 일원이 되었습니다.',
    breed: 'OTHER' as const,
    petName: '바둑이',
    likeCount: 89,
    liked: false,
    commentCount: 23
  }
];

export const mockPopularStories = [
  {
    profileUrl: '/placeholder-profile.jpg',
    memberName: '김민지',
    title: '골든이와 함께한 첫 한 달',
    images: '/placeholder-pet.jpg',
    content: '골든이를 입양한 지 벌써 한 달이 되었어요. 처음에는 새로운 환경에 적응하느라 조금 힘들어했지만, 이제는 완전히 우리 가족이 되었답니다.',
    breed: 'GOLDEN_RETRIEVER' as const,
    petName: '골든이',
    likeCount: 89,
    liked: false,
    commentCount: 23
  },
  {
    profileUrl: '/placeholder-profile.jpg',
    memberName: '이준호',
    title: '럭키의 훈련 성공기',
    images: '/placeholder-pet.jpg',
    content: '럭키는 정말 똑똁한 아이예요. 앉기, 기다리기, 손 같은 기본적인 명령어는 물론이고 이제는 더 복잡한 트릭도 배우고 있어요.',
    breed: 'LABRADOR' as const,
    petName: '럭키',
    likeCount: 89,
    liked: false,
    commentCount: 23
  },
  {
    profileUrl: '/placeholder-profile.jpg',
    memberName: '박서연',
    title: '바둑이의 건강 검진 후기',
    images: '/placeholder-pet.jpg',
    content: '오늘 바둑이와 함께 동물병원에 건강검진을 받으러 갔어요. 다행히 모든 검사 결과가 정상이고 건강하다는 소식을 들었습니다.',
    breed: 'OTHER' as const,
    petName: '바둑이',
    likeCount: 89,
    liked: false,
    commentCount: 23
  }
];