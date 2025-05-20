
// import React, { useState } from 'react';
// import './ConsumerAuth.css';
// import { useNavigate } from 'react-router-dom';

// const ConsumerAuth = () => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       const response = await fetch('http://localhost:5000/api/consumer/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Login successful!');
//         localStorage.setItem('consumerId', data.id);
//         localStorage.setItem('consumerName', data.name);
//         localStorage.setItem('consumerEmail', data.email);
//         localStorage.setItem('consumerToken', data.token || 'demo-token');
//         navigate('/products');
//       } else {
//         alert(data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Error logging in');
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const location = e.target.location.value;
//     const mobile = e.target.mobile.value;

//     try {
//       const response = await fetch('http://localhost:5000/api/consumer/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, location, mobile }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Registration successful!');
//         setIsRegistering(false);
//       } else {
//         alert(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Error registering');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2 className="text-center mb-4">
//           {isRegistering ? 'Consumer Registration' : 'Consumer Login'}
//         </h2>

//         {!isRegistering ? (
//           <form onSubmit={handleLogin} className="auth-form">
//             <label>Email</label>
//             <input type="email" name="email" required />
//             <label>Password</label>
//             <input type="password" name="password" required />
//             <button type="submit">Login</button>
//             <p className="switch-text">
//               Don’t have an account?{' '}
//               <span onClick={() => setIsRegistering(true)}>Register</span>
//             </p>
//           </form>
//         ) : (
//           <form onSubmit={handleRegister} className="auth-form">
//             <label>Name</label>
//             <input type="text" name="name" required />
//             <label>Email</label>
//             <input type="email" name="email" required />
//             <label>Password</label>
//             <input type="password" name="password" required />
//             <label>Address</label>
//             <input type="text" name="location" required />
//             <label>Mobile Number</label>
//             <input type="text" name="mobile" required />
//             <button type="submit">Register</button>
//             <p className="switch-text">
//               Already have an account?{' '}
//               <span onClick={() => setIsRegistering(false)}>Login</span>
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ConsumerAuth;



import React, { useState } from 'react';
import './ConsumerAuth.css';
import { useNavigate } from 'react-router-dom';

const ConsumerAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:5000/api/consumer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        localStorage.setItem('consumerId', data.id);
        localStorage.setItem('consumerName', data.name);
        localStorage.setItem('consumerEmail', data.email);
        localStorage.setItem('consumerToken', data.token || 'demo-token');
        localStorage.setItem('consumerAddress', data.location); // ✅ added
        localStorage.setItem('consumerMobile', data.mobile);     // ✅ added
        navigate('/products');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const location = e.target.location.value;
    const mobile = e.target.mobile.value;

    try {
      const response = await fetch('http://localhost:5000/api/consumer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, location, mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        setIsRegistering(false);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error registering');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="text-center mb-4">
          {isRegistering ? 'Consumer Registration' : 'Consumer Login'}
        </h2>

        {!isRegistering ? (
          <form onSubmit={handleLogin} className="auth-form">
            <label>Email</label>
            <input type="email" name="email" required />
            <label>Password</label>
            <input type="password" name="password" required />
            <button type="submit">Login</button>
            <p className="switch-text">
              Don’t have an account?{' '}
              <span onClick={() => setIsRegistering(true)}>Register</span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <label>Name</label>
            <input type="text" name="name" required />
            <label>Email</label>
            <input type="email" name="email" required />
            <label>Password</label>
            <input type="password" name="password" required />
            <label>Address</label>
            <input type="text" name="location" required />
            <label>Mobile Number</label>
            <input type="text" name="mobile" required />
            <button type="submit">Register</button>
            <p className="switch-text">
              Already have an account?{' '}
              <span onClick={() => setIsRegistering(false)}>Login</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ConsumerAuth;
