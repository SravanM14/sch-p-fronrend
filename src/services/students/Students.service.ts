import api from "../api/axios"

    const getStudentList = async (search?:string, className?:string, section?:string, isActive?:string, page:number =1 , limit:number=10)=>{
      const response =  await api.get('/students/list',{params:{
        search, className,section,isActive,page, limit
      }});
      return response.data;
    }

    const studentService ={getStudentList}

export default studentService;


