var current_user = sessionStorage.getItem("user");




//ye play aur pause button ka coding hai.
var video = document.getElementById("video_player");
var play_btn = document.getElementById("play_btn");
play_btn.onclick = function()
{
    if(play_btn.className == "fa-solid fa-play"){
        video.play();
        play_btn.className = "fa-solid fa-pause";
    }
    else if(play_btn.className == "fa-solid fa-pause")
    {
        video.pause();
        play_btn.className = "fa-solid fa-play";

    }
}



//yaha se progress bar ka coding start hota hai.
video.ontimeupdate = function()
{
    var t_duration = this.duration;
    var c_duration = this.currentTime;
    var p_bar = document.getElementById("progress_bar");
    var v_timing = document.getElementById("v_timing");
    // v_timing.innerHTML = parseInt(c_duration*100/t_duration)+" / "+t_duration; //parseint se persent ke vad ki value nahi return kart ha,
    var sec = c_duration - parseInt(c_duration/60)*60; //second ke liye hai.
    var t_sec = t_duration - parseInt(t_duration/60)*60
    v_timing.innerHTML = parseInt(c_duration/60) +":"+ parseInt(sec)+" / "+parseInt(t_duration/60) + ":"+parseInt(t_sec); // minutes ke liye
    var slide_per = c_duration*100/t_duration;
    p_bar.style.width = slide_per+"%";

    if(c_duration == t_duration)
    {
        play_btn.className = "fa-solid fa-play";

    }


    
}


//start open and close add video coding from here
var open_box_btn = document.getElementById("open_video_box_btn");
open_video_box_btn.onclick = function()
{
    var add_video_box = document.getElementById("add_video_box");
    if(open_video_box_btn.className == "fas fa-plus-circle")
    {
        add_video_box.style.display = "block";
        open_video_box_btn.className = "fas fa-times-circle";
    }
    else if(open_video_box_btn.className == "fas fa-times-circle")
    {
        add_video_box.style.display = "none";
        open_video_box_btn.className = "fas fa-plus-circle";


    }
}



//add video in local storage coding from here
var add_video_btn = document.getElementById("add_video_btn");
add_video_btn.onclick = function()
{
    var v_name = document.getElementById("video_name");
    var v_link = document.getElementById("video_link");
    if(v_name.value != "" & v_link != "")
    {
        var v_obj = {name:v_name.value, link:v_link.value};
        var v_txt = JSON.stringify(v_obj);
        localStorage.setItem(current_user+"video"+v_name.value,v_txt);
    }
}


//fetch call video from Local storage ka coding
function load_video()
{
    var i;
    for(i=0; i<localStorage.length; i++)
    {
       var all_keys = localStorage.key(i);
       if(all_keys.match(current_user+"video"))
        {
            var v_data = localStorage.getItem(all_keys);
            var video_obj = JSON.parse(v_data);
            
            var div = document.createElement("DIV");
            div.setAttribute("id","main_video_box");
            var p = document.createElement("P");
            p.setAttribute("id","playlist_video_name");
            p.className = "p_v_name";
            p.innerHTML = video_obj.name;

            var play_btn = document.createElement("BUTTON");
            play_btn.setAttribute("type","button");
            play_btn.setAttribute("id","video_play_btn");
            play_btn.setAttribute("url",video_obj.link);
            play_btn.className = "v_play_btn";
            play_btn.innerHTML = "Play";

            var del_btn = document.createElement("BUTTON");
            del_btn.setAttribute("type","button");
            del_btn.setAttribute("id","video_delete_btn");
            del_btn.innerHTML = "Delete";
            del_btn.className = "delete_btn";

            div.appendChild(p);
            div.appendChild(play_btn);
            div.appendChild(del_btn);

            var all_v = document.getElementById("bottom");
            all_v.appendChild(div);

        }
    }
}
load_video()    //calling


//abhi to play button kam nahi kar raha hai par ham asie hi kar rahe hai aur ye video number 25 me mil jayega.
//play button kar click karne par video play ho jane ke liye coding.
function play_video()
{
    var all_v_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0; i<all_v_play_btn.length; i++)
    {
        all_v_play_btn[i].onclick = function()
        {
            clear();
            var v_url = this.getAttribute("url");
            var src_tag = document.getElementById("video_src");
            src_tag.setAttribute("src","v_url");
            video.load();
            video.play();
            play_btn.className = "fa-solid fa-pause";
            this.innerHTML = "Playing...";
        
            
            

        }
    }
}
play_video();   //calling

function clear()
{
    var all_v_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0; i<all_v_play_btn.length; i++)
    {
        all_v_play_btn[i].innerHTML = "Play";
    }
}

//next button coding start from here
function next_button()
{
    var next_btn = document.getElementById("right_btn");
    next_btn.onclick = function()
    {
        var all_play_btn = document.getElementsByClassName("v_play_btn");
        // alert(all_play_btn.length);
        var i;
        for(i=0; i<all_play_btn.length; i++)
        {
            if(all_play_btn[i].innerHTML == "Playing...")
            {
                var next_element = all_play_btn[i].parentElement.nextSibling;
                var next_play_button = next_element.getElementsByClassName("v_play_btn")[0];
                next_play_button.click();
                return false;

            }

        }
    }
}
next_button();


//previous button coding start from here
function previous_button()
{
    var previous_btn = document.getElementById("left_btn");
    previous_btn.onclick = function()
    {
        var all_play_btn = document.getElementsByClassName("v_play_btn");
        // alert(all_play_btn.length);
        var i;
        for(i=0; i<all_play_btn.length; i++)
        {
            if(all_play_btn[i].innerHTML == "Playing...")
            {
                var previous_element = all_play_btn[i].parentElement.previousSibling;
                var previous_play_button = previous_element.getElementsByClassName("v_play_btn")[0];
                previous_play_button.click();
                return false;

            }

        }
    }
}
previous_button();

//Deleteing button coding start from here
function delete_button()
{
    var all_del_btn = document.getElementsByClassName("delete_btn");
    var i;
    for(i=0; i<all_del_btn.length; i++)
    {
        all_del_btn[i].onclick = function()
        {
            var parent = this.parentElement;
            var video_name = parent.getElementsByTagName("P")[0].innerHTML;
            localStorage.removeItem(current_user+"video"+video_name);
            parent.className = "animate__animated animate__bounceOut";
            setTimeout(function()  {
                parent.remove();
            }, 1000);

        }
    }
}
delete_button();


//volume coding start from here
function volume()
{
    var vol_icon = document.getElementById("volume");
    vol_icon.onclick = function()
    {
        var vol_control = document.getElementById("vol_control");
        if(vol_control.style.display == "none")
        {
            vol_control.style.display = "block";
            vol_control.oninput = function()
            {
                video.volume = this.value;
            }
        }
        else
        {
            vol_control.style.display = "none";
        }

    }

}
volume();


//forward and backward coding of progress bar
// video progress bar ko control karne ke liye
// kitna second minutes ya second par ka apka video chahiye
var p_box = document.getElementById("progress_box");
p_box.onclick = function(event)
{
    
    //alert(this.offsetWidth); // is se us progress bar ka full width batata hai 
    //alert(event.offsetX);   //offsetX iska width batata jaha jaha aap click karte hai, offsetY lagane par iska height batata hai. 

    var per = event.offsetX/this.offsetWidth;
    video.currentTime = per*video.duration;
}


//full screen coding start from here
var full = document.getElementById("full_screen");
full.onclick = function()
{
    video.requestFullscreen();
}



//video speed control coding start from here
// video.playbackRate = 5;
var speed_icon = document.getElementById("speed_icon");
speed_icon.onclick = function()
{
    var speed_slider = document.getElementById("speed_control");
    if(speed_slider.style.display == "none")
    {
        speed_slider.style.display = "block";
        speed_slider.oninput = function()
        {
            video.playbackRate = this.value;
        }
    }
    else if(speed_slider.style.display == "block")
    {
        speed_slider.style.display = "none";

    }

}

//search video coding start from here
var search_box = document.getElementById("search");
search_box.oninput = function()
{
    var all_v_name = document.getElementsByClassName("p_v_name");
    var i;
    for(i=0; i<all_v_name.length; i++)
    {
        if(all_v_name[i].innerHTML.toUpperCase().match(search_box.value.toUpperCase()))
        {
            all_v_name[i].parentElement.style.display = "block";
        }
        else
        {
            all_v_name[i].parentElement.style.display = "none";

        }
    }
}