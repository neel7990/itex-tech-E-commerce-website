import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  // eslint-disable-next-line
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { emptyCart } from "./cartHelpers"; // eslint-disable-next-line
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";
// import { isAuthenticated } from "../auth/index";s


import "./card.css";

const { user, token } = isAuthenticated();



const Checkout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data && data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token); // eslint-disable-next-line
  }, []);




  

    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm('service_1l5fm5f', 'template_nbfdebr', e.target, 'HBroR6S0G3q_o4oow')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

  


    
const countries=[
  {id:"",name:" Alabama"},
  {id:"",name:" Alaska"},
  {id:"",name:" Arizona"},
  {id:"",name:" Arkansas"},
  {id:"",name:"California "},
  {id:"",name:" Colorado"},
  {id:"",name:" Connecticut"},
  {id:"",name:"Delaware "},
  {id:"",name:" Florida"},
  {id:"",name:"Georgia "},
  {id:"",name:"Hawaii "},
  {id:"",name:" Idaho"},
  {id:"",name:"Illinois "},
  {id:"",name:" Indiana"},
  {id:"",name:" Iowa"},
  {id:"",name:"Kansas "},
  {id:"",name:" Kentucky"},
  {id:"",name:"Louisiana "},
  {id:"",name:" Maine"},
  {id:"",name:"Maryland "},
  {id:"",name:"Massachusetts "},
  {id:"",name:"Michigan "},
  {id:"",name:"Minnesota "},
  {id:"",name:"Mississippi "},
  {id:"",name:"Missouri "},
  {id:"",name:"Montana "},
  {id:"",name:"Nebraska "},
  {id:"",name:" Nevada"},
  {id:"",name:"New Hampshire "},
  {id:"",name:" New Hampshire"},
  {id:"",name:"New Jersey "},
  {id:"",name:"New Mexico "},
  {id:"",name:"New York "},
  {id:"",name:"North Carolina "},
  {id:"",name:"North Dakota "},
  {id:"",name:"Ohio "},
  {id:"",name:"Oklahoma "},
  {id:"",name:"Oregon "},
  {id:"",name:"Pennsylvania "},
  {id:"",name:" Rhode Island"},
  {id:"",name:"South Carolina "},
  {id:"",name:" South Dakota "},
  {id:"",name:"Tennessee "},
  {id:"",name:"Texas "},
  {id:"",name:" Utah"},
  {id:"",name:"Vermont "},
  {id:"",name:"Virginia "},
  {id:"",name:"Wyoming "},
  {id:"",name:"Washington "},
  {id:"",name:"West Virginia "},
  {id:"",name:" Wisconsin"},

  
  
];
const[country,setCountry]=useState([]);
useEffect(()=>{
  setCountry(countries);
},[])

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-md btn-outline-success">
          Sign in to checkout
        </button>
      </Link>
    );
  };
  let delAddress = data.address;
  const buy = () => {
    let NAME = document.getElementById("showhide");
    NAME.className = "ui primary loading button fluid";
    setData({ loading: true });
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce; // eslint-disable-next-line
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //     "send nonce and total to process: ",
        //     nonce,
        //     getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            // empty cart
            // create order

            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: delAddress,
            };

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  console.log("payment success and empty cart");
                  setData({ loading: false, success: true });
                  let NAME = document.getElementById("showhide");
                  NAME.className = "ui success button fluid";
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false, success: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false, success: true });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };
 
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <>
        {/* <div> */}
          <div onChange={handleAddress}
          className="form-control"
          // value={data.address}
          >
            {/* <label className="text-muted">Delivery address:</label> */}
            {/* <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here..."
            /> */}
          {/* </div> */}
          
               
                    
           <input type="text" className="form-control input-lg" placeholder="City" />
         </div>
         <div className="col-xs-12">
           <br />
         </div>
         
           <div className="col-xs-6">
          
           <input className="form-control input-lg" type="number" pattern="[0-9]*" inputmode="numeric" placeholder="Zip Code" />
         </div>
         <br></br>
           <div className="col-xs-6">
          
           <input className="form-control input-lg" type="text" pattern="[0-9]*" inputmode="numeric" placeholder="Street Address" />
         </div>
         <br></br>
           <div className="col-xs-6">
          
           <input className="form-control input-lg" type="text" pattern="[0-9]*" inputmode="numeric" placeholder="Apt, Suite, etc." />
         </div>
         <br></br>
         <div className="country">
    
    <select id="ddlCountry" className="form-control select-class" placeholder="State"  >
     <option value="0">Select State</option>
     {
    country &&
    country !==undefined?
    country.map((ctr,index)=>{
      return(
        <option key={index}value={ctr.id}>{ctr.name}</option>
      )

    })
    :"no country"

  }
        </select>
  </div>
  <br></br>
           <div class="col-xs-6">
          
           <input class="form-control input-lg" type="number" pattern="[0-9]*" inputmode="numeric" placeholder="Phone Number" />
         </div>
         
         <div class="col-xs-6">
           <br />
           

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button
            onClick={buy}
            id="showhide"
            className="btn btn-success btn-block"
          >
            Pay
          </button>
        </div>
        </>
      ) : null}
    </div>
    
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >



<div className="container">
            <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                      <div id="emailbolte">
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Name" value="itextech" name="name"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" value={user.email} name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Subject" value="payment to itextech is confirmed" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" value="{$getTotal()} your payment was successfull" name="message"></textarea>
                        </div>
                        </div>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="send reciept on email"></input>  
                        </div>
                    
                </form> 
            </div>



      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = (loading) =>
    loading && <h2 className="text-danger">Loading...</h2>;

  return (
    <div>
      
      <h3>
        Total:<span className="lead text-success">${getTotal()}</span>
      </h3>
      <br></br>
      
  
  
  <div className="col-xs-12">
           





              
            
{/*                
           <input type="text" className="form-control input-lg" placeholder="City" />
         </div>
         <div className="col-xs-12">
           <br />
         </div>
         
           <div className="col-xs-6">
          
           <input className="form-control input-lg" type="number" pattern="[0-9]*" inputmode="numeric" placeholder="Zip Code" />
         </div>
         <br></br>
           <div className="col-xs-6">
          
           <input className="form-control input-lg" type="text" pattern="[0-9]*" inputmode="numeric" placeholder="Street Address" />
         </div>
         <br></br>
           <div className="col-xs-6">
          
           <input className="form-control input-lg" type="text" pattern="[0-9]*" inputmode="numeric" placeholder="Apt, Suite, etc." />
         </div>
         <br></br>
         <div className="country">
    
    <select id="ddlCountry" className="form-control select-class" placeholder="State"  >
     <option value="0">Select State</option>
     {
    country &&
    country !==undefined?
    country.map((ctr,index)=>{
      return(
        <option key={index}value={ctr.id}>{ctr.name}</option>
      )

    })
    :"no country"

  }
        </select>
  </div>
  <br></br>
           <div class="col-xs-6">
          
           <input class="form-control input-lg" type="number" pattern="[0-9]*" inputmode="numeric" placeholder="Phone Number" />
         </div>
         
         <div class="col-xs-6">
           <br /> */}

         </div>
  <br></br>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {isAuthenticated() ? showError(data.error) : null}
      {showCheckout()}
      
      
    </div>
  );
};

export default Checkout;