/**
 * @description 
 * 'add' function will add new employee.
 * 
 * @param object empData 
 * @param array parentData 
 * 
 * @return array
 */

const add = (empData, parentData) => {
    parentData.push(empData);
    return parentData;
}

/**
 * @description
 * 'edit' will update employee details in array
 * 
 * @param array empArray 
 * @param number empId 
 * @param object empDataToUpdate 
 * 
 * @return array
 */

const edit = (empArray, empId, empDataToUpdate) => {      
    let index = empArray.findIndex(emp => emp.id === empId);  
    empArray[index] = empDataToUpdate;
    return empArray;
}

/**
 * @description
 * 'del' function will remove employee from array
 * 
 * @param array empDataArray 
 * @param number empId 
 * 
 * @return array
 */

const del = (empDataArray, empId) => {
    return empDataArray.filter(emp => {
        return emp.id !== empId
    })    
}

export default {add, edit, del};
