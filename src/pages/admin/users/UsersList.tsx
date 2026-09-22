import { useEffect, useState } from "react";
import DataTable from "../../../components/common/data-table/data-table";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { setPagination, setUserList, setUserListError, setUserListLoading, type User } from "../../../store/usersList/usersSlice";
import UserService from "../../../services/users/userService";


interface Column{
    key: keyof User;
    label:string;
  type: "text" | "badge" | "date";
}

const UsersList = ()=>{
 const dispatch =useAppDispatch();
 const userList = useAppSelector(state=> state.usersList.data)
 const isUserlistLoading = useAppSelector(state => state.usersList.isLoading);
 const totalUsers = useAppSelector(state=> state.usersList.totalUsers);
 const currentPage = useAppSelector(state=> state.usersList.currentPage);
 const limit = useAppSelector(state=>state.usersList.limit);
 const [search, setSearch] = useState("");
 const [role, setRole] = useState("");
 const [isActive, setisActive]=useState("")
 const [debounceSearch , setdebounceSearch] = useState("");

     const columns: Column[] = [
      {
      key: "userId",
      label: "User ID",
      type: "text",
    },
    {
      key: "name",
      label: "User",
      type: "text",
    },
    {
      key: "email",
      label: "Email",
      type: "text",
    },
     {
      key: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
    },
    {
      key: "role",
      label: "Role",
      type: "badge",
    },
    {
      key: "isActive",
      label: "Status",
      type: "badge",
    },
    {
      key: "createdAt",
      label: "Joined Date",
      type: "date",
    },
  ];

useEffect(()=>{
  const timer = setTimeout(()=>{
    setdebounceSearch(search)
  },500)
  
  return ()=>{
   clearInterval(timer);
  }

},[search])
 
 useEffect(()=>{
    const fetchUserList =async()=>{
    try{
    dispatch(setUserListLoading(true));
     const response = await UserService.getUsetList(debounceSearch,role || undefined, isActive || undefined, currentPage, limit );
    const { users, totalUsers } = response.data;
     dispatch(setUserList(users));
    dispatch(setPagination({ totalUsers, currentPage, limit }))
    }catch(err){
      console.log(err);
      dispatch(setUserListError("Fecth userList failed"))
    }finally{
      dispatch(setUserListLoading(false))
    }
    }
    fetchUserList()
 },[dispatch,debounceSearch, role, isActive, currentPage, limit])


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

         <div className="row g-3 mb-4">

    <div className="col-md-6">
        <input
            type="text"
            className="form-control"
            placeholder="Search by user ID, name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>

    <div className="col-md-3">
        <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
        >
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="TEACHER">Teacher</option>
            <option value="PARENT">Parent</option>
        </select>
    </div>

    <div className="col-md-3">
        <select
            className="form-select"
            value={isActive}
            onChange={(e) => setisActive(e.target.value)}
        >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
        </select>
    </div>

</div>

      <DataTable
        columns={columns}
        data={userList}
        isLoading={isUserlistLoading}
        pagination={{
          totalUsers,
          limit,
          currentPage,
          onPageChange: (page) =>
            dispatch(setPagination({ totalUsers: totalUsers, currentPage: page, limit }))
        }}
      />

    </div>
)
}


export default UsersList;