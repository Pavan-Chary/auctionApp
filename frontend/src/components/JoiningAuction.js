import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

function JoiningAuction(props){
    const code = useRef();
    const handleSubmitHere=()=>{
        const data = {
            auctionId:code.current.value,
            userName:props.user.name,
            userId:props.user.id,
        }
        props.handleJoiningAuction(data);
    }
    
    return (
    <>
   
  <Link
    to="/menu"
    className="text-blue-500 hover:text-blue-700 font-medium mb-4 inline-block"
  >
    {"<-- back"}
  </Link>
  {/* {props.requests.map(people => <p>{`name ${people.name} auction name ${props.auctionName}`}</p>)} */}
  <form
    onSubmit={(event) => {
      event.preventDefault();
      handleSubmitHere();
    }}
    className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md"
  >
    <input
      placeholder="Enter your code"
      ref={code}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
    >
      Join
    </button>
  </form>
</>

    
    );

}
export default JoiningAuction;