import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ roles: [] });

    useEffect(() => {
        getUserInfo();
    }, []);

    async function getUserInfo() {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        // const result = await fetch(
        //     "https://orphanmanagement.herokuapp.com/api/v1/auth/account",
        //     requestOptions
        // );
        // const getResult = await result.json();
        await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/auth/account",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                // console.log(result);
                setUserInfo(JSON.parse(result).data);
            })
            .catch((error) => console.log("error", error));
    }

    function logout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="header">
            <div className="user">
                <section className="info">
                    <span className="info__username">
                        {userInfo.roles.includes("ROLE_ADMIN")
                            ? "Admin"
                            : userInfo.roles.includes("ROLE_MANAGER")
                            ? "Manager"
                            : ""}
                    </span>
                    <img
                        src={
                            userInfo.image ||
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
