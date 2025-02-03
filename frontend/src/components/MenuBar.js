import {useState} from 'react';
import {Link} from 'react-router-dom';

function MenuBar(props){
    return (
        <>
  <div className="flex flex-col justify-start items-start w-[220px] ring-1 ring-blue-500 my-5 mx-2 rounded-md p-3 bg-gray-50 shadow-md absolute left-5 top-1/8">
  <Link
    className="border-2 rounded-md border-black text-center py-2 mb-2 w-full hover:bg-gray-200 transition-colors"
    to="/menu/creatauction"
  >
    <button className="w-full font-medium"> <b>+</b> Create Auction</button>
  </Link>
  <Link
    className="border-2 rounded-md border-black text-center py-2 mb-2 w-full hover:bg-gray-200 transition-colors"
    to="/menu/join"
  >
    <button className="w-full font-medium">Join Auction</button>
  </Link>
  <Link
    className="border-2 rounded-md border-black text-center py-2 mb-2 w-full hover:bg-gray-200 transition-colors"
    to="/menu/stream"
  >
    <button className="w-full font-medium">Stream Auction</button>
  </Link>
  <Link
    className="border-2 rounded-md border-black text-center py-2 mb-2 w-full hover:bg-gray-200 transition-colors"
    to="/menu/requests"
  >
    <button className="w-full font-medium">Requests</button>
  </Link>
  <Link
    className="border-2 rounded-md border-black text-center py-2 mb-2 w-full hover:bg-gray-200 transition-colors"
    to="/menu/myauctions"
  >
    <button className="w-full font-medium">Your Auctions</button>
  </Link>
</div>

        </>
    )
}

export default MenuBar;