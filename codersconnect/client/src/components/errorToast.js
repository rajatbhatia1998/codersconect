import React from 'react'
import {Toast} from 'react-bootstrap'
import {Fade} from 'react-reveal' 
import {connect} from 'react-redux'
 class ErrorToast extends React.Component {

    constructor(){
        super()
        this.state = {
            show:true,
            errors: [] 
        }
      
    }

    closeHandler=()=>{
        this.props.resetErrors()
        this.setState({show:false})
    }
    render(){
    return (
        <Fade right>
        <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'fixed',
          bottom: 300,
            right: 5,
            zIndex:1111
        }}
      >
        <div>
           
          <Toast onClose={this.closeHandler} show={this.state.show}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <strong className="mr-auto">Errors       </strong>
              <small>Just now</small>
            </Toast.Header>
            {
                
                Object.values(this.props.errors).forEach(value=>{
                    this.state.errors.push(value)
                })
            }
            {this.state.errors.map(error=>{
                return  <Toast.Body>{error} </Toast.Body>
            })}
            
          </Toast>
        </div>
      </div>
      </Fade>
    )};


}



const mapDispatchToProps = (dispatch) =>{
    return {
        resetErrors:() => dispatch({type:"RESET_ERRORS"})
    }
}
export default connect(null,mapDispatchToProps)(ErrorToast)
