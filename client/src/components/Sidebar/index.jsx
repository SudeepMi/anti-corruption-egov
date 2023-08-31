import React from "react";
import "./style.css";
import Avatar from "@mui/material/Avatar";
import { Link } from 'react-router-dom'
import Api from "../../utils/Api";
import { toast, ToastContainer } from "react-toastify";

function Sidebar({ user }) {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [endpoint, setEndpoint] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Submitted");
    const intToast = toast.loading("Creating")
    await Api.post("/endpoints/", {
      name,
      description,
      endpoint,
    }).then(async (res) => {
      if (res.status === 201) {
        setName("");
        setDescription("");
        setEndpoint("");
        toast.dismiss(intToast);
        await toast.success("Successfully Created", {
          closeButton: false,
        });
      }
    }).catch((err) => {
      toast.dismiss(intToast);
      toast.error("Creation Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    });
  };

  return (
    <div className="row">
      <ToastContainer />
      <div className="sidebar__container col-md-6  m-auto">
      <div className="add_api ">
      { user.isAdmin && <div className='form-group mt-5'>
        <h5>Admin Area : Add APIs </h5>
        <input type="text" className='form-control my-2' placeholder="API Name" onChange={e=>setName(e.target.value) } />
        <textarea placeholder="API Description"  className='form-control my-2'
        onChange={
          e=>setDescription(e.target.value)
        } />
        <input type="text" placeholder="API Endpoint"  className='form-control my-2'
        onChange={
          e=>setEndpoint(e.target.value)
        } />
        <button onClick={handleSubmit} className='btn btn-sm btn-outline-dark'>Add API</button>
      </div> }
      </div>
      </div>
    </div>
  );
}

export default Sidebar;
