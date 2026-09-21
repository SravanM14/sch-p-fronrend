import DataTable from "../../../components/common/data-table/data-table";
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinedDate: string;
}


interface Column{
    key: keyof User;
    label:string;
}

const UsersList = ()=>{

     const columns: Column[] = [
    {
      key: "name",
      label: "User",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "joinedDate",
      label: "Joined Date",
    },
  ];

  const users: User[] = [
    {
      id: "USR001",
      name: "John Doe",
      email: "john@example.com",
      role: "Teacher",
      status: "Active",
      joinedDate: "20 Sep 2026",
    },
    {
      id: "USR002",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Parent",
      status: "Active",
      joinedDate: "18 Sep 2026",
    },
    {
      id: "USR003",
      name: "Robert Kumar",
      email: "robert@example.com",
      role: "Admin",
      status: "Inactive",
      joinedDate: "15 Sep 2026",
    },
  ];

return (
    <div className="container-fluid">

      <div className="mb-4">
        <h3 className="mb-1">
          Users
        </h3>

        <p className="text-muted mb-0">
          Manage school users.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={users}
      />

    </div>
)
}


export default UsersList;