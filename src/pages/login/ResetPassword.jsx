import React, { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";
import "./login.scss";

export default function ResetPassword() {
    const [email, setEmail] = useState("");

    const [announcement, setAnnouncement] = useState("");

    async function resetPassword() {
        let raw = JSON.stringify({
            email,
        });

        var requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: raw,
            redirect: "follow",
        };

        fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/auth/reset-password",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setAnnouncement("Truy cập vào email để đặt lại mật khẩu mới.");
            })
            .catch((error) => console.log("error", error));
    }

    return (
        <div className="login">
            <MetaTags>
                <title>CYF Center | Đặt lại mật khẩu</title>
            </MetaTags>
            <form className="form form__login">
                <div className="form__top">
                    <Link to="/" style={{ color: "#fff" }}>
                        <span className="logo">
                            <span className="logo__name">CYF</span>
                            Center
                        </span>
                    </Link>
                </div>
                <div className="form__body">
                    <p className="form__desc">
                        Vui lòng nhập email để đặt lại mật khẩu của bạn.
                    </p>
                    <div className="form__group">
                        <i className="bi bi-envelope icon icon__email"></i>
                        <input
                            type="email"
                            name=""
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    resetPassword();
                                }
                            }}
                            required
                        />
                    </div>
                    {announcement && (
                        <p className="login__annoucement">{announcement}</p>
                    )}
                </div>
                <div className="form__bottom">
                    <button
                        onClick={resetPassword}
                        className="btn btn__signin btn--primary"
                        type="button"
                    >
                        Xác nhận
                    </button>
                    <div className="no-account">
                        <Link className="btn-sign" to="/login">
                            Quay lại trang đăng nhập
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
