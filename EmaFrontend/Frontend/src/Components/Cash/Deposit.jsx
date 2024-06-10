import { useEffect, useState } from "react";
import "./DepositForm.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Deposit({ onClose ,businesses}) {
  const [name, setName] = useState(businesses[0].name);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [amount, setAmount] = useState("");
  const [contactName, setContactName] = useState("");
  const [remark, setRemark] = useState("");
  const [paymentCategory, setPaymentCategory] = useState("Esewa");


  const setPaymentCategorys =(event)=>{
    setPaymentCategory(event.target.value);
  }
  const setNames=(event)=>{
    setName(event.target.value)
  }

  async function handleSubmit(event, type) {
    event.preventDefault();
    const isAuthencated = !!localStorage.getItem("token");
    if (!isAuthencated) {
      window.location.href = "/login";
      return null;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/transact",
        {
          name: name,
          date: date,
          types: type,
          remarks: remark,
          amount: amount,
          payment_category: paymentCategory,
          contact_name: contactName,
        },
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      );
      toast.success(response.data["added"]);
      onClose();
    } catch (error) {
      if (error.response) {
        toast.error("please all the fields")
      } else {
        toast.error(error)
      }
    }
  }
  return (
    <div className="form-container">
      <form className="deposit-form globalFonts">
        <button type="button" className="close-button" onClick={onClose}>
          ×
        </button>
        <h3 style={{ textAlign: "center", margin: "12px" }}>
          Add Deposit and Withdraw Entry
        </h3>
        <div className="form-group">
          <label htmlFor="date">Date*</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            inputFormat="YYYY-MM-dd"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">BusinessName</label>
          <select onChange={(e) => setNames(event)} id="paymentCategory" value={name}>
          {businesses.map((business,index) => (
                   <option value={business.name} key={index}>{business.name}</option>
          ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Enter Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactName">Contact Name</label>
          <input
            type="text"
            id="contactName"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="remark">Remark</label>
          <input
            type="text"
            id="remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentCategory" id="options">Payment Category</label>
          <select onChange={(e) => setPaymentCategorys(event)} id="paymentCategory">
            <option value="Esewa">Esewa</option>
            <option value="Khalti">Khalti</option>
            <option value="Fonepay">Fonepay</option>
            <option value="Imepay">Imepay</option>
            <option value="Bank">Bank</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <div className="buttons">
          <button
            type="submit"
            className="btn btn-deposit"
            onClick={(event) => handleSubmit(event, "deposit")}
          >
            Deposit
          </button>
          <button
            type="submit"
            className="btn btn-withdraw"
            onClick={(event) => handleSubmit(event, "withdraw")}
          >
            Withdraw
          </button>
        </div>
      </form>
      
      </div>
  );
}

export default Deposit;
