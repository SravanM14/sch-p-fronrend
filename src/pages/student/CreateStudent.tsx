import { useState } from "react";
import "./CreateStudent.css";
import { Link } from "react-router-dom";

const CreateStudent = () => {
  const [gender, setGender] = useState("Male");
  const [isActive, setIsActive] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="create-student-page">

      {/* Header */}
      <div className="student-page-header">
        <div>
          <div className="breadcrumb">
            <span>Students</span>
            <i className="bi bi-chevron-right"></i>
            <span>Create Student</span>
          </div>

          <h2>Create Student</h2>
          <p>Add a new student to the school</p>
        </div>
<Link to="/students">
        <button className="back-btn">
          <i className="bi bi-arrow-left"></i>
          Back to Students
        </button></Link>
      </div>

      {/* Main Content */}
      <div className="student-form-layout">

        {/* LEFT SIDE */}
        <div className="student-form-left">

          {/* Basic Information */}
          <div className="form-card">

            <div className="form-card-header">
              <div>
                <h4>Basic Information</h4>
                <span>Student details</span>
              </div>
            </div>

            <div className="form-card-body">

              {/* Full Name */}
              <div className="form-group">
                <label>
                  Full Name <span>*</span>
                </label>

                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Enter student name"
                />
              </div>

              {/* DOB */}
              <div className="form-group">
                <label>
                  Date of Birth <span>*</span>
                </label>

                <div className="input-icon-wrapper">
                  <input
                    type="date"
                    className="form-control custom-input"
                  />

                  <i className="bi bi-calendar3"></i>
                </div>
              </div>

              {/* Gender */}
              <div className="form-group gender-group">
                <label>
                  Gender <span>*</span>
                </label>

                <div className="gender-options">

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span className="radio-circle"></span>
                    Male
                  </label>

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span className="radio-circle"></span>
                    Female
                  </label>

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={gender === "Other"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span className="radio-circle"></span>
                    Other
                  </label>

                </div>
              </div>

              {/* Admission + Roll */}
              <div className="form-row">

                <div className="form-group">
                  <label>Admission Number</label>

                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Enter admission number"
                  />
                </div>

                <div className="form-group">
                  <label>Roll Number</label>

                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Enter roll number"
                  />
                </div>

              </div>

              {/* Class + Section */}
              <div className="form-row">

                <div className="form-group">
                  <label>
                    Class <span>*</span>
                  </label>

                  <select className="form-select custom-input">
                    <option value="">Select Class</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Section <span>*</span>
                  </label>

                  <select className="form-select custom-input">
                    <option value="">Select Section</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                  </select>
                </div>

              </div>

              {/* Address */}
              <div className="form-group">
                <label>Address</label>

                <textarea
                  className="form-control custom-input address-input"
                  rows={4}
                  placeholder="Enter student address"
                ></textarea>
              </div>

            </div>
          </div>


          {/* Parent Information */}
          <div className="form-card">

            <div className="form-card-header">
              <div>
                <h4>Parent Information</h4>
                <span>Student's parent details</span>
              </div>
            </div>

            <div className="form-card-body">

              <div className="form-group">
                <label>
                  Parent <span>*</span>
                </label>

                <select className="form-select custom-input">
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

              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Enter phone number"
                />
              </div>

            </div>
          </div>


          {/* Additional Information */}
          <div className="form-card">

            <div className="form-card-header">
              <div>
                <h4>Additional Information</h4>
                <span>Other student information</span>
              </div>
            </div>

            <div className="form-card-body">

              <div className="form-group">
                <label>Status</label>

                <div className="status-wrapper">

                  <button
                    type="button"
                    className={`status-toggle ${
                      isActive ? "active" : ""
                    }`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <span></span>
                  </button>

                  <div>
                    <strong>
                      {isActive ? "Active" : "Inactive"}
                    </strong>

                    <p>
                      Inactive students will not be able to access
                      the system
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="student-form-right">

          {/* Profile Image */}
          <div className="side-card">

            <div className="side-card-header">
              <div className="side-icon">
                <i className="bi bi-person-bounding-box"></i>
              </div>

              <div>
                <h4>Profile Image</h4>
                <p>Upload student photo (optional)</p>
              </div>
            </div>

            <div className="profile-upload">

              <div className="profile-preview">

                {profileImage ? (
                  <img
                    src={profileImage}
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
                onChange={handleImageChange}
              />

              <small>
                JPG, PNG or WEBP up to 10MB
              </small>

            </div>

          </div>


          {/* Student ID */}
          <div className="side-card student-id-card">

            <div className="side-card-header">

              <div className="side-icon">
                <i className="bi bi-person-vcard"></i>
              </div>

              <div>
                <h4>Student ID</h4>
                <p>Generated automatically</p>
              </div>

            </div>

            <div className="student-id-box">

              <i className="bi bi-lock"></i>

              <span>
                STUD0011
              </span>

            </div>

            <p className="student-id-note">
              Student ID is auto-generated by the system
            </p>

          </div>

        </div>

      </div>


      {/* Footer Actions */}
      <div className="form-actions">

        <button className="cancel-btn">
          Cancel
        </button>

        <button className="create-btn">
          <i className="bi bi-plus-lg"></i>
          Create Student
        </button>

      </div>

    </div>
  );
};

export default CreateStudent;