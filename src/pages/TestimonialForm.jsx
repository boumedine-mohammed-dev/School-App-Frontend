import { useState } from "react"
import { Star, MessageCircle, User, Mail, GraduationCap, Send, Quote } from "lucide-react"
import { useAuth } from "../auth/AuthContext"
import { useNavigate } from "react-router-dom"

export default function TestimonialForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        comment: "",
        rating: 5
    })
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL;
    const { token } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!token) {
            setMessage("⚠️ You must be logged in to add a testimonial")
            return
        }

        setIsLoading(true)
        setMessage("")

        try {




            const res = await fetch(`${API_URL}/testimonials/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(form)
            })

            if (!res.ok) {
                throw new Error("❌ Failed to submit testimonial");
            }

            setMessage("✅ Testimonial submitted successfully!")
            setForm({ name: "", email: "", comment: "", rating: 5 })
            setTimeout(() => {
                navigate("/")
            }, 2000)

        } catch (err) {
            setMessage(err.message || "❌ Failed to submit testimonial")
            setIsLoading(false)
        }
    }

    const handleRatingChange = (val) => {
        setForm({ ...form, rating: val })
    }

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            {/* Form Section */}
            <div className='flex-1 flex items-center justify-center bg-gray-50 p-8'>
                <div className='w-full max-w-md'>
                    {/* Logo/Brand */}
                    <div className='text-center mb-8'>
                        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full' style={{ background: 'linear-gradient(to bottom right, #C45B7D, #A84967)' }}>
                            <MessageCircle className='h-8 w-8 text-white' />
                        </div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Share Your Experience</h1>
                        <p className='text-gray-600'>Help others by sharing your testimonial</p>
                    </div>

                    {/* Form Card */}
                    <div className='bg-white shadow-xl rounded-2xl p-8'>
                        <div className='space-y-5'>
                            {/* Name */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Your Name
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <User className='h-5 w-5 text-gray-400' />
                                    </div>
                                    <input
                                        type='text'
                                        placeholder="Enter your name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all'
                                        style={{ focusRingColor: '#C45B7D' }}
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

                            {/* Comment */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Your Testimonial
                                </label>
                                <textarea
                                    placeholder="Share your experience with our school..."
                                    value={form.comment}
                                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all resize-none'
                                    onFocus={(e) => e.target.style.outlineColor = '#C45B7D'}
                                    rows="5"
                                    required
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-3'>
                                    Your Rating
                                </label>
                                <div className='flex items-center gap-2'>
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => handleRatingChange(val)}
                                            className='focus:outline-none transition-transform hover:scale-110 active:scale-95'
                                        >
                                            <Star
                                                className={`w-8 h-8 transition-colors ${val <= form.rating
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                    <span className='ml-2 text-sm font-semibold text-gray-600'>
                                        {form.rating} / 5
                                    </span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className='w-full py-3 px-4 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 group'
                                style={{ background: 'linear-gradient(to right, #C45B7D, #A84967)', boxShadow: '0 10px 25px -5px rgba(196, 91, 125, 0.3)' }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #B34A6C, #972F56)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #C45B7D, #A84967)'}
                            >
                                {isLoading ? (
                                    <>
                                        <div className='h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className='h-5 w-5' />
                                        <span>Submit Testimonial</span>
                                    </>
                                )}
                            </button>

                            {/* Status Message */}
                            {message && (
                                <div className={`p-4 rounded-lg ${message.includes('✅')
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : message.includes('⚠️')
                                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                    <p className='text-center font-medium text-sm'>{message}</p>
                                </div>
                            )}

                            {/* Back Link */}
                            <div className='text-center text-sm text-gray-600 pt-2'>
                                <a href='/' className='font-semibold' style={{ color: '#C45B7D' }}>
                                    ← Back to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Branding Section */}
            <div className='flex-1 hidden md:flex relative overflow-hidden' style={{ background: 'linear-gradient(to bottom right, #C45B7D, #A84967)' }}>
                <div className='absolute inset-0 opacity-10'>
                    <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'></div>
                </div>

                <div className='relative flex items-center justify-center w-full p-12 text-white'>
                    <div className='max-w-lg'>
                        <Quote className='h-20 w-20 mb-8 opacity-90' />
                        <h2 className='text-4xl font-bold mb-6'>
                            Your Voice Matters
                        </h2>
                        <p className='text-xl text-white opacity-90 mb-8 leading-relaxed'>
                            Share your experience and help future students and parents learn more about our community. Your feedback helps us improve and grow.
                        </p>

                        {/* Sample Testimonials */}
                        <div className='space-y-4'>
                            <div className='bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20'>
                                <div className='flex items-center gap-1 mb-2'>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                                    ))}
                                </div>
                                <p className='text-white opacity-80 text-sm mb-2'>
                                    "An incredible learning environment with dedicated teachers and innovative programs."
                                </p>
                                <p className='text-xs text-white opacity-70'>- Sarah M., Parent</p>
                            </div>

                            <div className='bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20'>
                                <div className='flex items-center gap-1 mb-2'>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                                    ))}
                                </div>
                                <p className='text-white opacity-80 text-sm mb-2'>
                                    "The best decision we made for our child's education. Highly recommend!"
                                </p>
                                <p className='text-xs text-white opacity-70'>- James R., Parent</p>
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