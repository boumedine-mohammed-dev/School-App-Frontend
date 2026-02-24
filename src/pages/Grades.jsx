import { useEffect, useState } from "react"
import { Award, TrendingUp, TrendingDown, BookOpen, CheckCircle, XCircle } from "lucide-react"

export default function Grades() {
    const [grades, setGrades] = useState([])
    const [loading, setLoading] = useState(true)
    const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        fetch(`${API_URL}/grades/`)
            .then((res) => res.json())
            .then((data) => {
                setGrades(data)
                setLoading(false)
            })
            .catch((err) => console.error("Error fetching grades:", err))
    }, [])

    const getMark = (mark) => {
        if (mark >= 10) {
            return (
                <span className="flex items-center gap-2 text-green-700 font-semibold">
                    <TrendingUp className="h-4 w-4" />
                    {mark}/20
                </span>
            )
        } else {
            return (
                <span className="flex items-center gap-2 text-red-700 font-semibold">
                    <TrendingDown className="h-4 w-4" />
                    {mark}/20
                </span>
            )
        }
    }

    const getGradeLevel = (mark) => {
        if (mark >= 10) {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    <CheckCircle className="h-4 w-4" />
                    Admitted
                </span>
            )
        } else {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    <XCircle className="h-4 w-4" />
                    Rejected
                </span>
            )
        }
    }

    const calculateStats = () => {
        if (!grades.length) return { average: 0, passed: 0, failed: 0, total: 0 }

        const total = grades.length
        const passed = grades.filter(g => g.mark >= 10).length
        const failed = total - passed


        return { passed, failed, total }
    }

    const stats = calculateStats()

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-violet-600 border-r-transparent mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading Your Grades...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <div className='flex items-center gap-3 mb-2'>
                        <Award className='h-8 w-8 text-violet-600' />
                        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>My Grades</h1>
                    </div>
                    <p className='text-gray-600'>Track your academic performance across all subjects</p>
                </div>

                {/* Statistics Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                    <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200'>
                        <div className='flex items-center gap-3 mb-2'>
                            <div className='w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center'>
                                <BookOpen className='h-5 w-5 text-violet-600' />
                            </div>
                            <p className='text-sm text-gray-500 font-semibold uppercase'>Total Subjects</p>
                        </div>
                        <p className='text-3xl font-bold text-gray-900'>{stats.total}</p>
                    </div>


                    <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200'>
                        <div className='flex items-center gap-3 mb-2'>
                            <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center'>
                                <CheckCircle className='h-5 w-5 text-green-600' />
                            </div>
                            <p className='text-sm text-gray-500 font-semibold uppercase'>Passed</p>
                        </div>
                        <p className='text-3xl font-bold text-green-600'>{stats.passed}</p>
                    </div>

                    <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200'>
                        <div className='flex items-center gap-3 mb-2'>
                            <div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center'>
                                <XCircle className='h-5 w-5 text-red-600' />
                            </div>
                            <p className='text-sm text-gray-500 font-semibold uppercase'>Failed</p>
                        </div>
                        <p className='text-3xl font-bold text-red-600'>{stats.failed}</p>
                    </div>
                </div>

                {/* Grades Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-200">
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">
                                        Subject
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">
                                        Mark
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {grades?.map((grade, i) => (
                                    <tr key={grade?.id || i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-violet-600"></div>
                                                <span className="text-gray-900 font-medium">{grade?.subject?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getMark(grade?.mark)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getGradeLevel(grade?.mark)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {grades.length === 0 && (
                        <div className="text-center py-12">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Grades Yet</h3>
                            <p className="text-gray-600">Your grades will appear here once they are posted</p>
                        </div>
                    )}
                </div>

                {/* Performance Insight */}
                {grades.length > 0 && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl text-white">
                        <div className="flex items-start gap-4">
                            <Award className="h-6 w-6 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg mb-2">Performance Summary</h3>
                                <p className="text-violet-100">
                                    {stats.passed === stats.total
                                        ? `Excellent work! You've passed all ${stats.total} subjects with an average of ${stats.average}/20.`
                                        : stats.passed >= stats.total / 2
                                            ? `Good progress! You've passed ${stats.passed} out of ${stats.total} subjects. Keep working on the remaining ${stats.failed} to improve your overall performance.`
                                            : `You need to focus more on your studies. Currently passing ${stats.passed} out of ${stats.total} subjects. Consider seeking help from teachers for the ${stats.failed} subjects you're struggling with.`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}