import React, { Component, Fragment } from 'react';
import './App.css';
import EmployeeFormComponent from './components/EmployeeFormComponent';
import EmployeeComponent from './components/AllEmployeeComponent/EmployeeComponent' ;
import EditEmployeeComponent from './components/AllEmployeeComponent/EditEmployeeComponent' ;

class App extends Component {  
    constructor() {
        super();
        this.state = {
            doEdit: false,
            iftrue: {
                colSizeAddEmployee: 'col-md-3',
                colSizeListEmployee: 'col-md-6',
                colSizeEditEmployee: 'col-md-3'    
            },
            iffalse:{
                colSizeAddEmployee: 'col-md-4',
                colSizeListEmployee: 'col-md-8',            
            },
            empIdToUpdate: '',
            notify: false,
            notification: {}      
        };
        
        this.handleEdit = this.handleEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
    }

    handleEdit(e) {        
        this.setState({empIdToUpdate: e.target.id});
        this.setState({doEdit: true});
    }

    cancelEdit() {
        this.setState({doEdit: false});
    }

    showNotification(message, typeN) {        
        this.setState({
            notify: true,
            notification:{
                msg: message,
                selectedType: typeN,
                type: {
                    success: 'notif-body-green',
                    info: 'notif-body-pink'
                } 
            }
        }) 
        
        setTimeout(() => this.setState({notify: false}), 5000);
    }

    closeNotification() {
        this.setState({notify: false});
    }

    render() {    
        return (
            <Fragment>
                <div>
                    <div className="container emp-heading-cont">
                        <div>EMPLOYEE MANAGEMENT</div>
                        <p>Employee Resource Management Portal</p>
                    </div>                    
                    <div className="container">
                        { this.state.notify ? 
                            <div className={`notification ${this.state.notification.type[this.state.notification.selectedType]}`}>
                                <div className="row">
                                    <div className="col-md-11">
                                        {this.state.notification.msg}  
                                    </div>    
                                    <div className="col-md-1">
                                        <div className={`notif-close ${this.state.notification.type[this.state.notification.selectedType]}`} onClick={this.closeNotification}>x</div>
                                    </div>
                                </div>                                
                            </div> : ''
                        }
                    </div>                    
                    <div className="container emp-form-container">
                        <div className="row">
                            <div className={`${this.state[`if${this.state.doEdit}`].colSizeAddEmployee}`}>
                                <div className="add-emp-wrapper">
                                    <h3>Add Employee</h3><hr /> 
                                    <EmployeeFormComponent notification={this.showNotification} />
                                </div>
                            </div>
                            {
                                this.state.doEdit 
                                ?                         
                                    <Fragment>                            
                                        <div className={`${this.state[`if${this.state.doEdit}`].colSizeListEmployee}`}>
                                            <EmployeeComponent notification={this.showNotification} handleEdit={this.handleEdit} /> 
                                        </div>
                                        <div className={`${this.state[`if${this.state.doEdit}`].colSizeEditEmployee}`}>    
                                            <div className="add-emp-wrapper">
                                                <div className="row">
                                                    <div className="col-md-9"><h3>Edit Employee</h3></div>
                                                    <div className="col-md-3"><div className="cancelBtn" onClick={this.cancelEdit}>Close</div></div>
                                                </div>
                                                <hr /> 
                                                <EditEmployeeComponent notification={this.showNotification} closeEdit={this.cancelEdit} empId={this.state.empIdToUpdate} />
                                            </div>                                
                                        </div>
                                    </Fragment>
                                :                        
                                    <div className={`${this.state[`if${this.state.doEdit}`].colSizeListEmployee}`}>
                                        <EmployeeComponent notification={this.showNotification} handleEdit={this.handleEdit} />
                                    </div>
                            }
                        </div>
                    </div>
                </div>           
            </Fragment>  
        );
    }
}

export default App;