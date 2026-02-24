import { useState } from 'react'
import { User, Mail, Lock, GraduationCap, ArrowRight, UserPlus } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [agree, setAgree] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL;
    const { login } = useAuth()

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage("")

        try {




            const res = await fetch(`${API_URL}/users/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            if (!res.ok) {
                if (data.username) throw new Error(`❌ ${data.username[0]}`)
                if (data.email) throw new Error(`❌ ${data.email[0]}`)
                throw new Error("❌ Registration failed")
            }
            login(data.token)
            const profileRes = await fetch(`${API_URL}/profiles/`, {
                headers: { "Authorization": `Token ${data.token}` }
            })
            const profileData = await profileRes.json()
            if (Array.isArray(profileData) && profileData.length > 0) {
                login(data.token, profileData[0].role)
            }
            setMessage("✅ Account created successfully")
            setTimeout(() => navigate("/"), 2000)

        } catch (error) {
            setMessage(error.message || "❌ Registration failed. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            {/* Registration Form Section */}
            <div className='flex-1 flex items-center justify-center bg-gray-50 p-8'>
                <div className='w-full max-w-md'>
                    {/* Logo/Brand */}
                    <div className='text-center mb-8'>
                        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full mb-4' style={{ background: 'linear-gradient(to bottom right, #C45B7D, #A84967)' }}>
                            <GraduationCap className='h-8 w-8 text-white' />
                        </div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Create Account</h1>
                        <p className='text-gray-600'>Join our learning community today</p>
                    </div>

                    {/* Form Card */}
                    <div className='bg-white shadow-xl rounded-2xl p-8'>
                        <div className='space-y-5'>
                            {/* Username */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Username
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <User className='h-5 w-5 text-gray-400' />
                                    </div>
                                    <input
                                        type='text'
                                        placeholder="Choose a username"
                                        value={form.username}
                                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all'
                                        onFocus={(e) => e.target.style.outlineColor = '#C45B7D'}
                                        required
                                    />
                                </div>
                            </div>

                            {/* First and Last Name Row */}
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        First Name
                                    </label>
                                    <input
                                        type='text'
                                        placeholder="First name"
                                        value={form.firstName}
                                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all'
                                        onFocus={(e) => e.target.style.outlineColor = '#C45B7D'}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Last Name
                                    </label>
                                    <input
                                        type='text'
                                        placeholder="Last name"
                                        value={form.lastName}
                                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all'
                                        onFocus={(e) => e.target.style.outlineColor = '#C45B7D'}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Email Address
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Mail className='h-5 w-5 text-gray-400' />
                                    </div>
                                    <input
                                        type='email'
                                        placeholder="your.email@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all'
                                        onFocus={(e) => e.target.style.outlineColor = '#C45B7D'}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Password
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' />
                                    </div>
                                    <input
                                        type='password'
                                        placeholder="Create a strong password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all'
                                        onFocus={(e) => e.target.style.outlineColor = '#C45B7D'}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Terms Checkbox */}
                            <div className='flex items-start gap-2'>
                                <input
                                    value={agree}
                                    onChange={() => {
                                        if (agree == false) {
                                            setAgree(true)
                                        }
                                        else {
                                            setAgree(false)
                                        }
                                    }}
                                    type='checkbox'
                                    id='terms'
                                    className='w-4 h-4 mt-1 border-gray-300 rounded'
                                    style={{ accentColor: '#C45B7D' }}
                                    required
                                />
                                <label htmlFor='terms' className='text-sm text-gray-600'>
                                    I agree to the{' '}
                                    <a href='#' className='hover:underline' style={{ color: '#C45B7D' }}>Terms of Service</a>
                                    {' '}and{' '}
                                    <a href='#' className='hover:underline' style={{ color: '#C45B7D' }}>Privacy Policy</a>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !agree}
                                className='w-full py-3 px-4 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 group'
                                style={{ background: 'linear-gradient(to right, #C45B7D, #A84967)', boxShadow: '0 10px 25px -5px rgba(196, 91, 125, 0.3)' }}
                                onMouseEnter={(e) => !isLoading && (e.currentTarget.style.background = 'linear-gradient(to right, #B34A6C, #972F56)')}
                                onMouseLeave={(e) => !isLoading && (e.currentTarget.style.background = 'linear-gradient(to right, #C45B7D, #A84967)')}
                            >
                                {isLoading ? (
                                    <>
                                        <div className='h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className='h-5 w-5' />
                                        <span>Create Account</span>
                                        <ArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
                                    </>
                                )}
                            </button>

                            {/* Status Message */}
                            {message && (
                                <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                    <p className='text-center font-medium text-sm'>{message}</p>
                                </div>
                            )}

                            {/* Sign In Link */}
                            <div className='text-center text-sm text-gray-600'>
                                Already have an account?{' '}
                                <a href='/login' className='font-semibold' style={{ color: '#C45B7D' }}>
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image/Branding Section */}
            <div className='flex-1 hidden md:flex relative overflow-hidden' style={{ background: 'linear-gradient(to bottom right, #C45B7D, #A84967)' }}>
                <div className='absolute inset-0 opacity-10'>
                    <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'></div>
                </div>

                <div className='relative flex items-center justify-center w-full p-12 text-white'>
                    <div className='max-w-lg text-center'>
                        <UserPlus className='h-20 w-20 mx-auto mb-8 opacity-90' />
                        <h2 className='text-4xl font-bold mb-4'>
                            Join EduHub Today
                        </h2>
                        <p className='text-xl text-white opacity-90 mb-8'>
                            Start your learning journey with thousands of students worldwide. Get access to premium courses, expert teachers, and a supportive community.
                        </p>
                        <div className='space-y-4 text-left max-w-sm mx-auto'>
                            <div className='flex items-center gap-3'>
                                <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0'>
                                    <span className='text-sm font-bold'>✓</span>
                                </div>
                                <p className='text-white opacity-90'>Access to all courses and programs</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0'>
                                    <span className='text-sm font-bold'>✓</span>
                                </div>
                                <p className='text-white opacity-90'>Track your academic progress</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0'>
                                    <span className='text-sm font-bold'>✓</span>
                                </div>
                                <p className='text-white opacity-90'>Connect with expert teachers</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0'>
                                    <span className='text-sm font-bold'>✓</span>
                                </div>
                                <p className='text-white opacity-90'>Join a supportive community</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl'></div>
                <div className='absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl'></div>
            </div>
        </div>
    )
}