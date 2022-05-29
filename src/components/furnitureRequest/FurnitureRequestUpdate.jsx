import { Card, ListGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FurnitureRequestContext } from "../../contexts/FurnitureRequestContext";
import "../../scss/abstracts/_form.scss";
// import { SearchBar } from "../searchBar/SearchBar";

const FurnitureRequestUpdate = ({ furnitureRequestId }) => {
    const id = furnitureRequestId;
    const { introducers } = useContext(FurnitureRequestContext);
    const { nurturers } = useContext(FurnitureRequestContext);

    const [image, setImage] = useState("");

    const [fullName, setFullName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [introductoryDate, setIntroductoryDate] = useState("");
    const [adoptiveDate, setAdoptiveDate] = useState("");
    const [introducerId, setIntroducerId] = useState(0);
    const [nurturerId, setNurturerId] = useState(0);

    const [introducer, setIntroducer] = useState({});
    const [nurturer, setNurturer] = useState({});

    const { viewFurnitureRequest } = useContext(FurnitureRequestContext);
    useEffect(() => {
        viewFurnitureRequest(id).then((result) => {
            setImage(result.image);
            setFullName(result.fullName);
            setDateOfBirth(result.dateOfBirth);
            setGender(result.gender);
            setIntroductoryDate(result.introductoryDate);
            setAdoptiveDate(result.adoptiveDate);
            setIntroducerId(result.introducerId);
            setIntroducer(
                introducers.find(
                    (introducer) => introducer.id === result.introducerId
                )
            );
            setNurturerId(result.nurturerId);
            setNurturer(
                nurturers.find((nurturer) => nurturer.id === result.nurturerId)
            );
        });
    }, []);

    const { updateFurnitureRequest } = useContext(FurnitureRequestContext);
    const updatedFurnitureRequest = {
        image,
        fullName,
        gender,
        dateOfBirth,
        introductoryDate,
        adoptiveDate,
        introducerId,
        nurturerId,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedFurnitureRequest);
        updateFurnitureRequest(id, updatedFurnitureRequest);
    };


    
    return (
        <>
           <Card className="card modal-dialog1 " >
             <Card.Header className="card__header">
                <div>
                      <h3  style={{ color: "#0f1e54" }}>Cập nhật yêu cầu sửa chữa</h3>
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup  className="list-group">
                <ListGroup.Item >

            <Form onSubmit={handleSubmit} className="form" id="furnitureRequestUpdate">
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Họ và tên"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Ngày sinh"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="form-group">
                        <Form.Select
                            className="form-select"
                            name="gender"
                            value={gender}
                            onChange={(e) =>
                                setGender(
                                    e.target.value === "true" ? true : false
                                )
                            }
                        >
                            <option value={"Giới tính"} hidden>
                                Giới tính
                            </option>
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} className=" form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Ngày vào trung tâm"
                            name="introductoryDate"
                            value={introductoryDate}
                            onChange={(e) =>
                                setIntroductoryDate(e.target.value)
                            }
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Ngày được nhận nuôi"
                            name="adoptiveDate"
                            value={adoptiveDate}
                            onChange={(e) => setAdoptiveDate(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Form.Group as={Col} className="mb-3 form-group">
                </Form.Group>
                {introducer && Object.keys(introducer).length !== 0 && (
                    <Form.Group className="mb-3 form-group search-item">
                        <img
                            src={
                                introducer.image ||
                                "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                            }
                            alt=""
                            className="search-item__image"
                        />
                        <div className="search-item__content">
                            <p>{introducer.fullName}</p>
                            <span> {introducer.phone}</span>
                        </div>
                    </Form.Group>
                )}
                <Form.Group as={Col} className="mb-3 form-group">
                </Form.Group>
                {nurturer && Object.keys(nurturer).length !== 0 && (
                    <Form.Group className="mb-3 form-group search-item">
                        <img
                            src={
                                nurturer.image ||
                                "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                            }
                            alt=""
                            className="search-item__image"
                        />
                        <div className="search-item__content">
                            <p>{nurturer.fullName}</p>
                            <span> {nurturer.phone}</span>
                        </div>
                    </Form.Group>
                )}
            </Form>
            </ListGroup.Item>
        </ListGroup>
            </Card.Body>
            <div className="row-fluid">
                <div className="span7"></div>
                <div className="span1-5">  <Button
                            variant="secondary"
                            className="btn btn--secondary btn__close"
                        >
                            Đóng
                        </Button>
                </div>
                <div className="span2">
                <Button
                            variant="success"
                            form="furnitureRequestCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                </div>

            </div>
          
                       
        </Card>
        </>
    );
};

export default FurnitureRequestUpdate;
