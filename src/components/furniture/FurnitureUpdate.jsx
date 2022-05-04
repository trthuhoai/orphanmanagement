import {
    deleteObject, getDownloadURL,
    ref,
    uploadBytes
} from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FurnitureContext } from "../../contexts/FurnitureContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const FurnitureUpdate = ({ theFurniture }) => {
    const id = theFurniture.furnitureId;

    useEffect(() => {
        getDetailFurniture();
    }, []);

    const [image, setImage] = useState("");
    const [nameFurniture, setNameFurniture] = useState("");
    const [status, setStatus] = useState("");
    const [quantity, setQuantity] = useState(0);
    // const [roles, setRoles] = useState("");
    // const [address, setAddress] = useState("");
    // const [identification, setIdentification] = useState("");
    // const [phone, setPhone] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    async function getDetailFurniture() {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result).data;
                setImage(result.image);
                setNameFurniture(result.nameFurniture);
                setStatus(result.status);
                setQuantity(result.quantity);
                console.log(
                    result.image,
                    result.nameFurniture,
                    result.status,
                    result.quantity
                );
            })
            .catch((error) => console.log("error", error));
    }

    const { updateFurniture } = useContext(FurnitureContext);

    const updatedAccount = {
        image,
        nameFurniture,
        status,
        quantity
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateFurniture(id, updatedAccount);
    };

    // IMAGE UPDATE
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
    async function handleUpdateImage() {
        if (!file) return;
        const pathFromURL = ref(storage, image)._location.path_;
        const desertRef = ref(storage, pathFromURL);
        await deleteObject(desertRef)
            .then(() => {
                console.log("File deleted successfully");
            })
            .catch((error) => {
                console.log("Uh-oh, an error occurred!", error);
            });
        const storageRef = ref(storage, generateString(100));
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    console.log(url);
                })
                .catch((err) => console.log(err));
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
                        image ||
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
                        onClick={handleUpdateImage}
                    >
                        <i class="bi bi-file-earmark-arrow-up-fill"></i> Lưu ảnh
                    </Button>
                </Row>
            </Form.Group>
            <Form onSubmit={handleSubmit} className="form" id="furnitureUpdate">
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Họ và tên"
                        name="nameFurniture"
                        value={nameFurniture}
                        onChange={(e) => setNameFurniture(e.target.value)}
                        required
                    />
                </Form.Group>
                <Row className="mb-3">
                    {/* <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Tình trạng"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        />
                    </Form.Group> */}

                    <Form.Group as={Col} className="form-group">
                        <Form.Select
                            defaultValue="GOOD"
                            className="form-select"
                            name="status"
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value 
                                )
                            }
                        >
                            <option selected hidden>
                                Tình trạng
                            </option>
                            <option value={"GOOD"}>Sử dụng tốt</option>
                            <option value={"NEED_FIX"}>Cần sửa chữa</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Số lượng"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </Form.Group>
                </Row>

                
            </Form>
        </>
    );
};

export default FurnitureUpdate;
