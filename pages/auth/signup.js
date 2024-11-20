
// // pages/auth/signup.js


import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SignUp() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.error) {
      setError('error happend Here');
    } else {
      router.push('/auth/signin');
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex flex-center full-h'>
      <div className="loginform">
        <div className="heading">Sign Up Create Admin</div>

        <form className="form" onSubmit={handleSubmit}>          
          <input type="email" className="input" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" className="input" name="password" placeholder="Password" onChange={handleChange} />
          <input type="password" className="input" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
          <button className="login-button" type="submit">Sign Up</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

// export default function singup(){
//   return <>

//     <h1>You Don't Have permision to Signup To this Admin Dashboard</h1>
  
//   </>
// }