import React, { useContext, useEffect, useState } from 'react'
import { WalletContext } from './Wallet'

function VotingStatus() {

    const{contract} = useContext(WalletContext)
    const [voteStatus,setvoteStatus] = useState("");

    useEffect(()=>{

        const checkVotingStatus = async()=>{
            const status = await contract.methods.votingStatus().call()
            setvoteStatus(status);
        }
        contract && checkVotingStatus();
    },[contract])

  return (
    <div>
      Voting Status : {voteStatus}
    </div>
  )
}

export default VotingStatus
