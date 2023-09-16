import PropTypes  from "prop-types"
import React, { useContext } from 'react'
import { WalletContext } from '../../components/Wallet'
import Navigation from '../../components/Navigation/Navigation'
import CandidateDisplay from "../../components/CandidateDisplay";
import {toast, Toaster } from 'react-hot-toast'
import "../CandidateRegister/CandidateRegister.css"

function CandidateRegister({account}) {

  // const{web3,contract} = useContext(WalletContext)
  // console.log(contract)
  // console.log(web3)

  //console.log(account);

  const{contract} = useContext(WalletContext);

  const candidateRegistration = async(event) =>{

    event.preventDefault();

    const name = document.querySelector("#name").value
    const party = document.querySelector("#party").value
    const age = document.querySelector("#age").value
    const gender = document.querySelector("#gender").value

    const partyData= {
      gender:gender,
      partyName:party
    }

    try{
      const res = await fetch("http://localhost:3000/api/candidate-verify",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(partyData)
      })

      const data = await res.json()
      // console.log(data)
      if(data.message === "Registration Successful"){
        await contract.methods.candidateRegister(name,party,age,gender).send({from:account, gas:480000})
        toast.success("Registration successful");
      }
      else if(data.message==="Gender value invalid"){
        throw new Error("Gender value invalid")
      }
      else{
        throw new Error("Part Value clashes")
      }
    }
    catch(error){
      toast.error("Registration Failed");
    }
  }


  return<>
  <>
      <Navigation/>
      <div className="reg-cand-wrapper">
        <div className="reg-img-wrapper">
            <h1>Welcome to Candidate Register</h1>
            <p>Make your votes count towards the voter you like</p>
            <img src="/register.png" width={300}></img>
          </div>
        <form className="can-reg-form" onSubmit={candidateRegistration}><Toaster/>
          <label className="label1" htmlFor="name">Name:</label>
          <input className="innerBoxCand" type="text"  id="name"/>

          <label className="label1" htmlFor="party">Party:</label>
          <input className="innerBoxCand" type="text"  id="party"/>

          <label className="label1" htmlFor="age">Age:</label>
          <input className="innerBoxCand" type="number"  id="age"/>

          <label className="label1" htmlFor="gender">Gender:</label>
          <input className="innerBoxCand" type="text"  id="gender"/>

          <button className="regBtn" type="submit">Register</button>
        </form>
      </div>
      <CandidateDisplay/>
    </>
  </> 
  
}


CandidateRegister.propTypes = {
  account: PropTypes.node.isRequired,
} 

export default CandidateRegister
