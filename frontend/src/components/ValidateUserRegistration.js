export default function ValidateUserRegistration(title, userType ,firstName , lastName ,  email, phone , password , confirmPassword){

    const regiValidationError = {}

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const phonePattern = /^[0-9]{10}$/;


    if(title === ""){
        regiValidationError.title = "Title is Required !"
    }

    if(userType === ""){
        regiValidationError.userType = "User Type is Required !"
    }

    if(firstName === ""){
        regiValidationError.firstName = "Your First Name is Required !"
    }

    if(lastName === ""){
        regiValidationError.lastName = "Your Last Name is Required !"
    }

    if(email === ""){
        regiValidationError.email = "Email is Required !"
    } else if(!emailPattern.test(email)){
        regiValidationError.email = "Email is not Valid !"
    }

    if(phone === ""){
        regiValidationError.phone = "Phone Number is Required !"
    } else if(!phonePattern.test(phone)){
        regiValidationError.phone = "Phone Number is not Valid !"
    }

    if(password === ""){
        regiValidationError.password = "Password is Required !"
    } else if(!passwordPattern.test(password)){
        regiValidationError.password = "Password is not Valid ! , Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
    }

    if(confirmPassword === ""){
        regiValidationError.confirmPassword = "Confirm Password is Required !"
    } else if (confirmPassword !== password){
        regiValidationError.confirmPassword = "Passwords do not match. Please try again"
    }

    return regiValidationError ;

}