import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
var axios = require('axios');


class NewOrder extends React.Component {
    

    PostNewShipment() {
        let referentie = document.getElementById("referentie").value;
        let sendContact = document.getElementById("sendContact").value;
        let sendHuisnr = document.getElementById("sendHuisnr").value;
        let sendAdres1 = document.getElementById("sendAdres1").value;
        let sendAdres2 = document.getElementById("sendAdres2").value;
        let sendStad = document.getElementById("sendStad").value;
        let sendPC = document.getElementById("sendPC").value;
        let sendEmail = document.getElementById("sendEmail").value;
        let sendName = document.getElementById("sendName").value;
        let sendCountry = document.getElementById("sendLand").value;

        let recContact = document.getElementById("recContact").value;
        let recHuisnr = document.getElementById("recHuisnr").value;
        let recAdres1 = document.getElementById("recAdres1").value;
        let recAdres2 = document.getElementById("recAdres2").value;
        let recStad = document.getElementById("recStad").value;
        let recPC = document.getElementById("recPC").value;
        let recEmail = document.getElementById("recEmail").value;
        let recName = document.getElementById("recName").value;
        let recCountry = document.getElementById("recLand").value;
        console.log(sendCountry);

        var jsonData = {
            "reference": referentie,
            "Status": "Nieuw",
            "portal": "local",
            "carrier": null,
            "sender": {
                "contact": sendContact,
                "houseNo": sendHuisnr,
                "addressLine1": sendAdres1,
                "addressLine2": sendAdres2,
                "city": sendStad,
                "addressLine3": null,
                "zipCode": sendPC,
                "state": null,
                "country": sendCountry,
                "accountNumber": null,
                "type": null,
                "telNo": null,
                "email": sendEmail,
                "name": sendName
            },
            "receiver": {
                "contact": recContact,
                "houseNo": recHuisnr,
                "addressLine1": recAdres1,
                "addressLine2": recAdres2,
                "city": recStad,
                "addressLine3": null,
                "zipCode": recPC,
                "state": null,
                "country": recCountry,
                "accountNumber": null,
                "type": null,
                "telNo": null,
                "email": recEmail,
                "name": recName
            }
        };

        console.log(jsonData);
        var url = 'https://inkosmart.herokuapp.com/orders/'
        axios
              .post(url, jsonData)
              .then(response => {
                  console.log(response);
                  alert(response);
                  this.props.history.push('/incoming/');
              });

    }

    


    render() {

        


        return(
            <>
            <h1>Nieuwe order aanmaken</h1>

            <Form>
            <Container>
                <Row>
                    <Col>
                    <br></br>
                    <h2>Afzender</h2>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Contact</Form.Label>
                            <Form.Control id="sendContact" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id="sendEmail" />
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Naam</Form.Label>
                        <Form.Control placeholder="Naam" id="sendName" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Adres 1</Form.Label>
                        <Form.Control placeholder="Grote Markt" id="sendAdres1" />
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Huisnr</Form.Label>
                        <Form.Control placeholder="5" id="sendHuisnr" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Adres 2</Form.Label>
                            <Form.Control id="sendAdres2" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col}>
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control id="sendPC" />
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Stad</Form.Label>
                        <Form.Control id="sendStad" />
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Land</Form.Label>
                        <Form.Select defaultValue="BE" id="sendLand">
                            <option value="BE">BE</option>
                            <option value="NL">NL</option>
                            <option value="FR">FR</option>
                            <option value="LU">LU</option>
                            <option value="DE">DE</option>
                        </Form.Select>

                        </Form.Group>
                    </Row>

                </Col>

                <Col>
                    <br></br>
                    <h2>Ontvanger</h2>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Contact</Form.Label>
                            <Form.Control id="recContact" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id="recEmail" />
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Naam</Form.Label>
                        <Form.Control placeholder="Naam" id="recName" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                        <Form.Label>Adres 1</Form.Label>
                        <Form.Control placeholder="Grote Markt" id="recAdres1"/>
                        </Form.Group>

                        <Form.Group as={Col} >
                        <Form.Label>Huisnr</Form.Label>
                        <Form.Control placeholder="5" id="recHuisnr"/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Adres 2</Form.Label>
                            <Form.Control id="recAdres2"/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} >
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control id="recPC"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Stad</Form.Label>
                        <Form.Control id="recStad"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Land</Form.Label>
                        <Form.Select defaultValue="BE" id="recLand">
                            <option value="BE">BE</option>
                            <option value="NL">NL</option>
                            <option value="FR">FR</option>
                            <option value="LU">LU</option>
                            <option value="DE">DE</option>
                        </Form.Select>

                        </Form.Group>
                    </Row>
                </Col>
                </Row>
                <br /><hr /><br />
                <Row>
                    <h2>Details</h2>
                    <Col>
                        <Form.Control placeholder="Referentie" id="referentie" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Gewicht" id="gewicht" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Leverancier" id="leverancier" />
                    </Col>
                </Row>
            </Container>
            <Button variant="primary" size="lg" onClick={() => this.PostNewShipment()}>
            Maak order aan!
            </Button>
            </Form>

            

            </>
        )
    }
}

export default NewOrder;


