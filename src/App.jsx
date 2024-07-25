import { useState } from 'react'
import './App.css'
import Forum from './components/Forum'

function App() {

  const addRecord = async(record) => {
    try{
      const res = await fetch("http://localhost:8080/records",{
        method: "POST",
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify(record)
      })
      const data = await res.json();
      console.log(data)
      console.log("Successfully uploaded")
    }catch(e){
      console.log(e);
    }
  }

  return (
    <>
     <Forum onAdd={addRecord}/>
    </>
  )
}

export default App
