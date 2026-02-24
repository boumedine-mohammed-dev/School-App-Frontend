import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
export default function Footer() {
    const navigate = useNavigate()
    return (
        <footer className='bg-gray-900 text-gray-300 rounded-2xl' id='contact'>
            {/* Main Footer */}
            <div className='max-w-7xl mx-auto px-5 py-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* About Section */}
                    <div>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='flex items-center justify-center w-50 h-50'>
                                <img src={logo} />
                            </div>

                        </div>
                        <p className='text-sm leading-relaxed mb-4'>
                            Empowering students through excellence in education. Building bright futures one student at a time.
                        </p>
                        <div className='flex gap-3'>
                            <a href='#' className='w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors' style={{ '--hover-bg': '#C45B7D' }} onMouseEnter={(e) => e.currentTarget.style.background = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.background = '#374151'}>
                                <Facebook className='h-4 w-4' />
                            </a>
                            <a href='#' className='w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors' onMouseEnter={(e) => e.currentTarget.style.background = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.background = '#374151'}>
                                <Twitter className='h-4 w-4' />
                            </a>
                            <a href='#' className='w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors' onMouseEnter={(e) => e.currentTarget.style.background = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.background = '#374151'}>
                                <Instagram className='h-4 w-4' />
                            </a>
                            <a href='#' className='w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors' onMouseEnter={(e) => e.currentTarget.style.background = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.background = '#374151'}>
                                <Linkedin className='h-4 w-4' />
                            </a>
                            <a href='#' className='w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors' onMouseEnter={(e) => e.currentTarget.style.background = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.background = '#374151'}>
                                <Youtube className='h-4 w-4' />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className='text-white font-semibold text-lg mb-4'>Quick Links</h4>
                        <ul className='space-y-3'>
                            <li>
                                <a onClick={() => { navigate("/") }} className='text-sm hover:text-white transition-colors' style={{ '--hover-color': '#C45B7D' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href='/events' className='text-sm hover:text-white transition-colors' onMouseEnter={(e) => e.currentTarget.style.color = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                                    Events
                                </a>
                            </li>
                            <li>
                                <a onClick={() => { navigate("/testimonial") }} className='text-sm hover:text-white transition-colors' onMouseEnter={(e) => e.currentTarget.style.color = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                                    Testimonials
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className='text-white font-semibold text-lg mb-4'>Resources</h4>
                        <ul className='space-y-3'>
                            <li>
                                <a href='#about' className='text-sm hover:text-white transition-colors' onMouseEnter={(e) => e.currentTarget.style.color = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href='#teachers' className='text-sm hover:text-white transition-colors' onMouseEnter={(e) => e.currentTarget.style.color = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                                    Teachers
                                </a>
                            </li>
                            <li>
                                <a href='#programs' className='text-sm hover:text-white transition-colors' onMouseEnter={(e) => e.currentTarget.style.color = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                                    Programs
                                </a>
                            </li>
                            <li>
                                <a href='#contact' className='text-sm hover:text-white transition-colors' onMouseEnter={(e) => e.currentTarget.style.color = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className='text-white font-semibold text-lg mb-4'>Contact Info</h4>
                        <ul className='space-y-4'>
                            <li className='flex items-start gap-3'>
                                <MapPin className='h-5 w-5 flex-shrink-0 mt-0.5' style={{ color: '#C45B7D' }} />
                                <span className='text-sm'>
                                    123 Education Street<br />
                                    City, State 12345
                                </span>
                            </li>
                            <li className='flex items-center gap-3'>
                                <Phone className='h-5 w-5 flex-shrink-0' style={{ color: '#C45B7D' }} />
                                <a href='tel:+1234567890' className='text-sm hover:text-white transition-colors'>
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className='flex items-center gap-3'>
                                <Mail className='h-5 w-5 flex-shrink-0' style={{ color: '#C45B7D' }} />
                                <a href='mailto:info@eduhub.com' className='text-sm hover:text-white transition-colors'>
                                    info@eduhub.com
                                </a>
                            </li>
                        </ul>

                        {/* Newsletter */}
                        <div className='mt-6'>
                            <h5 className='text-white font-semibold text-sm mb-3'>Newsletter</h5>
                            <div className='flex gap-2'>
                                <input
                                    type='email'
                                    placeholder='Your email'
                                    className='flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-gray-600 transition-colors'
                                    onFocus={(e) => e.target.style.borderColor = '#C45B7D'}
                                    onBlur={(e) => e.target.style.borderColor = '#374151'}
                                />
                                <button
                                    className='px-4 py-2 text-white font-semibold rounded-lg text-sm transition-all'
                                    style={{ background: 'linear-gradient(to right, #C45B7D, #A84967)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #B34A6C, #972F56)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #C45B7D, #A84967)'}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='border-t border-gray-800'>
                <div className='max-w-7xl mx-auto px-5 py-6'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        <p className='text-sm text-gray-400'>
                            © 2026 Smart Minds. All rights reserved.
                        </p>
                        <div className='flex gap-6 text-sm'>
                            <a href='#privacy' className='text-gray-400 hover:text-white transition-colors' onMouseEnter={(e) => e.currentTarget.style.color = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                                Privacy Policy
                            </a>
                            <a href='#terms' className='text-gray-400 hover:text-white transition-colors' onMouseEnter={(e) => e.currentTarget.style.color = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                                Terms of Service
                            </a>
                            <a href='#cookies' className='text-gray-400 hover:text-white transition-colors' onMouseEnter={(e) => e.currentTarget.style.color = '#C45B7D'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}