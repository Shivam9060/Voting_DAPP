import React, { useContext, useEffect, useState } from 'react'
import { WalletContext } from './Wallet'
import "./VoterDisplay/VoterDisplay.css"

function VoterDisplay() {

  const[voters,setVoters] = useState([]);

  const{contract} = useContext(WalletContext)

  useEffect(()=>{
    const voterInfo = async ()=>{
      const voters = await contract.methods.voterList().call()
      setVoters(voters)
    };
    contract && voterInfo()
  },[contract])

  if (voters.length === 0) {
    return null;
  }

  return (
    <div className="table-container">
      <table className="voter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {voters.length > 0 ? (
            voters.map((voter) => (
              <tr key={voter.voterId}>
                <td>{voter.name}</td>
                <td>{voter.age}</td>
                <td>{voter.gender}</td>
              </tr>
            ))
          ) : (
            <p></p>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default VoterDisplay
