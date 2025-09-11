"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { useModal } from "../manager/ModalProvider";
import { FILTER_DEFAULT_VALUES } from "../manager/modalConfigs";
import { hasToken } from "@/actions/hasToken.action";
import type { FilterState } from "../../../types/component-types";
import type { components } from "../../../types/types";

/**
 * 🚀 스마트 모달 훅 - 컨텍스트 기반 자동 모달 선택 (완전 개선 버전)
 *
 * 🔧 개선사항:
 * - 실제 인증 시스템 연동 (hasToken 서버 액션)
 * - 비동기 처리 완전 지원
 * - 타입 안정성 강화 (ID 자동 변환)
 * - 포괄적 에러 처리
 * - 사용자 친화적 피드백
 */

// 페이지 경로 기반 컨텍스트 분석
type PageContext =
  | "wine-list"
  | "wine-detail"
  | "my-wines"
  | "my-reviews"
  | "admin"
  | "unknown";
type ModalIntent = "create" | "edit" | "view" | "filter" | "review";

// 모달 데이터 타입 정의 (교집합 타입으로 모든 속성 포함)
interface ModalData {
  wineId?: string | number;
  reviewId?: string | number;
  filters?: FilterState;
  intent?: string;
  onApply?: (filters: FilterState) => void;
  onSuccess?: (review: components["schemas"]["ReviewDetailType"]) => void;
  [key: string]: unknown;
}

interface SmartModalOptions {
  // 자동 인증 체크 (기본: true)
  requireAuth?: boolean;
  // 성공시 리다이렉트 경로
  redirectOnSuccess?: string;
  // 에러 핸들링 콜백
  onError?: (error: Error) => void;
  // 성공 콜백
  onSuccess?: (data?: ModalData) => void;
  // 로딩 상태 콜백
  onLoadingChange?: (loading: boolean) => void;
  // 필터 적용 콜백
  onFilterApply?: (filters: FilterState) => void;
}

export const useSmartModal = (options: SmartModalOptions = {}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { openWineModal, openReviewModal, openFilterModal, closeModal } =
    useModal();
  const [isLoading, setIsLoading] = useState(false);

  // 🔐 실제 인증 상태 확인 (비동기)
  const checkAuthenticationStatus = useCallback(async (): Promise<boolean> => {
    try {
      return await hasToken();
    } catch (error) {
      console.error("Authentication check failed:", error);
      return false;
    }
  }, []);

  // 📍 페이지 컨텍스트 분석 (개선된 매칭)
  const analyzePageContext = useCallback((): PageContext => {
    // 더 정확한 경로 매칭
    if (pathname.includes("/wines/") && pathname.match(/\/wines\/\d+/))
      return "wine-detail";
    if (pathname.includes("/wines") || pathname === "/") return "wine-list";
    if (pathname.includes("/my-wines") || pathname.includes("/profile/wines"))
      return "my-wines";
    if (
      pathname.includes("/my-reviews") ||
      pathname.includes("/profile/reviews")
    )
      return "my-reviews";
    if (pathname.includes("/admin")) return "admin";
    return "unknown";
  }, [pathname]);

  // 🎯 모달 의도 자동 추론 (개선된 키워드 분석)
  const inferModalIntent = useCallback((action: string): ModalIntent => {
    const lowerAction = action.toLowerCase();
    if (
      lowerAction.includes("create") ||
      lowerAction.includes("add") ||
      lowerAction.includes("new")
    )
      return "create";
    if (
      lowerAction.includes("edit") ||
      lowerAction.includes("modify") ||
      lowerAction.includes("update")
    )
      return "edit";
    if (lowerAction.includes("filter") || lowerAction.includes("search"))
      return "filter";
    if (lowerAction.includes("review") || lowerAction.includes("rate"))
      return "review";
    return "view";
  }, []);

  // 🛡️ ID 안전 변환 (타입 안정성)
  const safeConvertId = useCallback(
    (id: string | number | undefined): string | undefined => {
      if (id === undefined || id === null) return undefined;
      return typeof id === "string" ? id : String(id);
    },
    []
  );

  // 🚨 에러 처리 및 사용자 피드백
  const handleError = useCallback(
    (error: Error, context: string) => {
      console.error(`Smart modal error in ${context}:`, error);

      if (options.onError) {
        options.onError(error);
      } else {
        // 사용자 친화적인 에러 메시지
        const userFriendlyMessage = error.message.includes("권한")
          ? "이 작업을 수행할 권한이 없습니다."
          : error.message.includes("로그인")
          ? "로그인이 필요한 서비스입니다."
          : error.message.includes("ID가 필요")
          ? "필수 정보가 누락되었습니다."
          : "요청 처리 중 오류가 발생했습니다.";

        alert(userFriendlyMessage);
      }
    },
    [options]
  );

  // 🔄 로딩 상태 관리
  const setLoadingState = useCallback(
    (loading: boolean) => {
      setIsLoading(loading);
      if (options.onLoadingChange) {
        options.onLoadingChange(loading);
      }
    },
    [options]
  );

  // 🍷 와인 관련 액션 처리 (비동기)
  const handleWineAction = useCallback(
    async (intent: ModalIntent, pageContext: PageContext, data?: ModalData) => {
      switch (intent) {
        case "create":
          return await openWineModal("create");
        case "edit":
          const wineId = safeConvertId(data?.wineId);
          if (!wineId) throw new Error("와인 ID가 필요합니다.");
          return await openWineModal("edit", wineId);
        default:
          throw new Error(`지원하지 않는 와인 액션: ${intent}`);
      }
    },
    [openWineModal, safeConvertId]
  );

  // ⭐ 리뷰 관련 액션 처리 (비동기)
  const handleReviewAction = useCallback(
    async (intent: ModalIntent, pageContext: PageContext, data?: ModalData) => {
      switch (intent) {
        case "create":
        case "review":
          const wineId = safeConvertId(data?.wineId);
          if (!wineId) throw new Error("와인 ID가 필요합니다.");
          return await openReviewModal("create", wineId, undefined, data?.onSuccess);
        case "edit":
          const editWineId = safeConvertId(data?.wineId);
          const reviewId = safeConvertId(data?.reviewId);
          if (!editWineId || !reviewId) {
            throw new Error("와인 ID와 리뷰 ID가 필요합니다.");
          }
          return await openReviewModal("edit", editWineId, reviewId, data?.onSuccess);
        default:
          throw new Error(`지원하지 않는 리뷰 액션: ${intent}`);
      }
    },
    [openReviewModal, safeConvertId]
  );

  // 🔍 필터 액션 처리
  const handleFilterAction = useCallback(
    (pageContext: PageContext, data?: ModalData) => {
      const handleApply = (filters: FilterState) => {
        console.log("Filters applied:", filters);
        const onApplyCallback = data?.onApply;
        if (onApplyCallback) {
          onApplyCallback(filters);
        } else if (options.onFilterApply) {
          options.onFilterApply(filters);
        } else {
          console.log("No onApply or onFilterApply callback provided.");
        }
      };
      const currentFilters = data?.filters || FILTER_DEFAULT_VALUES;
      return openFilterModal(currentFilters, handleApply);
    },
    [openFilterModal, options]
  );

  // ➕ 생성 액션 처리 (페이지별 자동 추론, 비동기)
  const handleCreateAction = useCallback(
    async (pageContext: PageContext, data?: ModalData) => {
      switch (pageContext) {
        case "wine-list":
        case "my-wines":
        case "admin":
          return await openWineModal("create");
        case "wine-detail":
          const wineId = safeConvertId(data?.wineId);
          if (wineId) {
            return await openReviewModal("create", wineId);
          }
          return await openWineModal("create");
        default:
          return await openWineModal("create");
      }
    },
    [openWineModal, openReviewModal, safeConvertId]
  );

  // ✏️ 수정 액션 처리 (페이지별 자동 추론, 비동기)
  const handleEditAction = useCallback(
    async (pageContext: PageContext, data?: ModalData) => {
      switch (pageContext) {
        case "wine-detail":
          const reviewId = safeConvertId(data?.reviewId);
          const wineId = safeConvertId(data?.wineId);

          if (reviewId && wineId) {
            return await openReviewModal("edit", wineId, reviewId);
          }
          if (wineId) {
            return await openWineModal("edit", wineId);
          }
          throw new Error("수정할 항목의 ID가 필요합니다.");
        default:
          const editWineId = safeConvertId(data?.wineId);
          if (editWineId) {
            return await openWineModal("edit", editWineId);
          }
          throw new Error("수정할 와인 ID가 필요합니다.");
      }
    },
    [openWineModal, openReviewModal, safeConvertId]
  );

  /**
   * 🎲 컨텍스트 분석 후 적절한 모달 선택 및 실행 (비동기 완전 지원)
   */
  const selectAndOpenModal = useCallback(
    async (
      action: string,
      intent: ModalIntent,
      pageContext: PageContext,
      data?: ModalData
    ) => {
      // 1. 명시적 액션 처리 (비동기 지원)
      switch (action) {
        case "wine-create":
          return await openWineModal("create");

        case "wine-edit":
          const wineId = safeConvertId(data?.wineId);
          if (!wineId) throw new Error("와인 ID가 필요합니다.");
          return await openWineModal("edit", wineId);

        case "review-create":
          const reviewWineId = safeConvertId(data?.wineId);
          if (!reviewWineId) throw new Error("와인 ID가 필요합니다.");
          return await openReviewModal("create", reviewWineId, null, data?.onSuccess);

        case "review-edit":
          const editWineId = safeConvertId(data?.wineId);
          const reviewId = safeConvertId(data?.reviewId);
          if (!editWineId || !reviewId)
            throw new Error("와인 ID와 리뷰 ID가 필요합니다.");
          return await openReviewModal("edit", editWineId, reviewId, data?.onSuccess);
      }

      // 2. 컨텍스트 기반 자동 추론 (비동기 지원)
      switch (action) {
        case "wine":
          return await handleWineAction(intent, pageContext, data);

        case "review":
          return await handleReviewAction(intent, pageContext, data);

        case "filter":
        case "search":
          return handleFilterAction(pageContext, data);

        // 3. 단순 액션 키워드 처리 (비동기 지원)
        case "create":
        case "add":
        case "new":
          return await handleCreateAction(pageContext, data);

        case "edit":
        case "modify":
        case "update":
          return await handleEditAction(pageContext, data);

        default:
          throw new Error(`알 수 없는 액션: ${action}`);
      }
    },
    [
      openWineModal,
      openReviewModal,
      safeConvertId,
      handleWineAction,
      handleReviewAction,
      handleFilterAction,
      handleCreateAction,
      handleEditAction,
    ]
  );

  /**
   * 🎯 메인 스마트 모달 함수 (완전 개선 버전)
   * @param action - 액션 타입 ('wine', 'review', 'filter' 또는 구체적인 액션)
   * @param data - 컨텍스트 데이터 (ID, 필터 상태 등)
   */
  const openSmartModal = useCallback(
    async (action: string, data?: ModalData) => {
      const pageContext = analyzePageContext();
      const intent = inferModalIntent(action);

      try {
        setLoadingState(true);

        // 🔐 인증 체크 (비동기)
        if (options.requireAuth !== false) {
          const isAuthenticated = await checkAuthenticationStatus();
          if (!isAuthenticated) {
            const error = new Error("로그인이 필요합니다.");
            handleError(error, "authentication");
            router.push("/login");
            return;
          }
        }

        // 🚀 컨텍스트 기반 자동 모달 선택 (비동기 완전 지원)
        await selectAndOpenModal(action, intent, pageContext, data);

        // 📈 성공 콜백
        if (options.onSuccess) {
          options.onSuccess(data);
        }

        // 🔄 성공시 리다이렉트
        if (options.redirectOnSuccess) {
          router.push(options.redirectOnSuccess);
        }
      } catch (error) {
        handleError(error as Error, `openSmartModal(${action})`);
      } finally {
        setLoadingState(false);
      }
    },
    [
      analyzePageContext,
      inferModalIntent,
      options,
      checkAuthenticationStatus,
      handleError,
      setLoadingState,
      router,
      selectAndOpenModal,
    ]
  );

  /**
   * 🎯 간편 사용법을 위한 헬퍼 함수들 (완전 개선)
   */
  const smartActions = {
    // 🔥 가장 간단한 사용법 - 컨텍스트 자동 추론
    create: (data?: ModalData) => openSmartModal("create", data),
    edit: (data?: ModalData) => openSmartModal("edit", data),
    filter: (
      filters?: FilterState,
      onApply?: (filters: FilterState) => void
    ) => {
      openSmartModal("filter", { filters, onApply });
    },

    // 명시적 액션 (타입 안전)
    createWine: () => openSmartModal("wine-create"),
    editWine: (wineId: string | number) =>
      openSmartModal("wine-edit", { wineId }),
    reviewWine: (wineId: string | number) =>
      openSmartModal("review-create", { wineId }),
    editReview: (wineId: string | number, reviewId: string | number) =>
      openSmartModal("review-edit", { wineId, reviewId }),

    // 컨텍스트 기반 액션
    wine: (intent: "create" | "edit", data?: ModalData) =>
      openSmartModal("wine", { ...data, intent }),
    review: (intent: "create" | "edit", data?: ModalData) =>
      openSmartModal("review", { ...data, intent }),
  };

  return {
    // 메인 함수
    openSmartModal,

    // 🚀 편의 함수들 (주로 사용할 것들)
    ...smartActions,

    // 상태 정보
    isLoading,
    pageContext: analyzePageContext(),

    // 유틸리티 함수들
    checkAuth: checkAuthenticationStatus,
    closeModal,
  };
};

/**
 * 🔥 더 간단한 사용을 위한 추가 훅 (완전 개선 버전)
 * 자동 에러 처리와 인증 체크가 포함된 버전
 */
export const useQuickModal = (customOptions?: Partial<SmartModalOptions>) => {
  const smartModal = useSmartModal({
    requireAuth: true,
    onError: (error) => {
      console.error("Quick modal error:", error);
      // 더 나은 사용자 경험을 위한 에러 처리
      if (error.message.includes("로그인")) {
        alert("🔒 로그인이 필요한 서비스입니다.");
      } else if (error.message.includes("권한")) {
        alert("⚠️ 이 작업을 수행할 권한이 없습니다.");
      } else if (error.message.includes("ID가 필요")) {
        alert("📝 필수 정보가 누락되었습니다.");
      } else {
        alert("❌ 요청 처리 중 오류가 발생했습니다.");
      }
    },
    onSuccess: (data) => {
      console.log("Quick modal action successful:", data);
    },
    ...customOptions,
  });

  return {
    // 🔥 초간단 사용법
    add: smartModal.create, // 추가하기 (페이지별 자동 판별)
    edit: smartModal.edit, // 수정하기 (페이지별 자동 판별)
    filter: (
      filters?: FilterState,
      onApply?: (filters: FilterState) => void
    ) => {
      smartModal.filter(filters, onApply);
    }, // 필터 열기

    // 명시적 제어가 필요한 경우
    wine: {
      create: smartModal.createWine,
      edit: smartModal.editWine,
    },
    review: {
      create: (wineId: string | number, options?: { onSuccess?: (review: components["schemas"]["ReviewDetailType"]) => void }) => {
        return smartModal.openSmartModal("review-create", { 
          wineId, 
          onSuccess: options?.onSuccess 
        });
      },
      edit: (wineId: string | number, reviewId: string | number, options?: { onSuccess?: (review: components["schemas"]["ReviewDetailType"]) => void }) => {
        return smartModal.openSmartModal("review-edit", { 
          wineId, 
          reviewId,
          onSuccess: options?.onSuccess 
        });
      },
    },

    // 상태 및 유틸리티
    isLoading: smartModal.isLoading,
    pageContext: smartModal.pageContext,

    // 추가 메서드들 (중복 없이 선택적으로 노출)
    openSmartModal: smartModal.openSmartModal,
    checkAuth: smartModal.checkAuth,
    closeModal: smartModal.closeModal,
  };
};
