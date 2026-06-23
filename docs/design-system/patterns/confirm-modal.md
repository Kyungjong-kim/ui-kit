# 확인 모달

> 사용자 확인이 필요한 **차단형 모달**(생성·삭제·이탈 재확인 등). 전부 `Modal`로 구성한다.

> 모달 자체 동작(열림·검증·버튼 비활성)은 아래 스니펫에 포함. 확정 핸들러의 실제 데이터 처리만 화면이 담당한다.

---

## 1. 공통 골격

**헤더·푸터·패딩·스크롤은 `Modal`이 처리** — 직접 div로 만들지 않는다.

```
Modal
├─ 헤더  = title (질문형: "~하시겠습니까?")
├─ 본문  = content 슬롯 — 선택(본문 텍스트 / 사유 입력 / 확인 텍스트 / 체크박스). 없으면 생략
└─ 푸터  = secondaryAction(취소) / primaryAction(확정). 단순 안내는 확인 1개만
```

---

## 2. 의도별 버튼 규칙 (핵심)

| 의도 | 확정 버튼 | 보조 버튼 | 예 |
|---|---|---|---|
| 긍정·확정 | `variant="primary"` | 「취소」 | 생성·확정·다운로드 |
| 삭제·제거 (파괴적) | `variant="destructive"` | **「닫기」** | 삭제·제거 |
| 동작 차단 안내(단순) | **`variant="secondary"` 단일** | — | "확인" 1개 (삭제 불가 사유 등) |
| 클릭만으로 확정되지 않는 경우 | **`variant="secondary"`** | 「취소」 | 별도 '저장'으로 최종 확정 |

> **확정 버튼 색 규칙:** 긍정·확정=`primary` / 파괴적(삭제·제거)=`destructive` / 단순 확인류(차단 안내·클릭만으로 확정 안 됨)=`secondary`. 단순 확인에 `primary`를 쓰지 않는다.

- 보조(좌)는 `variant="secondary"`, 확정은 우측.
- **보조 버튼 라벨: 긍정·확정·단순 확인 = 「취소」 / 파괴적(삭제·제거) = 「닫기」.**
- 동작이 차단돼 알리기만 할 땐 **확인 버튼 1개**(`secondaryAction` 생략).

---

## 3. 콘텐츠 변형

| 변형 | 콘텐츠 | 쓰임 |
|---|---|---|
| (a) 타이틀만 | 없음 | 단순 재확인 |
| (b) +본문 | `<p>` 한두 줄 | 결과/영향 안내 |
| (c) +사유 입력 | `Textarea`(사유*) | 사유 필수면 비면 확정 disabled |
| (d) +확인 텍스트 | 본문 + `Input` | 위험 삭제 — 키워드 입력해야 확정 활성 |
| (e) +체크박스 | 본문 + `Checkbox` | 추가 동의 |
| (f) 단일 확인 | 본문 | 동작 차단 안내 |
| (g) +경고 박스 | 본문 위 경고 박스 | 영향이 큰 삭제(연결·공유·운영 중) — (d)와 조합 |

본문 텍스트는 기본 `typography-body-md-regular text-[var(--color-text-secondary)]`. 위험 삭제 안내문(d)은 `-medium`, 강조 키워드는 `typography-body-md-bold text-[var(--color-text-danger-default)]`.

---

## 4. 복붙 스켈레톤

### (a) 기본 확정 — primary

```tsx
const [open, setOpen] = useState(false);
const [submitting, setSubmitting] = useState(false);

const onConfirm = async () => {
  setSubmitting(true);
  try {
    await confirmAction(id);   // 실제 처리
    setOpen(false);
  } finally {
    setSubmitting(false);
  }
};

<Modal
  open={open}
  onOpenChange={setOpen}
  title="이 항목을 확정하시겠습니까?"
  secondaryAction={<Button variant="secondary" size="md" onClick={() => setOpen(false)}>취소</Button>}
  primaryAction={<Button variant="primary" size="md" loading={submitting} onClick={onConfirm}>확정</Button>}
/>
```

### (b) 삭제 — destructive + 본문

```tsx
<Modal
  open={open}
  onOpenChange={setOpen}
  title="선택한 항목을 삭제하시겠습니까?"
  content={<p className="typography-body-md-regular text-[var(--color-text-secondary)]">삭제하면 되돌릴 수 없습니다.</p>}
  secondaryAction={<Button variant="secondary" size="md" onClick={() => setOpen(false)}>닫기</Button>}
  primaryAction={<Button variant="destructive" size="md" loading={submitting} onClick={onConfirm}>삭제</Button>}
/>
```

### (c) 사유 필수 (Textarea)

```tsx
const [reason, setReason] = useState("");

<Modal
  open={open}
  onOpenChange={setOpen}
  title="이 항목을 반려하시겠습니까?"
  content={
    <Textarea label="반려 사유" placeholder="반려 사유 입력" value={reason} onChange={(e) => setReason(e.target.value)} />
  }
  secondaryAction={<Button variant="secondary" size="md" onClick={() => setOpen(false)}>닫기</Button>}
  primaryAction={
    <Button variant="destructive" size="md" disabled={!reason.trim()} loading={submitting} onClick={onConfirm}>반려</Button>
  }
/>
```

### (d) 위험 삭제 — 확인 텍스트 매칭 (+ (g) 경고 박스)

```tsx
const [confirmText, setConfirmText] = useState("");
const KEYWORD = "삭제";
const isHighImpact = true;   // 연결·공유·운영 중 등 영향 큰 삭제인지 — 호출부 판단

<Modal
  open={open}
  onOpenChange={setOpen}
  title="이 항목을 삭제하시겠습니까?"
  content={
    <div className="flex flex-col gap-stack-sm">
      {/* (g) 영향 큰 삭제만 본문 위에 경고 박스 (라이브러리에 Alert 없음 → 색 배경 박스로 조립) */}
      {isHighImpact && (
        <div className="rounded-sm bg-[var(--color-bg-warning-subtle)] px-inline-md py-stack-sm typography-body-sm-regular text-[var(--color-text-primary)]">
          현재 연결된 항목이 있습니다. 삭제하면 연결된 대상도 더 이상 접근할 수 없습니다.
        </div>
      )}
      <p className="typography-body-md-medium text-[var(--color-text-secondary)]">
        삭제는 되돌릴 수 없습니다. 계속하려면{" "}
        <span className="typography-body-md-bold text-[var(--color-text-danger-default)]">'{KEYWORD}'</span>를 입력하세요.
      </p>
      <Input placeholder={`${KEYWORD} 입력`} value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
    </div>
  }
  secondaryAction={<Button variant="secondary" size="md" onClick={() => setOpen(false)}>닫기</Button>}
  primaryAction={
    <Button variant="destructive" size="md" disabled={confirmText !== KEYWORD} loading={submitting} onClick={onConfirm}>삭제</Button>
  }
/>
```

### (e) 추가 동의 / (f) 단일 확인

```tsx
{/* (e) 추가 동의 */}
content={
  <div className="flex flex-col gap-stack-sm">
    <p className="typography-body-md-regular text-[var(--color-text-secondary)]">생성 후 하위 항목까지 한번에 진행할 수 있습니다.</p>
    <Checkbox label="하위 항목도 한번에 진행" checked={withChildren} onCheckedChange={setWithChildren} />
  </div>
}

{/* (f) 동작 차단 안내 — 확인 1개만 */}
<Modal
  open={open}
  onOpenChange={setOpen}
  title="삭제하려면 먼저 사용을 중지해 주세요."
  content={<p className="typography-body-md-regular text-[var(--color-text-secondary)]">사용 중인 항목이라 삭제할 수 없습니다. 중지한 후 다시 시도해 주세요.</p>}
  primaryAction={<Button variant="secondary" size="md" onClick={() => setOpen(false)}>확인</Button>}
/>
```

---

## 5. 이탈 재확인 모달 (미저장 변경 가드)

위 §1~4 확정 모달과 달리, **이탈 시도를 가로채** 띄우는 가드형. 모달 자체는 동일하게 `Modal`을 쓴다.

**발생:** 변경사항(dirty)이 있는 상태에서 이탈 시도. 이탈 = 뒤로가기 · 메뉴 이동 · 새로고침/창닫기.

**3단계 가드** (셋 다 화면 책임):

| # | 트리거 | 처리 |
|---|---|---|
| ① 탭 전환 | dirty 상태에서 다른 탭 클릭 | 핸들러가 dirty 체크 → 전환 막고 Modal |
| ② 라우트 이동 | 뒤로가기·메뉴 이동 | 라우터 이벤트 가로채 abort → Modal |
| ③ 새로고침·창닫기 | `beforeunload` | 브라우저 **네이티브 경고창**(커스텀 문구 불가) |

**버튼 매핑:** **나가기**=`secondary`(저장 없이 폐기 + 대기 중이던 이동 수행) / **계속 작업**=`primary`(현재 화면 유지). 닫기 X 없음(`showCloseButton={false}`).

```tsx
const dirtyRef = useRef(false);         // dirty 신호
const [leaveOpen, setLeaveOpen] = useState(false);

// ③ 새로고침/창닫기
useEffect(() => {
  const handler = (e: BeforeUnloadEvent) => { if (!dirtyRef.current) return; e.preventDefault(); e.returnValue = ""; };
  window.addEventListener("beforeunload", handler);
  return () => window.removeEventListener("beforeunload", handler);
}, []);

// ①② dirty 상태에서 탭 전환·라우트 이동을 가로채 setLeaveOpen(true)

<Modal
  open={leaveOpen}
  showCloseButton={false}
  title="저장하지 않고 나가시겠습니까?"
  content={<p className="typography-body-md-regular text-[var(--color-text-secondary)]">작업한 내용이 저장되지 않습니다.</p>}
  secondaryAction={<Button variant="secondary" size="md" onClick={handleLeaveConfirm}>나가기</Button>}
  primaryAction={<Button variant="primary" size="md" onClick={handleLeaveCancel}>계속 작업</Button>}
/>
```

---

## 6. 저장·생성 재확인의 검증 → 피드백 플로우

저장·생성 클릭이 재확인 Modal을 띄우고, **확정** 클릭 후 흐름이 정해져 있다.

**취소(보조)** = 모달 닫고 작업 이어서 진행. **저장/생성(확정)** 클릭 시:

| 단계 | 결과 | 처리 |
|---|---|---|
| 유효성 검증 | **실패** | 모달 닫힘 + 검증 실패 필드 **인라인 오류** 노출 (토스트 아님) |
| 처리 | **성공** | 완료 토스트 + **저장**: 작업 화면에서 나감 / **생성**: 생성한 상세 화면으로 이동 |
| 처리 | **실패** | 실패 토스트 + 작업/생성 화면 **유지** |

```tsx
const onConfirm = async () => {
  setOpen(false);
  const errors = validate();          // 화면의 폼 검증
  if (Object.keys(errors).length) {
    setFieldErrors(errors);           // 인라인 오류 — 토스트 아님
    return;
  }
  setSubmitting(true);
  try {
    const res = await createItem(payload);
    toast.success("항목이 생성되었습니다.");
    router.push(`/items/${res.id}`);  // 저장이면 목록 등으로 나감
  } catch {
    toast.error("항목 생성에 실패했습니다. 다시 시도해 주세요."); // 화면 유지
  } finally {
    setSubmitting(false);
  }
};
```

> 검증은 **재확인 모달 본문이 아니라 원래 입력 화면의 필드**에 인라인으로 표시한다(모달은 닫힘). 토스트는 **처리 성공/실패**에만 사용.

---

## 7. 체크리스트

- [ ] 타이틀은 질문형("~하시겠습니까?")
- [ ] 파괴적(삭제·제거)=`variant="destructive"`, 그 외 확정=`variant="primary"`
- [ ] 보조는 `secondary` 좌측, 확정 우측 / **라벨: 긍정·확정·단순=「취소」, 파괴적=「닫기」**
- [ ] 사유 필수 → 비면 `disabled`, 위험 삭제 → 키워드 매칭 시 활성 (강조 키워드는 `text-danger-default`·bold / 영향 큰 삭제는 본문 위 경고 박스)
- [ ] 동작 차단 안내는 확인 1개만(`secondaryAction` 생략), 확정 버튼 `secondary`
- [ ] 확정 중 `loading`
- [ ] (이탈 가드) dirty 시 탭전환·라우트 이동·`beforeunload` 3단계 차단 / 나가기=폐기, 계속 작업=유지 / `showCloseButton={false}`
- [ ] (저장·생성) 검증 실패는 모달 닫고 **인라인 필드 오류**(토스트 아님) / 처리 성공=토스트+이동, 처리 실패=토스트+화면 유지

---

## 관련 문서
- [form-layout.md](./form-layout.md) — 생성 폼 모달·풀페이지
- [error-handling.md](./error-handling.md) — 에러 표시 수단 선택
