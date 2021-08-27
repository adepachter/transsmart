import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';


class IncomingOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            detail: [],
            senderDetail: [],
            recDetail: [],
            packages: null,
            inkoorders: [],
            show: false
        }
    }


    componentDidMount = async () =>  {
        try {
            const response = await axios.get('http://localhost:1337/orders');
            this.setState({ orders: response.data });
          } catch (error) {
            this.setState({ error });
          }


          ///// GET INKO ORDERS
        var data = '{"user": "arno", "password": "18e95342f51949e5823dbf5bcdceb5efd649b159580d406ea9690db23f2a4763"}';
        var config = {
            method: 'post',
            url: 'https://www.inkoprint.innomedio.dev/api/getOrders',
            data : data
        };
    
        axios(config)
            .then(function (response) {
                var orders = response.data.shipments;
                console.log(orders);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    StatusLabel(stat) {
        switch(stat) {
            case "Verwijderd":
                return <Badge bg="dark">Deleted</Badge>;
            case "Nieuw":
                return <Badge bg="info">Nieuw</Badge>;
            case "Verzenden":
                return <Badge bg="success">Transsmart</Badge>;
            case "Verstuurd":
                return <Badge bg="success">Verstuurd</Badge>;
            default:
                return <Badge bg="warning">!</Badge>;
        }
    }

    PostStrapi(detail) {
            var type = document.getElementById("typebox").value;
            var aantal = document.getElementById("aantalcolli").value;
            var carrier = document.getElementById("carrier").value;
            var pickupdate = document.getElementById("pickupdate").value;
            var url = 'http://localhost:1337/orders/' + detail.id;
        
            
            var packages = [];

            for (let i = 0; i < aantal; i++) {
                packages.push({
                        "lineNo": i+1,
                        "packageType": type,
                        "description": "",
                        "quantity": 1,
                        "carrier": carrier,
                        "measurements": {
                            "length": 30.00,
                            "width": 20.00,
                            "height": 10.00,
                            "weight": 1.00,
                            "linearUom": "CM",
                            "massUom": "KG"
                        }
                })
            }
            var pack = {
                "package": packages
                
            };


            console.log(packages);
            console.log(pack);


            //POST ORDER PACKAGES TO DATABASE
            axios
            .put(url, pack)
            .then(response => {
                console.log(response);
                axios.put(url,{
                  Status: "Verzenden"
              })
              .then(response => {
                  console.log(response);
                  var orderresponse = {};
                  //GET ORDER COMPLETE FROM DATABASE
                    axios
                    .get(url)
                    .then(response => {
                        orderresponse = response.data;
                        console.log(orderresponse);
                        console.log("HELLOOOO");
                                            // TO TRANSSMART
                    var orderJson = JSON.stringify([{
                        
                        "reference": orderresponse.reference,
                        "carrier": carrier,
                        "value": 25,
                        "valueCurrency": "EUR",
                        "pickupDate": pickupdate,
                        "service": "NON-DOCS",
                        "serviceLevelTime": "EUROPLUS",
                        "serviceLevelOther": "",
                        "incoterms": "CPT",
                        "numberOfPackages": parseInt(aantal),
                        "measurements": {
                                   "length": 30.0,
                                   "width": 20.0,
                                   "height": 10.0,
                                   "weight": 1.0,
                                   "linearUom": "CM",
                                   "massUom": "KG"
                             },
                        "addresses": [
                            {
                                "type": "RECV",
                                "name": orderresponse.receiver.name,
                                "addressLine1": orderresponse.receiver.addressLine1, 
                                "addressLine2": orderresponse.receiver.addressLine2,
                                "houseNo": orderresponse.receiver.houseNo,
                                "city": orderresponse.receiver.city,
                                "zipCode": orderresponse.receiver.zipCode,
                                "country": orderresponse.receiver.country,
                                "contact": orderresponse.receiver.contact,
                                "email": orderresponse.receiver.email
                            }, 
                            {
                                "type": "SEND",
                                "name": orderresponse.sender.name,
                                "addressLine1": orderresponse.sender.addressLine1, 
                                "addressLine2": orderresponse.sender.addressLine2,
                                "houseNo": orderresponse.sender.houseNo,
                                "city": orderresponse.sender.city,
                                "zipCode": orderresponse.sender.zipCode,
                                "country": orderresponse.sender.country,
                                "contact": orderresponse.sender.contact,
                                "email": orderresponse.sender.email
                            }
                        ],
                        "packages": packages
                    
                }]);

                console.log(orderJson);
                console.log("HELLOOOOOWWWWW");
                
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Basic YXBpQGJ1cm9mb3JtLmJlOm5MZjNhJU5Yc2FQeSU9TUM="); 
                 
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
            
                fetch("https://accept-api.transsmart.com/login", requestOptions)
                .then(response => response.json())
                .then(result => {
                    //console.log(result.token)
                    ///////////////// FETCH WITH BEARER FROM ABOVE
                        var token = "Bearer " + result.token;
                        var myHeaders = new Headers();
                        myHeaders.append("Authorization", token);
                        myHeaders.append("Content-Type", "application/json");  
                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: orderJson,
                            redirect: 'follow'
                        };

                        fetch("https://accept-api.transsmart.com/v2/shipments/BUROFORM/BOOK", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result);
                            alert("VERSTUURD NAAR TRANSSMART");
                            this.props.history.push('/shipments/');
                        })
                        .catch(error => console.log('error', error));

                        

                    //////////////////////////////////////////////

                    
                })
                .catch(error => console.log('error', error));


              //window.location.reload(false);
          });
        })
        });
        }



    render() {
        
        const { orders } = this.state;
        const { show } = this.state;
        const { detail, senderDetail, recDetail, packages } = this.state;
        
        

        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });

        const DetailPakjes = () => {
            console.log(packages);
            
            if (packages[0] === undefined) {
                return (
                <>
                <br />
                <Container>
                <h3>Toevoegen pakketjes</h3>
                <Form>
                <Row className="mb-4">
                <Form.Group as={Col}><Form.Label>Type</Form.Label>
                    <Form.Select id="typebox" as={Col}>
                        <option>Selecteer...</option>
                        <option value="BOX">BOX</option>
                        <option value="PALLET">PALLET</option>
                        <option value="KOKER">KOKER</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col}>
                        <Form.Label>Aantal colli's</Form.Label>
                        <Form.Control type="text" placeholder="1" id="aantalcolli" />
                    </Form.Group>
                
                <Form.Group className="mb-3" as={Col}>
                    <Form.Label>Datum (JJJJ-MM-DD)</Form.Label>
                    <Form.Control id="pickupdate" rows={1} />
                </Form.Group>
                <Form.Group as={Col}><Form.Label>Dienst</Form.Label>
                <Form.Select id="carrier" as={Col}>
                        
                        <option value="DHP">DHL</option>
                        <option value="BPOST">BPOST</option>
                        <option value="DPD">DPD</option>
                    </Form.Select>
                    </Form.Group>
                </Row>
                
                <Button variant="primary" id="postPackage" onClick={() => this.PostStrapi(detail)}>
                    Boeken in Transsmart
                </Button>
                </Form></Container>
                </>
                );
            }

            return (
                <>
                <br />
                <Container>
                <h3>Details pakketjes</h3>
                
                <Table bordered size="sm" id="tableDetails">
                <thead>
                    <tr>
                        <th className="alRight">#</th>
                    <th>Pakket</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {packages.map(pak => (
                        <>
                        <tr key={pak.id} ><td className="alRight"><b>LineNo</b></td><td><b>{pak.lineNo}</b></td></tr>
                        <tr><td className="alRight">Carrier</td><td>{pak.carrier}</td></tr>
                        <tr><td className="alRight">ShipmentLineID</td><td>{pak.shipmentLineId}</td></tr>
                        <tr><td className="alRight">PackageType</td><td>{pak.packageType}</td></tr>
                        <tr><td className="alRight">Beschrijving</td><td>{pak.description}</td></tr>
                        <tr><td className="alRight">Aantal</td><td>{pak.quantity}</td></tr>
                        <tr><td className="alRight">&nbsp;</td></tr>
    
                        </>
                    ))}
                </tbody>
                </Table></Container>
                </>
            )
        }

        return (
            <>
            <h1>Inkomende orders</h1>
                <Table striped hover>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Referentie</td>
                            <td>Afzender</td>
                            <td>Ontvanger</td>
                            <td>Locatie</td>
                            <td>Status</td>
                            <td>TT</td>
                        </tr>
                    </thead>
                    <tbody>
                    {orders
                    .sort((a,b) => b.id - a.id)
                    .map(order =>
                        <>
                        <tr key={order.id} data-item={order} onClick={() => {
                            handleShow();
                            
                            this.setState({ 
                                detail: order,
                                senderDetail: order.sender,
                                recDetail: order.receiver,
                                packages: order.package,                            
                            });
                        }}>
                            <td>{order.id}</td>
                            <td>{order.reference}</td>
                            <td>{order.sender.name}</td>
                            <td>{order.receiver.name}</td>
                            <td>{order.receiver.city}</td>
                            <td>{this.StatusLabel(order.Status)}</td>
                            <td>{order.published_at}</td>
                        
                        </tr>
                        
                        </>
                        )}
                        
                    </tbody>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>{detail.reference} - detail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><Container>
                            <br />
                        <h3>Details zender/ontvanger</h3>
                        <Table bordered size="sm" id="tableDetails">
                        <thead>
                            <tr>
                                <th className="alRight">#</th>
                            <th>Zender</th>
                            <th>Ontvanger</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={senderDetail.id}><td className="alRight">Naam</td><td>{senderDetail.name}</td><td>{recDetail.name}</td></tr>
                            <tr><td className="alRight">Contact</td><td>{senderDetail.contact}</td><td>{recDetail.contact}</td></tr>
                            <tr><td className="alRight">Adres1</td><td>{senderDetail.addressLine1} {senderDetail.houseNo}</td><td>{recDetail.addressLine1} {recDetail.houseNo}</td></tr>
                            <tr><td className="alRight">PC + stad</td><td>{senderDetail.zipCode} {senderDetail.city}</td><td>{recDetail.zipCode} {recDetail.city}</td></tr>
                            <tr><td className="alRight">Land</td><td>{senderDetail.country}</td><td>{recDetail.country}</td></tr>
                            <tr><td className="alRight">&nbsp;</td></tr>
                            <tr><td className="alRight">Adres2</td><td>{senderDetail.addressLine2}</td><td>{recDetail.addressLine2}</td></tr>
                            <tr><td className="alRight">Adres3</td><td>{senderDetail.addressLine3}</td><td>{recDetail.addressLine3}</td></tr>
                            <tr><td className="alRight">Staat</td><td>{senderDetail.state}</td><td>{recDetail.state}</td></tr>
                            <tr><td className="alRight">Tel.</td><td>{senderDetail.telNo}</td><td>{recDetail.telNo}</td></tr>
                            <tr><td className="alRight">E-mail</td><td>{senderDetail.email}</td><td>{recDetail.email}</td></tr>
                            <tr><td className="alRight">&nbsp;</td></tr>
                            <tr><td className="alRight">Accountnr</td><td>{senderDetail.accountNumber}</td><td>{recDetail.accountNumber}</td></tr>
                        </tbody>
                        </Table>
                        
                        <DetailPakjes />
                        </Container>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Table>

            </>
        )
    }
}

export default IncomingOrders;