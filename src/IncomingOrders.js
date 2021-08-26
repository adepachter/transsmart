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
    }

    StatusLabel(stat) {
        switch(stat) {
            case "Verwijderd":
                return <Badge bg="dark">Deleted</Badge>;
            case "Nieuw":
                return <Badge bg="info">Nieuw</Badge>;
            case "Verzenden":
                return <Badge bg="warning">Verzenden?</Badge>;
            case "Verstuurd":
                return <Badge bg="success">Verstuurd</Badge>;
            default:
                return <Badge bg="warning">!</Badge>;
        }
    }

    PostStrapi(detail) {
            var type = document.getElementById("typebox").value;
            var aantal = document.getElementById("aantalcolli").value;
            var description = document.getElementById("descriptionPack").value;
            var carrier = document.getElementById("carrier").value;
            var url = 'http://localhost:1337/orders/' + detail.id;
            var objPackage = {};


            axios
              .put(url, {
                  
                  package: [
                      {
                          "lineNo": 1,
                          "packageType": type,
                          "description": description,
                          "quantity": aantal,
                          "carrier": carrier
                      }
                  ]
              })
              .then(response => {
                  console.log(response);
                  axios.put(url,{
                    Status: "Verzenden"
                })
                .then(response => {
                    console.log(response)
                    window.location.reload(false);
                });
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
                    <Form.Label>Beschrijving</Form.Label>
                    <Form.Control as="textarea" id="descriptionPack" rows={1} />
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
                    Opslaan lokaal
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
                        <tr key={pak.id}><td className="alRight"><b>LineNo</b></td><td><b>{pak.lineNo}</b></td></tr>
                        <tr><td className="alRight">Carrier</td><td>{pak.carrier}</td></tr>
                        <tr><td className="alRight">ShipmentLineID</td><td>{pak.shipmentLineId}</td></tr>
                        <tr><td className="alRight">PackageType</td><td>{pak.packageType}</td></tr>
                        <tr><td className="alRight">Beschrijving</td><td>{pak.description}</td></tr>
                        <tr><td className="alRight">Aantal</td><td>{pak.quantity}</td></tr>
                        <tr><td className="alRight">Afmetingen</td><td>{pak.measurements}</td></tr>
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
                    {orders.map(order =>
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
                            <tr><td className="alRight">Naam</td><td>{senderDetail.name}</td><td>{recDetail.name}</td></tr>
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
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Table>

            </>
        )
    }
}

export default IncomingOrders;