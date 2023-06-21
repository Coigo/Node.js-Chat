# Node.js Chat
#### Video Demo:  <https://youtu.be/HHbmnkAaOP0>
#### Description:
    A on-line chat. In the Front-end using HTML, CSS and JavaScript. And in the back-end, Node.js and Express, and the socket.io library to connect the two sides.
    The main reason I chose to develop a chat as my final project is because it offers a wide range of possibilities, such as file sharing, user authentication, and much more. However, this project is not just about what I want to achieve, but also about my desire to improve my skills and learn new things.

#   Files
    App.js:
        Is the server file, responsible for recieve and resend, read and write all messages the users send.
    
    mensagens.json:
        It is the database of the project, easier reading and writing.

    /public 
        index.html:
            Basic html, the script inside it, include, listening and emiting socket.io events.

        index.js:
        Main functions:
            AddMessage() - Display the message and the user inside a container;

            ApplyGUESTstate() - If the user do not set a username when send the message, it will create a guest ID until the user provides some nick name or reload the page;

            CreateMsgObject() - Recieve the message and the username as parameters, to emit it to the server.

        style.css:
            Basic css.

#   Socket.io Events
        "Mensagem" - The client side emit the object created by "CreateMsgObject" to the server and write the message in the database;
        "reenviarMensagem" 
            Server side: Brodcast the object back to the others clients;
            Client Side: Recieve and display the message;
        "SendState" - Send all the messages inside the database when a new client is connected.


#   Dependencies
        express: ^4.18.2;
        nodemon: ^2.0.22;
        socket.io: ^4.6.2;