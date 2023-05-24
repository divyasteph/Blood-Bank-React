import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

export class StockAddModal extends Component{
    constructor(props){
    super(props);
    this.state={snackbaropen:false,snackbarmsg:''};
    this.handleSubmit=this.handleSubmit.bind(this);
}
snackbarClose=(event)=>{
this.setState({snackbarOpen:false});
};

handleSubmit(event){
    event.preventDefault();
    fetch('http://localhost:44327/api/stock',{
    method:'POST',
    headers:{
    'Accept':'application/json',
    'Content-Type':'application/json'
},
body:JSON.stringify({
Stock_ID:null,
Blood_Group:event.target.Blood_Group.value,
Unit_Available:event.target.Unit_Available.value,
})
}
)
.then(res=>res.json())
.then((result)=>
{
    //alert(result);
    this.setState({snackbarOpen:true,snackbarmsg:result});
},
(error)=>{
//alert('Failed')
this.setState({snackbarOpen:true,snackbarmsg:'Failed'});
}
)}
render(){
return(
<div className="container">
<Snackbar 
anchorOrigin={{vertical:'bottom',horizontal:'center'}}
open={this.state.snackbarOpen}
autoHideDuration={3000}
onClose={this.snackbarClose}
message={<span id="message-id">{this.state.snackbarmsg}</span>}
action={[
<IconButton key="close"
    arial-label="Close"
    color="inherit"
    onClick={this.snackbarClose}
>
x
</IconButton>
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
Add Stock
</Modal.Title>
</Modal.Header>
<Modal.Body>
    <Row>
    <Col sm={6}>
    <Form onSubmit={this.handleSubmit}>
    <Form.Group controlId="Stock_ID">
    <Form.Label>Stock ID</Form.Label>
    <Form.Control
        type="text"
        name="Stock_ID"
        requiredplaceholder="Stock_ID"
    />
</Form.Group>
    <Form.Group controlId="Blood_Group">
    <Form.Label>Blood Group</Form.Label>
    <Form.Control
        type="text"
        name="Blood_Group"
        requiredplaceholder="Blood_Group"
    />
</Form.Group>
<Form.Group controlId="Unit_Available">
    <Form.Label>Unit Available</Form.Label>
    <Form.Control
        type="text"
        name="Unit_Available"
        requiredplaceholder="Unit_Available"
    />
</Form.Group>

<Form.Group>
    <Button variant="primary" type="submit">Add Stock</Button>
</Form.Group>
</Form>
</Col>
</Row>

</Modal.Body>
<Modal.Footer>
    <br></br>
<Button variant="danger"onClick={this.props.onHide}>Close</Button>
</Modal.Footer>
</Modal>

</div>
);
}
}