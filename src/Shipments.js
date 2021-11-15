import React from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { withAuth0 } from '@auth0/auth0-react';


class Shipments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shipments: [],
            showShipmentsDetails: false,
            ShipmentsDetails: [],
        };
        this.ClickFetchDetails = this.ClickFetchDetails.bind(this);
    }
    componentDidMount() {
                
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YXBpQGJ1cm9mb3JtLmJlOm5MZjNhJU5Yc2FQeSU9TUM=");    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        fetch("https://api.transsmart.com/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result.token)
            ///////////////// FETCH WITH BEARER FROM ABOVE
                var token = "Bearer " + result.token;
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };

                fetch("https://api.transsmart.com/v2/shipments/BUROFORM?costcenter=004", requestOptions)
                .then(response => response.json())
                .then(result => {
                    //console.log(result);
                    let nocontent = result.content;
                    this.setState({ shipments: nocontent })
                    console.log(result);
                    
                })
                .catch(error => console.log('error', error));

                

            //////////////////////////////////////////////

            
        })
        .catch(error => console.log('error', error));
    }

    ClickFetchDetails(ship) {
        
        this.setState({
            showShipmentsDetails: true,
        });
 
    }

    StatusLabel(stat) {
        switch(stat) {
            case "DEL":
                return <Badge bg="dark">Deleted</Badge>;
            case "LABL":
                return <Badge bg="success">Label</Badge>;
            case "ERR":
                return <Badge bg="danger">Error</Badge>;
            case "NEW":
                return <Badge bg="info">Nieuw</Badge>;
            case "BOOK":
            return <Badge bg="info">Nieuw</Badge>;
            case "DONE":
                return <Badge bg="info">Done</Badge>;
            default:
                return <Badge bg="warning">{stat}</Badge>;
        }
    }


 

    
render() {
    const { shipments } = this.state;
    const { shipment } = this.state;
    const { show } = this.state;


    return(
        <>
       <h1>Transsmart</h1>
       {this.state.showShipmentsDetails ? <div id="popupdetails"><FetchShipmentDetails shipment={shipment} show={show} /></div> : null }
       <Table striped hover>
           <thead>
               <tr>
                   <td>Aanmaakdatum</td>
                   <td>Referentie</td>
                   <td>Koerier</td>
                   <td>Ophaaldatum</td>
                   <td>Status</td>
                   <td>TT</td>
               </tr>
           </thead>
           <tbody>
           {shipments.map(ship =>
            <>
            <tr key={ship.reference} data-item={ship} onClick={() => {
                this.setState({shipment: ship});
                this.setState({show: true});
                this.ClickFetchDetails(ship);
            }}>
                <td>{ship.creationDate}</td>
                <td>{ship.reference}</td>
                <td>{ship.carrier}</td>
                <td>{ship.pickupDate}</td>
                <td>{this.StatusLabel(ship.shipmentStatusCode)}</td>
                <td><a href={ship.trackingAndTraceUrl} rel="noreferrer" target="_blank">Klik hier!</a></td>
               
            </tr>
            
            </>
            )}
               
           </tbody>
       </Table>
        
       
        </>
    )
}
}   


class FetchShipmentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: true,
        }
        this.baseState = this.state;
    }

    StatusLabel(stat) {
        switch(stat) {
            case "DEL":
                return <Badge bg="dark">Deleted</Badge>;
            case "LABL":
                return <Badge bg="success">Done</Badge>;
            case "ERR":
                return <Badge bg="danger">Error</Badge>;
            case "NEW":
                return <Badge bg="info">Nieuw</Badge>;
            default:
                return <Badge bg="warning">!</Badge>;
        }
    }

    GetLabels(reference) {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YXBpQGJ1cm9mb3JtLmJlOm5MZjNhJU5Yc2FQeSU9TUM=");    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        fetch("https://api.transsmart.com/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result.token)
            ///////////////// FETCH WITH BEARER FROM ABOVE
                var token = "Bearer " + result.token;
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                var url = "https://api.transsmart.com/v2/prints/BUROFORM/" + reference + "?rawJob=true";
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };

                fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    var packageDocs = result[0].packageDocs;
                    //console.log(packageDocs);
                    packageDocs.map(element => {
                        //console.log(element.data);
                        var pdf = element.data;
                            const linkSource = `data:application/pdf;base64,${pdf}`;
                            const downloadLink = document.createElement("a");
                            const fileName = "label" + reference + ".pdf";
                        
                            downloadLink.href = linkSource;
                            downloadLink.download = fileName;
                            downloadLink.click();
                            return console.log("labels ok");
                    })
                
                    
                })
                .catch(error => console.log('error', error));

                

            //////////////////////////////////////////////

            
        })
        .catch(error => console.log('error', error));

    }
    
    render() {

        const { shows } = this.state;
        
        //console.log(this.props.shipment);
        const ship = this.props.shipment;

        const handleClose = () => {
            this.setState({ shows: false });
            window.location.reload(false);
            
        };
        return(
            <>
            
            <Modal show={shows} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
            <Modal.Title>{ship.reference} - detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                <Row>
                    <Col>
                        {ship.description}<br /><br />
                        Aangemaakt: {ship.creationDate}<br />
                        Gewenst: {ship.requestedDeliveryDate}

                        <hr />
                        Colli aantal: <b> {ship.numberOfPackages}</b><br />
                        
                    </Col>
                    
                        
                        {ship.addresses.map(element => {
                            if(element.type === "RECV") {
                                return (
                                    <>
                                    <Col key={element.name}>
                                    <b>Ontvanger</b><br />
                                    <p>{element.name} <br />
                                    {element.contact}<br />
                                    {element.addressLine1} {element.houseNo}<br />
                                    
                                    {element.zipCode} {element.city}</p>
                                    <p>
                                    {element.email} <br /> {element.telNo}<br />
                                    {element.addressLine2}<br />
                                    {element.addressLine3}
                                    </p>
                                    </Col>
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                    <Col key={element.name}>
                                    <b>Afzender</b><br />
                                    <p>{element.name} <br />
                                    {element.contact}<br />
                                    {element.addressLine1} {element.houseNo}<br />
                                    
                                    {element.zipCode} {element.city}</p>
                                    <p>
                                    {element.email} <br /> {element.telNo}<br />
                                    {element.addressLine2}<br />
                                    {element.addressLine3}
                                    </p>
                                    </Col>
                                    </>
                                    
                                )
                            }
                            
                        }
                        )}
                    
                    
                </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                        Track and Trace: <a href={ship.trackingAndTraceUrl} rel="noreferrer" target="_blank">Klik hier</a><br />
                        Gewicht: {ship.calculatedWeight}<br />
                        Koerier: {ship.carrier}<br />
                        Service: {ship.executedServiceLevelTime}
                        </Col>
                        <Col>
                        {this.StatusLabel(ship.shipmentStatusCode)}<br />
                        {ship.errorDescription}
                        </Col>
                    </Row>
                </Container>
                <Button variant="success" onClick={() => this.GetLabels(ship.reference)}>Labels</Button>


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
            </>
        )
    }
    
}



export default withAuth0(Shipments);

