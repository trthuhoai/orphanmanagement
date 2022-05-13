import {
    deleteObject, 
    getDownloadURL,
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

    const [image, setImage] = useState("");
    const [imageSuccess, setImageSuccess] = useState("");
    const [nameFurniture, setNameFurniture] = useState("");
    const [status, setStatus] = useState("");
    const [goodQuantity, setGoodQuantity] = useState(0);
    const [brokenQuantity, setBrokenQuantity] = useState(0);
    const { viewFurniture } = useContext(FurnitureContext);
    useEffect(() => {
        viewFurniture(id).then((result)=>{
            getDetailFurniture();
        })
        
    }, []);
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
                setGoodQuantity(result.goodQuantity);
                setBrokenQuantity(result.brokenQuantity);
                console.log(
                    result.image,
                    result.nameFurniture,
                    result.status,
                    result.goodQuantity
                );
            })
            .catch((error) => console.log("error", error));
    }

    const { updateFurniture } = useContext(FurnitureContext);

    const updatedFurniture = {
        image,
        nameFurniture,
        status,
        goodQuantity,
        brokenQuantity
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateFurniture(id, updatedFurniture);
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
    const [file, setFile] = useState("");
    const onFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    async function handleUpdateImage() {
        if (!file) return;
        if (image && image.includes("firebasestorage")) {
            const pathFromURL = ref(storage, image)._location.path_;
            const desertRef = ref(storage, pathFromURL);
            await deleteObject(desertRef)
                .then(() => {
                    console.log("File deleted successfully");
                })
                .catch((error) => {
                    console.log("Uh-oh, an error occurred!", error);
                });
        }
        const storageRef = ref(storage, `accounts/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    console.log(url);
                    setImage(url);
                    setImageSuccess("Tải ảnh lên thành công");
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
                        (file && URL.createObjectURL(file)) ||
                        image ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="furnitureImageFile"
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
                        id="furnitureImageFile"
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
                {imageSuccess && (
                    <p className="image__success">{imageSuccess}</p>
                )}
            </Form.Group>
            <Form onSubmit={handleSubmit} className="form" id="furnitureUpdate">
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Tên thiết bị"
                        name="nameFurniture"
                        value={nameFurniture}
                        onChange={(e) => setNameFurniture(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="number"
                        placeholder="Số lượng sử dụng tốt"
                        name="goodQuantity"
                        value={goodQuantity}
                        onChange={(e) => setGoodQuantity(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="number"
                        placeholder="Số lượng hư hỏng"
                        name="brokenQuantity"
                        value={brokenQuantity}
                        onChange={(e) => setBrokenQuantity(e.target.value)}
                        required
                    />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Tình trạng"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)+" "}
                            // required
                        />
                    </Form.Group>
                </Row>
            </Form>
        </>
    );
};

export default FurnitureUpdate;
