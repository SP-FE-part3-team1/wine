'use client';

import { useState } from 'react';
import { WineFormModal } from '../../components/Modal/forms/WineFormModal';
import { ReviewFormModal } from '../../components/Modal/forms/ReviewFormModal';
import { FilterModal } from '../../components/Modal/forms/FilterModal';
import { ConfirmationModal } from '../../components/Modal/ConfirmationModal';
import { TestLayout } from '../../components/TestLayout/TestLayout';
import Button from '../../components/Button/Button';
import { FILTER_DEFAULT_VALUES } from '../../components/Modal/manager/modalConfigs';
import { FilterState } from '../../types/component-types';

export default function ModalTestPage() {
  const [activeModal, setActiveModal] = useState<'wine' | 'review' | 'filter' | 'confirmation' | null>(null);
  const [testResults, setTestResults] = useState<{[key: string]: Record<string, unknown> & { timestamp: string }}>({});
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Wine Modal handlers
  const handleWineSuccess = (result: Record<string, unknown>) => {
    console.log('Wine saved:', result);
    setTestResults(prev => ({ ...prev, wine: { ...result, timestamp: new Date().toLocaleString('ko-KR') } }));
    setLastAction('와인 등록이 성공적으로 완료되었습니다! 🍷');
  };

  // Review Modal handlers  
  const handleReviewSuccess = (result: Record<string, unknown>) => {
    console.log('Review saved:', result);
    setTestResults(prev => ({ ...prev, review: { ...result, timestamp: new Date().toLocaleString('ko-KR') } }));
    setLastAction('리뷰 등록이 성공적으로 완료되었습니다! ⭐');
  };

  // Filter Modal handlers
  const handleFilterApply = (filterData: FilterState) => {
    console.log('Filter applied:', filterData);
    setTestResults(prev => ({ ...prev, filter: { ...filterData, timestamp: new Date().toLocaleString('ko-KR') } }));
    setLastAction('필터가 성공적으로 적용되었습니다! 🔍');
  };

  // Confirmation Modal handlers
  const handleConfirm = () => {
    console.log('Deletion confirmed!');
    setTestResults(prev => ({ ...prev, confirmation: { action: 'confirmed', timestamp: new Date().toLocaleString('ko-KR') } }));
    setLastAction('삭제가 확인되었습니다! 🗑️');
    setActiveModal(null);
  };

  const handleCancel = () => {
    console.log('Deletion cancelled!');
    setTestResults(prev => ({ ...prev, confirmation: { action: 'cancelled', timestamp: new Date().toLocaleString('ko-KR') } }));
    setLastAction('삭제가 취소되었습니다! ❌');
  };

  const closeModal = () => {
    // 삭제 모달이 열려있을 때 X나 취소 버튼으로 닫으면 취소로 처리
    if (activeModal === 'confirmation') {
      handleCancel();
    }
    setActiveModal(null);
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <TestLayout title="🍷 Modal Test Page - Figma 디자인 검증">

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.6rem',
          marginBottom: '3rem'
        }}>
        <div style={{
          backgroundColor: '#ffffff',
          border: '0.1rem solid #e9ecef',
          borderRadius: '1.2rem',
          padding: '2.4rem',
          textAlign: 'center',
          boxShadow: '0 0.4rem 0.6rem rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.6rem' }}>🍷</div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#212529', marginBottom: '1rem' }}>
            와인 등록 모달
          </h3>
          <p style={{ fontSize: '1.4rem', color: '#6c757d', marginBottom: '2rem', lineHeight: '1.5' }}>
            와인등록.png Figma 디자인<br/>
            Small 크기, 이미지 업로드 포함
          </p>
          <Button
            variant="primary"
            onClick={() => setActiveModal('wine')}
            style={{ width: '100%', padding: '1.2rem 2.4rem' }}
          >
            테스트 시작
          </Button>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '0.1rem solid #e9ecef',
          borderRadius: '1.2rem',
          padding: '2.4rem',
          textAlign: 'center',
          boxShadow: '0 0.4rem 0.6rem rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.6rem' }}>⭐</div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#212529', marginBottom: '1rem' }}>
            리뷰 등록 모달
          </h3>
          <p style={{ fontSize: '1.4rem', color: '#6c757d', marginBottom: '2rem', lineHeight: '1.5' }}>
            리뷰등록.png Figma 디자인<br/>
            Medium 크기, 슬라이더 & 칩 포함
          </p>
          <Button
            variant="primary"
            onClick={() => setActiveModal('review')}
            style={{ width: '100%', padding: '1.2rem 2.4rem' }}
          >
            테스트 시작
          </Button>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '0.1rem solid #e9ecef',
          borderRadius: '1.2rem',
          padding: '2.4rem',
          textAlign: 'center',
          boxShadow: '0 0.4rem 0.6rem rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.6rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#212529', marginBottom: '1rem' }}>
            필터 모달
          </h3>
          <p style={{ fontSize: '1.4rem', color: '#6c757d', marginBottom: '2rem', lineHeight: '1.5' }}>
            sm.png Figma 디자인<br/>
            Small 크기, 라디오 & 슬라이더 포함
          </p>
          <Button
            variant="primary"
            onClick={() => setActiveModal('filter')}
            style={{ width: '100%', padding: '1.2rem 2.4rem' }}
          >
            테스트 시작
          </Button>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '0.1rem solid #e9ecef',
          borderRadius: '1.2rem',
          padding: '2.4rem',
          textAlign: 'center',
          boxShadow: '0 0.4rem 0.6rem rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.6rem' }}>🗑️</div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#212529', marginBottom: '1rem' }}>
            삭제 확인 모달
          </h3>
          <p style={{ fontSize: '1.4rem', color: '#6c757d', marginBottom: '2rem', lineHeight: '1.5' }}>
            ConfirmationModal<br/>
            좌우 16px, 상 32px, 하 24px 패딩
          </p>
          <Button
            variant="secondary"
            onClick={() => setActiveModal('confirmation')}
            style={{ width: '100%', padding: '1.2rem 2.4rem' }}
          >
            테스트 시작
          </Button>
        </div>
      </div>

      <div style={{
        backgroundColor: '#ffffff',
        border: '0.1rem solid #e9ecef',
        borderRadius: '1.2rem',
        padding: '2.4rem',
        marginBottom: '2rem',
        boxShadow: '0 0.4rem 0.6rem rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          marginBottom: '2rem',
          color: '#212529',
          borderBottom: '0.2rem solid #6C5CE7',
          paddingBottom: '1rem'
        }}>
          📋 Figma 디자인 검증 체크리스트
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '0.8rem',
            border: '0.1rem solid #e9ecef'
          }}>
            <h3 style={{ 
              fontSize: '1.6rem', 
              fontWeight: '600', 
              color: '#495057', 
              marginBottom: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}>
              🍷 와인 등록 모달
            </h3>
            <ul style={{ fontSize: '1.3rem', lineHeight: '1.6', color: '#6c757d', paddingLeft: '1.6rem', margin: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>✅ 와인 이름, 가격, 원산지, 타입 필드</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 이미지 업로드 영역 (12rem × 12rem, 점선 테두리)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 취소/등록 버튼 (1:1 비율, 4.8rem 높이)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ Small 모달 크기</li>
              <li>✅ 반응형 디자인 (768px, 375px 브레이크포인트)</li>
            </ul>
          </div>

          <div style={{
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '0.8rem',
            border: '0.1rem solid #e9ecef'
          }}>
            <h3 style={{ 
              fontSize: '1.6rem', 
              fontWeight: '600', 
              color: '#495057', 
              marginBottom: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}>
              ⭐ 리뷰 등록 모달
            </h3>
            <ul style={{ fontSize: '1.3rem', lineHeight: '1.6', color: '#6c757d', paddingLeft: '1.6rem', margin: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>✅ 와인 헤더 (와인 아이콘 + 이름 + 별점)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 리뷰 텍스트 입력 영역 (12rem 최소 높이)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 맛 특성 슬라이더 (가벼워요↔진해요, 부드러워요↔떫어요, 드라이해요↔달아요, 안셔요↔많이셔요)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 기억에 남는 향 칩 선택 (멀티 선택)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 리뷰 남기기 버튼 (전체 너비)</li>
              <li>✅ Medium 모달 크기</li>
            </ul>
          </div>

          <div style={{
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '0.8rem',
            border: '0.1rem solid #e9ecef'
          }}>
            <h3 style={{ 
              fontSize: '1.6rem', 
              fontWeight: '600', 
              color: '#495057', 
              marginBottom: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}>
              🔍 필터 모달
            </h3>
            <ul style={{ fontSize: '1.3rem', lineHeight: '1.6', color: '#6c757d', paddingLeft: '1.6rem', margin: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>✅ WINE TYPES 칩 (Red, White, Sparkling - 단일 선택)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ PRICE 슬라이더 (₩0 - ₩74,000)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ RATING 라디오 버튼 (전체, 4.8-5.0, 4.5-4.8, 4.0-4.5, 3.0-4.0)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 초기화/필터 적용하기 버튼 (1:2 비율)</li>
              <li>✅ Small 모달 크기</li>
            </ul>
          </div>

          <div style={{
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '0.8rem',
            border: '0.1rem solid #e9ecef'
          }}>
            <h3 style={{ 
              fontSize: '1.6rem', 
              fontWeight: '600', 
              color: '#495057', 
              marginBottom: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}>
              🗑️ 삭제 확인 모달
            </h3>
            <ul style={{ fontSize: '1.3rem', lineHeight: '1.6', color: '#6c757d', paddingLeft: '1.6rem', margin: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>✅ 경고 아이콘 (빨간색 배경)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 삭제 확인 제목 텍스트</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 삭제 설명 메시지</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 취소/삭제 버튼 (1:1 비율)</li>
              <li style={{ marginBottom: '0.8rem' }}>✅ 전용 패딩 (좌우 16px, 상 32px, 하 24px)</li>
              <li>✅ ConfirmationModal 크기</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 최근 작업 결과 */}
      {lastAction && (
        <div style={{
          backgroundColor: '#d4edda',
          border: '0.1rem solid #c3e6cb',
          borderRadius: '1.2rem',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <div style={{
            fontSize: '2.4rem',
            marginBottom: '1rem'
          }}>
            ✅
          </div>
          <h3 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            color: '#155724', 
            marginBottom: '0.8rem' 
          }}>
            테스트 완료!
          </h3>
          <p style={{ 
            fontSize: '1.5rem', 
            color: '#155724', 
            margin: 0,
            lineHeight: '1.5'
          }}>
            {lastAction}
          </p>
          <Button
            variant="secondary"
            onClick={() => setLastAction(null)}
            style={{ 
              marginTop: '1.2rem',
              padding: '0.8rem 1.6rem',
              fontSize: '1.3rem'
            }}
          >
            확인
          </Button>
        </div>
      )}

      {Object.keys(testResults).length > 0 && (
        <div style={{
          backgroundColor: '#ffffff',
          border: '0.1rem solid #e9ecef',
          borderRadius: '1.2rem',
          padding: '2.4rem',
          marginBottom: '2rem',
          boxShadow: '0 0.4rem 0.6rem rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#212529', 
            marginBottom: '2rem',
            borderBottom: '0.2rem solid #6C5CE7',
            paddingBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem'
          }}>
            🧪 테스트 결과 히스토리
          </h3>

          <div style={{
            display: 'grid',
            gap: '1.6rem'
          }}>
            {Object.entries(testResults).map(([key, value]) => (
              <div key={key} style={{
                backgroundColor: '#f8f9fa',
                border: '0.1rem solid #e9ecef',
                borderRadius: '0.8rem',
                padding: '1.6rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.2rem'
                }}>
                  <h4 style={{
                    fontSize: '1.6rem',
                    fontWeight: '600',
                    color: '#495057',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem'
                  }}>
                    {key === 'wine' && '🍷 와인 등록'}
                    {key === 'review' && '⭐ 리뷰 등록'}
                    {key === 'filter' && '🔍 필터 적용'}
                    {key === 'confirmation' && '🗑️ 삭제 확인'}
                  </h4>
                  <span style={{
                    fontSize: '1.2rem',
                    color: '#6c757d',
                    backgroundColor: '#ffffff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '1rem',
                    border: '0.1rem solid #dee2e6'
                  }}>
                    {value.timestamp}
                  </span>
                </div>
                
                {key === 'confirmation' ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    padding: '1rem',
                    backgroundColor: value.action === 'confirmed' ? '#d4edda' : '#f8d7da',
                    borderRadius: '0.6rem',
                    border: `0.1rem solid ${value.action === 'confirmed' ? '#c3e6cb' : '#f5c6cb'}`
                  }}>
                    <span style={{ fontSize: '1.8rem' }}>
                      {value.action === 'confirmed' ? '✅' : '❌'}
                    </span>
                    <span style={{
                      fontSize: '1.4rem',
                      fontWeight: '500',
                      color: value.action === 'confirmed' ? '#155724' : '#721c24'
                    }}>
                      {value.action === 'confirmed' ? '삭제 확인됨' : '삭제 취소됨'}
                    </span>
                  </div>
                ) : (
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '0.1rem solid #dee2e6',
                    borderRadius: '0.6rem',
                    padding: '1.2rem',
                    fontSize: '1.3rem',
                    color: '#495057'
                  }}>
                    <details>
                      <summary style={{ 
                        cursor: 'pointer', 
                        fontWeight: '500',
                        marginBottom: '0.8rem'
                      }}>
                        데이터 상세보기
                      </summary>
                      <pre style={{ 
                        fontSize: '1.1rem',
                        color: '#6c757d',
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all'
                      }}>
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '0.1rem solid #dee2e6'
          }}>
            <Button
              variant="secondary"
              onClick={() => setTestResults({})}
              style={{ 
                padding: '0.8rem 1.6rem',
                fontSize: '1.3rem'
              }}
            >
              히스토리 지우기
            </Button>
          </div>
        </div>
      )}

      <div style={{
        backgroundColor: '#fff3cd',
        border: '0.1rem solid #ffeeba',
        borderRadius: '0.8rem',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.6rem', fontWeight: '600', color: '#856404', marginBottom: '1rem' }}>
          💡 테스트 방법
        </h3>
        <p style={{ fontSize: '1.4rem', color: '#856404', lineHeight: '1.6', margin: 0 }}>
          각 버튼을 클릭하여 모달을 열고, Figma 이미지와 비교해보세요.<br/>
          모든 필드를 입력하고 제출하면 콘솔에서 데이터를 확인할 수 있습니다.<br/>
          반응형 테스트를 위해 브라우저 창 크기를 조절해보세요.
        </p>
      </div>

      {/* Wine Modal */}
      {activeModal === 'wine' && (
        <WineFormModal
          mode="create"
          onClose={closeModal}
          onSuccess={handleWineSuccess}
        />
      )}

      {/* Review Modal */}
      {activeModal === 'review' && (
        <ReviewFormModal
          mode="create"
          wineId="test-wine-id"
          onClose={closeModal}
          onSuccess={handleReviewSuccess}
        />
      )}

      {/* Filter Modal */}
      {activeModal === 'filter' && (
        <FilterModal
          initialData={FILTER_DEFAULT_VALUES}
          onClose={closeModal}
          onApply={handleFilterApply}
        />
      )}

      {/* Confirmation Modal */}
      {activeModal === 'confirmation' && (
        <ConfirmationModal
          isOpen={true}
          onClose={closeModal}
          onConfirm={handleConfirm}
          title="정말 삭제하시겠습니까?"
          confirmText="삭제하기"
          cancelText="취소"
          variant="destructive"
        />
      )}
      </TestLayout>
    </>
  );
}