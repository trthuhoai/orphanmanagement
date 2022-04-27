import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AccountContext } from "../../contexts/AccountContext";
import { FurnitureContext } from "../../contexts/FurnitureContext";

import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const FormCreate = () => {
    const { addResult,addFurniture } = useContext(FurnitureContext);
    const [errorMessage, setErrorMessage] = useState("");
    // const { addFurniture } = useContext(FurnitureContext);
    const [newFurniture, setNewFurniture] = useState({
        image: "",
        nameFurniture: "",
        status: "",
        quantity: 0
    });
    const onInputChange = (e) => {
        setNewFurniture({
            ...newFurniture,
            [e.target.name]: e.target.value,
        });
        console.log(newFurniture);
    };
    const {
        image,
        nameFurniture,
        status,
        quantity

    } = newFurniture;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ok");
        addFurniture(
            image,
            nameFurniture,
            quantity,
            status
           
        );
        if(addResult){
            setErrorMessage("Thêm thông tin thiết bị thành công!")
        }
        else{
            setErrorMessage("Chưa")
        }
    };

    // IMAGE UPLOAD
    // generate random string for filename
    function generateString(length) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
    const [file, setFile] = useState(null);
    const onFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    async function handleUploadImage() {
        if (!file) return;
        const storageRef = ref(storage, generateString(100));
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewFurniture({
                        ...newFurniture,
                        image: url,
                    });
                    console.log("link anh ", url);
                })
                .catch((err) => console.log("err", err));
        });
    }
    return (
        <>
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="accountImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="accountImageFile"
                        className="form-label btn__image btn btn--secondary"
                    >
                        <i className="bi bi-image icon icon__image"></i>
                        Chọn ảnh
                    </Form.Label>
                    <Form.Control
                        className="form-control form-control__file"
                        type="file"
                        accept="image/*"
                        name="image"
                        id="accountImageFile"
                        onChange={onFileChange}
                        required
                    />
                    <Button
                        className="form-label btn__image btn btn--secondary"
                        onClick={handleUploadImage}
                    >
                        <i class="bi bi-file-earmark-arrow-up-fill"></i> Lưu ảnh
                    </Button>
                </Row>
            </Form.Group>
            <Form onSubmit={handleSubmit} className="form" id="furnitureCreate">
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Tên thiết bị"
                        name="nameFurniture"
                        // value={nameFurniture}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>
                <Row className="mb-3">
                 
                    <Form.Group as={Col} className="form-group">
                        <Form.Select
                            defaultValue="GOOD"
                            className="form-select"
                            name="status"
                            // value={status}
                            onChange={(e) => {
                                let tempGender =
                                    e.target.value;
                                console.log(tempGender);
                                onInputChange(e);
                                setNewFurniture({
                                    ...newFurniture,
                                    status: tempGender,
                                });
                                console.log(
                                    typeof e.target.value,
                                    e.target.value
                                );
                            }}
                        >
                            <option selected hidden>
                                Tình trạng
                            </option>
                            <option value={["GOOD"]}>Sử dụng tốt</option>
                            <option value={["NEED_FIX"]}>Cần sửa chữa</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="number"
                            placeholder="Số lượng"
                            name="quantity"
                            // value={quantity}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-6">
                    <p style={{ color: "red" }}>
                        {errorMessage && (
                            <div className="error"> {errorMessage} </div>
                        )}
                    </p>
                        </Row>

                {/* <Form.Group className="mb-3 form-group">
                    <Form.Select
                        defaultValue="Phân quyền"
                        className="form-select"
                        name="roles"
                        value={roles}
                        onChange={(e) => {
                            let tempRoles = [e.target.value];
                            onInputChange(e);
                            setNewAccount({
                                ...newAccount,
                                roles: tempRoles,
                            });
                        }}
                    >
                        <option selected hidden>
                            Phân quyền
                        </option>
                        <option value={["admin"]}>Admin</option>
                        <option value={["manager"]}>Manager</option>
                    </Form.Select>
                </Form.Group> */}
                

                {/* <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Địa chỉ"
                        name="address"
                        value={address}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group> */}

                {/* <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="CMND/CCCD"
                            name="identification"
                            value={identification}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Số điện thoại"
                            name="phone"
                            value={phone}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            value={password}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </Form.Group>
                    {password !== confirmPassword && (
                        <p className="password__match">
                            Mật khẩu không trùng khớp.
                        </p>
                    )}
                </Row> */}
            </Form>
        </>
    );
};

export default FormCreate;
