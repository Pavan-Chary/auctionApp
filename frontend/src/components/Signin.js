
import {useState} from 'react';

function Signup(props){

    return (
        <>
            <div className="flex flex-col justify-center items-center shadow-md shadow-black text-center ring-2 w-[90%] max-w-[700px] m-auto mt-[15vh] p-6 rounded-md relative text-2xl md:text-lg bg-gray-50">
  <h1 className="font-bold font-serif text-3xl md:text-2xl mb-6 text-blue-600">Join With Us</h1>
  <form
    className="flex flex-col w-full space-y-4"
    onSubmit={(event) => {
      event.preventDefault();
      props.handleSignin();
    }}
  >
    <div className="flex flex-col">
      <label className="text-left text-lg mb-1">Name</label>
      <input
        type="text"
        className="ring-1 rounded p-2  focus:outline-blue-500 w-full"
        ref={props.nameS}
      />
    </div>
    <div className="flex flex-col">
      <label className="text-left text-lg mb-1">Email</label>
      <input
        type="email"
        pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
        className="ring-1 rounded p-2  focus:outline-blue-500 w-full"
        ref={props.emailS}
      />
    </div>
    <div className="flex flex-col">
      <label className="text-left text-lg mb-1">Password</label>
      <input
        type="password"
        className="ring-1 rounded p-2  focus:outline-blue-500 w-full"
        ref={props.passwordS}
      />
    </div>
    <button
      className="bg-blue-400 rounded-full px-4 py-2 text-black hover:text-white hover:bg-blue-500 hover:shadow-md transition-all"
      type="submit"
    >
      Signup
    </button>
  </form>
</div>
        </>
    )
}
export default Signup