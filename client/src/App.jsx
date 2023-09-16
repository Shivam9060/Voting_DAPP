import { useState } from "react"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import AccountList from "./pages/AccountList/AccountList"
import CandidateRegister from "./pages/CandidateRegister/CandidateRegister"
import ElectionCommision from "./pages/ElectionCommission/ElectionCommision"
import VoterRegister from "./pages/VoterRegister/VoterRegister"
import Wallet from './components/Wallet'

function App() {

  const [account,setAccount] = useState("");

  const saveAccount = (address)=>{
    setAccount(address);
  }
  
  const router = createBrowserRouter([
    {path:"/",element:<AccountList saveAccount={saveAccount}/>},
    {path:"/candidate",element:<CandidateRegister account={account}/>},
    {path:"/voter",element:<VoterRegister account={account}/>},
    {path:"/election-commision",element:<ElectionCommision account={account}/>},
  ])

  

  return (
    <>
      <Wallet>
      <RouterProvider router={router}></RouterProvider>
      </Wallet>
    </>
  )
}

export default App
