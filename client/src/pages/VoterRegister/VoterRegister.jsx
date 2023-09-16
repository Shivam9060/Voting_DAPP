import { useContext } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import PropTypes  from "prop-types"
import { WalletContext } from '../../components/Wallet'
import VoterDisplay from '../../components/VoterDisplay';
import Vote from '../../components/Vote';
import VotingStatus from '../../components/VotingStatus';
import "../VoterRegister/VoterRegister.css";
import {toast, Toaster } from 'react-hot-toast'


function VoterRegister({account}) {

  const{contract} = useContext(WalletContext);

  const voterRegistration = async (event)=>{

    event.preventDefault();

    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    const gender =document.querySelector("#gender").value;

    const voterData= {
      gender:gender,
    }

    try{
      const res = await fetch("http://localhost:3000/api/voter-verify",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(voterData)
      })

      const data = await res.json()
      if(data.message==="Registration Successful"){
        await contract.methods.voterRegister(name,age,gender).send({from:account, gas:480000})
        toast.success("Voter Registration sucessfull");
      }
      else{
        throw new Error("Gender value invalid");
      }
    }
    catch(error){
      toast.error("Voter Registrstion failed");
    }

  }


  return (
    <>
      <Navigation/>
      <div className="status-nav">
        <VotingStatus />
      </div>
      <div className="voter-reg-wrapper">
      <form className="voter-form" onSubmit={voterRegistration}><Toaster/>
        <label htmlFor="name" className="lebel2">Name:</label>
        <input type="text" className="innerBoxVote" id='name' />
        
        <label htmlFor="age" className="lebel2">Age:</label>
        <input type="number" className="innerBoxVote" id='age' />
        
        <label htmlFor="gender" className="lebel2">Gender:</label>
        <input type="text" className="innerBoxVote" id='gender' />

        <button className='regBtn' type='submit'>Register</button>
      </form>
      <Vote account={account}/>
      </div>
      <VoterDisplay/>
    </>
  )
}

VoterRegister.propTypes = {
  account: PropTypes.node.isRequired,
} 

export default VoterRegister
