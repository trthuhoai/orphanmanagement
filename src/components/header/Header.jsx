import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = () => {
    const navigate = useNavigate();
    function logout() {
        localStorage.clear();
        navigate("/");
    }

    const currentUser = JSON.parse(localStorage.getItem("current-user"));

    const [expand, setExpand] = useState("");

    return (
        <div className="header">
            <div className="user">
                <section className="info">
                    <span className="info__username">
                        {currentUser.roles[0].description}
                    </span>
                    <img
                        src={
                            currentUser.image ||
                            "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                        }
                        alt=""
                        className="info__avatar"
                    />
                </section>
                <i
                    className="bi bi-caret-down-fill icon icon__expand"
                    onClick={() => {
                        expand ? setExpand("") : setExpand("expand");
                    }}
                ></i>
                <ul className={`user__menu ${expand}`}>
                    <li className="user__item">
                        <a href="/" className="user__link">
                            <i className="bi bi-key icon icon__password"></i>
                            <span>Đổi mật khẩu</span>
                        </a>
                    </li>
                    <li className="user__item" onClick={logout}>
                        <a href="/" className="user__link">
                            <i className="bi bi-box-arrow-right icon icon__logout"></i>
                            <span>Đăng xuất</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
