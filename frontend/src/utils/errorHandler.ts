/**
 * 공통 오류 처리 유틸리티 함수
 * 모든 API 오류를 일관되게 처리하고 사용자 친화적인 메시지를 반환합니다.
 */

export function handleApiError(err: unknown): string {
  // 기본 오류 메시지
  let errorMessage = "An error occurred. Please try again.";

  if (err && typeof err === "object" && "response" in err) {
    const response = (err as any).response;

    if (response?.data?.detail) {
      // Handle different types of detail
      if (Array.isArray(response.data.detail)) {
        // Pydantic validation errors
        const validationErrors = response.data.detail
          .map((error: any) => {
            if (typeof error === "string") {
              return error;
            } else if (error && typeof error === "object" && "msg" in error) {
              return error.msg;
            } else if (
              error &&
              typeof error === "object" &&
              "message" in error
            ) {
              return error.message;
            }
            return "Invalid field";
          })
          .join(", ");
        errorMessage = `Validation error: ${validationErrors}`;
      } else if (typeof response.data.detail === "string") {
        errorMessage = response.data.detail;
      } else {
        errorMessage = "Invalid input data. Please check your information.";
      }
    } else {
      // HTTP 상태 코드별 오류 메시지
      switch (response?.status) {
        case 400:
          errorMessage = "Bad request. Please check your input.";
          break;
        case 401:
          errorMessage = "Authentication required. Please log in again.";
          break;
        case 403:
          errorMessage = "You don't have permission to perform this action.";
          break;
        case 404:
          errorMessage = "The requested resource was not found.";
          break;
        case 409:
          errorMessage = "This resource already exists.";
          break;
        case 422:
          errorMessage = "Invalid input data. Please check your information.";
          break;
        case 429:
          errorMessage = "Too many requests. Please try again later.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        case 502:
          errorMessage = "Bad gateway. Please try again later.";
          break;
        case 503:
          errorMessage = "Service unavailable. Please try again later.";
          break;
        default:
          if (response?.status >= 500) {
            errorMessage = "Server error. Please try again later.";
          } else if (response?.status >= 400) {
            errorMessage = "Request failed. Please try again.";
          }
          break;
      }
    }
  } else if (err instanceof Error) {
    errorMessage = err.message;
  } else if (typeof err === "string") {
    errorMessage = err;
  }

  // Ensure errorMessage is always a string
  return String(errorMessage);
}

/**
 * 특정 API 작업에 대한 오류 메시지를 생성합니다.
 */
export function getApiErrorMessage(err: unknown, action: string): string {
  const baseMessage = handleApiError(err);

  // 특정 작업에 대한 컨텍스트 추가
  if (baseMessage.includes("Validation error:")) {
    return baseMessage;
  }

  return `${action}: ${baseMessage}`;
}
