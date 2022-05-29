import React, { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.scss";

export default function ChangePassword() {
    const [newPassWord, setNewPassWord] = useState("");
    const [confirmPassWord, setConfirmPassWord] = useState("");

    const [announcement, setAnnouncement] = useState("");

    const navigate = useNavigate();

    const currentRoutes = useLocation();
    let email = currentRoutes.search.substring(
        currentRoutes.search.indexOf("=") + 1
    );

    console.log(currentRoutes, email);

    async function login() {
        let raw = JSON.stringify({
            newPassWord,
            confirmPassWord,
        });

        let requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: raw,
            redirect: "follow",
        };

        fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/auth/change-password?email=${email}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.code === 200) {
                    setAnnouncement("Đổi mật khẩu thành công");
                    setTimeout(() => navigate("/login"), 1500);
                }
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
                        Đặt lại mật khẩu mới cho tài khoản của bạn
                    </p>
                    <div className="form__group">
                        <i className="bi bi-lock icon icon__password"></i>
                        <input
                            type="password"
                            name=""
                            placeholder="Mật khẩu"
                            onChange={(event) => {
                                setNewPassWord(event.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    login();
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="form__group">
                        <i className="bi bi-key icon icon__password"></i>
                        <input
                            type="password"
                            name=""
                            placeholder="Xác nhận mật khẩu"
                            onChange={(event) => {
                                setConfirmPassWord(event.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    login();
                                }
                            }}
                            required
                        />
                        {confirmPassWord && newPassWord === confirmPassWord && (
                            <i
                                className="bi bi-check2 icon icon__password"
                                style={{ color: "#17B978" }}
                            ></i>
                        )}
                    </div>
                    {newPassWord !== confirmPassWord && (
                        <p className="login__annoucement">
                            Mật khẩu không khớp
                        </p>
                    )}
                    {announcement && (
                        <p className="login__annoucement">{announcement}</p>
                    )}
                </div>
                <div className="form__bottom">
                    <button
                        onClick={login}
                        className="btn btn__signin btn--primary"
                        type="button"
                        style={{ marginBottom: "1rem" }}
                    >
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
}
