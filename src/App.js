import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [data,setData]=useState();
  const [isLoading, setIsLoading]=useState(true)

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get("https://my-deliveroo-backend-project.herokuapp.com/")
        console.log(response.data);
      }
    }
  },[])
  return (
    <div>
      <h1></h1>
      <p></p>
      <img src="" alt="" />
    </div>
  );
}

export default App;
