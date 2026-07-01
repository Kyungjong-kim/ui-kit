# Templates

organisms·molecules를 조합한 **페이지 수준 레이아웃 골격**. 실제 데이터·비즈니스 로직은 담지 않고, 화면 구조(헤더·컨트롤·본문·액션)만 슬롯 props로 제공한다.
소스는 `src/templates/`에 있고 패키지 루트에서 named export 된다.

## 소속 템플릿

| 템플릿 | 개요 | 문서 | export |
|---|---|---|---|
| ListPageTemplate | PageHeader + ListControl + DataTable 목록 페이지 | [list-page.md](./list-page.md) | `ListPageTemplate` |
| BulkActionListPageTemplate | 행 선택 + 일괄 액션 바가 있는 목록 페이지 | [bulk-action-list-page.md](./bulk-action-list-page.md) | `BulkActionListPageTemplate` |
| DataItemsLayout | 카드 그리드형(DataItemsTable) 목록 페이지 | [data-items-layout.md](./data-items-layout.md) | `DataItemsLayout` |
| FormPageTemplate | 헤더 + 스크롤 폼 본문 + 고정 액션 바 폼 페이지 | [form-page.md](./form-page.md) | `FormPageTemplate` |
| DetailTabsPageTemplate | 탭으로 나뉜 상세 페이지 | [detail-tabs-page.md](./detail-tabs-page.md) | `DetailTabsPageTemplate` |
| SidePanelPageTemplate | 측면 패널(SidePanel) 페이지 래퍼 | [side-panel-page.md](./side-panel-page.md) | `SidePanelPageTemplate` |
| ModalPageTemplate | 중앙 모달(Modal) 페이지 래퍼 | [modal-page.md](./modal-page.md) | `ModalPageTemplate` |
| FullScreenDialogPageTemplate | 전체화면 다이얼로그 페이지 래퍼 | [full-screen-dialog-page.md](./full-screen-dialog-page.md) | `FullScreenDialogPageTemplate` |
