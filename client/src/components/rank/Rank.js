import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation,Link } from "react-router-dom";
import { getRank } from "../../apis/rank";
function Rank() {
    const location = useLocation();
    const {count} =location.state
    const [rank,setRank]=useState(0)
    const fetchRank = async () => {
    const res = await getRank(count/15 *100);
    setRank(res.rank);
  };
  useEffect(() => {
    fetchRank();
  }, []);
 
  return (
    <div className="root">
    <div>
     <p>Rank: {rank} %</p>
     <Link to="/">
        <button className="btn">Try again</button>
      </Link>
    </div>
    </div>
  );
}

export default Rank;
