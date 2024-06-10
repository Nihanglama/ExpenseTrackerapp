import React, { useState, useEffect, useDebugValue } from "react";
import "../../assets/Styles/userdash.css";
import logo from "../../assets/Images/logo.png";
import Deposit from "../Cash/Deposit";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from "../Edit";


import axios from "axios";

const Userdash = () => {
  const [activeBusiness, setActiveBusiness] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newBusinessName, setNewBusinessName] = useState("");
  const [hasuser, setHasUser] = useState(null);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [durationFilter, setDurationFilter] = useState("All time");
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [opendialog, setOpenDialog] = useState(false);
  const [deleteitem, setDeleteName] = useState();
  const [edititem,setEditItem]=useState();
  const [openedit,setOpenEdit]=useState();
  const [choosebusiness,setChooseBusiness]=useState();
  const [choosetransaction,setChooseTransaction]=useState([]);

  const isAuthencated = !!localStorage.getItem("token");
  if (!isAuthencated) {
    window.location.href = "/login";
    return null;
  }
  useEffect(() => {
    if (isAuthencated) {
      setHasUser(localStorage.getItem("name"));
    }
  }, []);
  const token = localStorage.getItem("token");

  const handleNewBusinessChange = (event) => {
    setNewBusinessName(event.target.value);
  };

  useEffect(() => {
    async function listBusiness() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/list_business",
          {
            headers: {
              Authorization: "Token " + token,
            },
          }
        );
        setBusinesses(response.data);
      } catch (error) {
        if (error.response) {
          toast.error("couldn't fetch data")
        } else {
          toast.error(error)
        }
      }
    }
    listBusiness();
    setActiveBusiness(false);
  }, [activeBusiness]);

  async function handleNewBusinessSubmit(event) {
    event.preventDefault();
    // const token="d3b24b841b6500c8e6ac14d061dd0850d9df2542"
    try {
      console.log(newBusinessName);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add_business",
        {
          name: newBusinessName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      );

      console.log(response.data.created);
      setActiveBusiness(true);
      setNewBusinessName("");
      setIsFormVisible(false);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function listTransaction(name) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/list_transaction/${name}`,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      setTransactions(response.data);
      setChooseBusiness(name)
    } catch (error) {}
  }
  const handleDelete = (name) => {
    let ele = document.getElementById("main_container");
    ele.style.display = "none";
    document.body.style.background="#333"

    setOpenDialog(true);
    setDeleteName(name);
  };
  const onchange=()=>{
    document.getElementById("main_container").style.display = "block";
    document.body.style.background="white"
    setOpenDialog(false);
    setOpenEdit(false)
  }

  const delete_name = async () => {
    
    try {
      let url='';
      if(isNaN(deleteitem)){
        url= `http://127.0.0.1:8000/api/delete/${deleteitem}`
      }
      else{
        url= `http://127.0.0.1:8000/api/deletes/${deleteitem}`
  
      }
      const response = await axios.delete(
        url,
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      onchange();
      window.location.reload();
      setActiveBusiness(true);
      toast.success("Item deleted")
    } catch (error) {
      if (error.response) {
        toast.error("couldn't delete")
      } else {
        toast.error(error)
      }
    }
  };
  const handleEdit=(id)=>{
    let ele = document.getElementById("main_container");
    ele.style.display = "none";
    document.body.style.background="#333"
    console.log(id)
    const transaction=transactions.filter(transaction=>transaction.id===id)
    setChooseTransaction(transaction[0])
    setOpenEdit(true);
    setEditItem(id);
  }



  const handleDepositClick = () => {
    setShowDepositForm(true);
  };

  const handleWithdrawClick = () => {
    setShowDepositForm(true);
  };

  const handleCloseForm = () => {
    setShowDepositForm(false);
    // setOpenEdit(false);
  };

  const handleDurationFilterChange = (event) => {
    setDurationFilter(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const applyFilters = (transactions) => {
    let filteredTransactions = transactions;

    // Filter by type
    if (typeFilter !== "All") {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.types === typeFilter.toLowerCase()
      );
    }

    const now = new Date();
    filteredTransactions = filteredTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      if (durationFilter === "Today") {
        return transactionDate.toDateString() === now.toDateString();
      } else if (durationFilter === "This Week") {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        return transactionDate >= weekStart && transactionDate < weekEnd;
      } else if (durationFilter === "This Month") {
        return (
          transactionDate.getMonth() === now.getMonth() &&
          transactionDate.getFullYear() === now.getFullYear()
        );
      } else {
        return true;
      }
    });
    // Filter by search query
    if (searchQuery.trim() !== "") {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.remarks.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredTransactions;
  };

  const filteredTransactions = applyFilters(transactions);

  const cashIn = filteredTransactions
    .filter((transaction) => transaction.types === "deposit")
    .reduce(
      (acc, transaction) => parseInt(acc) + parseInt(transaction.amount),
      0
    );

  const cashOut = filteredTransactions
    .filter((transaction) => transaction.types === "withdraw")
    .reduce(
      (acc, transaction) => parseInt(acc) + parseInt(transaction.amount),
      0
    );

  const netBalance = cashIn - cashOut;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Date & Time", "Name", "Details", "Category", "Amount", "Type"]],
      body: filteredTransactions.map((transaction) => [
        transaction.date,
        transaction.contact_name,
        transaction.remarks,
        transaction.payment_category,
        transaction.amount,
        transaction.types,
      ]),
    });
    doc.save("transactions.pdf");
  };

  return (
    <div className="app-container" id="wrapper">
      <div className="wapper-di" id="main_container">
        <Navbar user={hasuser} />
        <div className="main-content globalFonts">
          <Sidebar
            handleDelete={handleDelete}
            activeBusiness={activeBusiness}
            listTransaction={listTransaction}
            businesses={businesses}
            isFormVisible={isFormVisible}
            toggleFormVisibility={() => setIsFormVisible(!isFormVisible)}
            newBusinessName={newBusinessName}
            handleNewBusinessChange={handleNewBusinessChange}
            handleNewBusinessSubmit={handleNewBusinessSubmit}
          />

          <div className="transaction">
            <Feature
              onDepositClick={handleDepositClick}
              onWithdrawClick={handleWithdrawClick}
              onDownloadPDF={downloadPDF}
              onDurationFilterChange={handleDurationFilterChange}
              onTypeFilterChange={handleTypeFilterChange}
              onSearchChange={handleSearchChange}
            />
            <TransactionPanel
              cashIn={cashIn}
              cashOut={cashOut}
              netBalance={netBalance}
            />
            <TransactionTable 
            transactions={filteredTransactions}
            handle={handleDelete}
            handleEdit={handleEdit}
            />
          </div>
        </div>
      </div>
      <div className="right-form">
        {showDepositForm && (
          <Deposit onClose={handleCloseForm} businesses={businesses} />
        )}
      </div>
      {openedit && (<Edit  choosetransaction={choosetransaction} choosebusiness={choosebusiness} onClose={onchange}/>)}

      {opendialog && (
        <div id="delete_dialog">
          <h2>Delete Business</h2>
          <p>Are you sure you want to delete ?</p>
          <div id="inner_delete">
            <button onClick={delete_name} id="yes">yes</button>
            <button id="no" onClick={onchange}>no</button>
          </div>
        </div>
      )}

      {error && <p id="uploading">{error}</p>}
    </div>
  );
};

const Navbar = ({ user }) => (
  <nav>
    <div className="nav-logo">
      <img src={logo} alt="logo" />
    </div>
    <div className="user-settings">
      {user ? (
        <div>
          <button className="globalFonts">Welcome, {user}!</button>
          <Link className="logout" to="/logout">
            Logout
          </Link>
        </div>
      ) : null}
    </div>
  </nav>
);

const Feature = ({
  onDepositClick,
  onWithdrawClick,
  onDownloadPDF,
  onDurationFilterChange,
  onTypeFilterChange,
  onSearchChange,
}) => {
  return (
    <div className="dashboard-container">
      <div className="filters-container">
        <select className="filter-dropdown" onChange={onDurationFilterChange}>
          <option value="All time">Duration: All time</option>
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
        <select className="filter-dropdown" onChange={onTypeFilterChange}>
          <option value="All">Types: All</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
        </select>
        <button className="download-button" onClick={onDownloadPDF}>
          ⬇ Download PDF
        </button>
      </div>
      <div className="horizontal-line"></div>
      <div className="search-container">
        <div className="search-container-search-group">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Remarks"
            onChange={onSearchChange}
          />
          <button className="search-button">🔍</button>
        </div>

        <div className="actions-container">
          <button className="deposit-button" onClick={onDepositClick}>
            + Deposit
          </button>
          <button className="withdraw-button" onClick={onWithdrawClick}>
            − Withdraw
          </button>
        </div>
      </div>
      <div className="horizontal-line"></div>
    </div>
  );
};

const Sidebar = ({
  activeBusiness,
  listTransaction,
  businesses,
  handleDelete,
  isFormVisible,
  toggleFormVisibility,
  newBusinessName,
  handleNewBusinessChange,
  handleNewBusinessSubmit,
}) => (
  <aside>
    <button className="globalFonts" onClick={toggleFormVisibility}>
      + Add New Business
    </button>
    {isFormVisible && (
      <form className="Newbusiness" onSubmit={handleNewBusinessSubmit}>
        <img src={logo} alt="logo" />
        <input
          type="text"
          placeholder=" Enter your new Business"
          value={newBusinessName}
          onChange={handleNewBusinessChange}
        />
        <button type="submit">Create</button>
      </form>
    )}
    {businesses.map((business, index) => (
      <div id="business_names" key={index}>
        <button
          id="globalFonts"
          className={activeBusiness === business ? "active" : ""}
          onClick={() => listTransaction(business.name)}
        >
          {business.name}
        </button>
        <i
          class="fa-solid fa-minus fa-xl"
          onClick={() => handleDelete(business.name)}
        ></i>
      </div>
    ))}
  </aside>
);

const TransactionPanel = ({ cashIn, cashOut, netBalance }) => (
  <div className="transaction-panel">
    <div className="cash-in">Cash In: {cashIn}</div>
    <div className="cash-out">Cash Out: {cashOut}</div>
    <div className="net-balance">Net Balance: {netBalance}</div>
  </div>
);

const TransactionTable = ({ transactions,handle,handleEdit }) => (
  <table>
    <thead>
      <tr>
        <th>Date & Time</th>
        <th>Name</th>
        <th>Details</th>
        <th>Category</th>
        <th>Amount</th>
        <th>Types</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((transaction, index) => (
        <tr key={index}>
          <td>{transaction.date}</td>
          <td>{transaction.contact_name}</td>
          <td>{transaction.remarks}</td>
          <td>{transaction.payment_category}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.types}</td>
          <td><i class="fa-solid fa-delete-left fa-lg" onClick={()=>handle(parseInt(transaction.id))}></i></td>
          <td><i class="fa-solid fa-pen-to-square fa-lg" onClick={()=>handleEdit(parseInt(transaction.id))}></i></td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Userdash;
