import { useEffect, useState } from 'react'
import { BookOpen, User, Clock, DollarSign, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Programs() {
    const [programs, setPrograms] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {


        fetch(`${API_URL}/programs/`)
            .then((res) => res.json())
            .then((data) => setPrograms(data))
            .catch((err) => console.error("Error fetching programs:", err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className='max-w-7xl mx-auto px-5 py-16 mt-16' id='programs'>
            {/* Section Header */}
            <div className='text-center mb-12'>
                <h3 className='text-violet-600 font-semibold text-sm uppercase tracking-wide'>Explore Our Courses</h3>
                <h2 className='mt-3 text-3xl sm:text-4xl font-bold text-gray-900'>Our Programs</h2>
                <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
                    Comprehensive learning experiences designed to help students excel
                </p>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='animate-pulse bg-white rounded-xl shadow-md overflow-hidden'>
                            <div className='w-full h-48 bg-gray-200'></div>
                            <div className='p-6'>
                                <div className='h-6 bg-gray-200 rounded w-3/4 mb-3'></div>
                                <div className='h-4 bg-gray-200 rounded w-1/2 mb-4'></div>
                                <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
                                <div className='h-4 bg-gray-200 rounded w-5/6 mb-4'></div>
                                <div className='h-10 bg-gray-200 rounded'></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Programs Grid */
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {programs.map((p) => (
                        <div
                            key={p?.id}
                            className='group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1'
                            onClick={() => navigate(`/programs/${p?.id}`)}
                        >
                            {/* Image Container */}
                            <div className='relative overflow-hidden h-48'>
                                <img
                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                    src={p?.image}
                                    alt={`${p?.title} program`}
                                    loading="lazy"
                                />
                                <div className='absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg'>
                                    <p className='text-violet-600 font-bold text-sm flex items-center gap-1'>
                                        <DollarSign className='h-4 w-4' />
                                        {p?.price}
                                    </p>
                                </div>
                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            </div>

                            {/* Content */}
                            <div className='p-6'>
                                <h2 className='text-gray-900 font-bold text-xl mb-2 group-hover:text-violet-600 transition-colors line-clamp-1'>
                                    {p?.title}
                                </h2>

                                <div className='flex items-center gap-2 text-gray-600 mb-3'>
                                    <User className='h-4 w-4 text-violet-500 flex-shrink-0' />
                                    <p className='text-sm truncate'>{p?.teacher?.name}</p>
                                </div>

                                <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                                    {p?.description}
                                </p>

                                {/* Stats */}
                                <div className='flex items-center gap-4 mb-4 text-sm text-gray-500'>
                                    <div className='flex items-center gap-1.5'>
                                        <BookOpen className='h-4 w-4 text-violet-500' />
                                        <span>{p?.lessons} Lessons</span>
                                    </div>
                                    <div className='flex items-center gap-1.5'>
                                        <Clock className='h-4 w-4 text-violet-500' />
                                        <span>{p?.hours}h</span>
                                    </div>
                                </div>

                                <button className='w-full py-2.5 px-4 bg-violet-50 text-violet-600 font-medium rounded-lg hover:bg-violet-100 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2'>
                                    <Award className='h-4 w-4' />
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && programs.length === 0 && (
                <div className='text-center py-16'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4'>
                        <BookOpen className='h-8 w-8 text-gray-400' />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>No Programs Available</h3>
                    <p className='text-gray-600'>Check back soon for exciting new learning opportunities!</p>
                </div>
            )}
        </div>
    )
}