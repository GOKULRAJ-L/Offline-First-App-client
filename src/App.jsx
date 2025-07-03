import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { clearOfflineData, getOfflineData, saveOfflineData } from './config/db'


const App = () => {

  const url ="https://offline-first-app-api.onrender.com"

  const[form ,setform] = useState({
    name:'',email:'',password:''
  })


  const handleChange = (e)=>{
    setform({...form , [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      if(navigator.onLine){
        const response = await axios.post(`${url}/api/users`,form)
        alert("User added: " + JSON.stringify(response.data))
      }
      else{
        alert("You are offline. Saving data locally.")
        await saveOfflineData(form)
      }
      setform({name:'',email:'',password:''})
    } catch (error) {
      alert("Error submitting form: " + (error.response ? error.response.data : error.message))
      console.error(error)
    }
  }

  const syncData = async ()=>{
    const users = await getOfflineData();

    for(let data of users){
      await axios.post(`${url}/api/users`,data)
    }

    await clearOfflineData()
    alert("offline data are stored at Database")
  }

  useEffect(()=>{
    window.addEventListener('online', syncData)
    return ()=> window.removeEventListener('online',syncData)
  })




  return (
    <div>
      <h2>Fill the Details</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder='Enter your Name' value={form.name} onChange={handleChange}/>
        <br />
        <input type="text" name="email" placeholder='Enter your email' value={form.email} onChange={handleChange} />
        <br />
        <input type="text" name="password" placeholder='Enter you password' value={form.password} onChange={handleChange} />
        <br />
        <button type='submit' >submit</button>
      </form>
      <br />
      <p>{navigator.onLine? "Online":"Offline"}</p>
    </div>
  )
}

export default App