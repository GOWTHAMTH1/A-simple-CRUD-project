import React, { useEffect, useState } from 'react'
import {Button,Intent,EditableText ,InputGroup} from '@blueprintjs/core'

const App = () => {
    const[user,setUser]=useState([]);
    const [newuser,setNewuser]=useState("");
    const [newemail,setnewemail]=useState("");
    const [newcity,setnewcity]=useState("")

    

    useEffect(()=>{
     
     fetch("https://jsonplaceholder.typicode.com/users")
      .then((response)=>response.json())
      .then((json)=> setUser(json)).catch(error=>error)

    },[])
    const OnclickHandler=()=>{
       const updateduser=newuser.trim();
       const updatedemail=newemail.trim();
       const updatedcity=newcity.trim();
      if(updateduser && updatedemail &&updatedcity   ){
        fetch("https://jsonplaceholder.typicode.com/users",{
          method:'POST',
          body: JSON.stringify({
            name:updateduser,email:updatedemail,address: {city:updatedcity}
          }) ,
          headers:{"Content-Type":"Application/json; Charset=UTF-8" }
          
        })
        .then((updateResult)=>updateResult.json())
        .then((updatejson)=>{setUser([...user,updatejson],
         
          
          ) 
         
          setNewuser(""),
          setnewemail(""),
          setnewcity("")
          })
        
        .catch((error)=>console.log(error) )
      }
    }
    const onchangeHandler=(id,key,value)=>{
      setUser((user)=> {
       return user.map(userdata=>{return userdata.id===id?{...userdata,[key]: value}:userdata} )
      })
    }
  const updateUser=(id)=>{
   
     const userupdate=user.find((user)=>user.id===id)
     fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
          method:'PUT',
          body: JSON.stringify(userupdate),
          headers:{"Content-Type":"Application/json; Charset=UTF-8" }
          
        })
        .then((updateResult)=> updateResult.json())
       
          .catch((error)=>console.log(error) )

  } 
  const deleteUser=(id)=>{
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
      method:'DELETE',
      
    })
    .then((updateResult)=> updateResult.json())
     .then((deleteresult)=>{ setUser((users)=>{return users.filter((user)=>user.id !== id)} )})
      .catch((error)=>console.log(error) )

  }

  return (
          <>
 
          <table className='bp4-html-table modifier'>
            <thead>
              <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>city</th>
              <th>Action</th>
              </tr>
            </thead>
              <tbody>
                {user.map(user=>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name} </td>
                  <td><EditableText value={user.email} onChange={value=>onchangeHandler(user.id,'email',value)} /> </td>
                  <td><EditableText value={user.address?.city} onChange={value=>onchangeHandler(user.id,'website',value)}/></td>
                  <td>
                  <Button intent='primary' onClick={()=>updateUser(user.id)}>Update</Button>
                  <Button intent='danger' onClick={()=>deleteUser(user.id)}>Delete</Button>

                  </td>
                </tr>)}
                
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td><InputGroup value={newuser} placeholder='Enter User' onChange={(e)=> setNewuser(e.target.value) }  /></td>
                  <td><InputGroup value={newemail} placeholder='Enter Email' onChange={(e)=> setnewemail(e.target.value)} /> </td>
                  <td><InputGroup value={newcity} placeholder='Enter city' onChange={(e)=>setnewcity(e.target.value)}/> </td>
                  <td><Button intent='success' onClick={OnclickHandler}>Add User</Button></td>               
                              
                </tr>
              </tfoot>
          
         
          </table>
          
          </>
  )}

export default App;