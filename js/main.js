var database = firebase.database();
var name=localStorage.getItem("name") ;
var NAME = [];
var chat=localStorage.getItem("chat");
var CHAT = [];
var counter ;
var gender=localStorage.getItem("gender");
var GENDER = [];
var date;
var DATE = [];
var Id=0 ;
var USERNAME=[];
var PASSWORD=[];
var LOGINGENDER=[];
var password=localStorage.getItem("password");
var interval=setInterval(myMethod, 10000);
myMethod();
if(gender==null || name==null || name==undefined)
{
}
else {
  var navbar = document.getElementById('navbar');
  navbar.innerHTML = "<div class='wall-sm' style='margin-top:-12px;'><h2>User : <small>"+ name.charAt(0).toUpperCase()+name.slice(1).toLowerCase()+"</small></h2></div>";
  document.getElementById('btnb').style.display="inline";
  document.getElementById('btnc').style.display="inline";
  document.getElementById('btna').style.display="none";
  document.getElementById('btnd').style.display="none";
}
function newUser()
  {
    var male =document.getElementById('male');
    var female = document.getElementById('female');
    var other = document.getElementById('other');
    var getname = document.getElementById('name');
    password = document.getElementById('password');
    localStorage.setItem("password",password.value);
    name = getname.value.toLowerCase();
    localStorage.setItem("name",name);
  if (name!='' && password!='') {
    if(male.checked==true)
    {
      gender = male.value;
      localStorage.setItem("gender",gender);
  }
  else if(female.checked==true)
  {
    gender = female.value;
    localStorage.setItem("gender",gender);
}
else
{
  gender = other.value;
  localStorage.setItem("gender",gender);
}
}
redirect();
}
function addChat(){
  var inputText = document.getElementById('input');
    if (inputText.value=='') {
      alert('Please Enter Your Message');
    }
    else{
      chat = inputText.value.charAt(0).toUpperCase()+inputText.value.slice(1).toLowerCase();
      date = Date();
}
  save();
  inputText.value = '';
}
function myMethod(){
  database.ref('chatapplicationdata/').once('value').then(function(snapshot) {
    for(var i in snapshot.val()){
      NAME[Id]= snapshot.val()[i].name;
      CHAT[Id]= snapshot.val()[i].chat;
      GENDER[Id]= snapshot.val()[i].gender;
      DATE[Id]= snapshot.val()[i].date;
      Id++;
}});
render();
}
function render()
{
  var container = document.getElementById('container');
  container.innerHTML = '';
  for(var j=Id-1; j>=0 ; j--)
  {
  if(GENDER[j]=="female")
  {container.innerHTML += "<div id="+j+" style='border-bottom:3px inset rgba(11,11,11,0.1);padding:10px;' onclick='showitem(this.id)'><div class='media'><div class='media-left'><img src='img/2.png' class='media-object' style='width:60px;padding-bottom:30px;'></div><div class='media-body'><h4 class='media-heading'>"+NAME[j].charAt(0).toUpperCase()+NAME[j].slice(1).toLowerCase()+"</h4><p>"+CHAT[j]+"</p></div>"+DATE[j]+"</div>";}
  else
  {container.innerHTML += "<div id="+j+" style='border-bottom:3px inset rgba(11,11,11,0.1);padding:10px;' onclick='showitem(this.id)'><div class='media'><div class='media-left'><img src='img/1.png' class='media-object' style='width:60px;padding-bottom:30px;'></div><div class='media-body'><h4 class='media-heading'>"+NAME[j].charAt(0).toUpperCase()+NAME[j].slice(1).toLowerCase()+"</h4><p>"+CHAT[j]+"</p></div>"+DATE[j]+"</div>";}
  }
  Id=0;
}
function save()
{
database.ref('chatapplicationdata/').push({
  chat,
  name,
  gender,
  password,
  date
  });
  myMethod();
  redirect();
}
function modala()
{
  document.getElementById('formsubmit').style.visibility="visible";
  document.getElementById('container').style.display="none";
  document.getElementById('formsubmit').style.backgroundColor="rgba(200,200,200,1)";
  document.getElementById('formsubmit').innerHTML='<h4 class="modal-title">Please Create Your Account Here !</h4><form><input type="text" placeholder="Username" id="name" autofocus required><br><input type="password" placeholder="Password" id="password" required><br><h4>Gender </h4><input type="radio" name="gender" value="male" id="male" checked > Male<br><input type="radio" name="gender" value="female" id="female"> Female<br><input type="radio" name="gender" value="other" id="other"> Other</div><div><button type="button" class="btn btn-default" data-dismiss="modal" onclick="newUser()">Add</button><button onclick="redirect()" class="btn btn-info">Back</button></form></div>';
}
function modalb()
{
  document.getElementById('formsubmit').style.visibility="visible";
  document.getElementById('container').style.display="none";
  document.getElementById('formsubmit').innerHTML='<h4 class="modal-title">Enter Your Message Here !</h4><form><textarea name="name" rows="6" cols="30" id="input" autofocus></textarea><button type="button" class="btn btn-default" data-dismiss="modal" onclick="addChat()">Add</button><br><br><button onclick="redirect()" class="btn btn-info">Back</button></form>';
}
function redirect()
{
  window.location="index.html";
}
function logout()
{
  var logout= confirm("Are You Sure You Wanna Logout ? ");
  if ( logout== true) {
    localStorage.clear();
    redirect();
} else {
    redirect();
}
}
function login()
{
  document.getElementById('formsubmit').style.visibility="visible";
  document.getElementById('container').style.display="none";
  document.getElementById('formsubmit').innerHTML='<h4 class="modal-title">Login!</h4><form><input type="text" placeholder="Username" id="loginusername" autofocus required><br><input type="password" placeholder="Password" id="loginpassword" required><br><button type="button" class="btn btn-default" data-dismiss="modal" onclick="checkLogin()">Login</button><button onclick="redirect()" class="btn btn-info">Back</button></form></div>';
}
function checkLogin()
{
  var username = document.getElementById('loginusername');
  var password = document.getElementById('loginpassword');
  if(username.value!="" && password.value!="")
  {
  database.ref('chatapplicationdata/').once('value').then(function(snapshot) {
    for(var i in snapshot.val()){
      if(snapshot.val()[i].name==username.value.toLowerCase() && snapshot.val()[i].password==password.value)
      {
        localStorage.setItem("name",snapshot.val()[i].name);
        localStorage.setItem("password",snapshot.val()[i].password);
        localStorage.setItem("gender",snapshot.val()[i].gender);
        redirect();
      }
      else {
        login();
      }
  }});
}
}
function showitem(Id)
{
  document.getElementById('div').style.display="none";
  document.getElementById('navbar').style.display="none";
  document.getElementById('formsubmit').style.visibility="none";
  document.getElementById('container').style.display="none";
  document.getElementById('showitem').style.display="inline-block";
  if(GENDER[Id]=="female")
  { document.getElementById('showitem').innerHTML= "<div id='select'><img src='img/2.png' class='media-object'><h4 class='media-heading'>"+NAME[Id].charAt(0).toUpperCase()+NAME[Id].slice(1).toLowerCase()+"</h4><p>"+CHAT[Id]+"</p></div><button onclick='redirect()' class='btn btn-primary btn-lg'>Back</button>";}
  else
  {document.getElementById('showitem').innerHTML= "<div id='select'><img src='img/1.png' class='media-object'><h4 class='media-heading'>"+NAME[Id].charAt(0).toUpperCase()+NAME[Id].slice(1).toLowerCase()+"</h4><p>"+CHAT[Id]+"</p></div><button onclick='redirect()' class='btn btn-primary btn-lg'>Back</button>";}
}
