import about from '../assets/about.jpg'

export default function Aboutus() {
    return (
        <div className='max-w-7xl mx-auto px-5 py-16 mt-16 ' id='about'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
                {/* Image Section */}
                <div className='flex justify-center'>
                    <img
                        className='rounded-lg w-full h-auto object-cover shadow-lg'
                        src={about}
                        alt="Students learning in classroom"
                        loading="lazy"
                    />
                </div>

                {/* Content Section */}
                <div className='flex justify-center flex-col items-start px-4 lg:px-0'>
                    <h3 className='text-violet-600 font-semibold text-sm uppercase tracking-wide'>About Us</h3>
                    <h1 className='mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                        We Learn Smart Way To Build Bright Future For Your Children
                    </h1>
                    <p className='text-gray-600 mt-6 text-base sm:text-lg leading-relaxed'>
                        At our school, we believe every child carries endless potential waiting to shine. Through creative programs, engaging activities, and caring teachers, we nurture curiosity and confidence in every step of their journey.
                    </p>
                    <p className='text-gray-600 mt-4 text-base sm:text-lg leading-relaxed'>
                        Our mission is to inspire young minds, build strong values, and provide a safe and joyful environment where learning feels like play and every child feels special.
                    </p>
                </div>
            </div>
        </div>
    )
}