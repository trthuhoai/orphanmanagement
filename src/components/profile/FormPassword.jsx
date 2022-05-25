import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormPassword = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const { currentPassword, newPassword, confirmPassword } = password;

    const onInputChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
        console.log(password);
    };

    async function updatePassword() {
        let raw = JSON.stringify(password);
        let requestOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: raw,
            redirect: "follow",
        };

        await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/profile/account/changepassword",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 200) {
                    alert("Cập nhật mật khẩu thành công");
                } else if (result.code === 400) {
                    alert("Mật khẩu hiện tại không đúng");
                }
            })
            .catch((error) => console.log("error", error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePassword();
    };
    return (
        <>
            <h3 className="profile__title">Cập nhật mật khẩu</h3>
            <Form
                onSubmit={handleSubmit}
                className="form form-password"
                id="passwordUpdate"
            >
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="password"
                        placeholder="Mật khẩu hiện tại"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="password"
                        placeholder="Mật khẩu mới"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>
                {newPassword !== confirmPassword && (
                    <p className="password__match">
                        Mật khẩu không trùng khớp.
                    </p>
                )}
            </Form>
            <Button
                form="passwordUpdate"
                variant="success"
                type="submit"
                className="btn btn--primary btn__submit"
            >
                Đổi mật khẩu
            </Button>
        </>
    );
};

export default FormPassword;
