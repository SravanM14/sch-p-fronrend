import { Link, useNavigate } from "react-router-dom";
import "./changePassword.css";
import { useState } from "react";
import authService from "../../services/auth/authService";
import { useAppDispatch } from "../../store/hook";
import { logOut } from "../../store/auth/authSlice";



const ChangePassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const formData = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    };

    const [changePasswordFormData, setChangePasswordFormData] = useState(formData);

    const [fieldErrors, setFieldErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });


    const [success, setSuceess] = useState("")

    const [isLoading, setisLoading] = useState(false);

    const validateForm = () => {
        let isValid = true;
        const errors: any = {};
        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

        if (!changePasswordFormData.currentPassword) {
            errors.currentPassword = "Current password is required.";
            isValid = false;
        }
        if (!changePasswordFormData.newPassword) {
            errors.newPassword = "New password is required.";
            isValid = false;
        }
        if (changePasswordFormData.newPassword.length < 8) {
            errors.newPassword = "New password must be at least 8 characters.";
            isValid = false;
        }
        if (
            changePasswordFormData.newPassword &&
            !passwordRequirements.test(changePasswordFormData.newPassword)
        ) {
            errors.newPassword =
                "Password must contain uppercase, lowercase, number and special character.";
            isValid = false;
        }
        if (!changePasswordFormData.confirmNewPassword) {
            errors.confirmNewPassword = "Please confirm your new password.";
            isValid = false;
        }
        if (changePasswordFormData.newPassword !== changePasswordFormData.confirmNewPassword) {
            errors.confirmNewPassword = "Passwords do not match.";
            isValid = false;
        }


        setFieldErrors(errors);
        return isValid;
    };

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChangePasswordFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        // Clear field error when user starts typing
        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    }

    // Handle Submit 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateForm();
        setSuceess("")
        setisLoading(true);
        if (!validateForm()) {
            return
        }

        try {
            const changePasswordFormValue = {
                currentPassword: changePasswordFormData.currentPassword,
                newPassword: changePasswordFormData.newPassword,
                confirmPassword: changePasswordFormData.confirmNewPassword
            }
            const response = await authService.changePassword(changePasswordFormValue)
            console.log(response, "password reset successfull")
            setSuceess(response?.message);
            setisLoading(false)

        }
        catch (err) {
            console.log(err)
        } finally {
            setisLoading(false)
        }
    }


 const handleLogin=()=>{
     dispatch(logOut());
     navigate('/login')
 }

    return (



        <div className="change-password-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8 col-xl-7">
                        <div className="card change-password-card shadow-sm border-0">
                            {success && (
                                <div
                                    className="alert alert-success"
                                    role="alert"
                                >
                                    {success} <span className="login-link" onClick={handleLogin}>login</span>
                                </div>
                            )}
                            <div className="card-body p-4">
                                <h5 className="mb-4">Update Password</h5>

                                <form onSubmit={handleSubmit}>
                                    {/* Current Password */}
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Current Password
                                            <span className="text-danger ms-1">*</span>
                                        </label>

                                        <div className="password-input-wrapper">
                                            <input
                                                type={showCurrentPassword ? "text" : "password"}
                                                className="form-control"
                                                value={changePasswordFormData.currentPassword}
                                                onChange={handleChange}
                                                name="currentPassword"
                                                placeholder="Enter current password"
                                            />

                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            >
                                                <i className={showCurrentPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                            </button>
                                        </div>
                                        {fieldErrors.currentPassword && (
                                            <div className="text-danger small mt-1">{fieldErrors.currentPassword}</div>
                                        )}
                                    </div>

                                    {/* New Password */}
                                    <div className="mb-4">
                                        <label className="form-label">
                                            New Password
                                            <span className="text-danger ms-1">*</span>
                                        </label>

                                        <div className="password-input-wrapper">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                placeholder="Enter new password"
                                                value={changePasswordFormData.newPassword}
                                                onChange={handleChange}
                                                name="newPassword"
                                                minLength={8}
                                            />

                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                            </button>
                                        </div>

                                        <div className="form-text">
                                            Use at least 8 characters with uppercase, lowercase, number and special character.
                                        </div>
                                        {fieldErrors.newPassword && (
                                            <div className="text-danger small mt-1">{fieldErrors.newPassword}</div>
                                        )}
                                    </div>

                                    {/* Confirm New Password */}
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Confirm New Password
                                            <span className="text-danger ms-1">*</span>
                                        </label>

                                        <div className="password-input-wrapper">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="form-control"
                                                placeholder="Confirm new password"
                                                value={changePasswordFormData.confirmNewPassword}
                                                onChange={handleChange}
                                                name="confirmNewPassword"
                                                minLength={8}
                                            />

                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                            </button>
                                        </div>
                                        {fieldErrors.confirmNewPassword && (
                                            <div className="text-danger small mt-1">{fieldErrors.confirmNewPassword}</div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="d-flex justify-content-end gap-2 pt-2">

                                        <Link to="/profile" className="btn btn-light px-4"
                                            type="button"
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4"
                                        >
                                            {isLoading ?  (
                                          <>
                                              <span
                                                  className="spinner-border spinner-border-sm me-2"
                                                  role="status"
                                                  aria-hidden="true"
                                              ></span>
                                             Changing Password...
                                          </>
                                      ) : (
                                          " Change Password"
                                      )}
                                           
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Password Tips */}
                    <div className="col-12 col-lg-4 col-xl-5 mt-4 mt-lg-0">
                        <div className="card password-tips-card shadow-sm border-0">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="password-tips-icon me-3">
                                        <i className="bi bi-shield-lock"></i>
                                    </div>

                                    <h5 className="mb-0">Password Tips</h5>
                                </div>

                                <ul className="password-tips">
                                    <li>Use at least 8 characters.</li>
                                    <li>Use a combination of letters and numbers.</li>
                                    <li>Avoid using easily guessed passwords.</li>
                                    <li>Don't reuse your old password.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;