import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateFormComponent = () => {
  const [formData, setFormData] = useState({
    empno: '',
    empname: '',
    empsalary: '',
    age:''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/records/101'); // Assuming id is 1
      //setFormData(response.data);
      console.log(response.data )
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., update the record in the database)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="empno"
        value={formData.empno}
        onChange={handleChange}
      />

      <input
        type="text"
        name="empname"
        value={formData.empname}
        onChange={handleChange}
      />

      <input
        type="text"
        name="empsalary"
        value={formData.empsalary}
        onChange={handleChange}
      />

      <input
        type="text"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      {/* Add more input fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateFormComponent;