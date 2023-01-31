import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
  Header,
  Icon,
  Input,
  Grid,
  Segment,
  Loader,
  GridRow,
} from "semantic-ui-react";
import "./App.css";

const socket = io.connect("http://localhost:5000"); //for VC deployed server https://vc-server-b4gu.onrender.com  for local http://localhost:5000
let finalname;
let myString;
var conversation_id;
function App() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [mainlist, setMainlist] = useState([]);
  // const [me, setMe] = useState("");
  const [username, setName] = useState("");
  const onUsernameSelection = username => {
    this.usernameAlreadySelected = true;
    socket.auth = { username };
    socket.connect();
  };
  const handleChange = event => {
    setName(event.target.value);
  };

  const handleActiveUsers = () => {
    socket.users("usernames");
  };
  //const activeUs = [];
  //const showUsers = () => {
  //for (var i = 0; i < activeUs.length; i++) {
  //  var item = document.createElement("li");
  // item.innerHTML = activeUs[i];
  //    document.getElementById("list").appendChild(item);
  //   }
  //};
  const sendname = () => {
    socket.emit("adduser", username);
    // socket.auth = { username };
  };
  const showmain = () => {
    socket.emit("username_userId", { username: username, id: socket.id });
    socket.on("userlist", nameId => {});
  };
  // You can change a property:
  //userdata.name = "red";
  // You can add a property:
  //userdata.onlinestatus = "true";

  useEffect(() => {
    socket.on("connect", function () {
      // call the server-side function 'adduser' and send one parameter (value of prompt)
      socket.emit("adduser", username);
    });

    socket.on("userlist", nameId => {
      console.log(nameId);
      nameId = JSON.parse(JSON.stringify(finalname));
      console.log(finalname);
      //setMainlist(nameId);
    });

    // socket.on("online_users", users => {
    //    setOnlineUsers(users);
    //   console.log(users);
    //  });
    socket.on("users", users => {
      setMainlist(users);
      console.log(mainlist);
      console.log(users);
      // put the current user first, and then sort by username
      this.users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    });

    //socket.on("users", function (data) {
    // console.log(data); //data i.e usernames is an js object
    //console.table(data);
    //  const activeUs = Object.values(data); //activeUs is an array clone of data object
    //   console.table(activeUs);
    // let myString = JSON.stringify(data);
    //  var conversation_id = data.usernames;
    //   console.log({ conversation_id });
    //   return () => {
    //     socket.off("online_users");
    //   };

    // emit the message [data.message] to all connected users in the conversation
    // });
  }, []);

  return (
    <>
      <div className="App">
        <div class="wrapper">
          <div class="one">
            <div class="ui input focus">
              <input
                type="text"
                placeholder="Name"
                id="me"
                name="me"
                onChange={handleChange}
              ></input>
              <div class="ui message">
                <div class="header">Id:{socket.id}</div>
              </div>
            </div>
            <button onClick={handleActiveUsers}>Online</button>
            <h2>Logged in as:{username}</h2>{" "}
            <button onClick={sendname}>Login</button>
            <button onClick={showmain}>Show main list fun call</button>
          </div>
          <div class="two">
            <div class="ui card">
              <div class="OnlineUsers">
                <h1>Active Users</h1>

                <ul>
                  {mainlist.map(nameId => (
                    <li key={nameId}>{nameId}</li>
                  ))}
                </ul>

                <ul id="list"></ul>
                <p>____ socket__</p>
                <ul>
                  {onlineUsers.map(user => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>

                <ul id="list"></ul>
              </div>
            </div>
          </div>
          <div class="three"></div>
          <div className="container">
            <br></br>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
export default App;
//<button onClick={handleClick}>login</button>
//<button onClick={showUsers}>users</button>
