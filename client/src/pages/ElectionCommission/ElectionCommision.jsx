import { useContext, useState } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import { WalletContext } from '../../components/Wallet'
import PropTypes  from "prop-types"
import {toast, Toaster } from 'react-hot-toast'
import "../ElectionCommission/ElectionCommission.css"

function ElectionCommision({account}) {

  const[winner,setWinner] = useState("No winner Yet")

  const{contract} = useContext(WalletContext);

  const dateToSeconds = (dateTimeString) => {
    const date = new Date(dateTimeString);
    console.log("date", Math.floor(date.getTime() / 1000));
    return Math.floor(date.getTime() / 1000);
  };

  const votingTime = async (event)=>{
    event.preventDefault();

    const startTime = document.querySelector("#start").value;
    const endTime = document.querySelector("#end").value;

    // converting time and date in seconds
    const startInSeconds = dateToSeconds(startTime);
    const endInSeconds = dateToSeconds(endTime);

    const timeData= {
      startInSeconds,
      endInSeconds
    }

    try{
      const res = await fetch("http://localhost:3000/api/time-verify",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(timeData)
      })

      const data = await res.json()

      if(data.message === "Time is less than 24 hours"){
        await contract.methods.voteTime(startInSeconds,endInSeconds).send({from:account,gas:480000})
        toast.success("Voting Started");
      }
      else{
        throw new Error("Time is greater than 24 hours")
      }
      
    }
    catch(error){
      console.log(error);
      toast.error("Voting Initilization Failed");
    }
  }

  const emergency = async (event)=>{
    event.preventDefault();
    try{
      await contract.methods.emergency().send({from:account,gas:480000})
      toast("Emergency Declared", {icon: "🚨",});
    }
    catch(error){
      toast.error("Emergency Declaration Failed");
    }
  }

  const result = async (event)=>{
    event.preventDefault();
    try{
      await contract.methods.result().send({from:account,gas:480000})
      const winCandidate = await contract.methods.winner().call()
      setWinner(winCandidate)
      toast.success("Result Out");
    }
    catch(error){
      toast.error("Result Declaration Failed");
    }
  }

  return (
    <>
      <div>
        <Navigation account={account}/>
        <div className="election-wrapper">
          <h2>Winner is: <br /> {winner}{" "}</h2>
          <div>
            <form  className="election-form" onSubmit={votingTime}><Toaster/>
              <label className='start' htmlFor="start">Start Time:</label>
              <input className='innerBoxVote' type="datetime-local" id='start' />

              <label className='label2' htmlFor="end">End Time:</label>
              <input className='innerBoxVote' type="datetime-local" id='end' />

              <button className="regBtn" type='submit'>Voting Start</button>
            </form>
          </div>
          <div className='admin-actions'>
            <button className="emerBtn" onClick={emergency}><Toaster/>
              Emergency
            </button>
            <button className="resultBtn" onClick={result}><Toaster/>
              Result
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
ElectionCommision.propTypes = {
  account: PropTypes.node.isRequired,
} 

export default ElectionCommision
