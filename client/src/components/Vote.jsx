import React, { useContext } from 'react'
import PropTypes  from "prop-types"
import { WalletContext } from './Wallet'
import "./Vote/Vote.css";
import {toast, Toaster } from 'react-hot-toast'


function Vote({account}) {

  const{contract} = useContext(WalletContext)

  const submitVote = async (event) =>{
    event.preventDefault()

    const voterId = document.querySelector('#voterId').value;
    const candidateId = document.querySelector('#candidateId').value;

    try{
      await contract.methods.vote(voterId,candidateId).send({from:account,gas:480000})
      toast.success("You have voted successfully");
    }
    catch(error){
      toast.error("Vote Failed");
    }

  }

  return (
    <div>
      <form className='vote-form' onSubmit={submitVote}><Toaster/>
        <h1>Vote Here</h1>
        <label htmlFor="voterId" className="label3">Voter Id:</label>
        <input className='innerBoxVote' type="text"  id='voterId'/>

        <label htmlFor="Id" className="label3">Candidate Id:</label>
        <input className='innerBoxVote' type="text"  id='candidateId'/>

        <button className="regBtn" type='submit'>Vote</button>
      </form>
    </div>
  )
}

Vote.propTypes = {
  account: PropTypes.node.isRequired,
}

export default Vote
