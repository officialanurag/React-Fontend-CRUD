import React from 'react';
import { connect } from 'react-redux';
import validation from './../../validation.js';
import actionTypes from './../../constants/action-types';

const intialState = {            
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

class EditEmployeeComponent extends React.Component {    

    constructor() {
        super();
        this.state = intialState;                         
    }

    handleSubmit = e => {
        e.preventDefault(); 
        let {id, name, address, sal} = this.state;         
        let error = this.state.error;        
        error = validation(error, {id, name, address, sal})                       
        this.setState({error: error});
        if(this.state.error.allClear) { 
            this.props.editEmployee(this.props.empId, {id, name, address, sal});
            this.setState({id: '', name: '', address: '', sal: '', error: {id: [],
                name: [],
                address: [],
                sal: [],
                other: [],
                allClear: false
            }});
            this.props.notification('Success! Employee updated successfully.', 'success');
            this.props.closeEdit();
        }        
    }

    handleChange = e => {        
        let name = e.target.name;
        let value = e.target.value;                  
        this.setState({[name]: value})         
    }

    componentDidMount() {
        let empData = (this.props.employees.filter(emp => emp.id === this.props.empId))[0];
        this.setState({
            id: empData.id,
            name: empData.name,
            address: empData.address,
            sal: empData.sal
        })    
    }

    render() {                                  
        return(                                    
            <form className="form add-emp-form" id="form-lele">                
                <div className="form-group">
                    <div><label><b>Employee ID</b></label></div>
                    <div><input className="form-control" name="id" value={this.state.id} onChange={this.handleChange} /></div>                    
                    <div className={`err ${(this.state.error.id)[1]}`} id="errMsg">{(this.state.error.id)[0]}</div>
                </div>
                <div className="form-group">
                    <div><label><b>Employee Name</b></label></div>
                    <div><input className="form-control" name="name" value={this.state.name} onChange={this.handleChange} /></div>                    
                    <div className={`err ${(this.state.error.name)[1]}`}  id="errMsg">{(this.state.error.name)[0]}</div>
                </div>
                <div className="form-group">
                    <div><label><b>Employee Address</b></label></div>
                    <div><textarea className="form-control" name="address" onChange={this.handleChange} value={this.state.address}></textarea></div>                    
                    <div className={`err ${(this.state.error.address)[1]}`} id="errMsg">{(this.state.error.address)[0]}</div>
                </div>
                <div className="form-group">
                    <div><label><b>Employee Salary</b></label></div>
                    <div><input className="form-control" name="sal" value={this.state.sal} onChange={this.handleChange} /></div>                    
                    <div className={`err ${(this.state.error.sal)[1]}`} id="errMsg">{(this.state.error.sal)[0]}</div>
                </div>
                <div className="form-group">
                    <button type="button" onClick={this.handleSubmit} className="btn btn-success">Update</button>                    
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
    editEmployee: (empId, empData) => {        
        if(typeof empData !== 'undefined') {
            dispatch({type: actionTypes.EDIT, payload: {empId, empData}});
        }        
    }
  }
}

export default connect(    
    mapStateToProps, 
    mapDispatchToProps
)(EditEmployeeComponent);