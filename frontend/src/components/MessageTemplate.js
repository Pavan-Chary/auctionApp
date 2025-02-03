import {useState, useRef, useEffect} from 'react';

function MessageTemplate(props){

    return (
        <>
            <div className="m-2 p-4 bg-gray-100 rounded-lg shadow-md">
  <h1 className="text-xl font-semibold text-yellow-700">{props.msg}</h1>
</div>

        </>
    );
}

export default MessageTemplate;