// Modal 사용 예제 - 팀원들이 참고할 수 있는 예제 파일

'use client';

import { useState } from 'react';
import { useWineModal, useReviewModal, useFilterModal } from '../';
import { FilterState } from '../../../types/component-types';
import { Button } from '../../Button/Button';

/**
 * Modal 시스템 사용 예제
 * 이 파일은 실제 프로덕션에서 사용되지 않으며, 팀원들의 참고용입니다.
 */
export const ModalUsageExample = () => {
  // 각 모달별 편의 함수들 가져오기
  const { openCreateWineModal, openEditWineModal } = useWineModal();
  const { openCreateReviewModal, openEditReviewModal } = useReviewModal();
  const { openFilterModal } = useFilterModal();

  // 필터 상태 (실제로는 부모 컴포넌트에서 관리)
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    wineTypes: [],
    priceRange: [0, 1000000],
    ratingRange: [0, 5]
  });

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>모달 사용 예제</h2>
      
      {/* 와인 모달 예제 */}
      <section>
        <h3>와인 관리 모달</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button 
            variant="primary" 
            onClick={openCreateWineModal}
          >
            와인 등록
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => openEditWineModal('wine-id-123')}
          >
            와인 수정
          </Button>
        </div>
      </section>

      {/* 리뷰 모달 예제 */}
      <section>
        <h3>리뷰 관리 모달</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button 
            variant="primary" 
            onClick={() => openCreateReviewModal('wine-id-123')}
          >
            리뷰 작성
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => openEditReviewModal('wine-id-123', 'review-id-456')}
          >
            리뷰 수정
          </Button>
        </div>
      </section>

      {/* 필터 모달 예제 */}
      <section>
        <h3>필터 모달</h3>
        <Button 
          variant="outline" 
          onClick={() => openFilterModal(currentFilters)}
        >
          필터 설정
        </Button>
        
        {/* 현재 필터 상태 표시 */}
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '0.5rem' }}>
          <h4>현재 필터:</h4>
          <p>와인 타입: {currentFilters.wineTypes.join(', ') || '전체'}</p>
          <p>가격: ₩{currentFilters.priceRange[0].toLocaleString()} - ₩{currentFilters.priceRange[1].toLocaleString()}</p>
          <p>평점: {currentFilters.ratingRange[0]}점 - {currentFilters.ratingRange[1]}점</p>
        </div>
      </section>

      {/* 사용법 설명 */}
      <section style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '0.5rem' }}>
        <h3>💡 사용법 안내</h3>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li><strong>와인 등록:</strong> <code>openCreateWineModal()</code> - 새 와인을 등록합니다</li>
          <li><strong>와인 수정:</strong> <code>openEditWineModal(wineId)</code> - 기존 와인 정보를 수정합니다</li>
          <li><strong>리뷰 작성:</strong> <code>openCreateReviewModal(wineId)</code> - 특정 와인에 대한 리뷰를 작성합니다</li>
          <li><strong>리뷰 수정:</strong> <code>openEditReviewModal(wineId, reviewId)</code> - 기존 리뷰를 수정합니다</li>
          <li><strong>필터:</strong> <code>openFilterModal(currentFilters)</code> - 현재 필터 상태를 전달하여 필터를 설정합니다</li>
        </ul>
        
        <h4>📋 필수 설정</h4>
        <p>모든 모달을 사용하려면 앱의 최상위에 <code>ModalProvider</code>를 설정해야 합니다:</p>
        <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
{`// app/layout.tsx
import { ModalProvider } from '@/components/Modal';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}`}
        </pre>
      </section>
    </div>
  );
};