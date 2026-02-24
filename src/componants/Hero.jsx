
import hero from '../assets/hero.jpg'
export default function Hero() {
    return (
        <div className='relative h-[500px] w-full overflow-hidden'>
            {/* Background Image */}
            <img
                className='absolute inset-0 w-full h-full object-cover'
                src={hero}
                alt="School hero background"
                loading="eager"
            />

            {/* Overlay */}
            <div className='absolute inset-0 bg-black/50'></div>

            {/* Content Container */}
            <div className='relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8'>
                <div className='text-center max-w-4xl'>
                    <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight'>
                        Welcome to Our School
                    </h1>
                    <p className='text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto'>
                        Building futures through excellence in education
                    </p>
                    <button className='px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg'>
                        <a href='#about' >Learn More</a>
                    </button>
                </div>
            </div>
        </div>
    )
}