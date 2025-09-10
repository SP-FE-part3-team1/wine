'use client';

/**
 * 🚀 스마트 모달 사용 예시 모음
 * 팀원들이 참고할 수 있는 다양한 사용 패턴
 */

import { useQuickModal, useSmartModal } from '@/components/Modal';
import { components } from '@/types/types';

// 📝 1. 가장 간단한 사용법
export function SimpleUsageExample() {
  const modal = useQuickModal();

  return (
    <div>
      {/* 컨텍스트 자동 인식 - 페이지에 따라 적절한 모달 열림 */}
      <button onClick={() => modal.add()}>
        추가하기 {/* 와인 목록 페이지에서는 와인 등록, 와인 상세에서는 리뷰 작성 */}
      </button>
      
      <button onClick={() => modal.edit({ wineId: 123 })}>
        수정하기 {/* 컨텍스트에 맞는 수정 모달 */}
      </button>
      
      <button onClick={() => modal.filter()}>
        필터 {/* 필터 모달 열기 */}
      </button>
    </div>
  );
}

// 🍷 2. 와인 관련 모달
export function WineModalExample({ wine }: { wine: components['schemas']['WineListType'] }) {
  const modal = useQuickModal();

  return (
    <div className="wine-card">
      <h3>{wine.name}</h3>
      <p>{wine.region} - {wine.price.toLocaleString()}원</p>
      
      <div className="actions">
        {/* 명시적 와인 모달 */}
        <button onClick={() => modal.wine.create()}>
          새 와인 등록
        </button>
        
        <button onClick={() => modal.wine.edit(wine.id)}>
          이 와인 수정 {/* ID 타입(number/string) 자동 변환 */}
        </button>
      </div>
    </div>
  );
}

// ⭐ 3. 리뷰 관련 모달  
export function ReviewModalExample({ wine }: { wine: components['schemas']['WineDetailType'] }) {
  const modal = useQuickModal();

  return (
    <div className="wine-detail">
      <h1>{wine.name}</h1>
      
      {/* 리뷰 작성 */}
      <button onClick={() => modal.review.create(wine.id)}>
        리뷰 작성하기
      </button>
      
      {/* 기존 리뷰들 */}
      {wine.reviews?.map((review) => (
        <div key={review.id} className="review-item">
          <p>{review.content}</p>
          
          {/* 내 리뷰인 경우만 수정 버튼 */}
          {review.user.id === wine.userId && (
            <button onClick={() => modal.review.edit(wine.id, review.id)}>
              리뷰 수정
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// 🔧 4. 고급 사용법 - 커스텀 옵션
export function AdvancedUsageExample() {
  const modal = useSmartModal({
    requireAuth: true,
    onSuccess: (data) => {
      console.log('Success!', data);
      // 성공시 페이지 새로고침 또는 상태 업데이트
      window.location.reload();
    },
    onError: (error) => {
      // 커스텀 에러 처리
      if (error.message.includes('권한')) {
        alert('관리자 권한이 필요합니다.');
      } else {
        alert(`오류: ${error.message}`);
      }
    },
    onLoadingChange: (loading) => {
      // 로딩 상태 처리
      console.log('Loading:', loading);
    }
  });

  return (
    <div>
      <button 
        onClick={() => modal.createWine()}
        disabled={modal.isLoading}
      >
        {modal.isLoading ? '처리 중...' : '와인 등록'}
      </button>
      
      <p>현재 페이지: {modal.pageContext}</p>
    </div>
  );
}

// 🎯 5. 실무에서 자주 사용할 패턴
export function PracticalUsageExample() {
  const modal = useQuickModal();

  // 인증이 필요한 액션들을 위한 헬퍼 함수
  const withAuth = (callback: () => void) => {
    return async () => {
      const isAuthenticated = await modal.checkAuth();
      if (!isAuthenticated) {
        alert('로그인이 필요합니다.');
        // router.push('/login');
        return;
      }
      callback();
    };
  };

  return (
    <div className="practical-example">
      {/* 와인 목록 페이지에서 */}
      <div className="wine-list-actions">
        <button onClick={withAuth(() => modal.add())}>
          + 와인 추가
        </button>
        
        <button onClick={() => modal.filter()}>
          🔍 필터
        </button>
      </div>

      {/* 와인 카드에서 */}
      <div className="wine-actions">
        <button onClick={withAuth(() => modal.edit({ wineId: 123 }))}>
          수정
        </button>
        
        <button onClick={withAuth(() => modal.review.create(123))}>
          리뷰 작성
        </button>
      </div>

      {/* 로딩 상태 표시 */}
      {modal.isLoading && <div className="loading">처리 중...</div>}
    </div>
  );
}

// 📋 6. 완전한 페이지 예시
export function CompletePageExample() {
  const modal = useQuickModal({
    onSuccess: () => {
      // 성공시 데이터 새로고침 등
      console.log('Modal action completed successfully');
    }
  });

  // 가상의 와인 데이터
  const wines = [
    { id: 1, name: '샤토 마고', region: '프랑스', price: 1200000 },
    { id: 2, name: '오퍼스 원', region: '캘리포니아', price: 800000 }
  ];

  return (
    <div className="wine-list-page">
      {/* 헤더 액션 */}
      <div className="page-header">
        <h1>와인 목록</h1>
        <div className="header-actions">
          <button 
            className="btn-primary" 
            onClick={() => modal.add()}
            disabled={modal.isLoading}
          >
            {modal.isLoading ? '처리 중...' : '+ 와인 등록'}
          </button>
          
          <button 
            className="btn-secondary"
            onClick={() => modal.filter()}
          >
            🔍 필터
          </button>
        </div>
      </div>

      {/* 와인 목록 */}
      <div className="wine-grid">
        {wines.map(wine => (
          <div key={wine.id} className="wine-card">
            <h3>{wine.name}</h3>
            <p>{wine.region}</p>
            <p className="price">{wine.price.toLocaleString()}원</p>
            
            <div className="card-actions">
              <button onClick={() => modal.edit({ wineId: wine.id })}>
                수정
              </button>
              <button onClick={() => modal.review.create(wine.id)}>
                리뷰 작성
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 현재 상태 디버그 정보 (개발시에만) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <p>페이지 컨텍스트: {modal.pageContext}</p>
          <p>로딩 상태: {modal.isLoading ? 'true' : 'false'}</p>
        </div>
      )}
    </div>
  );
}