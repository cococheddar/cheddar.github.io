//배경
const backImg = [
  "01.jpg",
  "02.png",
  "03.jpg",
  "04.png",
  "05.jpg",

];

const background = document.createElement("img") ;
const body = document.body;
const bgImg= backImg[Math.floor(Math.random() * backImg.length)];

// login
const loginBox = document.querySelector ("#login")
const logininput = document.querySelector ("#login-form input")
const greeting = document.querySelector("#greeting")
const afterLogin = document.querySelector("#content")

const HIDDEN_CLASS = "hidden"; 
const USERNAME_KEY =" username" 
const INTROBACK_CLASS = "intro"

function loginSubmit(event){ 
      event.preventDefault();
      loginBox.classList.add(HIDDEN_CLASS);
      const username = logininput.value;
      localStorage.setItem(USERNAME_KEY, username);
      paintGreetings(username);
  };
  
  
  function paintGreetings(username){
      greeting.innerText=`Halo ${username}`; 
      afterLogin.classList.remove(HIDDEN_CLASS);
      background.src = `img/${bgImg}`
      document.body.appendChild(background) 
  };
   
  const savedUsername = localStorage.getItem(USERNAME_KEY);
  
  if(savedUsername === null){
    afterLogin.classList.add(HIDDEN_CLASS);
    loginBox.classList.remove(HIDDEN_CLASS);
    loginBox.addEventListener("submit", loginSubmit);
    background.src = "img/zang.png"
    document.body.appendChild(background) 
      
    }else{
       paintGreetings(savedUsername);
  }
  
  

  // login 후


  const clock = document.querySelector("#clock");
  function getClock(){
      const date = new Date();
      const hours = String(date.getHours()).padStart(2,"0");
      const minutes = String(date.getMinutes()).padStart(2,"0");
      const seconds = String(date.getSeconds()).padStart(2,"0");
      clock.innerText = `${hours}:${minutes}`
  }
  getClock();   
  setInterval(getClock, 1000);
// todo  
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos=[]; 

function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

//#target
function delTodo(event){
    const li = event.target.parentElement; 
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveTodos();
}

//#createElement
function paintToDo(todo){
    const li = document.createElement("li")
    li.id = todo.id;
    const span = document.createElement("span")
    span.innerText = todo.text;
    const button = document.createElement("button")
    button.innerText ="❌"
    button.addEventListener("click", delTodo)
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}


function todoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = ""
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj)
    paintToDo(newTodoObj);
    saveTodos();
}

toDoForm.addEventListener("submit",todoSubmit);


const savedTodos = localStorage.getItem(TODOS_KEY);



if(savedTodos != null){  
    const parsedToDos = JSON.parse(savedTodos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);  
  
}
  
  
  
  
  
//날씨
const API_KEY ="f0141e8ef335aa1c6635e71474e425ef"

function onGeoOK(position){
    const lat = position.coords.latitude;
    const lon  = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url).then(response => response.json())
    .then((data) => {
        const weather = document.querySelector("#weather span:first-child")
        const city = document.querySelector("#weather span:last-child")
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main}`;
        console.log(url)
      });
    }; 
function onGeoError(){
    alert("날씨를 찾을 수 없다요 ")
}

navigator.geolocation.getCurrentPosition(onGeoOK,onGeoError);
