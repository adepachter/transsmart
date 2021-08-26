import React from 'react';
import { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

class NewOrder extends React.Component {

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
                        <Form.Group as={Col} id="sendEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group as={Col} id="sendName">
                        <Form.Label>Naam</Form.Label>
                        <Form.Control placeholder="Naam" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} id="sendAdres1">
                        <Form.Label>Adres 1</Form.Label>
                        <Form.Control placeholder="Grote Markt" />
                        </Form.Group>

                        <Form.Group as={Col} id="sendHuisnr">
                        <Form.Label>Huisnr</Form.Label>
                        <Form.Control placeholder="5" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} id="sendAdres2">
                            <Form.Label>Adres 2</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} id="sendPC">
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} id="sendStad">
                        <Form.Label>Stad</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} id="sendLand">
                        <Form.Label>Land</Form.Label>
                        <Form.Select defaultValue="BE">
                            <option>BE</option>
                            <option>NL</option>
                            <option>FR</option>
                            <option>LU</option>
                            <option>DE</option>
                            <option>anders</option>
                        </Form.Select>

                        </Form.Group>
                    </Row>

                </Col>

                <Col>
                    <br></br>
                    <h2>Ontvanger</h2>
                    <Row className="mb-3">
                        <Form.Group as={Col} id="recEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group as={Col} id="recName">
                        <Form.Label>Naam</Form.Label>
                        <Form.Control placeholder="Naam" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} id="recAdres1">
                        <Form.Label>Adres 1</Form.Label>
                        <Form.Control placeholder="Grote Markt" />
                        </Form.Group>

                        <Form.Group as={Col} id="recHuisnr">
                        <Form.Label>Huisnr</Form.Label>
                        <Form.Control placeholder="5" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} id="recAdres2">
                            <Form.Label>Adres 2</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} id="recPC">
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} id="recStad">
                        <Form.Label>Stad</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} id="recLand">
                        <Form.Label>Land</Form.Label>
                        <Form.Select defaultValue="BE">
                            <option>BE</option>
                            <option>NL</option>
                            <option>FR</option>
                            <option>LU</option>
                            <option>DE</option>
                            <option>anders</option>
                        </Form.Select>

                        </Form.Group>
                    </Row>
                </Col>
                </Row>
                <br /><hr /><br />
                <Row>
                    <h2>Details</h2>
                    <Col>
                        <Form.Control placeholder="Referentie" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Gewicht" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="" />
                    </Col>
                </Row>
            </Container>
            </Form>



            </>
        )
    }
}

export default NewOrder;