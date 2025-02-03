import {Link} from 'react-router-dom';

function AuctionItem(props) {
    const handleSubmitStart=(id)=>{
        props.handleAuctionStart(id);
    }

    return (
        <>
  <div className="ring-2 ring-gray-300 p-6 rounded-lg bg-gray-50 shadow-md">
    <Link
      to="/menu"
      className="text-blue-500 hover:text-blue-700 font-medium mb-4 inline-block"
    >
      {"<-- back"}
    </Link>
    {props.auctions ? (
      props.auctions.map((auction) => (
        <div
          key={auction._id}
          className="p-4 m-4 border border-gray-300 rounded-md bg-white shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800">{auction.name}</h2>
          <p className="text-sm font-bold text-gray-900">{"Code "}</p><h2 className="text-sm font-semibold text-gray-600">{auction._id}</h2>
          {auction.status === 0 ? (
            <button
              className="mt-3 px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition-colors"
              onClick={() => {
                handleSubmitStart(auction._id);
              }}
            >
              Start
            </button>
          ) : (
            <Link to="/menu/stream"><button
            onClick={()=>props.handleShowButton(auction._id)}
            className="mt-3 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors">
              Show
            </button>
            </Link>
          )}
        </div>
      ))
    ) : (
      <h1 className="text-gray-500 text-center">Loading...</h1>
    )}
  </div>
</>

    );

}

export default AuctionItem;