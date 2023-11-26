import React from 'react';
import './styles.css';
import {Row, Card, Button} from "antd";
import  Buttons from '../Button';

const  Cards = ({income,
                 expense,
                 totalBalance,
                 showExpenseModal,
                 showIncomeModal,
                 handleExpenseCancel,
                 handleIncomeCancel,
                }) => 
      {
  return (
    <div>
        <Row className='my-row'>
        <Card className='my-card'>
            <h2>Current Balance</h2>
             <p>${totalBalance}</p>
             <Buttons text="Reset Balance" blue={true} />
        </Card>
        <Card className='my-card'>
            <h2>Total Income</h2>
             <p>${income}</p>
             <Buttons text="Add Income" blue={true} onClick={showIncomeModal}/>
        </Card>
        <Card className='my-card'>
            <h2>Total Expenses</h2>
             <p>${expense}</p>
             <Buttons text="Add Expenses" blue={true} onClick={showExpenseModal}/>
        </Card>
        </Row>
    </div>
  )
}

export default  Cards;
