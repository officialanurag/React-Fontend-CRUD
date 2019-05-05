import React from 'react';
import { connect } from 'react-redux';
import validation from './../validation.js';
import actionTypes from './../constants/action-types';

const initialState = {            
    id: "",
    name: "",
    address: "",
    sal: "",
    error: {
        id: [],
        name: [],
        address: [],
        sal: [],
        other: [],
        allClear: false
    }
};

class EmployeeFormComponent extends React.Component {    

    constructor() {
        super();
        this.state = initialState;         
    }

    handleSubmit = e => {
        e.preventDefault(); 
        let {id, name, address, sal} = this.state; 
        let error = this.state.error;        
        error = validation(error, {id, name, address, sal})                       
        this.setState({error: error});
        if(this.state.error.allClear) { 
            this.props.addEmployee({id, name, address, sal});
            this.setState({sal: '', error: {id: [],
                name: [],
                address: [],
                sal: [],
                other: [],
                allClear: false
            }});
            this.props.notification('Success! Employee added successfully.', 'success');
            document.getElementById("form-lele").reset();
        }    
    }

    handleChange = e => {        
        let name = e.target.name;
        let value = e.target.value;                  
        this.setState({[name]: value})         
    }

    render() {                
        return(                                    
            <form className="form add-emp-form" id="form-lele">                
                <div className="form-group">
                    <div><label><b>Employee ID</b></label></div>
                    <div><input className="form-control" name="id" onChange={this.handleChange} /></div>                    
                    <div className={`err ${(this.state.error.id)[1]}`} id="errMsg">{(this.state.error.id)[0]}</div>
                </div>
                <div className="form-group">
                    <div><label><b>Employee Name</b></label></div>
                    <div><input className="form-control" name="name" onChange={this.handleChange} /></div>                    
                    <div className={`err ${(this.state.error.name)[1]}`} id="errMsg">{(this.state.error.name)[0]}</div>
                </div>
                <div className="form-group">
                    <div><label><b>Employee Address</b></label></div>
                    <div><textarea className="form-control" name="address" onChange={this.handleChange}></textarea></div>                    
                    <div className={`err ${(this.state.error.address)[1]}`} id="errMsg">{(this.state.error.address)[0]}</div>
                </div>
                <div className="form-group">
                    <div><label><b>Employee Salary</b></label></div>
                    <div><input className="form-control" name="sal" value={this.state.sal} onChange={this.handleChange} /></div>                    
                    <div className={`err ${(this.state.error.sal)[1]}`} id="errMsg">{(this.state.error.sal)[0]}</div>
                </div>
                <div className="form-group">
                    <button type="button" onClick={this.handleSubmit} className="btn btn-success">Submit</button>
                </div>
            </form>                        
        );
    }
}

const mapStateToProps = state => {
  return {
    employees: state.employees
  }
}

const mapDispatchToProps = dispatch => {    
  return {
    addEmployee: (value) => {        
        if(typeof value !== 'undefined') {
            dispatch({type: actionTypes.ADD, payload: value});
        }        
    }
  }
}

export default connect(    
    mapStateToProps, 
    mapDispatchToProps
)(EmployeeFormComponent);