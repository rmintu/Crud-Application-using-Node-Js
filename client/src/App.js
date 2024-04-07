import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import FormTable from './Component/formTable';

axios.defaults.baseURL = 'http://localhost:8080/'

function App() {

  const [addSection, setAddSection] = useState(false);
  const [editSection,setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    mobile:"",
})

const [formEditData, setFormEditData] = useState({
  name:"",
  email:"",
  mobile:"",
  id:""
})

  const [dataList, setDataList] = useState([])

  const handleChange = (e) => {
    const {value, name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e) =>{
      e.preventDefault();
      const data = await axios.post('/create',formData)
      console.log(data);
      if(data.data.success){
        setAddSection(false);
        alert(data.data.message);
        getFetchData();
        setFormData({
          name:"",
          email:"",
          mobile:""
        })
      }
  }

  const getFetchData = async() =>{
    const data = await axios.get('')
    console.log(data);
    if(data.data.success){
      setDataList(data.data.data);
    }
  }

  useEffect(()=>{
    getFetchData();
  },[])

  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    if(data.data.success){
      getFetchData();
      alert(data.data.message)
    }
  }

  const handleUpdate = async(e)=>{
    e.preventDefault();
    const data = await axios.put('/update',formEditData)
    if(data.data.success){
      getFetchData();
      alert(data.data.message);
      setEditSection(false)
    }
  }

  const handleEditOnChange = async(e)=>{
    const {value, name} = e.target
    setFormEditData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleEdit = (el) =>{
    setFormEditData(el);
    setEditSection(true);
  }

  console.log(dataList);
  return (
    <div className="container">
      <button className='btn btn-add' onClick={()=>setAddSection(true)}>Add</button>

      {addSection && 
      <FormTable 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleClose={()=>setAddSection(false)}
        rest ={formData}
      />
}

{editSection && 
      <FormTable 
        handleSubmit={handleUpdate}
        handleChange={handleEditOnChange}
        handleClose={()=>setEditSection(false)}
        rest ={formEditData}
      />
}


<div className='tableContainer'>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      { dataList[0] ? (
        dataList.map((el)=>{
          return(
            <tr>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.mobile}</td>
              <td>
                <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
              </td>
            </tr>
          )
        }))
        :(
          <p>No data is avalaible</p>
        )
      }
    </tbody>
    </table>
</div>

    </div>
  );
}



export default App;
