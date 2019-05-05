import employeeAction from './../actions/employeeAction';
import actionTypes from './../constants/action-types';

const initialState = {
    employees : [
        {
            "id": "101",
            "name": "Ravic",
            "address": "Sector-60, Noida",
            "sal": 60000
        }
    ]
}

const employeeReducer = (state = initialState, action) => {       
    let newState = {...state};   

    switch(action.type) {
        case actionTypes.ADD:                                
            newState.employees = employeeAction.add(action.payload, newState.employees);            
        break;

        case actionTypes.EDIT:                     
            newState.employees = employeeAction.edit(newState.employees, action.payload.empId, action.payload.empData); 
        break;

        case actionTypes.DELETE: 
            newState.employees = employeeAction.del(newState.employees, action.payload);            
        break;
    }

    return newState;
}

export default employeeReducer;