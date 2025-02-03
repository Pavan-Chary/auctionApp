
import {useState} from 'react'

function Login(props){

    return (
        <>
            <div className="flex flex-col justify-center shadow-md shadow-black text-center ring-2 w-[90%] max-w-[700px] m-auto mt-[15vh] p-6 rounded-md bg-gray-50">
  <h1 className="font-bold text-4xl md:text-3xl font-serif text-blue-600 mb-6">Login</h1>
  <form
    className="flex flex-col text-left space-y-4"
    onSubmit={(event) => {
      event.preventDefault();
      props.handleLogin();
    }}
  >
    <div>
      <label className="text-left text-lg mb-1">Email</label>
      <input
        type="email"
        required
        className="ring-1 rounded p-2  focus:outline-blue-500 w-full"
        ref={props.emailL}
      />
    </div>
    <div>
      <label className="text-left text-lg mb-1">Password</label>
      <input
        type="password"
        required
        className="ring-1 rounded p-2  focus:outline-blue-500 w-full"
        ref={props.passwordL}
      />
    </div>
    <button
      className="bg-blue-400 rounded-full font-semibold px-4 py-2 text-black hover:text-white hover:bg-blue-500 hover:shadow-md transition-all"
      type="submit"
    >
      Login
    </button>
  </form>
</div>

        </>
    )
}
export default Login