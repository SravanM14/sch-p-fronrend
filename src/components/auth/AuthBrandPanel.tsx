import loginImage from "../../assets/images/loginImage.png";


interface AuthBrandPanelProps {
    variant?: "login" | "register";
}

const AuthBrandPanel = ({
    variant = "login",
}: AuthBrandPanelProps) => {
    const isLogin = variant === "login";

    return (
        <div
            className={`brand-content ${isLogin ? "brand-login" : "brand-register"
                }`}
        >
            {/* Logo */}
            <div className="brand-header">
                <div className="brand-logo">
                    <i className="bi bi-mortarboard-fill"></i>
                </div>

                <div>
                    <h2>
                        School
                        <br />
                        Management
                        <br />
                        System
                    </h2>
                </div>
            </div>

            <div className="brand-divider"></div>

            {isLogin ? (
                <>
                    <p className="brand-description">
                        Empowering Schools,
                        <br />
                        Connecting Community,
                        <br />
                        Building Better Future.
                    </p>

                    <div className="brand-illustration login-illustration">
                        <img
                            src={loginImage}
                            alt="School building"
                            className="school-image"
                        />
                    </div>
                </>
            ) : (
                <>
                    <p className="brand-description">
                        Create an account to get started
                        <br />
                        and explore all features.
                    </p>

                    <div className="brand-illustration register-illustration">
                        <i className="bi bi-mortarboard"></i>
                        <i className="bi bi-book"></i>
                        <i className="bi bi-backpack"></i>
                    </div>
                </>
            )}
        </div>
    );
};

export default AuthBrandPanel;