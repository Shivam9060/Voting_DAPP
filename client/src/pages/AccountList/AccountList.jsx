import PropTypes  from "prop-types"
import React, { useContext,useEffect,useState } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import { WalletContext } from '../../components/Wallet'
import "../AccountList/AccountList.css";

function AccountList({saveAccount}) {

  const{web3}=useContext(WalletContext);

  const [account, setAccount] = useState("");

  useEffect( ()=>{
    const allAccounts = async () => {
      const select = document.getElementById("selectNumber")
      const options = await web3.eth.getAccounts(); //array of accounts available in Ganache

      for(var i=0; i<options.length; i++) {
        var opt = options[i]
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    }
    web3 && allAccounts();
  }, [web3] )

  const selectAccount = async () =>{
    let selectedAccountAddress = document.getElementById("selectNumber").value;
    setAccount(selectedAccountAddress);

    if(selectedAccountAddress && selectedAccountAddress !== "Choose an account"){
      saveAccount(selectedAccountAddress);
    }
  }

  return (
    <div className="ac-list-wrapper">
      <Navigation account={account} />
      <div className="ac-list-container">
        <img src="/vote.gif" alt="voteGIF" autoPlay width={240} />
        <h1 className="ac-list-title">
          Revolutionalitised <span className="span">voting system</span>
          <br />
          through blockchain
        </h1>
        <form className="ac-list-form" id="myForm">
          <select
            className="innerBox"
            id="selectNumber"
            onChange={selectAccount}
            defaultValue=""
          >
            <option disabled value="">
              Choose an account
            </option>
          </select>
        </form>
        <p className="note">
          *Go to Menu: Register for New candidate & Voter for a standin person
        </p>
      </div>
    </div>
  )
}

AccountList.propTypes = {
  saveAccount: PropTypes.func.isRequired,
} 

export default AccountList
