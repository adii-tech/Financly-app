import React, { useState } from 'react';
import './style.css';
import {Radio, Select, Table } from 'antd';
import { Transaction } from 'firebase/firestore';


const TransactionsTable = ({transactions}) => {
    const {Option}=Select;
    const [search, setSearch]=useState("");
    const [typeFilter, setTypeFilter]=useState("");
    const[sortKey, setSortKey]=useState("");
    const columns=[
        {
            title:"Name",
            dataIndex:"name",
            key:"name",
        },
        {
            title:"Amount",
            dataIndex: "amount",
            key:"amount",
        },
        {
            title:"Tag",
            dataIndex: "tag",
            key:"tag",
        },
        {
            title:"Type",
            dataIndex: "type",
            key:"type",
        },
        {
            title:"Date",
            dataIndex: "date",
            key:"date",
        },
    ];
    let filterdTransactions=transactions.filter((item)=>
      item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
    );
   let sortedTransaction= filterdTransactions.sort((a,b)=>{
    if(sortKey==="date"){
        return new Date(a.date)-new Date(b.date);
    }else if(sortKey==="amount"){
        return a.amount-b.amount;
    }else {
        return 0;
    }
   })

  return (
    <>
    <div className='search-sort'>
    <div className='input-flex'>
        {/* <img src={searchImg} width="16"/> */}
        <input 
        value={search}
        placeholder='Search by Name'
        onChange={(e)=>setSearch(e.target.value)}
        />
    </div>
 
      <Select 
       className='select-input'
       onChange={(value)=>setTypeFilter(value)}
       value={typeFilter}
       placeholder="Filter"
       allowClear
       >
        <Option value="">All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
       </Select>
     </div>
     <div className='transactions'>
     <div className='title'>
         <h2>Transactions</h2>
     </div>
     <div className='radio-btn'>
     <Radio.Group
      className="input-radio"
      onChange={(e)=>setSortKey(e.target.value)}
      value={sortKey}
      >
      <Radio.Button value="">No Sort</Radio.Button> 
      <Radio.Button value="date">Sort by Date</Radio.Button>  
      <Radio.Button value="amount">Sort by Amount</Radio.Button>     
    </Radio.Group>
    </div>
    <div className='export-import'>
        <button className='btn'>Export to CSV</button>
        <label for="file-csv" className='btn btn-blue'>
            Import from CSV
        </label>
        <input
          id="file-csv"
          type='file'
          accept='.csv'
          required
          style={{display:"none"}}
          />
    </div>
    </div>  
    <Table dataSource={sortedTransaction} columns={columns}/>
    </>
  )
}

export default TransactionsTable;
