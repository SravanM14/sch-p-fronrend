import "./dataTable.css";

interface DataTableprops<T>{
  columns :{key:keyof T, label:string}[];
  data:T[]
}


const DataTable = <T,>(_props: DataTableprops<T>) => {


  return (
    <div className="card border-0 shadow-sm user-table-card">

      <div className="table-responsive">
        <table className="table user-table align-middle mb-0">
          <thead>
            <tr>
             {
              _props.columns.map(c=>(
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
              {
                _props.data.map((row, index)=>(
                  <tr key={String(index)}>
                      {
                        _props.columns.map(c=>(
                          <td key={String(c.key)}>
                            {String(row[c.key])}
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
                ))
              }
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="card-body border-top">
        <div className="d-flex flex-wrap justify-content-between align-items-center">

          <div className="text-muted small mb-2 mb-md-0">
            Showing <strong>1</strong> to <strong>10</strong> of{" "}
            <strong>50</strong> users
          </div>

          <nav>
            <ul className="pagination pagination-sm mb-0">

              <li className="page-item disabled">
                <button className="page-link">
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>

              <li className="page-item active">
                <button className="page-link">
                  1
                </button>
              </li>

              <li className="page-item">
                <button className="page-link">
                  2
                </button>
              </li>

              <li className="page-item">
                <button className="page-link">
                  3
                </button>
              </li>

              <li className="page-item">
                <button className="page-link">
                  4
                </button>
              </li>

              <li className="page-item">
                <button className="page-link">
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