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

    let met = document.getElementById('met').value.trim();
    if (met === "select") {
        document.getElementById("err-met").style.display = "block";
        isValid = false;
    }

    let email = document.getElementById('email').value.trim();
    if (email.indexOf("@") === -1 && email) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }
    let linkedin = document.getElementById('linkedin').value.trim();
    if (!linkedin.includes("https://linkedin.com/in/")  && linkedin) {
        document.getElementById("err-linkedin").style.display = "block";
        isValid = false;
    }

    let checkBox = document.getElementById('added');
    if (checkBox.checked && !email) {
        document.getElementById("err-email2").style.display = "block";
        document.getElementById("bottom").style.display = "block";
        isValid = false;
    }
    
    

    return isValid;
}
let checkBox = document.getElementById('added');
checkBox.addEventListener('change', () =>{
    if(checkBox.checked){
        document.getElementById('bottom').style.display = "block";
    } else{
        document.getElementById('bottom').style.display = "none";
    }
    
});
let bottom = document.getElementById('bottom');
document.getElementById('met').addEventListener("change", ()=>{
    let other = document.getElementById("second-section-right");
    if(document.getElementById('met').value.trim() === "other"){
        other.style.display = "block";
    } else{
        other.style.display = "none";
    }
});

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}