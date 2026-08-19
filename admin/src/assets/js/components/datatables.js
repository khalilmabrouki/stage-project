


function initDataTables() {
  const tableElements = document.querySelectorAll('.data-table');
  tableElements.forEach((el) => {
    new simpleDatatables.DataTable(el, {
      searchable: true,
      fixedHeight: true,
      perPage: 10,
      classes: {
        active: "active",
        disabled: "disabled",
        selector: "form-select form-select-sm d-inline-block w-50",
        paginationList: "pagination pagination-sm mb-0",
        paginationListItem: "page-item",
        paginationListItemLink: "page-link",
        input: "form-control form-control-sm",
        info: "text-muted small",
        top: "dataTable-top d-flex flex-column flex-sm-row justify-content-between align-items-center mb-3",
        bottom: "dataTable-bottom d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 border-top pt-3",
      }
    });
  });
}
