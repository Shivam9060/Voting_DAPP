import { useEffect,useState ,createContext} from "react"
import PropTypes  from "prop-types"
import Web3 from "web3"
import ABI from "./ABI.json"

const WalletContext = createContext();

function Wallet({ children }){

    const[state,setState] = useState({web3:null, contract:null})

    useEffect(()=>{
        const init = async ()=>{
            const web3 = new Web3("HTTP://127.0.0.1:7545");
            const contractAddress = "0x870888935cfc5591cbB0da605498700f35A14324";
            // to create contract instances = ABI + contract address
            const contract = new web3.eth.Contract(ABI,contractAddress);
            setState({web3:web3, contract:contract})
        }
        init()
    },[])

    return (
        <WalletContext.Provider value={state}>
            {children}
        </WalletContext.Provider>
    )
}


Wallet.propTypes = {
    children: PropTypes.node.isRequired,
} 

export {WalletContext}

export default Wallet