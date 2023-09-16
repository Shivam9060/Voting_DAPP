import React, { useContext, useEffect, useState } from 'react'
import { WalletContext } from './Wallet'
import "./CandidateDisplay/CandidateDisplay.css"

function CandidateDisplay() {

  const [ candidates,setCandidates] = useState([])

  const{contract} = useContext(WalletContext)

  useEffect(()=>{
    const candidateInfo = async() =>{
      const candidates = await contract.methods.candidateList().call();
      setCandidates(candidates);
   }
   contract && candidateInfo()
  },[contract])
  if (candidates.length === 0) {
    return null;
  }

  return (
    <div className="table-container">
      <table className="voter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <tr key={candidate.party}>
                <td>{candidate.name}</td>
                <td>{candidate.party}</td>
                <td>{candidate.votes}</td>
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

export default CandidateDisplay
