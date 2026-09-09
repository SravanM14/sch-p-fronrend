import api, { publicApi } from "../api/axios";

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    role: String;
}


export interface LoginRequest {
    email: string;
    password: string;
}

const register = async (req: RegisterRequest) => {

    const response = await publicApi.post('/auth/register', req);

    return response.data;

}


const login = async (req: LoginRequest) => {

    const response = await publicApi.post('/auth/login', req);

    return response.data;

}

const forgotPassword = async(email:string)=>{
    const response = await publicApi.post('/auth/forgot-password', {email});
    return response.data;
}

const refreshToken = async (refreshToken:string)=>{
    const response = await api.post('/auth/refresh-token',{refreshToken});
    return response;
}


const getProfile = async()=>{
    const response = await api.get('/auth/profile');
    return response.data;
}

const logout = async(refreshToken:string)=>{
    const response = await api.post('/auth/logout',{refreshToken});
    return response.data;
}

const authService = {
    register, login,refreshToken,forgotPassword,getProfile,logout
}

export default authService;