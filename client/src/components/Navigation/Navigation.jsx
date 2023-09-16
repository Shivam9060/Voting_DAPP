import {Link} from "react-router-dom";
import ConnectedAccount from "../ConnectedAccount";
import "./Navigation.css";

function Navigation({account}) {
  return (
    <header>
      <nav>
        <div className="connected-account">
          <ConnectedAccount account={account} />
        </div>
        <ul>
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/candidate">Candidate</Link></li>
          <li><Link className="nav-link" to="/voter">Voter</Link></li>
          <li><Link className="nav-link" to="/election-commision">Election-Commission</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
