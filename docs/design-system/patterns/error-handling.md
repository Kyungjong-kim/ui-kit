# 에러 처리

> 폼 검증·서버 오류·차단형 확인의 **표시 수단 선택**과 규칙.

> 확인 모달 정본: [confirm-modal.md](./confirm-modal.md) · 빈/실패 목록: [empty-state.md](./empty-state.md)

---

## 표시 수단 선택

| 상황 | 수단 |
|---|---|
| 필드 단위 검증 오류 | 입력 `error` + `helperText` (인라인) |
| 영역 단위 지속 안내(폼 상단 오류·주의) | 색 배경 안내 박스 (블록형) |
| 일시적 결과 알림(저장됨·실패) | `Toast` |
| 목록 로드 실패 / 결과 없음 | `EmptyState` ([empty-state.md](./empty-state.md)) |
| 파괴적·차단형 재확인 | `Modal` ([confirm-modal.md](./confirm-modal.md)) |

> 핵심 구분: **필드 오류=인라인**, **결과 알림=토스트**, **차단형=모달**, **영역 비었거나 실패=EmptyState**.

---

## 1. 필드 단위 검증 오류 (인라인)

`Input`·`Textarea`·`Select`는 `error`(bool) + `helperText`를 받는다. `error=true`면 컨트롤 테두리가 danger 색으로, `helperText`가 오류 문구로 표시된다.

```tsx
<Input
  label="이름"
  value={name}
  onChange={(e) => setName(e.target.value)}
  error={touched && !name.trim()}
  helperText={touched && !name.trim() ? "이름을 입력해 주세요." : undefined}
/>
```

- 빈 필수 필드는 `onBlur`로 `touched` 표시 후 검증한다(입력 중 즉시 빨갛게 X).
- 제출 시 전체 검증에 실패하면 각 필드에 `error`/`helperText`를 세팅하고 첫 오류 필드로 포커스/스크롤한다.

---

## 2. 영역 단위 지속 안내 (블록형)

라이브러리에 전용 `Alert`가 없으므로, 폼 상단의 지속 안내·주의는 **색 배경 안내 박스**로 조립한다. 상태별 배경/텍스트 토큰만 바꾼다.

```tsx
{/* 주의(warning) */}
<div className="rounded-sm bg-[var(--color-bg-warning-subtle)] px-inline-md py-stack-sm typography-body-sm-regular text-[var(--color-text-primary)]">
  일부 설정은 저장 후 즉시 적용됩니다.
</div>

{/* 오류(danger) */}
<div className="rounded-sm bg-[var(--color-bg-danger-subtle)] px-inline-md py-stack-sm typography-body-sm-regular text-[var(--color-text-primary)]">
  필수 항목을 모두 입력해 주세요.
</div>

{/* 정보(info) */}
<div className="rounded-sm bg-[var(--color-bg-info-subtle)] px-inline-md py-stack-sm typography-body-sm-regular text-[var(--color-text-primary)]">
  변경 사항은 검토 후 반영됩니다.
</div>
```

> 블록형은 **닫히지 않고 영역에 머무는** 안내에 쓴다. 잠깐 떴다 사라지는 결과 알림은 `Toast`다.

---

## 3. 일시적 결과 알림 (토스트)

저장됨·실패 등 **처리 결과**는 `Toast`로 알린다.

```tsx
try {
  await saveItem(payload);
  toast.success("저장되었습니다.");
} catch {
  toast.error("저장에 실패했습니다. 다시 시도해 주세요.");
}
```

- 검증 오류에는 토스트를 쓰지 않는다 → 필드 인라인(§1).
- 토스트는 처리(저장·삭제·복사 등)의 **성공/실패 한 줄 알림**에만.

---

## 4. 차단형 재확인 (모달)

파괴적·차단형 확인은 `Modal`로. 의도별 버튼·콘텐츠 변형·이탈 가드·검증→피드백 플로우는 모두 [confirm-modal.md](./confirm-modal.md)가 정본이다. 요약:

- 긍정·확정 → `variant="primary"` / 파괴적(삭제·제거) → `variant="destructive"`
- 보조(취소)는 `variant="secondary"` 좌측, 확정 우측. 라벨은 긍정·확정=「취소」, 파괴적=「닫기」.
- 동작 차단 안내만 → 확인 버튼 1개.
- 확정 핸들러의 실제 처리는 화면이 담당하고, 진행 중 버튼 `loading`.

---

## 5. 서버·API 오류

- 처리 실패는 §3 토스트로 알리고, 모달/폼 화면은 **유지**(입력 보존)한다.
- 목록 조회 실패는 §빈상태의 `error` 상태(`EmptyState` + 다시 시도)로 처리한다.
- 에러 문구는 하드코딩 대신 i18n/상수로 주입한다(번역체 금지).

---

## 관련 문서
- [form-layout.md](./form-layout.md) — 폼 검증 배치
- [confirm-modal.md](./confirm-modal.md) — 차단형 확인 모달 정본
- [empty-state.md](./empty-state.md) — 목록 로드 실패·결과 없음
