import api from "../api/axios";

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

    const response = await api.post('/auth/register', req);

    return response.data;

}


const login = async (req: LoginRequest) => {

    const response = await api.post('/auth/login', req);

    return response.data;

}

const authService = {
    register, login
}

export default authService;