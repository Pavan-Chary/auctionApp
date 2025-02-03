
import './App.css';
import io from 'socket.io-client';
import {useState, useRef, useEffect, use} from 'react'
import Signin from './components/Signin';
import Login from './components/Login';
import CreateAuction from './components/CreateAuction';
import JoiningAuction from './components/JoiningAuction';
import Accepting from './components/Accepting';
import AuctionItem from './components/AuctionItem';
import AuctionCode from './components/AuctionCode';
import AuctionTemplate from './components/AuctionTemplate';
import MessageTemplate from './components/MessageTemplate';
import Navbar from './components/Navbar';
import MenuBar from './components/MenuBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const socket = io("http://192.168.1.22:8000");

function App() {

  const [msg, setMsg] = useState("");
  const [msgCol, setMsgCol] = useState("text-black");
  const [msgBgCol, setMsgBgCol] = useState("bg-white-100");
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [auctionsList, setAuctionsList] = useState([]);
  const [auction, setAuction] = useState(null);
  const [num, setNum] = useState('1');
  const [noti, setNoti] = useState("Started");

  //To get if any user is login
  const getNewUser=(()=>{
    try{
      const getToken=localStorage.getItem('token');
      fetch(`http://192.168.1.22:8000/api/getUser?token=${getToken}`).then((res)=>res.json()).then((res)=>{
        if(res.code===1){
          setUser(res.user); 
          setRequests(res.people)
        }
      }).catch();  
    }
    catch{
    }
  })

  useEffect(()=>{
    getNewUser();
  },[])


  useEffect(()=>{
    fetch(`http://192.168.1.22:8000/api/getMyAuctions?user=${user?user.id:""}`).then((res)=>res.json()).then((res)=>setAuctionsList(res.auctions)).catch()
  },[user])
  

  //to get new requests
  if(user){
  socket.on(`getNewRequests${user.id}`,(payload)=>{
    if(user){
      console.log("I got message")
      fetch(`http://192.168.1.22:8000/api/getRequestedList?userId=${user.id}`).then((resp)=>resp.json()).then((resp)=>{
        setRequests(resp.people);
      }).catch()
    }
  })
}
useEffect(()=>{
  if(user){
    socket.on(`getNewRequests${user.id}`,(payload)=>{
      if(user){
        console.log("I got message")
        fetch(`http://192.168.1.22:8000/api/getRequestedList?userId=${user.id}`).then((resp)=>resp.json()).then((resp)=>{
          setRequests(resp.people);
        }).catch()
      }
    })
  }
},[user])

//To show message
  const showMessage=(text)=>{
    setMsg(text);
    setTimeout(()=>{setMsg("");},3000);
  }


  if(user){
  socket.on(`addRequest${user.id}`,(payload)=>{console.log("I got");setRequests([...requests,payload])})
  socket.on(`messageTo${user.id}`,(payload)=>{console.log("I got");console.log(payload);showMessage(payload.msg)})
  socket.on(`getNewAuctions${user.id}`,()=>{
    fetch(`http://192.168.1.22:8000/api/getMyAuctions?user=${user?user.id:""}`).then((res)=>res.json()).then((res)=>setAuctionsList(res.auctions)).catch()
  })
  }

  const getMyAuctions=()=>{
    fetch(`http://192.168.1.22:8000/api/getMyAuctions?user=${user?user.id:""}`).then((res)=>res.json()).then((res)=>setAuctionsList(res.auctions)).catch()
  }

  //Handling Login
  
  const emailL= useRef();
  const passwordL= useRef();
  const logIt = async(data)=>{
    return await fetch(("http://192.168.1.22:8000/api/login/"),{
      method:"post",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    });
  }
  const handleLogin=()=>{
    const email=emailL.current.value;
    const password=passwordL.current.value;
    emailL.current.value="";
    passwordL.current.value="";
    let data={
      email,password
    }
    logIt(data).then((res)=>res.json()).then((result)=>{
      if(result.code==1){
        localStorage.setItem('token',result.token);  
        showMessage("Login Successful");
        fetch(`http://192.168.1.22:8000/api/getUser?token=${result.token}`).then((res)=>res.json()).then((res)=>{
          if(res.code===1){
            setUser(res.user); 
            setRequests(res.people)
          }
        }).catch();  
      }else{
        localStorage.setItem('token','');
        showMessage("Invalid")
      }
    });
  }


  //Handling Signin
  
  const emailS= useRef();
  const passwordS= useRef();
  const nameS= useRef();
  const signIt = async(data)=>{
    return await fetch(("http://192.168.1.22:8000/api/signin/"),{
      method:"post",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    });
  }
  const handleSignin=()=>{
    const email=emailS.current.value;
    const password=passwordS.current.value;
    const name=nameS.current.value;
    emailS.current.value="";
    passwordS.current.value="";
    nameS.current.value="";

    let data={
      email,password,name
    }
    console.log(data);
    signIt(data).then((res)=>res.json()).then((res)=>{showMessage(res.msg); console.log(res.msg)})
  }

  //Handling Logout
  
  const handleLogout = ()=>{
    setUser(null);
    localStorage.setItem('token',"");
  }

  //Handling Auction Creation
  const handleAuctionCreation= async(data)=>{
      if(data.time<=0){
        setMsg("Give a proper time...");
        return;
      }
      await fetch('http://192.168.1.22:8000/api/createAuction/',{
        method:"post",
        headers:{
          'Content-Type':'application/json',
          'authorization':localStorage.getItem('token'),
        },
        body:JSON.stringify(data),
      }).then((res)=>res.json()).then((res)=>{showMessage(res.msg);getMyAuctions();}).catch((err)=>console.log(err));
      console.log("Called in in app.js ", data);
  }

  //Handling adding person
  const handleJoiningAuction=(data)=>{
    if(user){
    socket.emit("AddPerson",data);
    showMessage("Requested to add");
    }else{
      showMessage("Please login");
    }
  }

  //handle accepting request
  const handleAcceptingRequest = (data)=>{
    socket.emit("UserAccept",{data:data,user:user.id});
  }

  //handle auction start

  const handleAuctionStart=(id)=>{
    socket.emit("startAuction",{id:id,user:user.id});
  }

  //handle get auction participants

  const handleGetAuctionParticipants=(code)=>{
    console.log("Isent a request with code", code);
      fetch(`http://192.168.1.22:8000/api/getAuctionParticipants?id=${code}`).then(res=>res.json()).then((res)=>{
        if(res.code===0){
          showMessage(res.msg);
        }else{
          setAuction(res.auction);
        }
      }).catch()
  }

  if(auction){
    socket.on(`getNewParticipants${auction._id}`,()=>{
      handleGetAuctionParticipants(auction._id);
      console.log("hello broo....");
    });
    socket.on(`timeUpdate${auction._id}`,(payload)=>{
      setNum(payload.code);
      setNoti(payload.msg);
    });
  }
  
  

  //handle bid amount submit
  const handleBiddingAmount=(amount)=>{

      try{
        if(amount.includes(",")||amount.includes(" ")||amount.includes("-")||amount.includes("/")){
          showMessage("Enter a valid number withoud comas and spaces");
          return ;
        }
        amount=Number.parseInt(amount);
        if(!amount){
          showMessage("Enter a valid number")
          return ;
        }
        if(user){
          if(auction){
            if(auction.length===0){
              showMessage("You are not member of this auction");
              return;
            }
            let flag=0;
            auction.people.map((pe)=>{
              if(pe.id===user.id){
                flag=1;
              }
            })
            if(flag===0){
              showMessage("You are not member of this auction");
              return;
            }
          socket.emit("bidAmount",{
            auction:auction,
            user:user,
            amount:amount
          });
          console.log("data you are sending", auction, user);
          }
        }else{
          showMessage("Please login to Bid")
        }
      }catch{
        showMessage("Enter a valid number without spaces and comas")
      }
  }

  //Handling bidding value update
  if(user){
    socket.on(`bidAmountUpdate${user.id}`,(payload)=>{
      showMessage(payload.msg);
    })
  }

  //
  const handleShowButton=(id)=>{
    fetch(`http://192.168.1.22:8000/api/getAuctionParticipants?id=${id}`).then(res=>res.json()).then((res)=>{
      if(res.code===0){
        showMessage(res.msg);
      }else{
        setAuction(res.auction);
      }
    }).catch()
  }
 
  return (
    <>
    <Router>
    <Navbar handleLogout={handleLogout} user={user}/>
    <MessageTemplate msg={msg} />
      <Routes>
        <Route path="/login" element={<Login emailL={emailL} passwordL={passwordL} handleLogin={handleLogin}/>}></Route>
        <Route path="/sigin" element={<Signin emailS={emailS} nameS={nameS} passwordS={passwordS} handleSignin={handleSignin}/> }></Route>
        <Route path="/menu" element={ <MenuBar/>}></Route>
        <Route path="/menu/creatauction" element={<CreateAuction handleCreateAuction={handleAuctionCreation} user={user}/>}></Route>
        <Route path="/menu/join" element={<JoiningAuction handleJoiningAuction={handleJoiningAuction}  user={user}/>}></Route>
        <Route path="/menu/stream" element={<>
         <AuctionCode handleGetAuctionParticipants={handleGetAuctionParticipants}/>
         <AuctionTemplate auction={auction} handleBiddingAmount={handleBiddingAmount} num={num} noti={noti}/>
         </>
         }></Route>
        <Route path="/menu/requests" element={<Accepting  requests={requests} handleAcceptingRequest={handleAcceptingRequest}/>}></Route>
        <Route path="/menu/myauctions" element={<AuctionItem handleShowButton={handleShowButton} auctions={auctionsList} handleAuctionStart={handleAuctionStart}/>}></Route>
      </Routes>
    </Router>

    </>
  );             
}

export default App;
