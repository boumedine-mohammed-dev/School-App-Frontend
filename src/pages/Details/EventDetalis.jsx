import { CalendarRange, Clock, MapPin, ArrowLeft, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function EventDetails() {
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {


        fetch(`${API_URL}/events/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch event');
                return res.json();
            })
            .then((data) => setEvent(data))
            .catch((err) => {
                console.error("Error fetching event:", err);
                setError(err.message);
            })
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-violet-600 border-r-transparent mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading Event Details...</p>
                </div>
            </div>
        )
    }

    if (error || !event) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                        <CalendarRange className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Event Not Found</h3>
                    <p className="text-gray-600 mb-6">{error || "Unable to load event information"}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-2.5 bg-violet-600 text-white font-semibold rounded-full hover:bg-violet-700 active:scale-95 transition-all"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-violet-600 mb-6 font-medium transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Events
                </button>

                {/* Main Content Card */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                    {/* Hero Image */}
                    <div className="relative h-96 overflow-hidden">
                        <img
                            src={event?.image}
                            className="w-full h-full object-cover"
                            alt={event.title}
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                                {event.title}
                            </h1>
                            {event?.capacity && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                                    <Users className="h-4 w-4 text-white" />
                                    <span className="text-white font-medium text-sm">{event.capacity}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
                    </div>

                    {/* Event Info Cards */}
                    <div className="px-6 sm:px-8 pb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Date */}
                            <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 flex-shrink-0">
                                    <CalendarRange className="h-6 w-6 text-violet-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Date</p>
                                    <p className="font-bold text-gray-900 text-lg">{event.date}</p>
                                </div>
                            </div>

                            {/* Time From */}
                            <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 flex-shrink-0">
                                    <Clock className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Starts</p>
                                    <p className="font-bold text-gray-900 text-lg">{event.time_from}</p>
                                </div>
                            </div>

                            {/* Time To */}
                            <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 flex-shrink-0">
                                    <Clock className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Ends</p>
                                    <p className="font-bold text-gray-900 text-lg">{event.time_to}</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 flex-shrink-0">
                                    <MapPin className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Location</p>
                                    <p className="font-bold text-gray-900 text-lg">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Interested in Attending?</h3>
                            <p className="text-violet-100 mb-4">Register now to secure your spot at this event</p>
                            <button onClick={() => { navigate("/register") }} className="px-8 py-3 bg-white text-violet-600 font-semibold rounded-full hover:bg-gray-50 active:scale-95 transition-all shadow-lg cursor-pointer">
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}