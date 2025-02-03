import {useState, useEffect, useRef} from 'react';
import AcceptingTemplate from './AcceptingTemplate';
import {Link} from 'react-router-dom';

function Accepting(props){
    const handleSubmit=(data)=>{
        props.handleAcceptingRequest(data)
    }
    return (
        <>
            <Link to="/menu">{"<-- back"}</Link>
            <div>{props.requests.map((people)=><AcceptingTemplate people={people} handleSubmit={handleSubmit}/>)}</div>
       </>
    );
}

export default Accepting;

