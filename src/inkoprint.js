import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'




class InkoPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inkoorders: [],
            selectsort: ""
        }
    }

    componentDidMount = async () =>  {
        ///// GET INKO ORDERS
        var data = '{"user": "arno", "password": "18e95342f51949e5823dbf5bcdceb5efd649b159580d406ea9690db23f2a4763"}';
        var config = {
            method: 'post',
            url: 'https://www.inkoprint.be/api/getOrders',
            data : data
        };
        var self = this;
        axios(config)
            .then(function (response) {
                var orders = response.data.shipments;
                self.setState({ inkoorders: orders });
                self.setState({ selectsort: orders.delivery_date });
                console.log(orders);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    BookOrder(element) {
        if (element.shipping_method === "DHL") {
            var carrier = "DHP";
        }

        if (!element.delivery_address.name) element.delivery_address.name = element.delivery_address.company;


        var jsonData = {
            "reference": element.reference,
            "Status": "Nieuw",
            "carrier": carrier,
            "portal": "inko",
            "sender": {
                "contact": element.sender_address.company,
                "houseNo": element.sender_address.house_number,
                "addressLine1": element.sender_address.address,
                "addressLine2": null,
                "city": element.sender_address.city,
                "addressLine3": null,
                "zipCode": element.sender_address.zip_code,
                "state": null,
                "country": element.sender_address.country,
                "accountNumber": null,
                "type": null,
                "telNo": null,
                "email": null,
                "name": element.sender_address.name
            },
            "receiver": {
                "contact": element.delivery_address.company,
                "houseNo": element.delivery_address.house_number,
                "addressLine1": element.delivery_address.address,
                "addressLine2": null,
                "city": element.delivery_address.city,
                "addressLine3": null,
                "zipCode": element.delivery_address.zip_code,
                "state": null,
                "country": element.delivery_address.country,
                "accountNumber": null,
                "type": null,
                "telNo": null,
                "email": null,
                "name": element.delivery_address.name
            }
        };

        console.log(jsonData);
        var url = 'http://inkosmart.be:1337/orders/'
        axios
              .post(url, jsonData)
              .then(response => {
                  console.log(response);
                  
                  this.props.history.push('/incoming/');
              });

        return console.log(element);

    }

    BookButton (element) {
        console.log(element.tracking_code_present)
        if (element.tracking_code_present === "false") {
            return(
                <>
                <Button variant="primary" onClick={() => this.BookOrder(element)}>Boeken</Button>
                </>
            );
        } 
        if (element.tracking_code_present === "true") { return (
        
            <Button variant="primary" disabled>Done</Button>) }
        
    }

    Sorter() {
        console.log("test");
    }

    OrderReady (element) {
        
        switch(element.order_status) {
            case "Checking files":
                return <Badge bg="secondary">Not ready</Badge>;
            case "Please upload new files":
                return <Badge bg="success">Ready</Badge>;
            default:
                return <Badge bg="warning">{element.order_status}</Badge>;
        }
    }

    

    render() {
        const { inkoorders } = this.state; 
        
        return (
            <>
            <h1>INKOprint</h1>
            {/* <label for="sortby">Sorteer op:</label>
            <select name="sortby" id="sorting">
                <option value="orderdate" onChange={() => this.Sorter()}>Leverdatum</option>
                <option value="id" onChange={() => this.Sorter()}>Aanmaakdatum</option>
            </select> */}
            <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Referentie</th>
                        <th>Beschrijving</th>
                        <th>Verzenddatum</th>
                        <th>Van:</th>
                        <th>Naar:</th>
                        <th>Bestemming</th>
                        <th>Boek in INKOsmart</th>
                        <th>Files?</th>
                        </tr>
                    </thead>
                    <tbody>
                        
            {inkoorders
            .sort((a,b) => b.delivery_date - a.delivery_date)
            .map(element => {
                if(!element.delivery_address) {
                    var rec = " ";
                } else {
                rec = element.delivery_address;
                
                }
                return (<>
                    <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.reference}</td>
                        <td>{element.description}</td>
                        <td>{element.delivery_date}</td>
                        <td>{element.sender_address.name}</td>
                        <td>{element.delivery_address.name}</td>
                        <td>{rec.city}</td>
                        <td>{this.BookButton(element)}</td>
                        <td>{this.OrderReady(element)}</td>
                        </tr>                    
                </>)
            })}
            </tbody>
            </Table>
            </>
        )
    }
}

export default InkoPrint;
   