
import { useState, useEffect, useRef } from "react";

function AcceptingTemplate(props) {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {`Request from ${props.people.name} to join ${props.people.auctionName}`}
        </h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
          onClick={() => props.handleSubmit(props.people)}
        >
          Accept
        </button>
      </div>
    </>
  );
}

export default AcceptingTemplate;
