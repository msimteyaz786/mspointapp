// start signup coding from here.
var signup_frm = document.getElementById("signup_frm");
signup_frm.onsubmit = function()
{
    var user =  btoa(document.getElementById("username").value);
    var email = btoa(document.getElementById("email").value);
    var phone = btoa(document.getAnimations("phone").value);
    var pass =  btoa(document.getElementById("password").value);

    var user_object_data = {username:user, email:email, phone:phone, password:pass}
    var user_text_data = JSON.stringify(user_object_data);

    if(user != "" &&  email != "" && phone != "" && pass != "")
        {
            localStorage.setItem(email, user_text_data);
            var signup_btn = document.getElementById("signup_btn");
            signup_btn.style.background = "#14b129";
            signup_btn.innerHTML = " <i class='fa fa-check-circle' aria-hidden='true'></i> Signup Successful !"
            setTimeout(function(){
                signup_btn.style.background = "linear-gradient(to right, #E100FF, #7F00FF)"
                signup_btn.innerHTML = "Sign up";
                signup_frm.reset();         //submit karne par reset nahi ho raha hai aur video number 3 and timing 19 minutes.
            },3000);
            return false;
        }

}
// end signup coding.


// email ko call kiya ja raha hai ek function ke dwara start email validation .
var email_input = document.getElementById("email")
email_input.onchange = function()
{   
    // btoa(jflajglajgl, se hamara password secure rahta hai q ki ye ek estirng me perfomr karta hai)
    var email = btoa(document.getElementById("email").value);
    var warning = document.getElementById("email_notice");
    var signup_btn = document.getElementById("signup_btn");
    if(localStorage.getItem(email) != null)
        {
            warning.style.display = "block";
            email_input.style.borderBottomColor = "red";
            signup_btn.disabled = true;
            signup_btn.style.background = "#ccc";
            email_input.onclick = function()
            {
                email_input.value = "";
                email_input.style.borderBottomColor = "#ccc";
                warning.style.display = "none";
                signup_btn.disabled = false;
                signup_btn.style.background = "linear-gradient(to right, #E100FF, #7F00FF)"
            }
        }
}
// end email validation coding



// start loging coding from 
var login_frm = document.getElementById("login_frm");

login_frm.onsubmit = function()
{
    var email = document.getElementById("login_email");
    var password = document.getElementById("login_password");
    var login_email_war = document.getElementById("login_email_warning");
    var login_password_war = document.getElementById("login_password_warning");

    if(localStorage.getItem(btoa(email.value)) == null)
        {
            login_email_war.style.display = "block";
            email.style.borderBottomColor = "red";

            email.onclick = function()
            {
                email.value = "";
                login_email_war.style.display = "none";
                email.style.borderBottomColor = "#ccc"
            }
        }
    else
        {
            var text_data = localStorage.getItem(btoa(email.value));
            var obj_data = JSON.parse(text_data);
            var correct_email = obj_data.email;
            var correct_password = obj_data.password;

            if(btoa(email.value) == correct_email)
                {
                    if(btoa(password.value) == correct_password)
                        {
                            // alert("Login Success");
                            sessionStorage.setItem("user",btoa(email.value));
                            window.location.replace("profile/profile.html");
                        }
                    else
                        {
                            login_password_war.style.display = "block";
                            password.style.borderBottomColor = "red";

                             password.onclick = function()
                            {
                                password.value = "";
                                login_password_war.style.display = "none";
                                password.style.borderBottomColor = "#ccc"
                            }
                        }
                }
        }
return false;
}

// end loging coding.



