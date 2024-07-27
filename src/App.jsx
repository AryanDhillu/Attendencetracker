import { useEffect, useState } from 'react'
import Forum from './components/Forum'
import Display from './components/Display'
import Navbar from './components/Navbar'
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [logs, setLogs] = useState([])
  const [count, setCount] = useState(0)
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchLogs();
    }
  }, [isAuthenticated, user]);
  
  const totalclasses = (data) => {
    let total = 0;
    for(const i of data){
      total = total + parseInt(i.classes);
    }
    setCount(total);
  }

  const fetchLogs = async() => {
    try{
      const res = await fetch("https://jsonserver-production-e6f1.up.railway.app/records",{
        method: 'GET',
        headers:{
          "content-type": 'application/json'
        }  
      })
      const data = await res.json();
      const filteredData = data.filter(log => log.userId === user?.sub)
      totalclasses(filteredData)
      setLogs(filteredData);
    }catch(err){
      console.log(err)
    }
  }

  const deleteLog = async(id) => {
    try{
      await fetch(`https://jsonserver-production-e6f1.up.railway.app/records/${id}`,{
        method: "DELETE",
      })
      toast.error("Log deleted successfully!");
    }catch(err){
      console.log(err);
      toast.error("Failed to delete log."); 
    }finally{
      fetchLogs();
    }
  }

  const addRecord = async(record) => {
    record['userId'] =  user.sub;
    try{
      await fetch("https://jsonserver-production-e6f1.up.railway.app/records",{
        method: "POST",
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify(record)
      })
      toast.success("Log added successfully!"); 
    }catch(e){
      console.log(e);
      toast.error("Failed to add log."); 
    }
  }

  return (
    <>
      <Navbar count={count}/>
      {isAuthenticated && 
        <div>
          <Forum onAdd={addRecord} fetchLogs={fetchLogs}/>
          <Display logs={logs} deleteLog={deleteLog}/>
        </div>
      }
      <ToastContainer />
    </>
  )
}

export default App;
