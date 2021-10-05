import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class DeleteShip extends React.Component {
    DeleteShipment() {
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
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
                };
                var url = "https://api.transsmart.com/v2/shipments/BUROFORM/" + document.getElementById("referentie").value;

                fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    alert(result);
                    
                })
                .catch(error => alert(error));

                

            //////////////////////////////////////////////

            
        })
        .catch(error => console.log('error', error));
    }
    
    render() {
        return(
            <>
            <h1>Delete</h1>
            <Form.Control size="lg" id="referentie" type="text" placeholder="referentie" />
            <Button variant="danger" onClick={this.DeleteShipment}>Delete</Button> 
            </>
        )

    }
}

export default DeleteShip;