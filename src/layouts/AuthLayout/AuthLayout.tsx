import type { ReactNode } from "react";

interface AuthLayoutProps {
  brandPanel: ReactNode;
  children: ReactNode;
}

const AuthLayout = ({ brandPanel, children }: AuthLayoutProps) => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand-panel">
          {brandPanel}
        </div>

        <div className="auth-form-panel">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;