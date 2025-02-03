import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';

function AuctionCode(props){
    const code = useRef()
    const handleSubmitHere=()=>{
        props.handleGetAuctionParticipants(code.current.value);
        code.current.value="";
    }
    return (
<>
  <div className="ring-2 ring-black w-96 p-4 rounded-lg bg-gray-100 shadow-md">
    <Link to="/menu" className="text-blue-500 hover:text-blue-700 font-medium">
      {"<-- back"}
    </Link>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitHere();
      }}
      className="mt-4"
    >
      <input
        required
        className="bg-slate-300 w-80 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ref={code}
        type="text"
      />
      <br />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600 transition-colors"
        type="submit"
      >
        ok
      </button>
    </form>
  </div>
</>

    );
}

export default AuctionCode;