import { BookOpen, Clock, DollarSign, User, ArrowLeft, MessageCircle, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
export default function ProgramDetails() {
    const [newComment, setNewComment] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState("")
    const [program, setProgram] = useState(null)
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const { id } = useParams()
    const API_URL = import.meta.env.VITE_API_URL;
    const { token } = useAuth()

    useEffect(() => {

        fetch(`${API_URL}/programs/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((data) => setProgram(data))
            .catch((err) => console.error("Error fetching program:", err))
            .finally(() => setLoading(false))
    }, [id])

    const handleAddReview = async (e) => {
        e.preventDefault()

        if (!token) {
            setMessage("⚠️ You must be logged in to add a review")
            setTimeout(() => setMessage(""), 5000)
            return
        }

        try {
            setSubmitting(true)


            const res = await fetch(`${API_URL}/reviews/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    program: program.id,
                    comment: newComment,
                    name: name,
                    email: email
                })
            })
            if (!res.ok) throw new Error("Failed to add review");



        } catch (error) {
            console.error(error)
            setMessage("❌ Failed to add review. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-violet-600 border-r-transparent mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading Program Details...</p>
                </div>
            </div>
        )
    }

    if (!program) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <p className="text-gray-600">Program not found</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-5xl mx-auto'>
                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-violet-600 mb-6 font-medium transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Programs
                </button>

                {/* Main Content Card */}
                <div className='bg-white shadow-lg rounded-2xl overflow-hidden'>
                    {/* Hero Image */}
                    <div className='relative h-80 overflow-hidden'>
                        <img
                            src={program.image}
                            className='w-full h-full object-cover'
                            alt={program.title}
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                        <div className='absolute bottom-6 left-6 right-6'>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{program.title}</h1>
                        </div>
                    </div>

                    {/* Description */}
                    <div className='p-6 sm:p-8'>
                        <p className="text-gray-700 leading-relaxed text-lg">{program.description}</p>
                    </div>

                    {/* Info Cards Grid */}
                    <div className='px-6 sm:px-8 pb-6'>
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                            <div className='flex items-center gap-3 p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100'>
                                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-violet-100'>
                                    <DollarSign className='h-5 w-5 text-violet-600' />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Price</p>
                                    <p className="font-bold text-gray-900">${program.price}</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100'>
                                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-100'>
                                    <User className='h-5 w-5 text-blue-600' />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Seats</p>
                                    <p className="font-bold text-gray-900">{program.seats}</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100'>
                                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-green-100'>
                                    <BookOpen className='h-5 w-5 text-green-600' />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Lessons</p>
                                    <p className="font-bold text-gray-900">{program.lessons}</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100'>
                                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-orange-100'>
                                    <Clock className='h-5 w-5 text-orange-600' />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Hours</p>
                                    <p className="font-bold text-gray-900">{program.hours}h</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Teacher Section */}
                    {program?.teacher && (
                        <div className='mx-6 sm:mx-8 mb-6 p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white'>
                            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4'>
                                {program?.teacher?.image && (
                                    <img
                                        className='w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg'
                                        src={program.teacher.image}
                                        alt={program.teacher.name}
                                    />
                                )}
                                <div className='text-center sm:text-left'>
                                    <p className="text-sm text-gray-500 font-semibold uppercase">Instructor</p>
                                    <p className="text-xl font-bold text-gray-900 mt-1">{program.teacher.name}</p>
                                    <p className="text-sm text-gray-600 mt-1">{program.teacher.subject}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reviews Section */}
                <div className='mt-8 bg-white shadow-lg rounded-2xl p-6 sm:p-8'>
                    <div className='flex items-center gap-3 mb-6'>
                        <MessageCircle className='h-6 w-6 text-violet-600' />
                        <h2 className='text-2xl font-bold text-gray-900'>Reviews</h2>
                        <span className='px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold'>
                            {program?.reviews?.length || 0}
                        </span>
                    </div>

                    {program?.reviews && program.reviews.length > 0 ? (
                        <div className='space-y-4 mb-8'>
                            {program.reviews.map((review, index) => (
                                <div className='p-5 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors' key={index}>
                                    <p className='text-gray-800 leading-relaxed mb-3'>{review?.comment}</p>
                                    <div className='flex items-center gap-2 text-sm'>
                                        <span className='font-semibold text-gray-900'>{review?.user?.name}</span>
                                        <span className='text-gray-400'>•</span>
                                        <span className='text-gray-500 flex items-center gap-1'>
                                            <Calendar className='h-3.5 w-3.5' />
                                            {new Date(review?.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 mb-8 text-center py-8 bg-gray-50 rounded-xl">No reviews yet. Be the first to share your experience!</p>
                    )}

                    {/* Review Form */}
                    <div className='border-t border-gray-200 pt-8'>
                        <h3 className='text-xl font-bold text-gray-900 mb-4'>Leave a Review</h3>
                        <div className="space-y-4">
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder='Share your experience with this program...'
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all resize-none"
                                rows="4"
                            />

                            <button
                                disabled={submitting}
                                onClick={handleAddReview}
                                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200 shadow-lg shadow-violet-500/30'
                            >
                                {submitting ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>

                        {message && (
                            <div className={`mt-4 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : message.includes('⚠️') ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                <p className='text-center font-medium'>{message}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}