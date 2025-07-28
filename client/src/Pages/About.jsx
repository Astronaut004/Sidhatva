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

      
    </div>
  );
};

export default About;