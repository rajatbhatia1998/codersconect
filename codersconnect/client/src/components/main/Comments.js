import React, { Component } from 'react'
import {Collapse , Button, CardBody, Card} from 'reactstrap'
export default class Comments extends Component {
    constructor(){
        super()
        this.state = {
            isOpen:false
        }
    }

    render() {
        return (
            <div>
                <Button color="link" onClick={()=>{
                    this.setState({isOpen:!this.state.isOpen})
                }} style={{ marginBottom: '1rem',marginTop:"1px" }}>Show Comments({this.props.data.length})</Button>

                <Collapse isOpen={this.state.isOpen}>
                <Card>

                {this.props.data.length > 0 ? this.props.data.map(comment=>{
                    return  <CardBody>
                            <img src={comment.avatar} style={{width:"20px",height:"20px",marginRight:"10px",borderRadius:"50%"}}></img>
                            <span style={{marginRight:"15px",fontWeight:"bold"}}>{comment.name}</span>
                            <h6 style = {{width:"100%",border:"1px solid gray",padding:"5px",marginTop:"9px"}}>{comment.text}</h6>

                            <span style = {{width:"100%",padding:"1px",color:"gray",textAlign:"right"}}>{comment.date.slice(0,10)} at {comment.date.slice(12,16)}</span>
                            </CardBody>
                }):
                    <h6>No Comments Available</h6>
                }
                    
                </Card>
                </Collapse>
            </div>
        )
    }
}
