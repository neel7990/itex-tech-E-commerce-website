
import React from "react";
import {useEffect, useState} from 'react';
 function App(){
  
const countries=[
  {id:"1",name:"Canada"},
  {id:"2",name:"USA"}
];
 
  

  
    
   
      
const states=[ 
  //canada states
  {id:"1",countryId:"1",name: "Alberta" },
  {id:"2",countryId:"1",name: "British Columbia" },
  {id:"3",countryId:"1",name: " Manitoba" },
  {id:"4",countryId:"1",name: "New Brunswick " },
  {id:"5",countryId:"1",name: "Newfoundland" },
  {id:"6",countryId:"1",name: "Northwest Territories  " },
  {id:"7",countryId:"1",name: " Nova Scotia " },
  {id:"8",countryId:"1",name: "Nunavut  " },
  {id:"9",countryId:"1",name: " Ontario " },
  {id:"10",countryId:"1",name:"Prince Edward Island "},
  {id:"11",countryId:"1",name:"Quebec "},
  {id:"12",countryId:"1",name:"Saskatchewan "},
  {id:"13",countryId:"1",name:"  Yukon Territory "},
  //USA states
  {id:"14",countryId:"2",name:" Alabama"},
  {id:"15",countryId:"2",name:" Alaska"},
  {id:"16",countryId:"2",name:" Arizona"},
  {id:"17",countryId:"2",name:" Arkansas"},
  {id:"18",countryId:"2",name:"California "},
  {id:"19",countryId:"2",name:" Colorado"},
  {id:"20",countryId:"2",name:" Connecticut"},
  {id:"21",countryId:"2",name:"Delaware "},
  {id:"22",countryId:"2",name:" Florida"},
  {id:"23",countryId:"2",name:"Georgia "},
  {id:"24",countryId:"2",name:"Hawaii "},
  {id:"25",countryId:"2",name:" Idaho"},
  {id:"26",countryId:"2",name:"Illinois "},
  {id:"27",countryId:"2",name:" Indiana"},
  {id:"28",countryId:"2",name:" Iowa"},
  {id:"29",countryId:"2",name:"Kansas "},
  {id:"30",countryId:"2",name:" Kentucky"},
  {id:"31",countryId:"2",name:"Louisiana "},
  {id:"32",countryId:"2",name:" Maine"},
  {id:"33",countryId:"2",name:"Maryland "},
  {id:"34",countryId:"2",name:"Massachusetts "},
  {id:"35",countryId:"2",name:"Michigan "},
  {id:"36",countryId:"2",name:"Minnesota "},
  {id:"37",countryId:"2",name:"Mississippi "},
  {id:"38",countryId:"2",name:"Missouri "},
  {id:"39",countryId:"2",name:"Montana "},
  {id:"40",countryId:"2",name:"Nebraska "},
  {id:"41",countryId:"2",name:" Nevada"},
  {id:"42",countryId:"2",name:"New Hampshire "},
  {id:"43",countryId:"2",name:" New Hampshire"},
  {id:"44",countryId:"2",name:"New Jersey "},
  {id:"45",countryId:"2",name:"New Mexico "},
  {id:"46",countryId:"2",name:"New York "},
  {id:"47",countryId:"2",name:"North Carolina "},
  {id:"48",countryId:"2",name:"North Dakota "},
  {id:"49",countryId:"2",name:"Ohio "},
  {id:"50",countryId:"2",name:"Oklahoma "},
  {id:"51",countryId:"2",name:"Oregon "},
  {id:"52",countryId:"2",name:"Pennsylvania "},
  {id:"53",countryId:"2",name:" Rhode Island"},
  {id:"54",countryId:"2",name:"South Carolina "},
  {id:"55",countryId:"2",name:" South Dakota "},
  {id:"56",countryId:"2",name:"Tennessee "},
  {id:"57",countryId:"2",name:"Texas "},
  {id:"58",countryId:"2",name:" Utah"},
  {id:"59",countryId:"2",name:"Vermont "},
  {id:"60",countryId:"2",name:"Virginia "},
  {id:"61",countryId:"2",name:"Washington "},
  {id:"62",countryId:"2",name:"West Virginia "},
  {id:"63",countryId:"2",name:" Wisconsin"},
  {id:"64",countryId:"2",name:"Wyoming "},
  
   
]
const[country,setCountry]=useState([]);
const [state,setState]=useState([]);
// const [city, setCity]= useState([]);


useEffect(()=>{
  setCountry(countries);
},[])
const handleCountry=(id)=>{
  const dt=states.filter(x=>x.countryId=== id);
  setState(dt);
}

                      

 

return(
  <div className="checkout">
    
    <div className="country">
    <label>Country</label>
     <select id="ddlCountry" className="form-control select-class"   onChange={(e)=> handleCountry(e.target.value)}>
      <option value="0">Select Country</option>
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
   <div className="state">
    <label>State</label>
   <select id="ddlStates" className="form-control select-class" >
      <option value="0">Select State</option>
      {
     state &&
     state !==undefined?
     state.map((ctr,index)=>{
       return(
         <option key={index}value={ctr.id}>{ctr.name}</option>
       )

     })
     :"no state"

   }
   </select>
   </div>
   <br></br>
   <div className="city">
   <div className="col-xs-12">
                <label>City</label>
                <input type="text" class="form-control input-lg" />
              </div>
              </div>
              <br></br>
              <div className="zip">
              <div class="col-xs-6">
                <label>Zip</label>
                <input class="form-control input-lg" type="text" pattern="[0-9]*" inputmode="numeric" />
              </div>
              </div>
              <br></br>
              <div className="address">
              <div class="col-lg-4">
                <label>Address Line 1</label>
                <input class="form-control input-lg" type="text" pattern="[0-9]*" inputmode="numeric" placeholder="Apt,Suite, etc." />
              </div>
              </div>
              <br>
              </br>
              <div className="address-2">
              <div class="col-lg-4">
                <label>Address Line 2</label>
                <input class="form-control input-lg" type="text" pattern="[0-9]*" inputmode="numeric" placeholder="Street no, Area" />
                          
                          </div>
                          </div>


  
   </div>
        );
  
 
    
 }
 export default App;