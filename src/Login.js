import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

class Login extends React.Component {

   SubmitLogin() {
        const user = document.getElementById("user").value;
        const password = document.getElementById("password").value;
        console.log(user);
        console.log("test");
        axios
        .post('http://localhost:1337/auth/local', {
            identifier: user,
            password: password,
        })
        .then(response => {
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
        })
        .catch(error => {
            // Handle error.
            alert('An error occurred:', error.response);
          });

            
   }

    render() {
        
        


        return (
            <>
            <h1>Login</h1>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" id="user" />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" id="password" />
            </Form.Group>
            
            <Button variant="primary" onClick={this.SubmitLogin}>
                Submit
            </Button>
            </Form>
            </>
        )
    }

};

export default Login;