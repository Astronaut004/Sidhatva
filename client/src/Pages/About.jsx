// src/Pages/About.jsx
import React, { useState, useRef } from 'react';
import { 
  FaLightbulb, FaUsers, FaGem, FaHandHoldingHeart, 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedinIn, 
  FaTwitter, FaGithub, FaDribbble, FaBehance, 
  FaStackOverflow, FaMedium, FaFacebookF, FaInstagram 
} from 'react-icons/fa';
import { FiArrowUp, FiCheck } from 'react-icons/fi';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const teamRef = useRef(null);

  const scrollToTeam = () => {
    teamRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 3000);
  };

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years in digital innovation",
      social: [
        { icon: <FaLinkedinIn />, url: "#" },
        { icon: <FaTwitter />, url: "#" },
        { icon: <FaGithub />, url: "#" }
      ]
    },
    {
      name: "Sarah Williams",
      role: "Creative Director",
      bio: "Award-winning designer with a passion for UX",
      social: [
        { icon: <FaLinkedinIn />, url: "#" },
        { icon: <FaDribbble />, url: "#" },
        { icon: <FaBehance />, url: "#" }
      ]
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      bio: "Full-stack wizard with expertise in modern frameworks",
      social: [
        { icon: <FaLinkedinIn />, url: "#" },
        { icon: <FaGithub />, url: "#" },
        { icon: <FaStackOverflow />, url: "#" }
      ]
    },
    {
      name: "Jamal Rodriguez",
      role: "Marketing Director",
      bio: "Growth strategist with data-driven approach",
      social: [
        { icon: <FaLinkedinIn />, url: "#" },
        { icon: <FaTwitter />, url: "#" },
        { icon: <FaMedium />, url: "#" }
      ]
    }
  ];

  const stats = [
    { value: "8+", label: "Years Experience" },
    { value: "500+", label: "Projects Completed" },
    { value: "15+", label: "Countries Served" },
    { value: "98%", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-5 h-5" />
      </button>

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Story</span> & Vision
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl">
              Learn about our journey, values, and the passionate team driving our mission to create meaningful impact.
            </p>
            <button 
              onClick={scrollToTeam}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
            >
              Meet Our Team
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 hidden lg:block">
          <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl w-full h-96 flex items-center justify-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-8 text-center w-4/5">
              <h3 className="text-2xl font-bold text-white mb-4">Innovating Since 2015</h3>
              <p className="text-white">Transforming businesses through digital excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 relative inline-block pb-2">
              Who We Are
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-full"></div>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              Discover the people and passion behind our success
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-tr from-blue-400 to-indigo-600 rounded-2xl overflow-hidden shadow-xl w-full h-96 relative">
                <div className="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold">Our Headquarters</h3>
                  <p>Innovation Drive, Tech City</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Driven by Purpose</h3>
              <p className="text-gray-600 mb-4">
                Founded in 2015, BrandName began as a small startup with a big vision: to transform how businesses connect with their customers through innovative digital solutions. Today, we've grown into a team of 50+ creative professionals serving clients across 15 countries.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey has been fueled by a relentless commitment to excellence, a passion for creative problem-solving, and the belief that technology should empower businesses to achieve their full potential.
              </p>
              <p className="text-gray-600 mb-8">
                At our core, we value collaboration, integrity, and continuous learning. We believe that great results come from diverse perspectives working together toward a common goal.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                  Our Services
                </a>
                <a href="#" className="inline-block bg-gray-800 text-white hover:bg-gray-900 font-medium py-2 px-6 rounded-lg transition duration-300">
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 relative inline-block pb-2">
              Our Mission
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-full"></div>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              Our commitment to excellence and innovation
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-purple-400 to-indigo-600 rounded-2xl overflow-hidden shadow-xl w-full h-96 relative">
                <div className="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-2xl" />
                <div className="absolute top-6 left-6 bg-white bg-opacity-90 p-4 rounded-lg max-w-xs">
                  <h3 className="font-bold text-gray-900">Client Success Stories</h3>
                  <p className="text-sm text-gray-600 mt-2">See how we've transformed businesses</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Empowering Businesses Through Innovation</h3>
              <p className="text-gray-600 mb-4">
                Our mission is to empower businesses of all sizes with cutting-edge digital solutions that drive growth, enhance customer experiences, and create lasting value.
              </p>
              <p className="text-gray-600 mb-4">
                We strive to be more than just a service provider - we aim to be strategic partners for our clients, understanding their unique challenges and co-creating solutions that deliver measurable results.
              </p>
              <p className="text-gray-600 mb-8">
                Through continuous innovation and a user-centered approach, we're building the future of digital experiences today. We measure our success by the success of our clients and the positive impact we create together.
              </p>
              <a href="#" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl">
                View Case Studies
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 relative inline-block pb-2">
              Our Core Values
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-full"></div>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <FaLightbulb className="text-blue-600 text-2xl" />, 
                title: "Innovation", 
                desc: "We embrace creativity and continuously explore new ideas to deliver breakthrough solutions." 
              },
              { 
                icon: <FaUsers className="text-blue-600 text-2xl" />, 
                title: "Collaboration", 
                desc: "We believe that great things happen when diverse minds work together toward a shared vision." 
              },
              { 
                icon: <FaGem className="text-blue-600 text-2xl" />, 
                title: "Excellence", 
                desc: "We pursue mastery in everything we do, setting high standards and continuously improving." 
              },
              { 
                icon: <FaHandHoldingHeart className="text-blue-600 text-2xl" />, 
                title: "Integrity", 
                desc: "We operate with honesty, transparency, and accountability in all our relationships." 
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 relative inline-block pb-2">
              Meet Our Team
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-full"></div>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              The talented individuals behind our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="bg-gradient-to-br from-blue-400 to-indigo-600 w-full h-64 flex items-center justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    {member.social.map((social, idx) => (
                      <a 
                        key={idx}
                        href={social.url} 
                        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300"
                        aria-label={`${member.name}'s social media`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <h3 className="text-4xl font-bold mb-3">{stat.value}</h3>
                <p className="text-blue-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Sidhatva</h3>
              <p className="mb-4">
                Designing spaces with soul. Premium furniture and home décor for modern living.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Our Collections</a></li>
                <li><a href="#" className="hover:text-white transition">Design Services</a></li>
                <li><a href="#" className="hover:text-white transition">Showrooms</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition">Warranty</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Design Street, Mumbai, Maharashtra 400001</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>hello@sidhatva.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Sidhatva. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default About;