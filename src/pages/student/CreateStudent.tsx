import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateStudent.css";
import studentService from "../../services/students/Students.service";

interface StudentFormData {
    name: string;
    dateOfBirth: string;
    gender: string;
    admissionNumber: string;
    rollNumber: string;
    class: string;
    section: string;
    address: string;
    parentUserId: string;
    phone: string;
}

const CreateStudent = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<StudentFormData>({
        name: "",
        dateOfBirth: "",
        gender: "",
        admissionNumber: "",
        rollNumber: "",
        class: "",
        section: "",
        address: "",
        parentUserId: "",
        phone: "",
    });

    const [profileImage, setProfileImage] = useState<File | null>(null);

    const [profileImagePreview, setProfileImagePreview] =
        useState<string | null>(null);

    const [isActive, setIsActive] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    // ---------------------------------------
    // Handle Input Change
    // ---------------------------------------

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

   const validateForm = () => {
        if (!formData.name.trim()) {
            setError("Student name is required.");
            return false;
        }

        if (!formData.dateOfBirth) {
            setError("Date of birth is required.");
            return false;
        }   

      if (!formData.gender) { 
            
            setError("Gender is required.");
            return false;
        } 

        if (!formData.admissionNumber.trim()) {
            setError("Admission number is required.");
            return false;
        }

        if (!formData.class) {
            setError("Class is required.");
            return false;
        }

        if (!formData.section) {

            setError("Section is required.");
            return false;
        } 

        if (!formData.parentUserId) {
            setError("Parent is required.");
            return false;
        }

        return true;


    };




    // ---------------------------------------
    // Handle Image Change
    // ---------------------------------------

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        // Validate file type
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Only JPG, PNG or WEBP images are allowed.");
            return;
        }

        // Validate file size - 10MB
        if (file.size > 10 * 1024 * 1024) {
            setError("Image size must be less than 10MB.");
            return;
        }

        setError("");

        setProfileImage(file);

        // Create preview
        const imageUrl = URL.createObjectURL(file);

        setProfileImagePreview(imageUrl);
    };

    // ---------------------------------------
    // Handle Submit
    // ---------------------------------------

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();
        setSuccess("");
        setError("");

        // Basic validation
        if (!validateForm()) {

            return;
        } 

        try {

            setIsLoading(true);

            // ---------------------------------------
            // Create FormData
            // ---------------------------------------

            const data = new FormData();

            data.append("name", formData.name);
            data.append("dateOfBirth", formData.dateOfBirth);
            data.append("gender", formData.gender);
            data.append(
                "admissionNumber",
                formData.admissionNumber
            );
            data.append("rollNumber", formData.rollNumber);
            data.append("class", formData.class);
            data.append("section", formData.section);
            data.append("address", formData.address);
            data.append(
                "parentUserId",
                formData.parentUserId
            );
            data.append("phone", formData.phone);

            // Send active status if your backend supports it
            data.append(
                "isActive",
                String(isActive)
            );

            // Profile image
            if (profileImage) {
                data.append(
                    "profileImage",
                    profileImage
                );
            }

            // ---------------------------------------
            // API Call
            // ---------------------------------------

            const response =await studentService.createStudent(data);
               setSuccess("Student created successfully!");
                setTimeout(() => {  
                navigate("/students");
                }, 3000);

        } catch (error: any) {

            console.error(
                "Create student failed:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "Failed to create student."
            );

        } finally {

            setIsLoading(false);
        }
    };

    return (

        <div className="create-student-page">

            {/* =========================================
                HEADER
            ========================================= */}

            <div className="student-page-header">

                <div>

                    <div className="breadcrumb">

                        <span>Students</span>

                        <i className="bi bi-chevron-right"></i>

                        <span>Create Student</span>

                    </div>

                    <h2>Create Student</h2>

                    <p>
                        Add a new student to the school
                    </p>

                </div>

                <Link to="/students">

                    <button
                        type="button"
                        className="back-btn"
                    >

                        <i className="bi bi-arrow-left"></i>

                        Back to Students

                    </button>

                </Link>

            </div>

          <div className="card border-0 shadow-sm">
        {success && (
          <div
            className="alert alert-success"
            role="alert"
          >
            {success}
          </div>
        )}
        {error &&(
          <div
            className="alert alert-error"
            role="alert"
          >
            {error}
          </div>
          )
        }


            {/* =========================================
                FORM
            ========================================= */}

            <form onSubmit={handleSubmit}>

                {/* =====================================
                    ERROR MESSAGE
                ===================================== */}

                {error && (

                    <div className="alert alert-danger">

                        <i className="bi bi-exclamation-circle me-2"></i>

                        {error}

                    </div>

                )}


                {/* =====================================
                    MAIN CONTENT
                ===================================== */}

                <div className="student-form-layout">


                    {/* =================================
                        LEFT SIDE
                    ================================= */}

                    <div className="student-form-left">


                        {/* =================================
                            BASIC INFORMATION
                        ================================= */}

                        <div className="form-card">

                            <div className="form-card-header">

                                <div>

                                    <h4>
                                        Basic Information
                                    </h4>

                                    <span>
                                        Student details
                                    </span>

                                </div>

                            </div>


                            <div className="form-card-body">


                                {/* FULL NAME */}

                                <div className="form-group">

                                    <label>

                                        Full Name

                                        <span>*</span>

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        placeholder="Enter student name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* DATE OF BIRTH */}

                                <div className="form-group">

                                    <label>

                                        Date of Birth

                                        <span>*</span>

                                    </label>

                                    <div className="input-icon-wrapper">

                                        <input
                                            type="date"
                                            className="form-control custom-input"
                                            name="dateOfBirth"
                                            value={
                                                formData.dateOfBirth
                                            }
                                            onChange={handleChange}
                                        />

                                        <i className="bi bi-calendar3"></i>

                                    </div>

                                </div>


                                {/* GENDER */}

                                <div className="form-group gender-group">

                                    <label>

                                        Gender

                                        <span>*</span>

                                    </label>


                                    <div className="gender-options">


                                        <label className="radio-option">

                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={
                                                    formData.gender ===
                                                    "Male"
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                            />

                                            <span className="radio-circle"></span>

                                            Male

                                        </label>


                                        <label className="radio-option">

                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={
                                                    formData.gender ===
                                                    "Female"
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                            />

                                            <span className="radio-circle"></span>

                                            Female

                                        </label>


                                        <label className="radio-option">

                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Other"
                                                checked={
                                                    formData.gender ===
                                                    "Other"
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                            />

                                            <span className="radio-circle"></span>

                                            Other

                                        </label>

                                    </div>

                                </div>


                                {/* ADMISSION + ROLL */}

                                <div className="form-row">


                                    <div className="form-group">

                                        <label>
                                            Admission Number
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control custom-input"
                                            placeholder="Enter admission number"
                                            name="admissionNumber"
                                            value={
                                                formData.admissionNumber
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            Roll Number
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control custom-input"
                                            placeholder="Enter roll number"
                                            name="rollNumber"
                                            value={
                                                formData.rollNumber
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>

                                </div>


                                {/* CLASS + SECTION */}

                                <div className="form-row">


                                    <div className="form-group">

                                        <label>

                                            Class

                                            <span>*</span>

                                        </label>

                                        <select
                                            className="form-select custom-input"
                                            name="class"
                                            value={
                                                formData.class
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        >

                                            <option value="">
                                                Select Class
                                            </option>

                                            <option value="1">
                                                Class 1
                                            </option>

                                            <option value="2">
                                                Class 2
                                            </option>

                                            <option value="3">
                                                Class 3
                                            </option>

                                            <option value="4">
                                                Class 4
                                            </option>

                                            <option value="5">
                                                Class 5
                                            </option>

                                            <option value="6">
                                                Class 6
                                            </option>

                                            <option value="7">
                                                Class 7
                                            </option>

                                            <option value="8">
                                                Class 8
                                            </option>

                                            <option value="9">
                                                Class 9
                                            </option>

                                            <option value="10">
                                                Class 10
                                            </option>

                                        </select>

                                    </div>


                                    <div className="form-group">

                                        <label>

                                            Section

                                            <span>*</span>

                                        </label>

                                        <select
                                            className="form-select custom-input"
                                            name="section"
                                            value={
                                                formData.section
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        >

                                            <option value="">
                                                Select Section
                                            </option>

                                            <option value="A">
                                                Section A
                                            </option>

                                            <option value="B">
                                                Section B
                                            </option>

                                            <option value="C">
                                                Section C
                                            </option>

                                            <option value="D">
                                                Section D
                                            </option>

                                        </select>

                                    </div>

                                </div>


                                {/* ADDRESS */}

                                <div className="form-group">

                                    <label>
                                        Address
                                    </label>

                                    <textarea
                                        className="form-control custom-input address-input"
                                        rows={4}
                                        placeholder="Enter student address"
                                        name="address"
                                        value={
                                            formData.address
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                            </div>

                        </div>


                        {/* =================================
                            PARENT INFORMATION
                        ================================= */}

                        <div className="form-card">

                            <div className="form-card-header">

                                <div>

                                    <h4>
                                        Parent Information
                                    </h4>

                                    <span>
                                        Student's parent details
                                    </span>

                                </div>

                            </div>


                            <div className="form-card-body">


                                {/* PARENT */}

                                <div className="form-group">

                                    <label>

                                        Parent

                                        <span>*</span>

                                    </label>

                                    <select
                                        className="form-select custom-input"
                                        name="parentUserId"
                                        value={
                                            formData.parentUserId
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="">
                                            Select Parent
                                        </option>

                                        <option value="PAR001">
                                            PAR001 - Yashna
                                        </option>

                                        <option value="PAR002">
                                            PAR002 - Venkateshwarlu
                                        </option>

                                    </select>

                                </div>


                                {/* PHONE */}

                                <div className="form-group">

                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        placeholder="Enter phone number"
                                        name="phone"
                                        value={
                                            formData.phone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                            </div>

                        </div>


                        {/* =================================
                            ADDITIONAL INFORMATION
                        ================================= */}

                        <div className="form-card">

                            <div className="form-card-header">

                                <div>

                                    <h4>
                                        Additional Information
                                    </h4>

                                    <span>
                                        Other student information
                                    </span>

                                </div>

                            </div>


                            <div className="form-card-body">


                                <div className="form-group">

                                    <label>
                                        Status
                                    </label>


                                    <div className="status-wrapper">


                                        <button
                                            type="button"
                                            className={`status-toggle ${
                                                isActive
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setIsActive(
                                                    !isActive
                                                )
                                            }
                                        >

                                            <span></span>

                                        </button>


                                        <div>

                                            <strong>

                                                {
                                                    isActive
                                                        ? "Active"
                                                        : "Inactive"
                                                }

                                            </strong>

                                            <p>

                                                Inactive students
                                                will not be able to
                                                access the system

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        RIGHT SIDE
                    ================================= */}

                    <div className="student-form-right">


                        {/* =================================
                            PROFILE IMAGE
                        ================================= */}

                        <div className="side-card">


                            <div className="side-card-header">


                                <div className="side-icon">

                                    <i className="bi bi-person-bounding-box"></i>

                                </div>


                                <div>

                                    <h4>
                                        Profile Image
                                    </h4>

                                    <p>
                                        Upload student photo
                                        (optional)
                                    </p>

                                </div>

                            </div>


                            <div className="profile-upload">


                                <div className="profile-preview">

                                    {profileImagePreview ? (

                                        <img
                                            src={
                                                profileImagePreview
                                            }
                                            alt="Student"
                                        />

                                    ) : (

                                        <i className="bi bi-person"></i>

                                    )}

                                </div>


                                <label
                                    htmlFor="profileImage"
                                    className="upload-btn"
                                >

                                    <i className="bi bi-cloud-arrow-up"></i>

                                    Upload Image

                                </label>


                                <input
                                    id="profileImage"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    hidden
                                    name="profileImage"
                                    onChange={
                                        handleImageChange
                                    }
                                />


                                <small>
                                    JPG, PNG or WEBP up to 10MB
                                </small>

                            </div>

                        </div>


                        {/* =================================
                            STUDENT ID
                        ================================= */}

                        <div className="side-card student-id-card">


                            <div className="side-card-header">


                                <div className="side-icon">

                                    <i className="bi bi-person-vcard"></i>

                                </div>


                                <div>

                                    <h4>
                                        Student ID
                                    </h4>

                                    <p>
                                        Generated automatically
                                    </p>

                                </div>

                            </div>


                            <div className="student-id-box">

                                <i className="bi bi-lock"></i>

                                <span>
                                    Auto Generated
                                </span>

                            </div>


                            <p className="student-id-note">

                                Student ID is auto-generated
                                by the system

                            </p>

                        </div>

                    </div>

                </div>


                {/* =====================================
                    FORM FOOTER
                ===================================== */}

                <div className="form-actions">


                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() =>
                            navigate("/students")
                        }
                        disabled={isLoading}
                    >

                        Cancel

                    </button>


                    <button
                        type="submit"
                        className="create-btn"
                        disabled={isLoading}
                    >

                        <i className="bi bi-plus-lg"></i>

                        {isLoading
                            ? "Creating..."
                            : "Create Student"}

                    </button>

                </div>

            </form>

        </div>
        </div>
    );
};

export default CreateStudent;