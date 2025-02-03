
import { useState, useRef } from "react";

function AuctionTemplate(props) {
  const people = props.auction ? props.auction.people : null;

  if(people){
    if(people.length>0)
    people.sort((a,b)=>b.amount-a.amount);
  }
  const amount = useRef();

  const handleSubmitHere = () => {
    props.handleBiddingAmount(amount.current.value);
    amount.current.value = "";
  };

  return (
    <>
      {people ? (
        <div className="p-6 m-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
          {props.num}<h1>{props.noti}</h1>
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-800">{props.auction.name}</h1>
            <h3 className="text-gray-700">{props.auction.description}</h3>
            <h2 className="text-lg font-semibold text-gray-600">{`Started at ${props.auction.startPrice}`}</h2>
          </div>
          {people.length === 0 ? (
            <h1 className="text-red-500 text-lg font-medium">No Persons Joined</h1>
          ) : (
            people.map((pep, index) => (
              <div
                key={index}
                className="m-2 p-3 border border-gray-400 rounded bg-white shadow-sm"
              >
                <h2 className="text-gray-800 font-medium">{`${pep.name} - ${pep.amount}`}</h2>
              </div>
            ))
          )}
          <form className="mt-4" onSubmit={(event)=>{event.preventDefault(); handleSubmitHere();}}>
            <input
              ref={amount}
              placeholder="Enter your amount"
              maxLength={"10"}
              className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
            >
              Bid
            </button>
          </form>
        </div>
      ) : (
        <h1 className="text-gray-500 text-center text-lg">Loading...</h1>
      )}
    </>
  );
}

export default AuctionTemplate;
