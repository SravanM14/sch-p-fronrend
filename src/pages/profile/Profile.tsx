import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  setError,
  setLoading,
  setProfile,
} from "../../store/profile/profileSlice";
import authService from "../../services/auth/authService";

import "./profile.css";

const Profile = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(
    (state) => state.profile.profile
  );

  const isLoading = useAppSelector(
    (state) => state.profile.isLoading
  );

  const error = useAppSelector(
    (state) => state.profile.error
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        dispatch(setLoading(true));

        const response = await authService.getProfile();
        dispatch(setProfile(response.data));
      } catch (error) {
        console.error("Profile fetch error:", error);
        dispatch(
          setError("Failed to fetch profile data.")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProfile();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="container-fluid">
        <div className="profile-loading">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning">
          Profile data not available.
        </div>
      </div>
    );
  }

  const getRoleName = () => {
    switch (profile.role) {
      case "ADMIN":
        return "Administrator";

      case "TEACHER":
        return "Teacher";

      case "PARENT":
        return "Parent";

      default:
        return profile.role;
    }
  };

  const roleClass = `profile-role-${profile.role.toLowerCase()}`;

  return (
    <div className={`container-fluid profile-page ${roleClass}`}>

      {/* Header */}
      <div className="profile-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">
            My Profile 
          </h4>

          <small className="text-muted">
            Dashboard
            <span className="mx-2">›</span>
            Profile
          </small>
        </div>

        <button className="btn btn-primary">
          <i className="bi bi-pencil me-2"></i>
          Edit Profile
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="card border-0 shadow-sm mb-4 profile-card">
        <div className="card-body p-4">

          <div className="row align-items-center">

            {/* Profile Summary */}
            <div className="col-lg-3 text-center border-end profile-summary">

              <div className="profile-avatar mx-auto mb-3">

                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="rounded-circle"
                  />
                ) : (
                  <div className="profile-avatar-placeholder rounded-circle">
                    <i className="bi bi-person fs-1"></i>
                  </div>
                )}

              </div>

              <h5 className="fw-bold mb-1">
                {profile.name}
              </h5>

              <p className="text-muted mb-2">
                {getRoleName()}
              </p>

              <span className="badge profile-role-badge">
                {profile.role}
              </span>

            </div>

            {/* Profile Information */}
            <div className="col-lg-9 ps-lg-4 mt-4 mt-lg-0">

              <h6 className="fw-bold mb-4">
                Profile Information
              </h6>

              <div className="row g-4">

                <ProfileField
                  label="Full Name"
                  value={profile.name}
                />

                <ProfileField
                  label="Email Address"
                  value={profile.email}
                />

                <ProfileField
                  label="Phone"
                  value={profile.phoneNumber ?? "N/A"}
                />

                <ProfileField
                  label="Date of Birth"
                  value={formatDate(profile.dateOfBirth)}
                />

                <ProfileField
                  label="Gender"
                  value={profile.gender ?? "N/A"}
                />

                <ProfileField
                  label="Joined Date"
                  value={formatDate(profile.createdAt)}
                />

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Bottom Cards */}
      <div className="row g-4">

        {/* Account Information */}
        <div className="col-lg-6">

          <div className="card border-0 shadow-sm h-100 profile-card">

            <div className="card-body p-4">

              <h6 className="fw-bold mb-4">
                Account Information
              </h6>

              <ProfileDetail
                label="Account Status"
                value={
                  profile.isActive
                    ? "Active"
                    : "Inactive"
                }
              />

              <ProfileDetail
                label="Role"
                value={profile.role}
              />

              <ProfileDetail
                label="User ID"
                value={profile.id}
              />

            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="col-lg-6">

          <div className="card border-0 shadow-sm h-100 profile-card">

            <div className="card-body p-4">

              <h6 className="fw-bold mb-4">
                Quick Actions
              </h6>

              <button className="btn btn-light w-100 text-start mb-2 profile-action">
                <i className="bi bi-key me-3"></i>
                Change Password
              </button>

              <button className="btn btn-light w-100 text-start profile-action">
                <i className="bi bi-pencil me-3"></i>
                Edit Profile
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

interface ProfileFieldProps {
  label: string;
  value?: string;
}

const ProfileField = ({
  label,
  value,
}: ProfileFieldProps) => {
  return (
    <div className="col-md-4">

      <small className="text-muted d-block mb-1">
        {label}
      </small>

      <span className="fw-semibold">
        {value || "N/A"}
      </span>

    </div>
  );
};

interface ProfileDetailProps {
  icon?: string;
  label: string;
  value: string;
}

const ProfileDetail = ({
  icon,
  label,
  value,
}: ProfileDetailProps) => {
  return (
    <div className="d-flex gap-3 mb-4">

      {icon && (
        <div className="text-primary fs-5">
          <i className={`bi ${icon}`}></i>
        </div>
      )}

      <div>

        <small className="text-muted d-block mb-1">
          {label}
        </small>

        <span className="small fw-semibold">
          {value}
        </span>

      </div>

    </div>
  );
};

const formatDate = (date?: string) => {
  if (!date) {
    return "N/A";
  }

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

export default Profile;