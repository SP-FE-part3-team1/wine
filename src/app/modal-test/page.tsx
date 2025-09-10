'use client';

import { useState, useEffect } from 'react';
import { ModalProvider } from '@/components/Modal';
import { useWineModal, useReviewModal, useFilterModal } from '@/components/Modal';
// 팀원이 만든 인증 시스템 사용
import { hasToken } from '@/actions/hasToken.action';
import { testApiConnection, testAuthenticatedEndpoint, createWine } from '@/actions/wine.action';
import { createReview } from '@/actions/review.action';
import { components } from '@/types/types';
import Button from '@/components/Button/Button';
import styles from './page.module.css';

type WineDetailType = components['schemas']['WineDetailType'];

interface TestResult {
  success: boolean;
  message: string;
  data?: unknown;
  timestamp: string;
}

export default function ModalTestPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [sampleWines, setSampleWines] = useState<WineDetailType[]>([]);

  // 테스트 결과 추가 함수
  const addTestResult = (result: Omit<TestResult, 'timestamp'>) => {
    setTestResults(prev => [{
      ...result,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev]);
  };

  // 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const hasAuth = await hasToken();
        setIsAuthenticated(hasAuth);
        addTestResult({
          success: hasAuth,
          message: hasAuth ? '✅ 인증 상태: 로그인됨' : '❌ 인증 상태: 로그인 필요'
        });
      } catch (error) {
        addTestResult({
          success: false,
          message: `인증 확인 실패: ${error}`
        });
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 실제 와인 데이터 로드
  const loadSampleWines = async () => {
    try {
      addTestResult({ success: true, message: '실제 와인 목록 로딩 시도 중...' });
      
      const result = await testApiConnection();
      if (result.success) {
        // API 응답에서 실제 와인 목록을 파싱
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL || 'https://winereview-api.vercel.app/17-1'}/wines?limit=5`, {
          method: 'GET',
        });
        
        if (response.ok) {
          const data = await response.json();
          const apiWines = data.list || [];
          
          // API 응답을 WineDetailType 형식으로 변환
          const convertedWines: WineDetailType[] = apiWines.map((wine: components['schemas']['WineListType']) => ({
            id: wine.id,
            name: wine.name,
            region: wine.region,
            image: wine.image,
            price: wine.price,
            type: wine.type,
            avgRating: wine.avgRating || 0,
            reviewCount: wine.reviewCount || 0,
            recentReview: wine.recentReview,
            userId: wine.userId,
            reviews: [],
            avgRatings: {}
          }));
          
          setSampleWines(convertedWines);
          addTestResult({
            success: true,
            message: `실제 와인 데이터 로드 완료 (${convertedWines.length}개)`,
            data: convertedWines
          });
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } else {
        throw new Error('API 연결 실패');
      }
    } catch (error) {
      addTestResult({
        success: false,
        message: `와인 데이터 로드 실패: ${error}`
      });
      
      // 실패 시 fallback으로 Mock 데이터 사용
      const mockWines: WineDetailType[] = [
        {
          id: 1,
          name: 'Fallback Test Wine',
          region: 'France',
          image: 'https://via.placeholder.com/150',
          price: 25000,
          type: 'RED',
          avgRating: 4.5,
          reviewCount: 10,
          recentReview: null,
          userId: 1,
          reviews: [],
          avgRatings: {}
        }
      ];
      setSampleWines(mockWines);
    }
  };

  // API 연결 테스트
  const handleApiConnectionTest = async () => {
    try {
      addTestResult({ success: true, message: 'API 연결 테스트 시작...' });
      
      const result = await testApiConnection();
      addTestResult({
        success: result.success,
        message: result.message,
        data: { status: result.status, statusText: result.statusText }
      });
    } catch (error) {
      addTestResult({
        success: false,
        message: `API 연결 실패: ${error}`
      });
    }
  };

  // 인증된 API 테스트
  const handleAuthenticatedApiTest = async () => {
    try {
      addTestResult({ success: true, message: '인증된 API 테스트 시작...' });
      
      const result = await testAuthenticatedEndpoint();
      addTestResult({
        success: result.success,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      addTestResult({
        success: false,
        message: `인증된 API 테스트 실패: ${error}`
      });
    }
  };

  // API 테스트 함수들
  const testWineCreation = async () => {
    try {
      const testWineData = {
        name: '테스트 와인 ' + Date.now(),
        type: 'RED' as const,
        region: '프랑스',
        price: 50000,
        image: 'https://via.placeholder.com/300x400'
      };

      addTestResult({ success: true, message: '와인 생성 API 호출 중...' });
      const result = await createWine(testWineData);
      
      addTestResult({
        success: true,
        message: '와인 생성 성공!',
        data: result
      });
    } catch (error) {
      addTestResult({
        success: false,
        message: `와인 생성 실패: ${error}`
      });
    }
  };

  const testReviewCreation = async () => {
    if (sampleWines.length === 0) {
      addTestResult({
        success: false,
        message: '리뷰 테스트를 위해 먼저 와인 데이터가 필요합니다'
      });
      return;
    }

    try {
      const testReviewData = {
        rating: 4,
        content: '테스트 리뷰 내용 ' + Date.now(),
        aroma: ['CHERRY', 'OAK'] as components['schemas']['Aroma'][],
        lightBold: 3,
        smoothTannic: 2,
        drySweet: 4,
        softAcidic: 3,
        wineId: sampleWines[0].id
      };

      addTestResult({ success: true, message: '리뷰 생성 API 호출 중...' });
      const result = await createReview(testReviewData);
      
      addTestResult({
        success: true,
        message: '리뷰 생성 성공!',
        data: result
      });
    } catch (error) {
      addTestResult({
        success: false,
        message: `리뷰 생성 실패: ${error}`
      });
    }
  };

  if (authLoading) {
    return (
      <div className={styles.loading}>
        <h1>모달 테스트 페이지</h1>
        <p>인증 상태 확인 중...</p>
      </div>
    );
  }

  return (
    <ModalProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>🧪 모달 시스템 테스트 페이지</h1>
          <div className={styles.authStatus}>
            <span className={`${styles.statusBadge} ${isAuthenticated ? styles.authenticated : styles.unauthenticated}`}>
              {isAuthenticated ? '✅ 인증됨' : '❌ 미인증'}
            </span>
            {!isAuthenticated && (
              <Button 
                variant="primary" 
                onClick={() => window.location.href = '/login'}
              >
                로그인하기
              </Button>
            )}
          </div>
        </header>

        <main className={styles.main}>
          {/* API 테스트 섹션 */}
          <section className={styles.section}>
            <h2>📡 API 연동 테스트</h2>
            <div className={styles.buttonGroup}>
              <Button variant="secondary" onClick={handleApiConnectionTest}>
                API 연결 테스트
              </Button>
              <Button variant="primary" onClick={handleAuthenticatedApiTest} disabled={!isAuthenticated}>
                인증된 API 테스트
              </Button>
              <Button variant="secondary" onClick={loadSampleWines}>
                샘플 와인 데이터 로드
              </Button>
              <Button 
                variant="primary" 
                onClick={testWineCreation}
                disabled={!isAuthenticated}
              >
                와인 생성 API 테스트
              </Button>
              <Button 
                variant="primary" 
                onClick={testReviewCreation}
                disabled={!isAuthenticated || sampleWines.length === 0}
              >
                리뷰 생성 API 테스트
              </Button>
            </div>
          </section>

          {/* 모달 테스트 섹션 */}
          <ModalTestSection 
            isAuthenticated={isAuthenticated}
            sampleWines={sampleWines}
            onTestResult={addTestResult}
          />

          {/* 테스트 결과 섹션 */}
          <section className={styles.section}>
            <h2>📊 테스트 결과</h2>
            <div className={styles.results}>
              {testResults.length === 0 ? (
                <p className={styles.noResults}>아직 테스트 결과가 없습니다.</p>
              ) : (
                <div className={styles.resultsList}>
                  {testResults.map((result, index) => (
                    <div 
                      key={index} 
                      className={`${styles.resultItem} ${result.success ? styles.success : styles.error}`}
                    >
                      <div className={styles.resultHeader}>
                        <span className={styles.resultIcon}>
                          {result.success ? '✅' : '❌'}
                        </span>
                        <span className={styles.resultTime}>{result.timestamp}</span>
                      </div>
                      <p className={styles.resultMessage}>{result.message}</p>
                      {result.data && (
                        <details className={styles.resultData}>
                          <summary>데이터 보기</summary>
                          <pre>{JSON.stringify(result.data, null, 2)}</pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </ModalProvider>
  );
}

// 모달 테스트 컴포넌트 분리
function ModalTestSection({ 
  isAuthenticated, 
  sampleWines, 
  onTestResult 
}: { 
  isAuthenticated: boolean;
  sampleWines: WineDetailType[];
  onTestResult: (result: Omit<TestResult, 'timestamp'>) => void;
}) {
  const { openCreateWineModal, openEditWineModal } = useWineModal();
  const { openCreateReviewModal } = useReviewModal();
  const { openFilterModal } = useFilterModal();

  return (
    <section className={styles.section}>
      <h2>🎭 모달 UI 테스트</h2>
      
      {/* 와인 모달 테스트 */}
      <div className={styles.modalTestGroup}>
        <h3>🍷 와인 모달</h3>
        <div className={styles.buttonGroup}>
          <Button 
            variant="primary" 
            onClick={() => {
              onTestResult({ success: true, message: '와인 생성 모달 열기 시도' });
              openCreateWineModal();
            }}
            disabled={!isAuthenticated}
          >
            와인 생성 모달
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => {
              if (sampleWines.length === 0) {
                onTestResult({ success: false, message: '수정할 와인이 없습니다. 먼저 샘플 데이터를 로드해주세요.' });
                return;
              }
              onTestResult({ success: true, message: '와인 수정 모달 열기 시도' });
              openEditWineModal(sampleWines[0].id.toString());
            }}
            disabled={!isAuthenticated || sampleWines.length === 0}
          >
            와인 수정 모달
          </Button>
        </div>
      </div>

      {/* 리뷰 모달 테스트 */}
      <div className={styles.modalTestGroup}>
        <h3>⭐ 리뷰 모달</h3>
        <div className={styles.buttonGroup}>
          <Button 
            variant="primary" 
            onClick={() => {
              if (sampleWines.length === 0) {
                onTestResult({ success: false, message: '리뷰를 작성할 와인이 없습니다. 먼저 샘플 데이터를 로드해주세요.' });
                return;
              }
              onTestResult({ success: true, message: '리뷰 생성 모달 열기 시도' });
              openCreateReviewModal(sampleWines[0].id.toString());
            }}
            disabled={!isAuthenticated || sampleWines.length === 0}
          >
            리뷰 생성 모달
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => {
              onTestResult({ success: true, message: '리뷰 수정 모달은 실제 리뷰 ID가 필요합니다' });
              // 실제 구현시에는 실제 리뷰 ID를 사용
              // openEditReviewModal(sampleWines[0].id.toString(), 'review-id');
            }}
            disabled={!isAuthenticated}
          >
            리뷰 수정 모달 (준비중)
          </Button>
        </div>
      </div>

      {/* 필터 모달 테스트 */}
      <div className={styles.modalTestGroup}>
        <h3>🔍 필터 모달</h3>
        <div className={styles.buttonGroup}>
          <Button 
            variant="secondary" 
            onClick={() => {
              onTestResult({ success: true, message: '필터 모달 열기 시도' });
              openFilterModal({
                wineTypes: [],
                priceRange: [0, 400000],
                ratingRange: [0, 5],
                selectedRating: 'all'
              });
            }}
          >
            필터 모달 열기
          </Button>
        </div>
      </div>
    </section>
  );
}