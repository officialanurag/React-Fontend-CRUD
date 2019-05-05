import React from 'react';
import { connect } from 'react-redux';
import actionTypes from './../../constants/action-types';

class EmployeeComponent extends React.Component {
    
    deleteEmployee = e => {
        e.preventDefault();
        this.props.delete(e.target.id);
        this.props.notification('Success! Employee deleted successfully.', 'success');
    }

    editEmployee = e => {
        e.preventDefault();                
        this.props.setData(e.target.id);
    }

    render () {           
        return(            
            <div className="add-emp-wrapper">
                <h3>Employee List</h3><hr />  
                <table className="table table-bordered emp-list-table">
                    <thead>   
                        <tr>                                 
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Employee Address</th>
                            <th>Employee Salary</th>
                            <th>Edit</th>
                            <th>Delete</th>                                    
                        </tr>
                    </thead>
                    <tbody>
                        {                            
                            this.props.employees.map(emp => {
                                return(
                                    <tr key={emp.id}>
                                        <td>{emp.id}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.address}</td>
                                        <td>{emp.sal}</td>
                                        <td><button id={emp.id} onClick={this.props.handleEdit} className="btn btn-info btn-sm">Edit</button></td>
                                        <td><button id={emp.id} onClick={this.deleteEmployee} className="btn btn-danger btn-sm" data-toggle="modal" data-target="#editEmployee">Delete</button></td>
                                    </tr>
                                ); 
                            })                                        
                        }
                    </tbody>
                </table>                
                {
                    (this.props.employees.length === 0) 
                    ?  <div className="no-emp">Oops! No employee found.</div>
                    :  ''
                }                
            </div>                        
        );
    }
}

const mapStateToProps = (state) => {       
    let employees = state.employees;     
    return {state, employees};
}

const mapDispatchToProps = dispatch => {
    return {        
        delete: id => dispatch({
            type: actionTypes.DELETE,
            payload: id
        })
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(EmployeeComponent);