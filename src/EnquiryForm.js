import React, { useState, useEffect } from 'react';
import "./Form.css"

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    state: '',
    district: '',
    captcha: '',
  });

  const [errors, setErrors] = useState({});


  const [states, setStates] = useState([]);
  const[captcha,setCaptcha]=useState(0)
  const [districts, setDistricts] = useState([]);
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const captchaResult = num1 + num2;
    setFormData({ ...formData, captcha: '' }); 
    setCaptcha({ num1, num2, result: captchaResult });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        
        setStates(data.states);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
    generateCaptcha();
  }, []);

  
  const handleStateChange = (selectedState) => {
    const selectedStateData = states.find((state) => state.state === selectedState);
    setDistricts(selectedStateData ? selectedStateData.districts : []);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate Name
    if (!formData.name.match(/^[A-Za-z]+$/)) {
      newErrors.name = 'Name should only contain alphabets';
      valid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailRegex)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    // Validate Mobile
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile.match(mobileRegex)) {
      newErrors.mobile = 'Mobile number should contain 10 digits';
      valid = false;
    }

    // Validate State
    if (formData.state === '') {
      newErrors.state = 'Select a state';
      valid = false;
    }

    // Validate District
    if (formData.district === '') {
      newErrors.district = 'Select a district';
      valid = false;
    }

    // Validate Captcha
    if (formData.captcha === '') {
      newErrors.captcha = 'Enter the captcha';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div style={{ color: 'red' }}>{errors.name}</div>
        </div>

        <div>
          <label>Email:</label>
          <input
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <div style={{ color: 'red' }}>{errors.email}</div>
        </div>

        <div>
          <label>Mobile:</label>
          <input
            type="text"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          />
          <div style={{ color: 'red' }}>{errors.mobile}</div>
        </div>

        <div>
          <label>State:</label>
          <select
            value={formData.state}
            onChange={(e) => {
              setFormData({ ...formData, state: e.target.value });
              handleStateChange(e.target.value);
            }}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.state} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
          <div style={{ color: 'red' }}>{errors.state}</div>
        </div>

        <div>
          <label>District:</label>
          <select
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <div style={{ color: 'red' }}>{errors.district}</div>
        </div>

        <div>
        <label>Captcha:</label>
        <p>
          {captcha.num1} + {captcha.num2} 
        </p>
        <input
          type="text"
          value={formData.captcha}
          onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
        />
        <button type="button" onClick={generateCaptcha}>
          Refresh
        </button>
        <div style={{ color: 'red' }}>{errors.captcha}</div>
      </div>

        <div>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      <div>
      
      </div>
    </div>
  );
};

export default EnquiryForm;
