import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSignup = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Trim inputs to remove whitespace
            const trimmedName = name.trim();
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
            
            console.log("Sending registration:", {
                name: trimmedName,
                email: trimmedEmail,
                passwordLength: trimmedPassword.length
            });
            
            const {data} = await axios.post('http://localhost:5000/api/auth/register', {
                name: trimmedName,
                email: trimmedEmail,
                password: trimmedPassword
            });
            console.log(data.message);
            navigate('/login');
        }
        catch(error) {
            console.log(error.response?.data?.message || error.message);
            setError(error.response?.data?.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex justify-center items-center p-4'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-indigo-800'>Join <span className='text-yellow-500'>SkillSync</span></h1>
                    <p className='text-gray-600 mt-2'>Create your account and start connecting</p>
                </div>
                
                <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                            <p>{error}</p>
                        </div>
                    )}
                    
                    <form className='p-8' onSubmit={handleSignup}>
                        <div className='mb-6'>
                            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='name'>
                                Full Name
                            </label>
                            <input
                                id='name'
                                type='text'
                                placeholder='Enter your name'
                                className='w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 ease-in-out'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>
                        
                        <div className='mb-6'>
                            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='email'>
                                Email Address
                            </label>
                            <input
                                id='email'
                                type='email'
                                placeholder='you@example.com'
                                className='w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 ease-in-out'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        
                        <div className='mb-8'>
                            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='password'>
                                Password
                            </label>
                            <input
                                id='password'
                                type='password'
                                placeholder='Choose a strong password'
                                className='w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 ease-in-out'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        
                        <button 
                            type='submit' 
                            className={`w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-lg 
                            ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 transform transition duration-300 ease-in-out hover:-translate-y-1'}`}
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                        
                        <div className='text-center mt-6 text-gray-500'>
                            Already have an account? 
                            <Link to='/login' className='text-indigo-600 hover:text-indigo-800 font-semibold ml-1'>
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;