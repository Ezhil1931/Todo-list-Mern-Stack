import React, { useEffect, useReducer, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {FaSearch,FaTrash} from "react-icons/fa"
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from "axios"
import "../App.css"

function Home () {

const [items,setItems]=useState([])
const [loading,setLoading]=useState(true);
const [refresh,setRefresh]=useState(1);
const [data,setData]=useState("");
const navigate=useNavigate();
const [checkBox,setCheckBox]=useState(false)

const [notify,setNotify]=useState("");


const [reducerValue,forceUpdate]=useReducer(x=>x+1,0);

useEffect(()=>{
  
    const start=async()=>{
    try{
    
 await axios.get("https://todolist-api-ocm8.onrender.com/todo")
 .then(response=>setItems(response.data))
  
setLoading(false)
      }
    catch(err){
        console.log("Error in fetching")
    }           
        
    }
   
  start();
    

},[reducerValue])

const removeList = async(id)=>{
try{

  
  axios.delete(`https://todolist-api-ocm8.onrender.com/todo/${id}`)
  forceUpdate(); 
  
 
}
catch(err){
console.log("error in delete operation")
}

}

const addData=async(e)=>{


if(data===""){
    
    return alert("Enter the value")
}


try{
const list={
    todoList:data
    
}

    axios.post('https://todolist-api-ocm8.onrender.com/todo',list);

    setData("")
forceUpdate();

}
catch(err){
console.log("Error j cretes");
}
         

}

const checkBoxData=async(e,id)=>{

setCheckBox(e.target.checked);
const list={
    checked:checkBox
}
try{

    
     axios.put(`https://todolist-api-ocm8.onrender.com/todo/${id}`,list)
   
     forceUpdate();
    

}
catch(err){
console.log("Check box error");
}
}

    return (
    <div className='hd-container'>
<div className='hd-main'>
    <h1>Todo List</h1>
    <div className='hd-input'>
    <input type='text' value={data} onChange={(e)=>setData(e.target.value)}  onKeyDown={(e)=>{ if(e.key==="Enter"){addData()} }}/>
     
     <span id="addBtn" onClick={()=>addData()}>Add
     </span>
    </div>
</div>

{loading? <div className='load'> <div className='loader'></div> Loading</div> : <div className='list'>
 <h2>items</h2>

{
items.map((item,id)=>(

<div key={id} className='items'>

  <input type='checkbox' id="check" checked={item.checked}  onChange={(e)=>checkBoxData(e ,item._id)}/>
   <h1 style={ item.checked?{textDecoration:"line-through"}:{}} >{item.todoList}</h1>

 <RiDeleteBin2Line onClick={()=>removeList(item._id)} id="trash" />
 
    </div>

))

}
 
 </div>

}
 

<h3 id='design'>designed by  <span> Ezhil </span></h3>

    </div>
  )
}

export default Home