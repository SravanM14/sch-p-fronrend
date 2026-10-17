import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../../services/auth/authService";
import "./EditUser.css";

type UserRole = "ADMIN" | "TEACHER" | "PARENT";
type Gender = "Male" | "Female" | "Other";

interface UserForm {
  userId: string;
  name: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: Gender;
  role: UserRole;
  isActive: boolean;
}

const initialForm: UserForm = {
  userId: "",
  name: "",
  email: "",
  dateOfBirth: "",
  phoneNumber: "",
  gender: "Male",
  role: "TEACHER",
  isActive: true,
};

const EditUser = () => {
    const navigate = useNavigate();
  const [editForm, setEditForm] = useState<UserForm>(initialForm);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.getProfileById(id);
        console.log("Fetched user data:", response);
        const userData = response.data;
        if (!userData) {
          setError("User not found.");
          return;
        }

        setEditForm({
          userId: userData.userId,
          name: userData.name,
          email: userData.email,
          dateOfBirth: userData.dateOfBirth? userData.dateOfBirth.substring(0, 10) : "",
          phoneNumber: userData.phoneNumber,
          gender: userData.gender,
          role: userData.role,
          isActive: userData.isActive,
        });  
      } catch (error) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const updateField = (field: keyof UserForm, value: any) => {
    setEditForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
   setSaving(true);
    try {
        console.log("Submitting form data:", editForm);
      await authService.updateUser({...editForm, _id: id!});
      setSuccess("User updated successfully.");
      setTimeout(() => {
        setSuccess(null);
        navigate("/users")
      }
      , 3000);
    } catch (error) {
      setError("Failed to update user.");
    } finally {         
       setSaving(false);
        setLoading(false);
    }
    };



     return (
    <div className="edit-user-page">
      <div className="edit-user-heading">
        <div className="edit-user-breadcrumb">
          <button
            type="button"
            onClick={() => navigate("/users")}
          >
            Users
          </button>

          <i className="bi bi-chevron-right" />
          <span>Edit User</span>
        </div>

        <h2>Edit User</h2>
        <p>Update user information.</p>
      </div>

      <form onSubmit={handleSubmit} className="edit-user-card">
        <div className="edit-user-card-header">
          <div className="edit-user-header-icon">
            <i className="bi bi-person" />
          </div>

          <div>
            <h3>User Information</h3>
            <p>Update the details of the user below.</p>
          </div>
        </div>

        <div className="edit-user-card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

            {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}

          {loading ? (
            <div className="edit-user-loading">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading user details...</p>
            </div>
          ) : (
            <div className="edit-user-grid">
              {/* User ID */}
              <div className="edit-user-field">
                <label htmlFor="editUserId">
                  User ID (Read Only)
                </label>

                <input
                  id="editUserId"
                  type="text"
                  value={editForm.userId}
                  className="edit-user-input readonly"
                  readOnly
                  placeholder="User ID"
                />
              </div>

              {/* Full Name */}
              <div className="edit-user-field">
                <label htmlFor="editFullName">
                  Full Name <span className="required">*</span>
                </label>

                <input
                  id="editFullName"
                  type="text"
                  value={editForm.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  className="edit-user-input"
                  placeholder="Enter full name"
                  minLength={3}
                  maxLength={30}
                  required
                />
              </div>

              {/* Email */}
              <div className="edit-user-field">
                <label htmlFor="editEmail">
                  Email <span className="required">*</span>
                </label>

                <input
                  id="editEmail"
                  type="email"
                  value={editForm.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  className="edit-user-input"
                  placeholder="Enter email address"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="edit-user-field">
                <label htmlFor="editDateOfBirth">
                  Date of Birth <span className="required">*</span>
                </label>

                <input
                  id="editDateOfBirth"
                  type="date"
                  value={editForm.dateOfBirth}
                  onChange={(event) =>
                    updateField("dateOfBirth", event.target.value)
                  }
                  className="edit-user-input"
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              {/* Phone */}
              <div className="edit-user-field">
                <label htmlFor="editPhone">Phone Number</label>

                <input
                  id="editPhone"
                  type="tel"
                  value={editForm.phoneNumber}
                  onChange={(event) =>
                    updateField("phoneNumber", event.target.value)
                  }
                  className="edit-user-input"
                  placeholder="Enter phone number"
                  maxLength={15}
                />
              </div>

              {/* Gender */}
              <fieldset className="edit-user-field edit-user-gender">
                <legend>
                  Gender <span className="required">*</span>
                </legend>

                <div className="edit-user-radio-group">
                  {(["Male", "Female", "Other"] as Gender[]).map(
                    (gender) => (
                      <label
                        className="edit-user-radio"
                        key={gender}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={editForm.gender === gender}
                          onChange={() =>
                            updateField("gender", gender)
                          }
                        />
                        <span>{gender}</span>
                      </label>
                    )
                  )}
                </div>
              </fieldset>

              {/* Role */}
              <div className="edit-user-field">
                <label htmlFor="editRole">
                  Role <span className="required">*</span>
                </label>

                <select
                  id="editRole"
                  value={editForm.role}
                  onChange={(event) =>
                    updateField(
                      "role",
                      event.target.value as UserRole
                    )
                  }
                  className="edit-user-input edit-user-select"
                  required
                >
                  <option value="ADMIN">Admin</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="PARENT">Parent</option>
                </select>
              </div>

              {/* Status */}
              <div className="edit-user-field">
                <label htmlFor="editStatus">
                  Status <span className="required">*</span>
                </label>

                <div className="edit-user-status">
                  <label className="edit-user-switch">
                    <input
                      id="editStatus"
                      type="checkbox"
                      checked={editForm.isActive}
                      onChange={(event) =>
                        updateField(
                          "isActive",
                          event.target.checked
                        )
                      }
                    />
                    <span className="edit-user-switch-track" />
                  </label>

                  <div className="edit-user-status-text">
                    <strong>
                      {editForm.isActive ? "Active" : "Inactive"}
                    </strong>

                    <p>
                      {editForm.isActive
                        ? "This user can access the system."
                        : "This user cannot access the system."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="edit-user-actions">
          <button
            type="button"
            className="edit-user-cancel"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="edit-user-save"
            disabled={saving || loading}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm" />
                Saving...
              </>
            ) : (
              <>
                <i className="bi bi-floppy" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );

};

export default EditUser;