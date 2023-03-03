import React, { useEffect, useState } from "react";
import contract from "./contracts/StackUp.json";
import { ethers } from "ethers";

const contractAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = contract.abi;

function App() {
 const [adminAddr, setAdminAddr] = useState("nil");
 const [currentAccount, setCurrentAccount] = useState(null);
 const [allQuestsInfo, setAllQuestsInfo] = useState(null);

 const connectWalletHandler = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
   try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts);
    setCurrentAccount(accounts[0]);
    console.log("found an account:", accounts[0]);
   } catch (err) {
    console.log(err);
   }
  } else {
   // MetaMask not installed
   console.log("please install metamask");
  }
 };

 const getAdminAddr = async () => {
  try {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const stackupContract = new ethers.Contract(contractAddr, abi, provider);

   const adminAddr = await stackupContract.admin();
   console.log("adminAddr:", adminAddr);
   setAdminAddr(adminAddr);
  } catch (err) {
   console.log("getAdminAddr error...");
   console.log(err);
  }
 };

 const getQuestsInfo = async () => {
  try {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const stackupContract = new ethers.Contract(contractAddr, abi, provider);

   const nextQuestId = await stackupContract.nextQuestId();
   let allQuestsInfo = [];
   let thisQuest;
   for (let i = 0; i < nextQuestId; i++) {
    thisQuest = await stackupContract.quests(i);
    allQuestsInfo.push(thisQuest);
   }
   setAllQuestsInfo(allQuestsInfo);
  } catch (err) {
   console.log("getQuestsInfo error...");
   console.log(err);
  }
 };

 useEffect(() => {
  getAdminAddr();
  getQuestsInfo();
 });

 return (
  <div className="container">
   <h1>Build Your First Dapp</h1>
   <h4>By: REPLACE-WITH-YOUR-STACKUP-USERNAME</h4>
   {currentAccount ? <h4>Wallet connected: {currentAccount}</h4> : <button onClick={connectWalletHandler}>Connect Wallet</button>}
   <h4>Admin address: {adminAddr}</h4>
   <h2>
    <u>All Quests:</u>
   </h2>

   <div>
    {allQuestsInfo &&
     allQuestsInfo.map((quest) => {
      return (
       <div key={quest[0]}>
        <h4>{quest[2]}</h4>
        <ul>
         <li>questId: {quest[0].toString()}</li>
         <li>number of players: {quest[1].toString()}</li>
         <li>reward: {quest[3].toString()}</li>
         <li>number of rewards available: {quest[4].toString()}</li>
        </ul>
       </div>
      );
     })}
   </div>
  </div>
 );
}

export default App;