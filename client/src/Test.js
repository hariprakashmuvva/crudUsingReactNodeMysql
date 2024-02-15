import React, { useState, useEffect } from 'react';

const Test = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/records/101');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();      
      setFormData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="empname"
            value={formData.empname || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          age:
          <input
            type="text"
            name="age"
            value={formData.age || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Add more input fields as needed */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Test;
