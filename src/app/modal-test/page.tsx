'use client';

import { useState, useEffect } from 'react';
import { ModalProvider, useWineModal, useReviewModal, useFilterModal } from '../../components/Modal/manager/ModalProvider';
import { ConfirmationModal } from '../../components/Modal/ConfirmationModal';
import { TestLayout } from '../../components/TestLayout/TestLayout';
import Button from '../../components/Button/Button';
import { FILTER_DEFAULT_VALUES } from '../../components/Modal/manager/modalConfigs';
import { FilterState } from '../../types/component-types';
import { fetchWithAuth } from '../../actions/api.action';
import { hasToken } from '../../actions/hasToken.action';

// Wine 데이터 타입
interface TestWine {
  id: number;
  name: string;
  type: string;
  region: string;
  price: number;
  createdAt: string;
}

// Review 데이터 타입
interface TestReview {
  id: number;
  wineId: number;
  content: string;
  rating: number;
  createdAt: string;
}

// 실제 API를 사용한 테스트 컴포넌트
function ModalTestContent() {
  const { openCreateWineModal, openEditWineModal } = useWineModal();
  const { openCreateReviewModal, openEditReviewModal } = useReviewModal();
  const { openFilterModal } = useFilterModal();

  const [createdWines, setCreatedWines] = useState<TestWine[]>([]);
  const [createdReviews, setCreatedReviews] = useState<TestReview[]>([]);
  const [filterResults, setFilterResults] = useState<FilterState | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<{type: 'wine' | 'review', id: number} | null>(null);

  // 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await hasToken();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 생성된 데이터 새로고침
  const refreshData = async () => {
    if (!isAuthenticated) return;

    try {
      // 와인 목록 조회
      const winesResponse = await fetchWithAuth('/wines?limit=50');
      const wines = winesResponse.list?.slice(0, 10) || [];
      setCreatedWines(wines.map((wine: any) => ({
        id: wine.id,
        name: wine.name,
        type: wine.type,
        region: wine.region,
        price: wine.price,
        createdAt: wine.createdAt || new Date().toISOString()
      })));

      setLastAction('데이터를 성공적으로 새로고침했습니다! 🔄');
    } catch (error) {
      console.error('Failed to refresh data:', error);
      setLastAction('데이터 새로고침에 실패했습니다. 로그인을 확인해주세요.');
    }
  };

  // 데이터 삭제
  const handleDelete = async (type: 'wine' | 'review', id: number) => {
    try {
      if (type === 'wine') {
        await fetchWithAuth(`/wines/${id}`, { method: 'DELETE' });
        setCreatedWines(prev => prev.filter(wine => wine.id !== id));
        setLastAction(`와인 ID ${id}가 성공적으로 삭제되었습니다! 🗑️`);
      } else if (type === 'review') {
        await fetchWithAuth(`/reviews/${id}`, { method: 'DELETE' });
        setCreatedReviews(prev => prev.filter(review => review.id !== id));
        setLastAction(`리뷰 ID ${id}가 성공적으로 삭제되었습니다! 🗑️`);
      }
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
      setLastAction(`${type === 'wine' ? '와인' : '리뷰'} 삭제에 실패했습니다.`);
    }
    setShowConfirmModal(null);
  };

  // 모달 성공 콜백들
  const handleWineSuccess = (result: any) => {
    setLastAction(`와인 "${result.name}"이 성공적으로 등록되었습니다! 🍷`);
    refreshData();
  };

  const handleReviewSuccess = (result: any) => {
    setLastAction('리뷰가 성공적으로 등록되었습니다! ⭐');
    refreshData();
  };

  const handleFilterApply = (filterData: FilterState) => {
    setFilterResults(filterData);
    setLastAction('필터가 성공적으로 적용되었습니다! 🔍');
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '1.6rem',
        color: '#6c757d'
      }}>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>⏳</div>
          인증 상태를 확인하는 중...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        backgroundColor: '#fff3cd',
        border: '0.1rem solid #ffeeba',
        borderRadius: '1.2rem',
        margin: '2rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🔐</div>
        <h2 style={{ fontSize: '2.4rem', fontWeight: '700', color: '#856404', marginBottom: '1.6rem' }}>
          로그인이 필요합니다
        </h2>
        <p style={{ fontSize: '1.6rem', color: '#856404', marginBottom: '2rem', lineHeight: '1.6' }}>
          모달 API 연동 테스트를 위해 로그인해주세요.<br/>
          로그인 후 이 페이지를 새로고침하면 테스트를 시작할 수 있습니다.
        </p>
        <Button
          variant="primary"
          onClick={() => window.location.href = '/login'}
          style={{ padding: '1.2rem 2.4rem', fontSize: '1.6rem' }}
        >
          로그인 페이지로 이동
        </Button>
      </div>
    );
  }

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
      
      <TestLayout title="🍷 실제 API 연동 모달 테스트">
        {/* 인증 상태 표시 */}
        <div style={{
          backgroundColor: '#d4edda',
          border: '0.1rem solid #c3e6cb',
          borderRadius: '0.8rem',
          padding: '1.6rem 2rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span style={{ fontSize: '2rem' }}>✅</span>
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '600', color: '#155724', margin: 0 }}>
              API 연동 테스트 환경
            </h3>
            <p style={{ fontSize: '1.3rem', color: '#155724', margin: 0 }}>
              실제 서버 API와 인증 시스템을 사용한 모달 테스트입니다.
            </p>
          </div>
        </div>

        {/* 테스트 버튼들 */}
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
            boxShadow: '0 0.4rem 0.6rem rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.6rem' }}>🍷</div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#212529', marginBottom: '1rem' }}>
              와인 등록 (API 연동)
            </h3>
            <p style={{ fontSize: '1.4rem', color: '#6c757d', marginBottom: '2rem', lineHeight: '1.5' }}>
              ModalProvider + fetchWithAuth<br/>
              실제 서버에 와인 데이터 저장
            </p>
            <Button
              variant="primary"
              onClick={openCreateWineModal}
              style={{ width: '100%', padding: '1.2rem 2.4rem' }}
            >
              와인 등록하기
            </Button>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            border: '0.1rem solid #e9ecef',
            borderRadius: '1.2rem',
            padding: '2.4rem',
            textAlign: 'center',
            boxShadow: '0 0.4rem 0.6rem rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.6rem' }}>⭐</div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#212529', marginBottom: '1rem' }}>
              리뷰 등록 (API 연동)
            </h3>
            <p style={{ fontSize: '1.4rem', color: '#6c757d', marginBottom: '2rem', lineHeight: '1.5' }}>
              첫 번째 와인 ID를 사용<br/>
              실제 서버에 리뷰 데이터 저장
            </p>
            <Button
              variant="primary"
              onClick={() => {
                if (createdWines.length > 0) {
                  openCreateReviewModal(createdWines[0].id.toString());
                } else {
                  setLastAction('리뷰를 작성할 와인을 먼저 등록해주세요!');
                }
              }}
              style={{ width: '100%', padding: '1.2rem 2.4rem' }}
            >
              리뷰 작성하기
            </Button>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            border: '0.1rem solid #e9ecef',
            borderRadius: '1.2rem',
            padding: '2.4rem',
            textAlign: 'center',
            boxShadow: '0 0.4rem 0.6rem rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.6rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#212529', marginBottom: '1rem' }}>
              필터 테스트
            </h3>
            <p style={{ fontSize: '1.4rem', color: '#6c757d', marginBottom: '2rem', lineHeight: '1.5' }}>
              ModalProvider 패턴<br/>
              UI 전용 (서버 연동 없음)
            </p>
            <Button
              variant="primary"
              onClick={() => openFilterModal(FILTER_DEFAULT_VALUES)}
              style={{ width: '100%', padding: '1.2rem 2.4rem' }}
            >
              필터 설정하기
            </Button>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            border: '0.1rem solid #e9ecef',
            borderRadius: '1.2rem',
            padding: '2.4rem',
            textAlign: 'center',
            boxShadow: '0 0.4rem 0.6rem rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.6rem' }}>🔄</div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#212529', marginBottom: '1rem' }}>
              데이터 새로고침
            </h3>
            <p style={{ fontSize: '1.4rem', color: '#6c757d', marginBottom: '2rem', lineHeight: '1.5' }}>
              서버에서 최신 데이터<br/>
              가져오기 (API 호출)
            </p>
            <Button
              variant="secondary"
              onClick={refreshData}
              style={{ width: '100%', padding: '1.2rem 2.4rem' }}
            >
              데이터 새로고침
            </Button>
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

        {/* 생성된 와인 데이터 */}
        {createdWines.length > 0 && (
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
              🍷 생성된 와인 데이터 (최근 10개)
            </h3>
            
            <div style={{ display: 'grid', gap: '1.2rem' }}>
              {createdWines.map((wine) => (
                <div key={wine.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.6rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '0.8rem',
                  border: '0.1rem solid #e9ecef'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.6rem', fontWeight: '600', color: '#495057', margin: 0 }}>
                      {wine.name}
                    </h4>
                    <p style={{ fontSize: '1.3rem', color: '#6c757d', margin: '0.4rem 0 0 0' }}>
                      {wine.type} | {wine.region} | ₩{wine.price?.toLocaleString()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <span style={{ 
                      fontSize: '1.2rem', 
                      color: '#6c757d',
                      padding: '0.4rem 0.8rem',
                      backgroundColor: '#ffffff',
                      borderRadius: '0.4rem',
                      border: '0.1rem solid #dee2e6'
                    }}>
                      ID: {wine.id}
                    </span>
                    <Button
                      variant="secondary"
                      onClick={() => openEditWineModal(wine.id.toString())}
                      style={{ padding: '0.6rem 1.2rem', fontSize: '1.2rem' }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setShowConfirmModal({type: 'wine', id: wine.id})}
                      style={{ 
                        padding: '0.6rem 1.2rem', 
                        fontSize: '1.2rem',
                        backgroundColor: '#dc3545',
                        color: 'white'
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 필터 결과 */}
        {filterResults && (
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
              🔍 적용된 필터 설정
            </h3>
            
            <div style={{
              backgroundColor: '#f8f9fa',
              border: '0.1rem solid #e9ecef',
              borderRadius: '0.8rem',
              padding: '1.6rem'
            }}>
              <pre style={{ 
                fontSize: '1.3rem',
                color: '#495057',
                margin: 0,
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace'
              }}>
                {JSON.stringify(filterResults, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* 사용법 안내 */}
        <div style={{
          backgroundColor: '#fff3cd',
          border: '0.1rem solid #ffeeba',
          borderRadius: '0.8rem',
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: '600', color: '#856404', marginBottom: '1rem' }}>
            💡 실제 API 연동 테스트
          </h3>
          <ul style={{ fontSize: '1.4rem', color: '#856404', lineHeight: '1.6', paddingLeft: '2rem' }}>
            <li style={{ marginBottom: '0.8rem' }}>✅ 실제 서버 API와 연동된 테스트 환경입니다.</li>
            <li style={{ marginBottom: '0.8rem' }}>✅ fetchWithAuth를 사용하여 인증 시스템을 테스트합니다.</li>
            <li style={{ marginBottom: '0.8rem' }}>✅ 생성된 데이터는 실제로 서버에 저장되며 수정/삭제 가능합니다.</li>
            <li style={{ marginBottom: '0.8rem' }}>✅ 토큰 만료 시 자동 갱신을 테스트할 수 있습니다.</li>
            <li>⚠️ 테스트 후 불필요한 데이터는 삭제 버튼으로 정리해주세요.</li>
          </ul>
        </div>

        {/* 삭제 확인 모달 */}
        {showConfirmModal && (
          <ConfirmationModal
            isOpen={true}
            onClose={() => setShowConfirmModal(null)}
            onConfirm={() => handleDelete(showConfirmModal.type, showConfirmModal.id)}
            title={`${showConfirmModal.type === 'wine' ? '와인' : '리뷰'} 데이터를 삭제하시겠습니까?`}
            confirmText="삭제하기"
            cancelText="취소"
            variant="destructive"
          />
        )}
      </TestLayout>
    </>
  );
}

// ModalProvider로 감싸진 메인 컴포넌트
export default function ModalTestPage() {
  return (
    <ModalProvider>
      <ModalTestContent />
    </ModalProvider>
  );
}