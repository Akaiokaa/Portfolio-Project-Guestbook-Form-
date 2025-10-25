document.getElementById('guest-form').onsubmit = () => {

    clearErrors();


    let isValid = true;


    let fname = document.getElementById('fname').value.trim();
    if (!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }


    let lname = document.getElementById('lname').value.trim();
    if (!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}