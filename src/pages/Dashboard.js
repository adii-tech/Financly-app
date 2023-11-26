import React, { useEffect } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { useState } from 'react';
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';
import {useAuthState} from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import {addDoc, collection, getDocs, query} from 'firebase/firestore';
import {db, auth, provider, doc, setDoc} from "../firebase";
import moment from 'moment';
import TransactionsTable from '../components/TransactionsTable';

const Dashboard = () => {
//  const transaction=[
//   {
//     type:"income",
//     amount:1200,
//     tag:"salary",
//     name:"income 1",
//     date:"2023-05-23",
//   },
//   {
//     type:"expense",
//     amount:800,
//     tag:"food",
//     name:"expense 1",
//     date:"2023-05-17",
//   }
//  ] 
 const [transactions, setTransactions]=useState([]);
 const[loading, setLoading]=useState(false);
 const[income, setIncome]=useState(0);
 const[expense, setExpense]=useState(0);
 const[totalBalance, setTotalBalance]=useState(0);
 const [user]=useAuthState(auth); 
 const [isExpenseModalVisible, setIsExpenseModalVisible]=useState(false);
 const [isIncomeModalVisible, setIsIncomeModalVisible]=useState(false);
 const showExpenseModal =()=>{
  setIsExpenseModalVisible(true);
 };
 const showIncomeModal=()=>{
  setIsIncomeModalVisible(true);
 };
 const handleExpenseCancel =()=>{
  setIsExpenseModalVisible(false);
 };
 const handleIncomeCancel =()=>{
  setIsIncomeModalVisible(false);
 };
 const onFinish=(values, type)=>{
    console.log("On Finish",values, type)
    const newTransaction ={
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name:values.name,
    }
     addTransaction(newTransaction);
 }
 async function addTransaction(transaction){
   try{
    const docRef=await addDoc(
      collection(db, `users/${user.uid}/transactions`),
      transaction
    );
     console.log("Document written with ID: ",docRef.id);
     toast.success("Transaction Added!");
     let newArr=transactions;
     newArr.push(transaction);
     setTransactions(newArr);
     calculateBalance();
   }catch(e){
     console.log("Error adding document: ",e);
      toast.error("Cauldn't add transaction ")
   }
 }

 async function fetchTransactions(){
  setLoading(true);
  if(user){
    const q=query(collection(db, `users/${user.uid}/transactions`));
    const querySnapshot=await getDocs(q);
    let transactionsArray=[];
    querySnapshot.forEach((doc)=>{
     transactionsArray.push(doc.data());
    });
    setTransactions(transactionsArray);
    toast.success("Transactions Fetched!")
  }
  setLoading(false);
 }
    useEffect(()=>{
      //fetch Data
      fetchTransactions();
    },[user])

    useEffect(()=>{
      calculateBalance();
    },[transactions]);
    
    function calculateBalance(){
      let incomeTotal=0;
      let expensesTotal=0;

      transactions.forEach((transaction)=>{
        if(transaction.type==="income"){
          incomeTotal+=transaction.amount;
        }else{
          expensesTotal+=transaction.amount;
        }
      });
      setIncome(incomeTotal);
      setExpense(expensesTotal);
      setTotalBalance(incomeTotal-expensesTotal);
    }
  return (
    <div>
        <Header />
        {loading ?(<p>Loading...</p>):
       (<Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
         showExpenseModal={showExpenseModal}
         showIncomeModal={showIncomeModal}
         handleExpenseCancel={handleExpenseCancel}
         handleIncomeCancel={handleIncomeCancel}
         />)}

         <AddExpenseModal 
          isExpenseModalVisible={isExpenseModalVisible}
          handleExpenseCancel={handleExpenseCancel}
          onFinish={onFinish}
         />
         <AddIncomeModal 
           isIncomeModalVisible={isIncomeModalVisible}
           handleIncomeCancel={handleIncomeCancel}
           onFinish={onFinish}
         />
         <TransactionsTable transactions={transactions}/>
    </div>
  )
}

export default Dashboard
