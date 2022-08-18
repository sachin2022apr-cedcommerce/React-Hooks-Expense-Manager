import React, { useState } from 'react'
export default function ExpenseManager() {

    // income, expense, balance variable 
    var totalIncome = 0;
    var totalBalance = 0;
    var totalExpense = 0;

    // states for edit transactions
    const [editIndex, setEditIndex] = useState();
    const [editExpense, setEditExpense] = useState("");
    const [expenseCategory, setExpenseCategory] = useState("Grocery");
    const [editIncome, seteditIncome] = useState("");

    // states for buttons of add income & add expense
    const [incomeBtn, setincomeBtn] = useState("Add");
    const [expenseBtn, setExpenseBtn] = useState("Add");
    const [transactionType, setTransactionType] = useState("Expense");

    // Expense List
    var ExpenseArrayType = ["Grocery", "Veggies", "Travelling", "Miscellaneous"];

    // Transactions List
    const [transactionArr, setTransactionArr] = useState([]);

    // Add Income function
    const addIncome = (event) => {
        event.preventDefault();
        if (incomeBtn === "Add")
            setTransactionArr(transactionArr => [...transactionArr, ["income", "income", Number(editIncome)]]);
        else {
            transactionArr[editIndex] = ["income", "income", Number(editIncome)];
            setincomeBtn("Add")
        }
    }

    // Add expense function
    const addExpense = (event) => {
        event.preventDefault();
        if (!(event.target[1].value === "" || event.target[0].value === "" || event.target[1].value === "-select-")) {

            if (expenseBtn === "Add")
                setTransactionArr(transactionArr => [...transactionArr, ["expense", expenseCategory, Number(editExpense)]]);
            else {
                transactionArr[editIndex] = ["expense", expenseCategory, Number(editExpense)];
                setExpenseBtn("Add")
            }
        }
    }

    // edit expense or income
    const editTransaction = (editIndex) => {
        setEditIndex(editIndex);
        transactionArr.map((e, index) => {
            if (index === editIndex) {
                if (e[0] === "income") {
                    setTransactionType("Income")
                    setincomeBtn("Update");
                    seteditIncome(e[2]);
                } else if (e[0] === "expense") {
                    setExpenseBtn("Update");
                    setTransactionType("Expense")
                    setEditExpense(e[2]);
                    setExpenseCategory(e[1]);
                }
            }
        })
    }
    return (
        <div className='manageExpense'>
            <div className='innerManageExpense'>

                {/* head contains Income, Expense, & Remaining balance summary */}
                <div className='head'>
                    <div className='userName'>
                        <h2>Welcome!</h2>
                        <p>Sachin</p>
                    </div>
                    <div style={{ marginRight: "15px" }}>
                        <h3>Balance: {transactionArr.map((e) => {
                            if (e[0] === "income") {
                                totalBalance += e[2];
                            } else if (e[0] === "expense") {
                                totalBalance -= e[2];
                            }
                        })}{totalBalance} <i class="fa-solid fa-indian-rupee-sign"></i></h3>

                        <h3>Income: {transactionArr.map((e) => {
                            if (e[0] === "income") {
                                totalIncome += e[2];
                            }
                        })}{totalIncome} <i class="fa-solid fa-indian-rupee-sign"></i></h3>

                        <h3>Expense: {transactionArr.map((e) => {
                            if (e[0] === "expense") {
                                totalExpense += e[2];
                            }
                        })}{totalExpense} <i class="fa-solid fa-indian-rupee-sign"></i>
                        </h3>
                    </div>
                </div>

                {/* Add income Expense conditional rendering  */}
                <div className='addIncome'>
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-around", marginBottom: "1%" }}>
                        <div style={{ textAlign: "center", color: "#2D3B51" }}>
                            <h1 onClick={() => setTransactionType("Income")} style={{ backgroundColor: "#dbe4f3" }}><i class="fa-solid fa-hand-holding-dollar"></i></h1>
                            <p>Income</p>
                        </div>
                        <div style={{ textAlign: "center", color: "#d9995b" }}>
                            <h1 onClick={() => setTransactionType("Expense")} style={{ backgroundColor: "#fdf7df" }}><i class="fa-solid fa-wallet"></i></h1>
                            <p >Expense</p>
                        </div>
                    </div>

                    {/* Conditional rendering for Add Income and Add Expense Operations */}
                    {(transactionType === "Expense") ?
                        <div className='MainFunction'>
                            <h4>Add Expense</h4>
                            <form onSubmit={addExpense}>
                                <input type="number" onChange={(event) => setEditExpense(event.target.value)} value={editExpense} />

                                <select onChange={(event) => setExpenseCategory(event.target.value)} value={expenseCategory}>
                                    {ExpenseArrayType.map((e) => {
                                        return <option>{e}</option>
                                    })}
                                </select>
                                <button type='submit'>{expenseBtn}</button>
                            </form>
                        </div>
                        : <div style={{ width: "80%" }}>
                            <h4>Add Your Income</h4>
                            <form onSubmit={addIncome}>
                                <input type="number" onChange={(event) => seteditIncome(event.target.value)} value={editIncome} />
                                <button type='submit'>{incomeBtn}</button>
                            </form>
                        </div>

                    }
                </div>

                {/* All Transactions List */}
                <div className='allTransaction'>
                    <h4>All Transaction</h4>
                    <div className='transactionsList'>
                        {transactionArr.map((e, index) => {
                            if (e[0] === "income") {
                                return <div className='transactionUp'>
                                    <h3><i class="fa-solid fa-arrow-trend-up"></i></h3>
                                    <h2>Income</h2>
                                    <h5>+ <i class="fa-solid fa-indian-rupee-sign"></i>{e[2]} <i class="fa-solid fa-pen-to-square" onClick={() => editTransaction(index)}></i></h5>
                                </div>
                            } else {
                                return <div className='transactionDown'>
                                    <h3><i class="fa-solid fa-arrow-trend-down"></i></h3>

                                    <div>
                                        <h2>Expense</h2>
                                        <p>({e[1]})</p>
                                    </div>
                                    <h5>- <i class="fa-solid fa-indian-rupee-sign"></i>{e[2]} <i class="fa-solid fa-pen-to-square" onClick={() => editTransaction(index)}></i></h5>
                                </div>
                            }
                        })
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}