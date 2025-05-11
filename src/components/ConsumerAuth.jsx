
// import React, { useState } from 'react';
// import './ConsumerAuth.css';

// const ConsumerAuth = () => {
//   const [isRegistering, setIsRegistering] = useState(false);

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
//         // store token or redirect
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

//     try {
//       const response = await fetch('http://localhost:5000/api/consumer/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, location }),
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
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input type="email" name="email" className="form-control" required />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input type="password" name="password" className="form-control" required />
//             </div>

//             <button type="submit" className="btn btn-primary w-100">Login</button>
//             <p className="switch-text mt-3 text-center">
//               Don’t have an account?{' '}
//               <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setIsRegistering(true)}>Register</span>
//             </p>
//           </form>
//         ) : (
//           <form onSubmit={handleRegister} className="auth-form">
//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input type="text" name="name" className="form-control" required />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input type="email" name="email" className="form-control" required />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input type="password" name="password" className="form-control" required />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Address</label>
//               <input type="text" name="location" className="form-control" required />
//             </div>

//             <button type="submit" className="btn btn-success w-100">Register</button>
//             <p className="switch-text mt-3 text-center">
//               Already have an account?{' '}
//               <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setIsRegistering(false)}>Login</span>
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ConsumerAuth;


// import React, { useState } from 'react';
// import './ConsumerAuth.css';
// import { useNavigate } from 'react-router-dom'; // ✅ Add navigation hook

// const ConsumerAuth = () => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const navigate = useNavigate(); // ✅ Initialize navigation

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
//         navigate('/products'); // ✅ Redirect after login
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

//     try {
//       const response = await fetch('http://localhost:5000/api/consumer/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, location }),
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
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input type="email" name="email" className="form-control" required />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input type="password" name="password" className="form-control" required />
//             </div>

//             <button type="submit" className="btn btn-primary w-100">Login</button>
//             <p className="switch-text mt-3 text-center">
//               Don’t have an account?{' '}
//               <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setIsRegistering(true)}>Register</span>
//             </p>
//           </form>
//         ) : (
//           <form onSubmit={handleRegister} className="auth-form">
//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input type="text" name="name" className="form-control" required />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input type="email" name="email" className="form-control" required />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input type="password" name="password" className="form-control" required />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Address</label>
//               <input type="text" name="location" className="form-control" required />
//             </div>

//             <button type="submit" className="btn btn-success w-100">Register</button>
//             <p className="switch-text mt-3 text-center">
//               Already have an account?{' '}
//               <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setIsRegistering(false)}>Login</span>
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

        // ✅ Store consumer session in localStorage
        localStorage.setItem('consumerId', data.id);
        localStorage.setItem('consumerName', data.name);
        localStorage.setItem('consumerEmail', data.email);
        localStorage.setItem('consumerToken', data.token || 'demo-token');

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

    try {
      const response = await fetch('http://localhost:5000/api/consumer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, location }),
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
