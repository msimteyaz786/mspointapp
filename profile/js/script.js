// window.onload = function(){
    if(sessionStorage.getItem("user") == null)
    {
       window.location.replace("../index.html");
    }
    else
    {
        //log out coding
        var logout = document.getElementById("logout");
        logout.onclick = function()
        {
            sessionStorage.clear(); //is se logout ho jata hai par user ko pata nahi chal pata hai. to iske liye
            var logout_text = document.getElementById("logout_text");
            logout_text.innerHTML = "Please Wait...";
            setTimeout(function(){window.location = "../index.html";},2000); // 2 second ke baad redirect hoga.
        }

        //profile name coding
        var user_email = sessionStorage.getItem("user");
        var json_text = localStorage.getItem(user_email);
        var obj_data =  JSON.parse(json_text);
        //alert(atob(obj_data.username));
        var profile_name = document.getElementById("profile_name");
        profile_name.innerHTML = atob(obj_data.username);
        document.getElementById("profile_username").innerHTML = atob(obj_data.username); //ye profile ke ke pad ka name hai aur atob lagene se decoded name me aa jayega.

        //profile picture coding
        var img_url = localStorage.getItem(user_email+"image");
        var profile_picture = document.getElementById("profile_picture");
        profile_picture.style.backgroundImage = "url("+img_url+")";
        profile_picture.style.backgroundSize = "cover";
        profile_picture.style.backgroundPosition = "center";


        if(localStorage.getItem(user_email+"image") != null )
        {
            var page_cover = document.getElementById("container");
            page_cover.style.display = "none";
        }

        //profile picture upload coding
        var profile_upload = document.getElementById("profile_upload");
        profile_upload.onchange = function()
        {
            var reader = new FileReader();
            reader.readAsDataURL(profile_upload.files[0]);
            reader.onload = function()
            {
                var filename = reader.result;
                var profile_icon = document.getElementById("profile_icon");
                var profile_pic = document.getElementById("profile_pic");
                profile_pic.style.backgroundImage = "url("+filename+")"; //double cotation ko nahi rakhne par photo to aayega par show nahi karega.
                profile_pic.style.backgroundSize = "cover";
                profile_pic.style.backgroundPosition = "center";
                profile_icon.style.display = "none";
                var next_btn = document.getElementById("next");
                next_btn.style.display = "block";

                next_btn.onclick = function()
                {
                    localStorage.setItem(user_email+"image",filename);
                    var page_cover = document.getElementById("container");
                    page_cover.style.display = "none";
                    window.location = location.href;   //direct photo aa jata bina referesh kiyehue
                }

            }
        }
       
    }
// }