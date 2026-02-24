import { useEffect, useState } from 'react'
import { Clock, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Events() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {


        fetch(`${API_URL}/events/`)
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className='max-w-7xl mx-auto px-5 py-16 mt-16' id='events'>
            {/* Section Header */}
            <div className='text-center mb-12'>
                <h3 className='text-violet-600 font-semibold text-sm uppercase tracking-wide'>What's Happening</h3>
                <h2 className='mt-3 text-3xl sm:text-4xl font-bold text-gray-900'>Our Events</h2>
                <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
                    Join us for exciting activities and celebrations throughout the year
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
                                <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
                                <div className='h-4 bg-gray-200 rounded w-5/6 mb-4'></div>
                                <div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
                                <div className='h-4 bg-gray-200 rounded w-2/3'></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Events Grid */
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {events.map((e) => (
                        <div
                            key={e?.id}
                            className='group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1'
                            onClick={() => navigate(`/events/${e?.id}`)}
                        >
                            {/* Image Container */}
                            <div className='relative overflow-hidden h-48'>
                                <img
                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                    src={e?.image}
                                    alt={`${e?.title} event`}
                                    loading="lazy"
                                />
                                {e?.date && (
                                    <div className='absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg'>
                                        <p className='text-violet-600 font-bold text-xs flex items-center gap-1'>
                                            <Calendar className='h-3.5 w-3.5' />
                                            {e?.date}
                                        </p>
                                    </div>
                                )}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            </div>

                            {/* Content */}
                            <div className='p-6'>
                                <h2 className='text-gray-900 font-bold text-xl mb-2 group-hover:text-violet-600 transition-colors line-clamp-1'>
                                    {e?.title}
                                </h2>

                                <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                                    {e?.description}
                                </p>

                                {/* Event Details */}
                                <div className='space-y-2 mb-4'>
                                    <div className='flex items-center gap-2 text-sm text-gray-700'>
                                        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-violet-50'>
                                            <Clock className='h-4 w-4 text-violet-600' />
                                        </div>
                                        <span className='font-medium'>{e?.time_from} - {e?.time_to}</span>
                                    </div>

                                    <div className='flex items-center gap-2 text-sm text-gray-700'>
                                        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-violet-50'>
                                            <MapPin className='h-4 w-4 text-violet-600' />
                                        </div>
                                        <span className='font-medium truncate'>{e?.location}</span>
                                    </div>
                                </div>

                                <button className='w-full py-2.5 px-4 bg-violet-50 text-violet-600 font-medium rounded-lg hover:bg-violet-100 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group'>
                                    <span>Learn More</span>
                                    <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && events.length === 0 && (
                <div className='text-center py-16'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4'>
                        <Calendar className='h-8 w-8 text-gray-400' />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>No Upcoming Events</h3>
                    <p className='text-gray-600'>Check back soon for exciting new events and activities!</p>
                </div>
            )}
        </div>
    )
}