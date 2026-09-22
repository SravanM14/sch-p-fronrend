import "./dataTable.css";

interface PaginationProps {
  totalUsers: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void
}

interface DataTableprops<T> {
  columns: { key: keyof T, label: string, type: "text" | "badge" | "date" }[];
  data: T[] | null;
  isLoading?: boolean;
  pagination?: PaginationProps
}

const formatDate = (value: unknown) => {
  const dateValue = String(value ?? "");
  const date = new Date(dateValue);

  if (!dateValue || Number.isNaN(date.getTime())) {
    return dateValue;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};


const DataTable = <T,>(_props: DataTableprops<T>) => {
  const rows = Array.isArray(_props.data) ? _props.data : [];
  const pagination: PaginationProps = _props.pagination ?? {
    totalUsers: 0,
    limit: 0,
    currentPage: 1,
    onPageChange: () => undefined,
  };

  const totalPages = Math.ceil(pagination.totalUsers / pagination.limit)

  return (
    <div className="card border-0 shadow-sm user-table-card">

      <div className="table-responsive">
        <table className="table user-table align-middle mb-0">
          <thead>
            <tr>
              {
                _props.columns.map(c => (
                  <th key={String(c.key)}>
                    {c.label}
                  </th>
                ))
              }
              <th className="text-end">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {_props.isLoading ? (
              <tr>
                <td
                  colSpan={_props.columns.length}
                  className="text-center py-4"
                >
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  >
                    <span className="visually-hidden">
                      Loading...
                    </span>
                  </div>

                  Loading users...
                </td>
              </tr>) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={_props.columns.length}
                    className="text-center py-4 text-muted"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
              rows.map((row, index) => (
                <tr key={String(index)}>
                  {
                    _props.columns.map(c => (
                      <td key={String(c.key)}>
                        {c.type === "badge" ? (
                          <span
                            className={`badge rounded-pill ${String(c.key) === "isActive" ? "status" : String(c.key)}-badge ${String(c.key) === "isActive" ? "status" : String(c.key)}-${String(c.key) === "isActive" ? (row[c.key] ? "active" : "inactive") : String(row[c.key]).toLowerCase()}`}
                          >
                            {String(c.key) === "isActive" ? (row[c.key] ? "Active" : "Inactive") : String(row[c.key])}
                          </span>
                        ) : c.type === "date" ? (
                          formatDate(row[c.key])
                        ) : (
                          String(row[c.key])
                        )}
                      </td>
                    ))
                  }
                  <td>
                    <div className="d-flex justify-content-end gap-2">

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>

                    </div>
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="card-body border-top">
        {pagination && pagination.totalUsers > 0}
        <div className="d-flex flex-wrap justify-content-between align-items-center">

          <div className="text-muted small mb-2 mb-md-0">
            Showing {" "}<strong>{Math.min(
              ((pagination?.currentPage ?? 1) - 1) * ((pagination?.limit ?? 0) + 1),
              pagination?.totalUsers ?? 0
            )}</strong> to <strong>{Math.min((pagination?.currentPage) * (pagination?.limit), pagination?.totalUsers)

            }</strong> of{" "}
            <strong>{pagination.totalUsers}</strong> users
          </div>

          <nav>
            <ul className="pagination pagination-sm mb-0">

              <li
                className={`page-item ${pagination.currentPage === 1
                    ? "disabled"
                    : ""
                  }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    pagination.onPageChange(
                      pagination.currentPage - 1
                    )
                  }
                  disabled={
                    pagination.currentPage === 1
                  }
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <li
                  key={page}
                  className={`page-item ${pagination.currentPage === page
                      ? "active"
                      : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      pagination.onPageChange(page)
                    }
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${pagination.currentPage === totalPages
                    ? "disabled"
                    : ""
                  }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    pagination.onPageChange(
                      pagination.currentPage + 1
                    )
                  }
                  disabled={
                    pagination.currentPage === totalPages
                  }
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>

        </div>
      </div>

    </div>
  );
};

export default DataTable;