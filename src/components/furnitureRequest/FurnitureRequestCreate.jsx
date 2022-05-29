import { useContext, useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { FurnitureRequestContext } from "../../contexts/FurnitureRequestContext";
import { Card, ListGroup } from "react-bootstrap";
import Select from "react-select";
import "../../scss/abstracts/_form.scss";
import "./_furnitureRequest.scss";
import { Link, useNavigate } from "react-router-dom";

const FurnitureRequestCreate = () => {
    const { addFurnitureRequest,furnitures,accounts } = useContext(FurnitureRequestContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState(0);
    const navigate = useNavigate();
    const defaultValues = {
        Native: "",
        TextField: "",
        Select: "",
        ReactSelect: { value: 0, label: "Select..." },
        Checkbox: false,
        switch: false,
        RadioGroup: "",
        numberFormat: 123456789,
        downShift: "apple"
      };
      const {control } = useForm({ defaultValues });
    const [newFurnitureRequest, setNewFurnitureRequest] = useState({
        employeeId: 0,
        furnitureRequestList:[]
    });
    const [request,setRequest]=useState({
        fixQuantity: 0,
            furnitureId:0,
            importQuantity:0,
            note:""
    })

    const listRequest=[];
    const onInputChange = (e) => {
        setNewFurnitureRequest({
            ...newFurnitureRequest,
            "employeeId": e.value,
        });
        console.log("newFurnitureRequest",newFurnitureRequest);
    };
    const onInputChange1 = (e) => {
        setRequest({...request,
            [e.target.name]: e.target.value,
        })
        listRequest[0]=request;
        setNewFurnitureRequest({
            ...newFurnitureRequest,
            furnitureRequestList: listRequest,
        });
        console.log("newFurnitureRequest",newFurnitureRequest);
    };
    const onInputChange2 = (e) => {
        setRequest({...request,
            "furnitureId": e.value,
        })
        listRequest[0]=request;
        setNewFurnitureRequest({
            ...newFurnitureRequest,
            furnitureRequestList: listRequest,
        });
        console.log("newFurnitureRequest",newFurnitureRequest);
    };
    let renameObjectKey = (object) => {
        object.label = object.nameFurniture;
        object.value=object.furnitureId;
        delete object.nameFurniture;
        delete object.furnitureId;
        delete object.goodQuantity;
        delete object.image;
        delete object.status;
        delete object.unitPrice;
        delete object.brokenQuantity;
      };
      let renameObjectKeyAccount = (object) => {
        object.label =object.id+ " - " +object.fullName ;
        object.value=object.id;
        delete object.fullName;
        delete object.email;
        delete object.id;
        delete object.image;
        delete object.phone;
        delete object.roles;
      };
    useEffect(() => {
        furnitures.map((furniture) => {
            renameObjectKey(furniture);

        });
      
        },[furnitures]);

        useEffect(() => {
            accounts.map((account) => {
                renameObjectKeyAccount(account);
    
            });

            },[accounts]);
        
    // const filterOption = (option, inputValue) => {
    //     const { label, value } = option;
    //     const otherKey = furnitures.filter(
    //       opt => opt.label === label && opt.value.includes(inputValue)
    //     );
    //     return value.includes(inputValue) || otherKey.length > 0;
    //   };
    // const {
    //     employeeId,
    //     furnitureRequestList        
    // } = newFurnitureRequest;
    const handleSubmit = (e) => {
        e.preventDefault();
        addFurnitureRequest(
           newFurnitureRequest
        );
        setErrorMessage("Thêm yêu cầu mua mới, sửa chữa thiết bị thành công!")
        // if(addResult){
        //     setErrorMessage("Thêm thông tin thiết bị thành công!")
        // }
        // else{
        //     setErrorMessage("Lỗi thêm yêu cầu thiết bị!")
        // }
    };

    const handleClose = () => {
        navigate("/furniture/request")
    };
   
    return (
        <Card className="card modal-dialog1 " >
             <Card.Header className="card__header">
                <div>
                      <h3  style={{ color: "#0f1e54" }}>Thêm yêu cầu sửa chữa</h3>
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup  className="list-group">
                <ListGroup.Item >
        <Form onSubmit={handleSubmit} className="form" id="furnitureRequestCreate">
            <div className="row-fluid">
                <div className="span2"></div>
                <div className="span3"> 
                Chọn thiết bị
                <Form.Group as={Col} className="form-group">
                <section>
          <Controller
            as={Select}
            style={{ color: "#0f1e54" }}
            name="furnitureId"
            isClearable
            control={control}
           
            render={({ field }) => (
                <Select
                  {...field}
                  name="furnitureId"
                  options={furnitures}
                  onChange={(e) => {
                    onInputChange2(e);
                    setSelectedOption(e.value)
                }}
                isClearable
                />
              )}
          />
        </section>
        </Form.Group>
                </div>
                <div className="span2"></div>
                <div className="span3">
                    Chọn nhân viên phụ trách
                    <Form.Group as={Col} className="form-group">
                <section>
          <Controller
            as={Select}
            style={{ color: "#0f1e54" }}
            name="employeeId"
            isClearable
            control={control}
           
            render={({ field }) => (
                <Select
                  {...field}
                  name="employeeId"
                  options={accounts}
                  isClearable
                  onChange={(e) => {
                        onInputChange(e);
                        setSelectedOption(e.value)
                }}
                />
              )}
          />
        </section>
        </Form.Group>
                </div>
            </div>
            <div className="row-fluid">
                <div className="span2"></div>
                <div className="span3"> 
                Số lượng sửa
                <Form.Group as={Col} className="form-group">
                    <Form.Control
                        className="form-control"
                        type="number"
                        placeholder="Số lượng sửa"
                        name="fixQuantity"
                        onChange={(e) => onInputChange1(e)}
                        required
                    />
                </Form.Group>
                </div>
                <div className="span2"></div>
                <div className="span3">
                    Số lượng nhập
                <Form.Group as={Col} className="form-group">
                    <Form.Control
                        className="form-control"
                        type="number"
                        placeholder="Số lượng nhập"
                        name="importQuantity"
                        onChange={(e) => onInputChange1(e)}
                        required
                    />
                </Form.Group>
                </div>
            </div>
            <div className="row-fluid">              
                <div className="span2"></div>
                <div className="span10">
                    Ghi chú
                    <Form.Group as={Col} className="form-group1">
                    <Form.Control
                        className="form-control"
                        type="textarea"
                        placeholder="Ghi chú"
                        name="note"
                        onChange={(e) => onInputChange1(e)}
                    />
                </Form.Group>
                 </div>
            </div>
                <div className="row-fluid">
                    <div className="span3"></div>
                    <div className="span6">
                    <p style={{ color: "red" }}>
                        {errorMessage && (
                            <div className="error"> {errorMessage} </div>
                        )}
                    </p>
                    </div>
                        </div>
        </Form>
        </ListGroup.Item>
        </ListGroup>
            </Card.Body>
            <div className="row-fluid">
                <div className="span7"></div>
                <div className="span1-5">  <Button
                            variant="secondary"
                            onClick={handleClose}
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
    );
};

export default FurnitureRequestCreate;
