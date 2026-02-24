import { Star, Quote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
export default function Testimonial() {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {



        fetch(`${API_URL}/testimonials/`)
            .then((res) => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((data) => setTestimonials(data))
            .catch((err) => console.error("Error fetching testimonials:", err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className='max-w-7xl mx-auto px-5 py-16 mt-16'>
            {/* Section Header */}
            <div className='text-center mb-12'>
                <h3 className='text-violet-600 font-semibold text-sm uppercase tracking-wide'>What Parents Say</h3>
                <h2 className='mt-3 text-3xl sm:text-4xl font-bold text-gray-900'>Our Testimonials</h2>
                <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
                    Hear from families who trust us with their children's education
                </p>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='animate-pulse bg-white rounded-xl shadow-md p-6'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='w-12 h-12 bg-gray-200 rounded-full'></div>
                                <div className='flex-1'>
                                    <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                                    <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                                </div>
                            </div>
                            <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
                            <div className='h-4 bg-gray-200 rounded w-5/6 mb-2'></div>
                            <div className='h-4 bg-gray-200 rounded w-4/6 mb-4'></div>
                            <div className='h-4 bg-gray-200 rounded w-1/3'></div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Testimonials Grid */
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {testimonials.slice(0, 3)?.map((testimonial) => (
                        <div
                            key={testimonial?.id}

                            className='group bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative overflow-hidden'
                        >
                            {/* Quote Icon */}
                            <div className='absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity'>
                                <Quote className='h-16 w-16 text-violet-600' fill='currentColor' />
                            </div>

                            {/* User Info */}
                            <div className='flex items-center gap-3 mb-4 relative z-10'>
                                <img
                                    className='h-12 w-12 rounded-full object-cover ring-2 ring-violet-100'
                                    src={testimonial?.user?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80'}
                                    alt={`${testimonial?.user?.name} avatar`}
                                    loading="lazy"
                                />
                                <div className='flex-1 min-w-0'>
                                    <h3 className='font-semibold text-gray-900 truncate'>
                                        {testimonial?.user?.name}
                                    </h3>
                                    <p className='text-sm text-gray-500 truncate'>
                                        {testimonial?.user?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className='flex items-center gap-1 mb-4'>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < testimonial?.rating ? "#fbbf24" : "none"}
                                        stroke="#fbbf24"
                                        className='transition-all'
                                    />
                                ))}
                                <span className='ml-2 text-sm font-medium text-gray-600'>
                                    {testimonial?.rating}.0
                                </span>
                            </div>

                            {/* Comment */}
                            <p className='text-gray-600 text-sm leading-relaxed line-clamp-4'>
                                "{testimonial?.comment}"
                            </p>

                            {/* Hover Gradient */}
                            <div className='absolute inset-0 bg-gradient-to-br from-violet-50/0 to-purple-50/0 group-hover:from-violet-50/50 group-hover:to-purple-50/30 transition-all duration-300 pointer-events-none'></div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && testimonials.length === 0 && (
                <div className='text-center py-16'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4'>
                        <Star className='h-8 w-8 text-gray-400' />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>No Testimonials Yet</h3>
                    <p className='text-gray-600'>Be the first to share your experience!</p>
                </div>
            )}

            {/* View All Button */}
            {!loading && testimonials.length > 3 && (
                <div className='text-center mt-12'>
                    <button
                        onClick={() => navigate('/testimonials')}
                        className='px-8 py-3 bg-violet-600 text-white font-semibold rounded-full hover:bg-violet-700 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-500/30'
                    >
                        View All Testimonials
                    </button>
                </div>
            )}
        </div>
    )
}