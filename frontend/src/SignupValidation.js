function Validation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    if (!values.name.trim()) {
        errors.name = "Name should not be empty";
    } else {
        errors.name = "";
    }

    if (!values.email.trim()) {
        errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Invalid email format";
    } else {
        errors.email = "";
    }

    if (!values.password.trim()) {
        errors.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
        errors.password = "Password should contain at least 8 characters with at least one uppercase letter, one lowercase letter, and one number";
    } else {
        errors.password = "";
    }

    return errors;
}

export default Validation;
