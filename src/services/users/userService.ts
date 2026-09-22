import api from '../api/axios';

const getUsetList = async (search?:string, role?:string, isActive?:string, page:number=1, limit:number=10)=>{
    const response = await api.get('/auth/userList',{
       params:{search, role, isActive, page, limit}
    });
    return response?.data;
}


const UserService = {getUsetList};

export default UserService;