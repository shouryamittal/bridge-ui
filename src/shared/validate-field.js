const utilObj = {
    emailRegex : /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9._-]+).([a-zA-z]{2,3})$/,
    passwordRegex : /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/
}

const validateFormFields = (name, value, errors) => {
    switch(name){
        case 'username':{
            errors.username = utilObj.emailRegex.test(value) ? '': 'Please Enter a valid email';
            break;
        }
        case 'name': {
            errors.name = value.length > 50 ? 'Name must be atmost 50 Characters long': '';
            break;
        }

        case 'email': {
            errors.email = utilObj.emailRegex.test(value) ? '': 'Please Enter a valid email'
            break; 
        }
        
        case 'password' :{
            errors.password = (value.length >= 6 && value.length <= 10) && (utilObj.passwordRegex.test(value)) ? '': 'Invalid password Format'
            break;
        }   

        case 'confirm_password':{
            errors.confirm_password = 
            (value.length >= 6 && value.length <= 10) && (utilObj.passwordRegex.test(value)) ? '': 'Invalid Password Format'
            break;
        }
        default:
            break;
            
    }
    return errors;
}

export default validateFormFields;