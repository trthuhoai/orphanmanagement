import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = () => {
    const navigate = useNavigate();
    function logout() {
        localStorage.clear();
        navigate("/");
    }

    const currentUser = JSON.parse(localStorage.getItem("current-user"));

    return (
        <div className="header">
            <div className="user">
                <section className="info">
                    <span className="info__username">
                        {currentUser.roles.includes("ROLE_ADMIN")
                            ? "Admin"
                            : currentUser.roles.includes("ROLE_MANAGER")
                            ? "Manager"
                            : ""}
                    </span>
                    <img
                        src={
                            currentUser.image ||
                            "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                        }
                        alt=""
                        className="info__avatar"
                    />
                </section>
                <i
                    className="bi bi-box-arrow-right icon icon__logout"
                    onClick={logout}
                ></i>
            </div>
        </div>
    );
};

export default Header;
