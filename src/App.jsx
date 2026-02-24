import { Route, Routes } from 'react-router-dom'
import Navbar from './componants/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import TeachersDetails from './pages/Details/TeachersDetails'
import ProgramsDetails from './pages/Details/ProgramsDetails'
import EventDetalis from './pages/Details/EventDetalis'
import TestimonialForm from './pages/TestimonialForm'
import Grades from './pages/Grades'
import Footer from './componants/Footer'


function App() {

  return (
    <>

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/teachers/:id' element={<TeachersDetails />} />
        <Route path='/programs/:id' element={<ProgramsDetails />} />
        <Route path='/events/:id' element={<EventDetalis />} />
        <Route path='/testimonial' element={<TestimonialForm />} />
        <Route path='/grades' element={<Grades />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
