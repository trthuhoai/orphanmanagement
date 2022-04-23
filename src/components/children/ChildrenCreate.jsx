import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ChildrenContext } from "../../contexts/ChildrenContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const FormCreate = () => {
    const { addChildren } = useContext(ChildrenContext);
    const [newChildren, setNewChildren] = useState({
        image: "",
        fullName: "",
        date_of_birth: "",
        gender: null,
        roles: [],
        address: "",
        identification: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const onInputChange = (e) => {
        setNewChildren({
            ...newChildren,
            [e.target.name]: e.target.value,
        });
        console.log(newChildren);
    };
    const {
        image,
        fullName,
        date_of_birth,
        gender,
        roles,
        address,
        identification,
        phone,
        email,
        password,
        confirmPassword,
    } = newChildren;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ok");
        // handleUpload();
        addChildren(
            image,
            fullName,
            date_of_birth,
            gender,
            roles,
            address,
            identification,
            phone,
            email,
            password,
            confirmPassword
        );
    };

    //Image Upload
    const [file, setFile] = useState(null);
    const onFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    async function handleUpload() {
        if (!file) return;
        const storageRef = ref(
            storage,
            `admin/users/${newChildren.fullName} ${newChildren.identification}`
        );
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewChildren({
                        ...newChildren,
                        image: url,
                    });
                    console.log(url);
                })
                .catch((err) => console.log("err", err));
        });
    }
    return (
        <Form onSubmit={handleSubmit} className="form" id="ChildrenCreate">
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="childrenImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="childrenImageFile"
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
                        id="childrenImageFile"
                        // value={file}
                        onChange={onFileChange}
                        required
                    />
                    <Button
                        className="form-label btn__image btn btn--secondary"
                        onClick={handleUpload}
                    >
                        <i class="bi bi-file-earmark-arrow-up-fill"></i> Lưu ảnh
                    </Button>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3 form-group">
                <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Họ và tên"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} className="form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Ngày sinh"
                        name="date_of_birth"
                        value={date_of_birth}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} className="form-group">
                    <Form.Select
                        defaultValue="Giới tính"
                        className="form-select"
                        name="gender"
                        value={gender}
                        onChange={(e) => {
                            let tempGender =
                                e.target.value === "true" ? true : false;
                            console.log(tempGender);
                            onInputChange(e);
                            setNewChildren({
                                ...newChildren,
                                gender: tempGender,
                            });
                            console.log(typeof e.target.value, e.target.value);
                        }}
                    >
                        <option selected hidden>
                            Giới tính
                        </option>
                        <option value={true}>Nam</option>
                        <option value={false}>Nữ</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="form-group">
                    <Form.Select
                        defaultValue="Phân quyền"
                        className="form-select"
                        name="roles"
                        value={roles}
                        onChange={(e) => {
                            let tempRoles = [e.target.value];
                            onInputChange(e);
                            setNewChildren({
                                ...newChildren,
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
                </Form.Group>
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
                            setNewChildren({
                                ...newChildren,
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

            <Form.Group className="mb-3 form-group">
                <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Địa chỉ"
                    name="address"
                    value={address}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </Form.Group>

            <Row className="mb-3">
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
            </Row>
        </Form>
    );
};

export default FormCreate;
