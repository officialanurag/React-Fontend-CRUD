const func = {    
    checkSalary: (salary) => (salary > 0 && salary <= 70000) ? true : false,
    checklength: (text, charSize) => text.length <= charSize ? true : false,
    isEmpty: data => data.length === 0 ? true : false,    
    notEmptyObjectValue: (obj) => (obj.id.length !== 0 && obj.name.length !== 0 && obj.address.length !== 0 &&  obj.sal.length)? true : false,
}

const __init_validation = (errContainer, empData) => {        
    let isIdNotaNumber = !func.isEmpty(empData.id) ? !isNaN(empData.id): false; 
    let isNameLimited = !func.isEmpty(empData.name) ? func.checklength(empData.name, 20) : false;
    let isAddressLimited = !func.isEmpty(empData.address) ? func.checklength(empData.address, 50) : false;
    let isSalaryLimited = !func.isEmpty(empData.sal) ? (!isNaN(empData.sal) ? func.checkSalary(empData.sal) : false) : false;        
    
    errContainer.id = [!isIdNotaNumber ? 'Only numbers are allowed | Required': 'Correct', !isIdNotaNumber ? 'red': 'green'];
    errContainer.name = [isNameLimited ? 'Correct' : 'Character length 20 is allowed | Required', isNameLimited ? 'green' : 'red']
    errContainer.address = [isAddressLimited ? 'Correct' : 'Character length 50 is allowed | Required', isAddressLimited ? 'green' : 'red']
    errContainer.sal = [isSalaryLimited ? 'Correct' : 'Salary should greater than 0 and less than 70000. Only numbers are allowed | Required', isSalaryLimited ? 'green' : 'red']    
    errContainer.allClear = (isIdNotaNumber && isNameLimited && isAddressLimited && isSalaryLimited) ? true : false;

    return errContainer;
}

const doValidation = (errContainer, empData) => {
    return __init_validation(errContainer, empData);
}

export default doValidation;