import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { api } from '@/utils/api';
const WeddingGuestPortal = () => {
const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [activeModal, setActiveModal] = useState(null);
  const [isAttending, setIsAttending] = useState(null);
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Close modal when clicking escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) setActiveModal(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Submit attendance response
  const handleAttendanceSubmit = async (data) => {
    if (!data.phone) {
      setSubmitError('Please provide phone number');
      return;
    }
    
    try {
      setSubmitting(true);
      setSubmitError('');
      
      // // First check if guest exists
      // const response = await api.get(`/guests?phone=${data.phone}`);
      
      // if (response.data.length === 0) {
      //   setSubmitError("Please use the number on which you received the invitation!");
      //   return;
      // }
      
      // // Guest exists, proceed with updating attendance
      // const guestId = response.data[0].id;
      
      try {
        // Update attendance status
        await api.patch(`/guests/${data.phone}/attendance`, {
          is_attending: isAttending,
          attending_guest_count: data.guestCount
        });
        
        // Success message
        setSubmitMessage(isAttending 
          ? `Thank you! We've registered your attendance with ${data.guestCount} guest(s).` 
          : "We've received your response. We'll miss you at our special day!");
        
        // Reset form after successful submission
        setTimeout(() => {
          setActiveModal(null);
          setSubmitMessage('');
        }, 5000);
      } catch (updateError) {
        // Specifically handle the 403 error for uninvited guests
        if (updateError.response && updateError.response.status === 403) {
          setSubmitError("Sorry, it appears you haven't been invited to this event yet.");
        } else {
          setSubmitError("There was a problem updating your attendance. Please try again.");
        }
        console.error('Error updating attendance:', updateError.response.data.message);
      }
    } catch (error) {
      console.error('Error checking guest:', error);
      setSubmitError('There was a problem connecting to the server. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };
  // Modal component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80  z-50 flex items-center justify-center p-4 ">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-2xl font-serif text-black">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Banner */}
      <div className="relative h-screen pt-16 pb-12 px-4 text-center">
  {/* Background image */}
        <img
            src="/destination-wedding-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0"
        />


  {/* Text content */}
  <div className="relative z-20 max-w-3xl mx-auto">
    <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">Sarah & Michael</h1>
    <p className="text-xl md:text-3xl text-gray-700 font-light tracking-wider mb-6">June 15, 2025</p>
    <div className="w-32 h-1 bg-rose-300 mx-auto my-6 rounded-full"></div>
    <p className="italic text-xl md:text-2xl text-gray-600">"Two hearts, one love, one beautiful day."</p>
  </div>
      </div>

      
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-36 py-16 flex-grow">

        
        {/* Content Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Box: Event Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300  group">
            <div className="h-48 bg-[#BFA480] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-2xl font-serif text-white mt-3">Attending?</h2>
              </div>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-6">View our wedding day schedule, from ceremony to reception.</p>
              <button 
                onClick={() => setActiveModal('rsvp')}
                className="inline-block px-6 py-2 bg-[#BFA480] text-white font-medium rounded-full hover:bg-[#BFA480]/90 transition-colors"
              >
                Confirm us
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300  group">
            <div className="h-48 bg-[#BFA480] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-2xl font-serif text-white mt-3">Our Events</h2>
              </div>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-6">View our wedding day schedule, from ceremony to reception.</p>
              <button 
                onClick={() => setActiveModal('events')}
                className="inline-block px-6 py-2 bg-[#BFA480] text-white font-medium rounded-full hover:bg-[#BFA480]/90 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
          
          {/* Box: Location */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300  group flex flex-col">
            <div className="h-48 bg-[#BFA480] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h2 className="text-2xl font-serif text-white mt-3">Location</h2>
              </div>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-6">Find directions to our beautiful wedding venue. Click below</p>
              <button 
                onClick={() => setActiveModal('location')}
                className="inline-block px-6 py-2 bg-[#BFA480] text-white font-medium rounded-full hover:bg-[#BFA480]/90 transition-colors"
              >
                View Map
              </button>
            </div>
          </div>
          
          {/* Box: Food Menu */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300  group">
            <div className="h-48 bg-[#BFA480] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h2 className="text-2xl font-serif text-white mt-3">Food Menu</h2>
              </div>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-6">Explore our carefully curated wedding menu.</p>
              <button 
                onClick={() => setActiveModal('menu')}
                className="inline-block px-6 py-2 bg-[#BFA480] text-white font-medium rounded-full hover:bg-[#BFA480]/90 transition-colors"
              >
                View Menu
              </button>
            </div>
          </div>
          
          {/* Box: Contact Us */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300  group">
            <div className="h-48 bg-[#BFA480] flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h2 className="text-2xl font-serif text-white mt-3">Contact Us</h2>
              </div>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-6">Have questions? Reach out to us directly.</p>
              <button 
                onClick={() => setActiveModal('contact')}
                className="inline-block px-6 py-2 bg-[#BFA480] text-white font-medium rounded-full hover:bg-[#BFA480]/90 transition-colors"
              >
                View Contacts
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Countdown Timer */}
      <div className="bg-white bg-opacity-80 py-16 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center text-white mb-10">Counting Down to Our Special Day</h2>
          <div className="flex justify-center space-x-8">
            {['days', 'hours', 'minutes', 'seconds'].map(unit => (
              <div key={unit} className="text-center">
                <div className="bg-[#BFA480] w-24 h-24 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-3xl font-bold text-white">00</span>
                </div>
                <p className="mt-2 text-gray-700 capitalize">{unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white bg-opacity-90 py-10 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-white mb-4">We can't wait to celebrate with you!</h2>
          <p className="text-gray-600 mb-6">#SarahAndMichael2025</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[#BFA480] flex items-center justify-center hover:bg-[#BFA480]/90transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#BFA480] flex items-center justify-center hover:bg-[#BFA480]/90transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </footer>
      
      {/* Modals */}
      {/* RSVP Modal */}
      <Modal isOpen={activeModal === 'rsvp'} onClose={() => setActiveModal(null)} title="RSVP">
        {submitMessage ? (
          <div className="text-center py-8">
            <div className="inline-block p-3 rounded-full bg-green-100 text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl text-green-600 mb-2">{submitMessage}</p>
            <p className="text-gray-600">Thank you for your response!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleAttendanceSubmit)}>

            
            <div className="mb-6">
              <label className="block text-gray-900 mb-2 font-medium text-left">Your Phone Number</label>
              <input 
                type="tel" 
                className="w-full p-3 border border-gray-300 rounded-lg "
                {...register("phone",{required:true})}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-900 mb-2 font-medium text-left">Will you be attending?</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-lg transition ${
                    isAttending === true 
                      ? 'bg-white text-black shadow-md border border-black' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setIsAttending(true)}
                >
                  Yes, I'll be there!
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-lg transition ${
                    isAttending === false 
                      ? 'bg-white text-black shadow-md border border-black' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setIsAttending(false)}
                >
                  Sorry, I can't make it
                </button>
              </div>
            </div>
            
            {isAttending && (
              <div className="mb-6">
                <label className="block text-gray-900 mb-2 font-medium text-left">Number of Guests</label>
                <div className="relative">
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none "
                    {...register("guestCount")}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-lg">
                {submitError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-[#c29253] disabled:bg-[#BFA480]/70 hover:bg-[#c29253]/90 text-white py-3 px-6 rounded-lg font-medium transition shadow-md hover:shadow-lg"
              disabled={submitting || isAttending === null}
            >
              {submitting ? 'Submitting...' : 'Submit Response'}
            </button>
          </form>
        )}
      </Modal>
      
      {/* Event Details Modal */}
      <Modal isOpen={activeModal === 'events'} onClose={() => setActiveModal(null)} title="Event Details">
        <div className="space-y-8">
          <div className="flex items-start">
            <div className="bg-[#BFA480] p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-serif text-rose-700 mb-2">Wedding Ceremony</h3>
              <p className="text-gray-700">Saturday, June 15, 2025</p>
              <p className="text-gray-700">2:00 PM - 3:30 PM</p>
              <p className="text-gray-700 mt-2">Rose Garden Chapel</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#BFA480] p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-serif text-rose-700 mb-2">Cocktail Hour</h3>
              <p className="text-gray-700">Saturday, June 15, 2025</p>
              <p className="text-gray-700">3:30 PM - 5:00 PM</p>
              <p className="text-gray-700 mt-2">Grand Terrace</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#BFA480] p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-serif text-rose-700 mb-2">Reception Dinner</h3>
              <p className="text-gray-700">Saturday, June 15, 2025</p>
              <p className="text-gray-700">5:00 PM - 10:00 PM</p>
              <p className="text-gray-700 mt-2">Crystal Ballroom</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#BFA480] p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-serif text-rose-700 mb-2">Dress Code</h3>
              <p className="text-gray-700">Formal Attire</p>
              <p className="text-gray-500 mt-2 italic">Ladies: Floor-length or cocktail dresses<br />Gentlemen: Suits or tuxedos</p>
            </div>
          </div>
        </div>
      </Modal>
      
      {/* Contact Us Modal */}
      <Modal isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)} title="Contact Us">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-serif text-rose-700 mb-4 flex items-center">
              <span className="inline-block w-1 h-6 bg-white mr-3"></span>
              Bride's Side
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-4">
                <p className="text-gray-800 font-medium">Sarah Johnson</p>
                <div className="flex items-center mt-2 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  sarah@example.com
                </div>
                <div className="flex items-center mt-1 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (555) 123-4567
                </div>
              </div>
              
              <div>
                <p className="text-gray-800 font-medium">Jane Johnson (Mother of the Bride)</p>
                <div className="flex items-center mt-2 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  jane@example.com
                </div>
                <div className="flex items-center mt-1 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (555) 789-0123
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif text-rose-700 mb-4 flex items-center">
              <span className="inline-block w-1 h-6 bg-white mr-3"></span>
              Groom's Side
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-4">
                <p className="text-gray-800 font-medium">Michael Smith</p>
                <div className="flex items-center mt-2 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  michael@example.com
                </div>
                <div className="flex items-center mt-1 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (555) 234-5678
                </div>
              </div>
              
              <div>
                <p className="text-gray-800 font-medium">Robert Smith (Father of the Groom)</p>
                <div className="flex items-center mt-2 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  robert@example.com
                </div>
                <div className="flex items-center mt-1 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (555) 345-6789
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif text-rose-700 mb-4 flex items-center">
              <span className="inline-block w-1 h-6 bg-white mr-3"></span>
              Wedding Planner
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 font-medium">Emily Parker</p>
              <div className="flex items-center mt-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                emily@weddingplanner.com
              </div>
              <div className="flex items-center mt-1 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (555) 456-7890
              </div>
            </div>
          </div>
        </div>
      </Modal>
      
      {/* Location Modal */}
      <Modal isOpen={activeModal === 'location'} onClose={() => setActiveModal(null)} title="Wedding Location">
        <div className="space-y-6">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
            {/* Placeholder for map - in a real application, this would be an actual map */}
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <img src="/api/placeholder/600/400" alt="Location Map" className="max-w-full max-h-full" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif text-rose-700 mb-2">Garden Wedding Venue</h3>
            <div className="flex items-start text-gray-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>123 Wedding Lane<br />Rose Gardens, CA 90210</p>
            </div>
            
            <div className="flex items-start text-gray-700 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Doors open at 1:30 PM<br />Ceremony begins promptly at 2:00 PM</p>
            </div>
            
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 bg-rose-600 text-white rounded-lg transition hover:bg-rose-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Get Directions
            </a>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h4 className="font-medium text-gray-800 mb-3">Transportation Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">Complimentary valet parking available at the venue</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">Shuttle service from Hotel Garden Inn available from 1:00 PM to 11:00 PM</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">Ride sharing services (Uber, Lyft) work well with the venue address</span>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
      
      {/* Menu Modal */}
      <Modal isOpen={activeModal === 'menu'} onClose={() => setActiveModal(null)} title="Wedding Menu">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-serif text-rose-700 mb-4 flex items-center">
              <span className="inline-block w-1 h-6 bg-white mr-3"></span>
              Cocktail Hour
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Passed Hors d'oeuvres</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Mini Crab Cakes with Spicy Remoulade</li>
                  <li>Bacon-Wrapped Dates with Goat Cheese</li>
                  <li>Wild Mushroom & Truffle Arancini</li>
                  <li>Smoked Salmon Canapés</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Beverage Station</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Signature Cocktails</li>
                  <li>Champagne</li>
                  <li>Premium Beer Selection</li>
                  <li>Red & White Wine</li>
                  <li>Non-Alcoholic Options</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif text-rose-700 mb-4 flex items-center">
              <span className="inline-block w-1 h-6 bg-white mr-3"></span>
              Dinner Menu
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">First Course</h4>
                <p className="text-gray-600">Summer Garden Salad with Mixed Greens, Heirloom Tomatoes, Cucumber, Avocado, and Champagne Vinaigrette</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Main Course Options</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="border-b pb-2">
                    <p className="font-medium">Herb-Crusted Filet Mignon</p>
                    <p className="text-sm">With Truffle Mashed Potatoes and Roasted Seasonal Vegetables</p>
                  </li>
                  <li className="border-b pb-2">
                    <p className="font-medium">Pan-Seared Salmon</p>
                    <p className="text-sm">With Lemon Beurre Blanc, Wild Rice Pilaf, and Asparagus</p>
                  </li>
                  <li>
                    <p className="font-medium">Wild Mushroom Risotto (Vegetarian)</p>
                    <p className="text-sm">With Aged Parmesan, Truffle Oil, and Seasonal Vegetables</p>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Dessert</h4>
                <p className="text-gray-600">Wedding Cake Service with Coffee & Tea Station</p>
              </div>
            </div>
          </div>
          
          <div className="bg-rose-50 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Dietary Restrictions</h4>
            <p className="text-gray-700">Please let us know of any dietary restrictions or allergies when you RSVP. Our chef is happy to accommodate special requests.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WeddingGuestPortal;