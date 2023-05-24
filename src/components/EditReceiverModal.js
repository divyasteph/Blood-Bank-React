import React, {Component} from 'react' ;
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { Snackbar } from '@material-ui/core';
import {IconButton} from '@material-ui/core';

export class EditReceiverModal extends Component{
    constructor(props){
    super(props);
    this.state ={snackbaropen: false, snackbarmsg:''}
    this.handleSubmit = this.handleSubmit.bind(this);
    }  
    snackbarClose = (event) =>{
        this.setState({snackbaropen:false});
    };
    handleSubmit(event){
        event.preventDefault();
        //alert(event.target.Name.value);
        fetch('https://localhost:44327/api/Receiver',{
          method: 'PUT',
          headers:{
            'Accept' : 'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            Receiver_ID:event.target.Receiver_ID.value,
            Name:event.target.Name.value,
            BloodGroup:event.target.BloodGroup.value,
            Unit:event.target.Unit.value,
            Hospital:event.target.Hospital.value,
            Phone:event.target.Phone.value,
            Status:event.target.Status.value    
          })
        })
        .then(resp  =>resp.json())
        .then((result) =>{
          //alert(result);
          this.setState({snackbaropen:true, snackbarmsg:result})
        },
        (error)=>{
          //alert('Failed')
          this.setState({snackbaropen:true, snackbarmsg:'Failed'})
        })
    }
    render(){
        return(
          <div className='container'>
            <Snackbar 
            anchorOrigin={{vertical:'center',horizontal:'center'}}
            open = {this.state.snackbaropen}
            autoHideDuration = {3000}
            onClose = {this.snackbarClose}
            
            message = {<span id="message-id">{this.state.snackbarmsg}</span>}
            
            action = {[
              <IconButton 
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
              >x</IconButton>
            ]}
            />
          <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Approve/Reject
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
              <Row>
                <Col sm={6}>
                  <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="Receiver_ID">
                      <Form.Label>Receiver ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="Receiver_ID"
                        required
                        disabled
                        defaultValue={this.props.did}
                        placeholder="Receiver_ID"
                      />
                    </Form.Group>
                    <Form.Group controlId="Name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="Name"
                        required
                        disabled
                        defaultValue={this.props.dname}
                        placeholder="Name"
                      />
                    </Form.Group>
                    <Form.Group controlId="BloodGroup">
                      <Form.Label>Blood Group</Form.Label>
                      <Form.Control
                        type="text"
                        name="BloodGroup"
                        required
                        disabled
                        defaultValue={this.props.blood}
                        placeholder="BloodGroup"
                      />
                    </Form.Group>
                    <Form.Group controlId="Unit">
                      <Form.Label>Units</Form.Label>
                      <Form.Control
                        type="text"
                        name="Unit"
                        required
                        defaultValue={this.props.dunit}
                        placeholder="Unit"
                      />
                    </Form.Group>
                    <Form.Group controlId="Hospital">
                      <Form.Label>Hospital</Form.Label>
                      <Form.Control
                        type="text"
                        name="Hospital"
                        required
                        defaultValue={this.props.dhos}
                        placeholder="Hospital"
                      />
                    </Form.Group>
                    <Form.Group controlId="Phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="Phone"
                        required
                        disabled
                        defaultValue={this.props.dphone}
                        placeholder="Phone"
                      />
                    </Form.Group>
                    <Form.Group controlId="Status">
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        type="text"
                        name="Status"
                        required
                        defaultValue={this.props.dstatus}
                        placeholder="Pending"
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                      <Button variant="primary" type="submit">
                        Update
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            
          </Modal.Body>
          <Modal.Footer>
            <br></br>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            
          </Modal.Footer>
        </Modal>
        </div>
        );
      }
}