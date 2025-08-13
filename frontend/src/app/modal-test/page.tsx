"use client";

import { modal } from "@/store/modal";

export default function ModalTestPage() {
  const showInfoModal = () => {
    modal.info({
      title: "정보",
      message: "이것은 정보 모달입니다.",
    });
  };

  const showSuccessModal = () => {
    modal.success({
      title: "성공",
      message: "작업이 성공적으로 완료되었습니다!",
    });
  };

  const showWarningModal = () => {
    modal.warning({
      title: "경고",
      message: "이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?",
    });
  };

  const showErrorModal = () => {
    modal.error({
      title: "오류",
      message: "작업 중 오류가 발생했습니다. 다시 시도해주세요.",
    });
  };

  const showConfirmModal = () => {
    modal.confirm({
      title: "확인",
      message: "정말로 이 항목을 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        console.log("삭제 확인됨");
        // 실제 삭제 로직
      },
      onCancel: () => {
        console.log("삭제 취소됨");
      },
    });
  };

  const showCustomModal = () => {
    modal.info({
      title: "커스텀 모달",
      content: (
        <div className="space-y-4">
          <p>이것은 커스텀 콘텐츠가 있는 모달입니다.</p>
          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-600">
              React 컴포넌트를 content로 전달할 수 있습니다.
            </p>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => modal.close()}
          >
            모달 닫기
          </button>
        </div>
      ),
      size: "lg",
    });
  };

  const showAsyncModal = () => {
    modal.confirm({
      title: "비동기 작업",
      message: "서버에 데이터를 저장하시겠습니까?",
      confirmText: "저장",
      cancelText: "취소",
      onConfirm: async () => {
        // 비동기 작업 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("데이터 저장 완료");

        // 작업 완료 후 성공 모달 표시
        modal.success({
          title: "완료",
          message: "데이터가 성공적으로 저장되었습니다.",
        });
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Modal 테스트 페이지</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button onClick={showInfoModal} className="btn btn-primary">
          정보 모달
        </button>

        <button onClick={showSuccessModal} className="btn btn-primary">
          성공 모달
        </button>

        <button onClick={showWarningModal} className="btn btn-primary">
          경고 모달
        </button>

        <button onClick={showErrorModal} className="btn btn-primary">
          오류 모달
        </button>

        <button onClick={showConfirmModal} className="btn btn-primary">
          확인 모달
        </button>

        <button onClick={showCustomModal} className="btn btn-primary">
          커스텀 모달
        </button>

        <button onClick={showAsyncModal} className="btn btn-primary">
          비동기 모달
        </button>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">사용법</h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-medium">기본 사용법:</h3>
            <pre className="bg-gray-100 p-2 rounded mt-1">
              {`import { modal } from "@/store/modal";

// 정보 모달
modal.info({
  title: "제목",
  message: "메시지"
});

// 성공 모달
modal.success({
  title: "성공",
  message: "작업 완료"
});

// 경고 모달
modal.warning({
  title: "경고",
  message: "주의사항"
});

// 오류 모달
modal.error({
  title: "오류",
  message: "오류 발생"
});

// 확인 모달
modal.confirm({
  title: "확인",
  message: "정말 삭제하시겠습니까?",
  onConfirm: () => console.log("확인됨"),
  onCancel: () => console.log("취소됨")
});`}
            </pre>
          </div>

          <div>
            <h3 className="font-medium">고급 사용법:</h3>
            <pre className="bg-gray-100 p-2 rounded mt-1">
              {`// 커스텀 콘텐츠
modal.info({
  title: "커스텀",
  content: <div>React 컴포넌트</div>,
  size: "lg"
});

// 비동기 작업
modal.confirm({
  title: "저장",
  message: "저장하시겠습니까?",
  onConfirm: async () => {
    await saveData();
    modal.success({ message: "저장 완료" });
  }
});`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
