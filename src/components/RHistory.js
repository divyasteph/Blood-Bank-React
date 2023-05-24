import React, {Component} from "react";
import { Table } from "react-bootstrap";
import UserNavbar from "./Shared/Navbar/UserNavbar";

export class RHistory extends Component{
    
    constructor(props){
        super(props);
        this.state ={stck:[], addModalShow: false, editModalShow:false}
    }

    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
        fetch("https://localhost:44327/api/Receiver")
        .then(response=>response.json())
        .then(data=>{
            this.setState({stck:data})
        }
        );
    } 
    componentDidUpdate(){
        this.refreshList();
    }
    render(){
        const{stck,did,dname,blood,dunit,dhos,dphone,dstatus} = this.state;   
        let addModalClose = () => this.setState({addModalShow:false});     
        let editModalClose = () => this.setState({editModalShow:false});     
        return(  
        
        <div>  
          <UserNavbar></UserNavbar>
        <h2>Receiver History</h2>
        <Table className="mt-4" striped boardered hover size="sm">
            
            <thead>
                <tr>
                <th>Receiver ID</th>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Units Received</th>
                <th>Hospital</th>
                <th>Phone</th>
                <th>Status</th>
                
                </tr>
            </thead>
            <tbody>
                {stck.map(stk=>
                    <tr key ={stk.Receiver_ID} >
                    <td>{stk.Receiver_ID}</td>
                    <td>{stk.Name}</td>
                    <td>{stk.BloodGroup}</td>
                    <td>{stk.Unit}</td>
                    <td>{stk.Hospital}</td>
                    <td>{stk.Phone}</td>
                    <td>{stk.Status}</td>
                    
                    </tr>)
                }
            </tbody>
        </Table>
        
        </div> 
        )
    }
}