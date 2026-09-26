import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Student {
    studentId: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    class: string;
    section: string;
    admissionNumber: string;
    rollNumber?: string;
    address?: string;
    phone?: string;
    profileImage?: string;

    parentId: {
        userId: string;
        name: string;
        phone?: string;
    };

    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface StudentInitialState {
    data: Student[];
    isLoading: boolean;
    error: string | null;
    totalStudents: number;
    currentPage: number;
    limit: number;
}

const initialState: StudentInitialState = {
    data: [],
    isLoading: false,
    error: null,
    totalStudents: 0,
    currentPage: 1,
    limit: 10,
};

const studentSlice = createSlice({
    name: "studentList",
    initialState,

    reducers: {

        setStudentDetails: (
            state,
            action: PayloadAction<{
                students: Student[];
                totalStudents: number;
            }>
        ) => {
            state.data = action.payload.students;
            state.totalStudents = action.payload.totalStudents;
        },

        setLoading: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isLoading = action.payload;
        },

        setError: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.error = action.payload;
        },

        setPagination: (
            state,
            action: PayloadAction<{
                totalStudents: number;
                currentPage: number;
                limit: number;
            }>
        ) => {
            state.totalStudents = action.payload.totalStudents;
            state.currentPage = action.payload.currentPage;
            state.limit = action.payload.limit;
        },
    },
});

export const {
    setStudentDetails,
    setLoading,
    setError,
    setPagination,
} = studentSlice.actions;

export default studentSlice.reducer;