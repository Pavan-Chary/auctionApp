import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom'

function CreateAuction(props){
    const auctionName=useRef();
    const description=useRef();
    const startingPrice=useRef();
    const time=useRef();

    const handleSubmitHere=()=>{

        const data={
            name:auctionName.current.value,
            description:description.current.value,
            price:startingPrice.current.value,
            time:time.current.value,
            user:props.user
        }
        auctionName.current.value="";
        description.current.value="";
        startingPrice.current.value="";
        time.current.value="";
        console.log("Called in components");
        props.handleCreateAuction(data);

    }
    

    return(
        
<>
  <div className="p-6 m-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
    <Link
      to="/menu"
      className="text-blue-500 hover:text-blue-700 font-medium mb-4 inline-block"
    >
      {"<-- back"}
    </Link>
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Auction</h1>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmitHere();
      }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Name</h3>
        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={auctionName}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Description</h3>
        <textarea
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={description}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Starting Price</h3>
        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={startingPrice}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Time</h3>
        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          ref={time}
        />
      </div>
      <button
        className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</>

    );
}

export default CreateAuction;
