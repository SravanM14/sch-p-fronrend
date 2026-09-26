import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { setError, setStudentDetails, type Student } from "../../store/student/studentSlice";
import studentService from "../../services/students/Students.service";
import { setLoading } from "../../store/student/studentSlice";
import DataTable from "../../components/common/data-table/data-table";
import { setPagination } from "../../store/usersList/usersSlice";

interface Column {
  key: keyof Student;
  label: string;
  type: "text" | "badge" | "date";
}



const columns: Column[] = [
  {
    key: "studentId",
    label: "student ID",
    type: "text",
  },
  {
    key: "name",
    label: "Name",
    type: "text",
  },
  {
    key: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
  },
  {
    key: "admissionNumber",
    label: "Admission Number",
    type: "text",
  },
   {
    key: "class",
    label: "Class",
    type: "text",
  },
    {
    key: "section",
    label: "Section",
    type: "text",
  },
  {
    key: "rollNumber",
    label: "Roll Number",
    type: "text",
  },
  {
    key: "phone",
    label: "Mobile",
    type: "text",
  },
  {
    key: "createdAt",
    label: "Joined Date",
    type: "date",
  },
];
const studentList = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector(state => state.studentList.data);
  const isLoading = useAppSelector(state => state.studentList.isLoading);
  //const error = useAppSelector(state => state.studentList.error);
  const totalStudents = useAppSelector(state => state.studentList.totalStudents);
  const currentPage = useAppSelector(state => state.studentList.currentPage);
  const limit = useAppSelector(state => state.studentList.limit);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isActive, setisActive] = useState("")
  const [debounceSearch, setdebounceSearch] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounceSearch(search)
    }, 500)

    return () => clearInterval(timer);
  }, [search])


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        dispatch(setLoading(true))
        const response = await studentService.getStudentList(debounceSearch, selectedClass || undefined,
          selectedSection || undefined, isActive, currentPage, limit);
        console.log(response.data);
        dispatch(setStudentDetails(response?.data));
        dispatch(setPagination({
          totalUsers: totalStudents,
          currentPage,
          limit
        }));
      } catch (error) {
        console.log(error)
        dispatch(setError("something went wrong!!"))
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchStudents();
  }, [dispatch, debounceSearch, selectedClass, selectedSection, isActive, currentPage, limit])

  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h3 className="mb-1">
          Students
        </h3>

        <p className="text-muted mb-0">
          Manage school Students.
        </p>
      </div>
      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Student ID, name or Admission number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {Array.from({ length: 10 }, (_, index) => {
              const classNumber = index + 1;
              const suffix =
                classNumber % 100 >= 11 && classNumber % 100 <= 13
                  ? "th"
                  : ["th", "st", "nd", "rd"][classNumber % 10] ?? "th";

              return (
                <option key={classNumber} value={classNumber}>
                  {classNumber}{suffix} Class
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">All Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
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
        data={students}
        isLoading={isLoading}
        pagination={{
          totalUsers: totalStudents,
          currentPage,
          limit,
          onPageChange: (page) =>
            dispatch(setPagination({ totalUsers: totalStudents, currentPage: page, limit }))
        }}
      />
    </div>
  )
}

export default studentList;