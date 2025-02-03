import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom'

function Navbar(props){
    return (
        <>
            <div className="ring-1 ring-black flex justify-between items-center px-4 py-2 bg-gray-50">
  <Link to="/menu">
    <button className="px-4 py-2  text-blue-700 rounded hover:ring-4 hover:ring-blue-300 transition-all">
      Menu
    </button>
  </Link>
  <Link to="/">
    <button className="px-4 py-2 text-blue-700  rounded hover:ring-4 hover:ring-blue-300 transition-all">
      Logo
    </button>
  </Link>
  {props.user ? (
    <button
      onClick={props.handleLogout}
      className="px-4 py-2 b text-blue-700 rounded hover:ring-4 hover:ring-blue-300 transition-all"
    >
      Logout
    </button>
  ) : (
    <Link to="/login">
      <button className="px-4 py-2  text-blue-700 rounded hover:ring-4 hover:ring-blue-300 transition-all">
        Login
      </button>
    </Link>
  )}
  <Link to="/sigin">
    <button className="my-1 mx-8 px-4 py-2  text-blue-700 rounded hover:ring-4 hover:ring-blue-300 transition-all">
      Signup
    </button>
  </Link>
</div>


        </>
    )
}

export default Navbar;