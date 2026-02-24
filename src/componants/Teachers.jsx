import { useEffect, useState } from 'react'
import { GraduationCap, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Teachers() {
    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {



        fetch(`${API_URL}/teacher/`)
            .then((res) => res.json())
            .then((data) => setTeachers(data))
            .catch((err) => console.error("Error fetching teachers:", err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className='max-w-7xl mx-auto px-5 py-16 mt-16' id='teachers'>
            {/* Section Header */}
            <div className='text-center mb-12'>
                <h3 className='text-violet-600 font-semibold text-sm uppercase tracking-wide'>Meet Our Team</h3>
                <h2 className='mt-3 text-3xl sm:text-4xl font-bold text-gray-900'>Our Teachers</h2>
                <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
                    Dedicated educators committed to inspiring and empowering the next generation
                </p>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='animate-pulse bg-white rounded-xl shadow-md overflow-hidden'>
                            <div className='w-full h-64 bg-gray-200'></div>
                            <div className='p-6'>
                                <div className='h-5 bg-gray-200 rounded w-3/4 mb-3'></div>
                                <div className='h-4 bg-gray-200 rounded w-1/2 mb-4'></div>
                                <div className='h-10 bg-gray-200 rounded'></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Teachers Grid */
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {teachers.map((t) => (
                        <div
                            key={t?.id}
                            className='group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1'
                            onClick={() => navigate(`/teachers/${t?.id}`)}
                        >
                            {/* Image Container */}
                            <div className='relative overflow-hidden h-64'>
                                <img
                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                    src={t?.image}
                                    alt={`${t?.name} - ${t?.subject} teacher`}
                                    loading="lazy"
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            </div>

                            {/* Content */}
                            <div className='p-6'>
                                <h2 className='text-gray-900 font-bold text-xl mb-2 group-hover:text-violet-600 transition-colors'>
                                    {t?.name}
                                </h2>

                                <div className='flex items-center gap-2 text-gray-600 mb-4'>
                                    <BookOpen className='h-4 w-4 text-violet-500 flex-shrink-0' />
                                    <p className='truncate'>{t?.subject}</p>
                                </div>

                                <button className='w-full py-2.5 px-4 bg-violet-50 text-violet-600 font-medium rounded-lg hover:bg-violet-100 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2'>
                                    <GraduationCap className='h-4 w-4' />
                                    <span>View Profile</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && teachers.length === 0 && (
                <div className='text-center py-16'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4'>
                        <GraduationCap className='h-8 w-8 text-gray-400' />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>No Teachers Found</h3>
                    <p className='text-gray-600'>Check back soon for our amazing teaching staff!</p>
                </div>
            )}
        </div>
    )
}