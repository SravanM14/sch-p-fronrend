import { use, useEffect, useState } from "react";
import "./editProfile.css";
import authService from "../../services/auth/authService";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { setProfile } from "../../store/profile/profileSlice";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
 const dispatch = useAppDispatch();
 const navigate = useNavigate();
  const profile = useAppSelector(
    (state) => state.profile.profile
  );
  const [success, setSuccess] = useState("");
  const [profileFormData, setProfileFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    role: "",
    id: "",
    accountStatus: "",
  });

const [errors, setErrors] = useState({
  name: "",
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
});


const validateForm = () => {
  let isValid = true;
  const newErrors = {
    name: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
  };

  if (!profileFormData.name.trim()) {
    newErrors.name = "Name is required.";
    isValid = false;
  }

    if (!profileFormData.dateOfBirth) { 
        newErrors.dateOfBirth = "Date of Birth is required.";
        isValid = false;
    }

    if (!profileFormData.gender) {
        newErrors.gender = "Gender is required.";
        isValid = false;
    }

    if (!profileFormData.phoneNumber) {
        newErrors.phoneNumber = "Phone Number is required.";
        isValid = false;
    }  
    
    setErrors(newErrors);
    return isValid;
}


 
  useEffect(() => {
    if (profile) {
      setProfileFormData({          
        name: profile.name || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.substring(0, 10) : "",
        gender: profile.gender || "",
        role: profile.role || "",
        id: profile.id || "",
        accountStatus: profile.isActive ? "Active" : "Inactive",
        });

    }
    }, [profile]);
 


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
          setSuccess("");
        if(!validateForm()) {
            return;
        }
        try{
        
         // formData.append("profileImage", (document.getElementById("profileImage") as HTMLInputElement).files?.[0] || new Blob());
         const updateData = {
            id: profileFormData.id,
            name: profileFormData.name,
            phoneNumber: profileFormData.phoneNumber,
            dateOfBirth: profileFormData.dateOfBirth,
            gender: profileFormData.gender,
         }
         const response = await authService.updateProfile(updateData);
        // console.log("Profile updated successfully:", response);
         dispatch(setProfile(response.data));
               setSuccess(
         "Profile updated successfully!"
      );
         navigate("/profile");
        }   catch (error) {
            console.error("Error updating profile:", error);
        }
       
    }

  return (
    <div className="container-fluid">

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">
            Edit Profile of <span className="text-primary">{profile?.name}</span>
          </h4>

          <small className="text-muted">
            Dashboard
            <span className="mx-2">›</span>
            Profile
            <span className="mx-2">›</span>
            Edit Profile
          </small>
        </div>
      </div>


      {/* Edit Profile Card */}
      <div className="card border-0 shadow-sm">
          {success && (
          <div
            className="alert alert-success"
            role="alert"
          >
            {success}
          </div>
        )}
        <div className="card-body p-4">
         <form onSubmit={handleSubmit}>
          <div className="row">

            {/* Profile Image Section */}
            <div className="col-lg-3 text-center border-end">

              <div className="edit-profile-avatar mx-auto mb-3">

                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center">
                  <i className="bi bi-person fs-1"></i>
                </div>

              </div>

              <h6 className="fw-bold mb-1">
                Profile Photo
              </h6>

              <small className="text-muted d-block mb-3">
                JPG, PNG or JPEG
              </small>

              <label
                htmlFor="profileImage"
                className="btn btn-outline-primary btn-sm"
              >
                <i className="bi bi-camera me-2"></i>
                Change Photo
              </label>

              <input
                type="file"
                id="profileImage"
                className="d-none"
                accept="image/png,image/jpeg"
              />

            </div>


            {/* Profile Form */}
            <div className="col-lg-9 ps-lg-4 mt-4 mt-lg-0">

              <h6 className="fw-bold mb-4">
                Personal Information
              </h6>


              <div className="row g-4">

                {/* Full Name */}
                <div className="col-md-6">

                  <label
                    htmlFor="name"
                    className="form-label fw-semibold"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    name="name"
                    value={profileFormData.name}
                    onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />

                 {errors.name && <div className="text-danger mt-1">{errors.name}</div>}

                </div>


                {/* Email */}
                <div className="col-md-6">

                  <label
                    htmlFor="email"
                    className="form-label fw-semibold"
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    value={profileFormData.email}
                    onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })}
                    disabled = {true}
                    placeholder="Enter email address"
                  />

                </div>


                {/* Phone */}
                <div className="col-md-6">

                  <label
                    htmlFor="phoneNumber"
                    className="form-label fw-semibold"
                  >
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileFormData.phoneNumber}
                    onChange={(e) => {
                        if (/^\d*$/.test(e.target.value)) {
                            setProfileFormData({ ...profileFormData, phoneNumber: e.target.value })
                        }
                    }}
                    className="form-control"
                    placeholder="Enter phone number"
                    maxLength={10}
                    inputMode="numeric"
                    required
                  />

                    {errors.phoneNumber && <div className="text-danger mt-1">{errors.phoneNumber}</div>}
                </div>


                {/* Date of Birth */}
                <div className="col-md-6">

                  <label
                    htmlFor="dateOfBirth"
                    className="form-label fw-semibold"
                  >
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    id="dateOfBirth"
                    className="form-control"
                    name="dateOfBirth"
                    value={profileFormData.dateOfBirth}
                    onChange={(e) => setProfileFormData({ ...profileFormData, dateOfBirth: e.target.value })}
                    required
                  />
                 {errors.dateOfBirth && <div className="text-danger mt-1">{errors.dateOfBirth}</div>}
                </div>


                {/* Gender */}
                <div className="col-md-6">

                  <label
                    htmlFor="gender"
                    className="form-label fw-semibold"
                  >
                    Gender
                  </label>

                  <select
                    id="gender"
                    className="form-select"
                    name="gender"
                    value={profileFormData.gender}
                    onChange={(e) => setProfileFormData({ ...profileFormData, gender: e.target.value })}
                    required
                  >
                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                 {errors.gender && <div className="text-danger mt-1">{errors.gender}</div>}
                </div>


                {/* Role */}
                <div className="col-md-6">

                  <label
                    htmlFor="role"
                    className="form-label fw-semibold"
                  >
                    Role
                  </label>

                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={profileFormData?.role || ""}
                    className="form-control"
                    disabled
                  />

                </div>

              </div>


              {/* Divider */}
              <hr className="my-4" />


              {/* Account Information */}
              <h6 className="fw-bold mb-4">
                Account Information
              </h6>

              <div className="row g-4">

                {/* Account Status */}
                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Account Status
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profileFormData.accountStatus}
                    disabled
                  />

                </div>


                {/* User ID */}
                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    User ID
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profileFormData.id}
                    disabled
                  />

                </div>

              </div>


              {/* Buttons */}
              <div className="d-flex justify-content-end gap-2 mt-4">

                <button
                  type="button"
                  className="btn btn-light"
                >
                 <Link to="/profile" className="text-decoration-none text-dark">
                  Cancel
                  </Link>
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <i className="bi bi-check-lg me-2"></i>
                  Save Changes
                </button>

              </div>

            </div>

          </div>
</form>
        </div>

      </div>

    </div>
  );
};

export default EditProfile;