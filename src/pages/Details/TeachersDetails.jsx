import { useEffect, useState } from "react"
import { BookOpen, Mail, Phone, Award, Calendar, ArrowLeft } from "lucide-react"
import { useParams } from "react-router-dom"

export default function TeachersDetails() {
    const [teacher, setTeacher] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { id } = useParams()


    useEffect(() => {

        const API_URL = import.meta.env.VITE_API_URL;

        fetch(`${API_URL}/teacher/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch teacher');
                return res.json();
            })
            .then((data) => setTeacher(data))
            .catch((err) => {
                console.error("Error fetching teacher:", err);
                setError(err.message);
            })
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-violet-600 border-r-transparent mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading Teacher Details...</p>
                </div>
            </div>
        )
    }

    if (error || !teacher) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                        <Award className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Teacher Not Found</h3>
                    <p className="text-gray-600 mb-6">{error || "Unable to load teacher information"}</p>
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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-violet-600 mb-8 font-medium transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Teachers
                </button>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            {/* Profile Image */}
                            <div className="flex justify-center md:justify-start">
                                <img
                                    src={teacher?.image}
                                    alt={`${teacher?.name} profile`}
                                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl"
                                    loading="eager"
                                />
                            </div>

                            {/* Basic Info */}
                            <div className="md:col-span-2 text-center md:text-left">
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                    {teacher?.name}
                                </h1>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-violet-100 mb-4">
                                    <BookOpen className="h-5 w-5" />
                                    <p className="text-lg font-medium">{teacher?.subject}</p>
                                </div>
                                {teacher?.experience && (
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-violet-100">
                                        <Calendar className="h-5 w-5" />
                                        <p>{teacher?.experience} Teaching Experience</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-8 py-8 space-y-8">
                        {/* Contact Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {teacher?.email && (
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
                                        <Mail className="h-5 w-5 text-violet-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                                        <p className="text-sm text-gray-900 truncate">{teacher?.email}</p>
                                    </div>
                                </div>
                            )}
                            {teacher?.phone && (
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
                                        <Phone className="h-5 w-5 text-violet-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Phone</p>
                                        <p className="text-sm text-gray-900">{teacher?.phone}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Biography */}
                        {teacher?.bio && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                                <p className="text-gray-700 leading-relaxed">{teacher?.bio}</p>
                            </div>
                        )}

                        {/* Qualifications */}
                        {teacher?.qualifications && teacher.qualifications.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Qualifications</h2>
                                <ul className="space-y-2">
                                    {teacher.qualifications.map((qual, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Award className="h-5 w-5 text-violet-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{qual}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Specializations */}
                        {teacher?.specializations && teacher.specializations.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Specializations</h2>
                                <div className="flex flex-wrap gap-2">
                                    {teacher.specializations.map((spec, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-violet-50 text-violet-700 font-medium rounded-full text-sm"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Achievements */}
                        {teacher?.achievements && teacher.achievements.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>
                                <ul className="space-y-2">
                                    {teacher.achievements.map((achievement, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-violet-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-700">{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}