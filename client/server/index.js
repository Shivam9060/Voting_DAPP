const {Web3} = require('web3')

const express = require('express')

const ABI = require("./ABI.json")

const app= express()

const cors = require('cors')

app.use(express.json())
app.use(cors())

const web3 = new Web3("HTTP://127.0.0.1:7545");
const contractAddress = "0x870888935cfc5591cbB0da605498700f35A14324";
// to create contract instances = ABI + contract address
const contract = new web3.eth.Contract(ABI,contractAddress);
// console.log(contract)

const genderVerification = (gender)=>{
    const genderValue= gender.toLowerCase();
    if( genderValue === "male" || genderValue === "female" ||genderValue === "others" ){
        return true
    }
    else{
        return false
    }
}

const partyClash = async (party)=>{
    const candidateList = await contract.methods.candidateList().call()
    // console.log(candidateList);
    // console.log(candidateList[0].party);
    const exists = candidateList.some((candidate)=>candidate.party.toLowerCase()===party.toLowerCase());
    return exists;
}

app.post("/api/time-verify",async(req,res)=>{
    const {startInSeconds,endInSeconds}= req.body;
    if(endInSeconds-startInSeconds<86400){
        res.status(200).json({message:"Time is less than 24 hours"})
    }
    else{
        res.status(403).json({message:"Time is greater than 24 hours"})
    }
})


app.post("/api/voter-verify",async(req,res)=>{
    const {gender}= req.body;
    const genderStatus  = genderVerification(gender);
    if(genderStatus===true){
        res.status(200).json({message:"Registration Successful"})
    }
    else{
        res.status(403).json({message:"Gender value invalid"})
    }
})

app.post("/api/candidate-verify",async (req,res)=>{
    const {gender,partyName} = req.body;
    const genderStatus = genderVerification(gender);
    const parttyClashStatus = await partyClash(partyName);
    if(genderStatus===true){
        if(parttyClashStatus===false){
            res.status(200).json({message:"Registration Successful"})
        }
        else{
            res.status(403).json({message:"Party name clashes"})
        }
    }
    else{
        res.status(403).json({message:"Gender value invalid"})
    }
})


app.listen(3000,()=>{
    console.log("Server is listening");
})