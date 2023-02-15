import './App.css';
import React,{useState} from 'react';
import axios from 'axios';

function App() {

  const [addingMember,setAddingMember] = useState(false);
  const [searchID, setSearchID] = useState();
  const [member,setCurrentMember] = useState({});
  const [memberFound,setMemberFound] = useState(false);
  const [newPoints,setNewPoints] = useState();

  function searchMember(event){
        axios.get("http://localhost:5268/api/Membership/getmember",{params:{memberId:event}}).then(function(response)
        {
          console.log(response.data);
          setCurrentMember(response.data);
          if(response.data.name != "non found")
          {
            setMemberFound(true);
          }
        });
  }

  const changeMemberType = (event) => {
    console.log(event);
    axios.post("http://localhost:5268/api/Membership/setmembertype",null,{params:{memberId:member.memberId,membershipType:event}})
    .catch(function(error)
    {
      console.log(error);
    })
  }

  const setPoints = (event) =>{
    if(event.key === "Enter"){
      axios.post("http://localhost:5268/api/Membership/setpoints",null,{params:{points:newPoints,memberId:member.memberId}})
      .catch(function(error)
      {
          console.log(error);
      })
      console.log(member.memberId);
      searchMember(member.memberId);
    }
  }

  return (
    <div className="App">
      {addingMember ?  null :<div id="addmember"> <button>Add member!</button></div>}
      <div><input type="text" placeholder='Enter members id nummer to search!' onChange={e => setSearchID(e.target.value)} onKeyDown={(e) => searchMember(searchID)}></input></div>
      <div>Name: {member.name}</div>
      <div>Points: {member.points}</div>
      <div>Membership type: {member.memberType}</div>
      <div>Member id: {member.memberId}</div>
      <div><button onClick={(type)=>changeMemberType("bronze")}>Bronze</button><button onClick={(type)=>changeMemberType("silver")}>Silver</button><button onClick={(type)=>changeMemberType("gold")}>Gold</button></div>
      <div><input type="number" onChange={(points) => setNewPoints(points.target.value)} onKeyDown={setPoints} placeholder="Add/remove points"></input></div>
    </div>
  );
}

export default App;
