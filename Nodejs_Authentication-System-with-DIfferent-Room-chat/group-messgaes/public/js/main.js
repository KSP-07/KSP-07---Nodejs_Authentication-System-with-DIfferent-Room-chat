//accessing the form element for sending message in the chat 
const chatForm=document.getElementById('chat-form')
const chatMessages= document.querySelector('.chat-messages');
const roomName= document.getElementById('room-name');
const userList= document.getElementById('users');

//Get username and room from url using qs-query selector that we imported in chat html
const { username, room} = Qs.parse(location.search ,{
    ignoreQueryPrefix:true
})

console.log(username,room)



const socket = io();
//join chat room
socket.emit('joinRoom',{username,room})


//Get room and users
socket.on('roomUsers' , ({ room , users})=>{
    outputRoomName(room);
    outputUsers(users);
})

//message from server
socket.on('message',message=>{
    console.log(message);

    outputMessage(message);    //using our defined fun

    //for auto scroll to down with new message
    chatMessages.scrollTop= chatMessages.scrollHeight;


})

//event listener for submission of that form
chatForm.addEventListener('submit',(e) =>{
    e.preventDefault();    //we are passing the event parameter (e) to prevetn the default action of form as it auto submit it into file

    //get message text
    const msg=e.target.elements.msg.value   //e.target will give us the courrent element ....so we are geting it by its if as in chat html id=msg...and we want value so we do .value

    console.log(msg);   //it will happen at the client side
    //emit message to server
    socket.emit('chatMessage',msg);

    //clear input from message box and focus the pointer like blinking
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})


//Output message to dom
function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
  </p>`
  document.querySelector('.chat-messages').appendChild(div);
}

//Add room name to DOM
function outputRoomName(room){
    roomName.innerText=room
}

//Add users to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }

  //Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });