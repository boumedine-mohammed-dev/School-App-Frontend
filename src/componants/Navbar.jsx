import { useState } from 'react'
import { Menu, X, GraduationCap } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import logo from '../assets/logo.png';
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { role, logout } = useAuth()
    const navigate = useNavigate()

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Teachers', href: '#teachers' },
        { name: 'Programs', href: '#programs' },
        { name: 'Events', href: '#events' },
        { name: 'Testimonials', href: '/testimonial' },
    ];

    return (
        <div className="w-full">
            {/* Announcement Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500">
                <div className="px-4 py-3 text-center">
                    <p className="text-sm font-medium text-white">
                        New Academic Year Admissions Now Open -
                        <span className="ml-1 underline decoration-white/50 underline-offset-2 cursor-pointer hover:decoration-white transition-all" onClick={() => { navigate("/register") }}>
                            Apply Today!
                        </span>
                    </p>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="flex h-50 w-50">
                                <img src={logo} />
                            </div>
                        </div>

                        {/* Desktop Navigation Links */}
                        <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    {link.href.startsWith("#") ? (<a
                                        href={link.href}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-violet-600 transition-all duration-200"
                                    >
                                        {link.name}
                                    </a>) : (<a
                                        onClick={() => { navigate(link.href) }}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-violet-600 transition-all duration-200"
                                    >
                                        {link.name}
                                    </a>)}

                                </li>
                            ))}
                        </ul>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            {!role ? (
                                <>
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate("/register")}
                                        className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-full hover:from-violet-700 hover:to-purple-700 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-500/30"
                                    >
                                        Register
                                    </button>
                                </>
                            ) : (
                                <>
                                    {role === "student" && (
                                        <button
                                            onClick={() => navigate("/grades")}
                                            className="px-6 py-2.5 text-sm font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-full hover:bg-violet-100 active:scale-95 transition-all duration-200"
                                        >
                                            My Grades
                                        </button>
                                    )}
                                    <button
                                        onClick={logout}
                                        className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden border-t border-gray-200 py-4 space-y-1 animate-in slide-in-from-top">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-violet-600 transition-all"
                                >
                                    {link.name}
                                </a>
                            ))}

                            <div className="pt-4 space-y-2 border-t border-gray-200 mt-4">
                                {!role ? (
                                    <>
                                        <button
                                            onClick={() => navigate("/login")}
                                            className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => navigate("/register")}
                                            className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg hover:from-violet-700 hover:to-purple-700 active:scale-95 transition-all shadow-lg shadow-violet-500/30"
                                        >
                                            Register
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {role === "student" && (
                                            <button
                                                onClick={() => navigate("/grades")}
                                                className="w-full px-4 py-3 text-sm font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 active:scale-95 transition-all"
                                            >
                                                My Grades
                                            </button>
                                        )}
                                        <button
                                            onClick={logout}
                                            className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all"
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}