import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import ButtonComponent from './ButtonComponent';

const CrudApp = () => {
  const [records, setRecords] = useState([]);
  const [sinRecord, setSinRecord] = useState([]);
  const [formData, setFormData] = useState([{ empno: '', empname: '', empsalary: '', age: '' }]);

  // Fetch records when component mounts
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/records');
      setRecords(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const addRecord = async () => {
    try {
      await axios.post('http://localhost:5000/api/insertRecord', formData);
      setFormData({ empno: '', empname: '', empsalary: '', age: '' });
      fetchRecords();
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };
   
  const editRecord = async (id) => {
    console.log(id);
    const res =  await axios.get(`http://localhost:5000/api/records/${id}`);
    setSinRecord(res.data[0]);
    //console.log(res.data[0]);
  };

  const updateRecord = async (id, newData) => {
    try {
      await axios.put(`http://localhost:5000/api/updateRecord/${id}`, newData);
      fetchRecords();
    } catch (error) {
      console.error('Error updating record:', error);
    } 
  };
 
  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteRecord/${id}`);
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  }; 

  return (
    <div>
      <h1>CRUD Application</h1>
     {  <form onSubmit={(e) => {
        e.preventDefault();
        addRecord();
      }}>
        <input type="text" placeholder="empno" value={formData.empno} onChange={(e) => setFormData({ ...formData, empno: e.target.value })} />
        <input type="text" placeholder="empname" value={formData.empname} onChange={(e) => setFormData({ ...formData, empname: e.target.value })} />
        <input type="text" placeholder="empsalary" value={formData.empsalary} onChange={(e) => setFormData({ ...formData, empsalary: e.target.value })} />
        <input type="text" placeholder="age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
        <button type="submit">Add Record</button>
      </form> }
      <ul>
        {records.map(record => (
          <li key={record.empno}>
            <span>Name: {record.empname}, Age: {record.age}</span>
            <button onClick={() => editRecord(record.empno)}>Edit</button>
{/* 
            <ButtonComponent />
 */}
           <button onClick={() => deleteRecord(record.empno)}>Delete</button>
          </li>
        ))}
      </ul>

      {  <form onSubmit={(e) => {
        e.preventDefault();
        updateRecord(sinRecord.empno,sinRecord);
      }}>
        <input type="text" placeholder="empno" disabled value={sinRecord.empno} onChange={(e) => setSinRecord({ ...sinRecord, empno: e.target.value })} />
        <input type="text" placeholder="empname" value={sinRecord.empname} onChange={(e) => setSinRecord({ ...sinRecord, empname: e.target.value })} />
        <input type="text" placeholder="empsalary" value={sinRecord.empsalary} onChange={(e) => setSinRecord({ ...sinRecord, empsalary: e.target.value })} />
        <input type="text" placeholder="age" value={sinRecord.age} onChange={(e) => setSinRecord({ ...sinRecord, age: e.target.value })} />
        <button type="submit">Update Record</button>
      </form> }

    </div>
  );
};

export default CrudApp;
