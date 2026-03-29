/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  LayoutDashboard, 
  Home as HomeIcon, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Star, 
  MessageSquare, 
  FileText, 
  Plus, 
  Calendar, 
  Bell, 
  User, 
  LogOut, 
  ChevronRight, 
  ChevronLeft,
  Filter, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Target, 
  Cpu, 
  Lock, 
  BarChart2, 
  ArrowLeftRight, 
  ThumbsUp, 
  Users, 
  Download, 
  MoreVertical, 
  Check, 
  X 
} from 'lucide-react';
import { Course, Assignment, PastQuestion, Review } from './types';
import { MOCK_COURSES, MOCK_ASSIGNMENTS } from './constants';

// --- Components ---

const Navbar = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-nodejs-dark/80 backdrop-blur-md border-b border-nodejs-light-gray px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-nodejs-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-nodejs-green/30">
          <BookOpen size={24} strokeWidth={2.5} />
        </div>
        <span className="text-xl font-bold tracking-tight text-nodejs-text">COURSECORE<span className="text-nodejs-green">.io</span></span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-nodejs-green' : 'text-nodejs-muted hover:text-nodejs-text'}`}>Home</Link>
        <Link to="/courses" className={`text-sm font-medium transition-colors ${isActive('/courses') ? 'text-nodejs-green' : 'text-nodejs-muted hover:text-nodejs-text'}`}>Courses</Link>
        <Link to="/dashboard" className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-nodejs-green' : 'text-nodejs-muted hover:text-nodejs-text'}`}>Academic Dashboard</Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-nodejs-gray rounded-full border border-nodejs-light-gray">
              <div className="w-6 h-6 bg-nodejs-green/20 rounded-full flex items-center justify-center text-nodejs-green text-xs font-bold uppercase">
                {user.name[0]}
              </div>
              <span className="text-xs font-medium text-nodejs-text">{user.name}</span>
            </div>
            <button onClick={onLogout} className="p-2 text-nodejs-muted hover:text-red-500 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-nodejs-muted hover:text-nodejs-text transition-colors">Login</Link>
            <Link to="/signup" className="px-5 py-2 text-sm font-medium text-white bg-nodejs-green rounded-lg hover:bg-opacity-90 transition-all shadow-md shadow-nodejs-green/10">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-nodejs-gray border-t border-nodejs-light-gray py-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-nodejs-green rounded-lg flex items-center justify-center text-white">
            <BookOpen size={18} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-nodejs-text">COURSECORE<span className="text-nodejs-green">.io</span></span>
        </div>
        <p className="text-sm text-nodejs-muted max-w-sm leading-relaxed">
          Empowering students with crowdsourced course intelligence and a streamlined personal academic dashboard.
        </p>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-nodejs-muted mb-6">Platform</h4>
        <ul className="space-y-4">
          <li><Link to="/courses" className="text-sm text-nodejs-muted hover:text-nodejs-green transition-colors">Course Intelligence</Link></li>
          <li><Link to="/dashboard" className="text-sm text-nodejs-muted hover:text-nodejs-green transition-colors">Academic Dashboard</Link></li>
          <li><Link to="/compare" className="text-sm text-nodejs-muted hover:text-nodejs-green transition-colors">Course Comparison</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-nodejs-muted mb-6">Support</h4>
        <ul className="space-y-4">
          <li><a href="#" className="text-sm text-nodejs-muted hover:text-nodejs-green transition-colors">Documentation</a></li>
          <li><a href="#" className="text-sm text-nodejs-muted hover:text-nodejs-green transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="text-sm text-nodejs-muted hover:text-nodejs-green transition-colors">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-nodejs-light-gray flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-xs text-nodejs-muted">© 2026 COURSECORE.io. All rights reserved.</p>
      <div className="flex items-center gap-6">
        <a href="#" className="text-nodejs-muted hover:text-nodejs-green transition-colors"><MessageSquare size={18} /></a>
        <a href="#" className="text-nodejs-muted hover:text-nodejs-green transition-colors"><FileText size={18} /></a>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const Home = () => {
  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="py-20 flex flex-col items-center text-center relative">
        {/* Hero Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nodejs-green/20 blur-[140px] -z-10 rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-nodejs-green/10 text-nodejs-green rounded-full text-xs font-bold uppercase tracking-wider mb-8"
        >
          <Star size={14} fill="currentColor" />
          The Future of Academic Intelligence
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-nodejs-text mb-6 leading-[1.1]"
        >
          Master Your Courses with <br />
          <span className="text-nodejs-green">Crowdsourced Wisdom.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-nodejs-muted max-w-2xl mb-10 leading-relaxed"
        >
          COURSECORE.io combines deep course insights with a powerful personal dashboard to help you navigate your academic journey with confidence.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/courses" className="px-8 py-4 bg-nodejs-green text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-xl shadow-nodejs-green/10 flex items-center gap-2">
            Explore Courses <ArrowRight size={20} />
          </Link>
          <Link to="/signup" className="px-8 py-4 bg-nodejs-gray text-nodejs-text font-bold rounded-xl border border-nodejs-light-gray hover:border-nodejs-green transition-all flex items-center gap-2">
            Get Started Free
          </Link>
        </motion.div>
      </section>

      {/* Documentation Section */}
      <section className="py-20 border-t border-nodejs-light-gray">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black tracking-tight text-nodejs-text mb-6">Project Definition</h2>
            <p className="text-nodejs-muted leading-relaxed mb-8">
              COURSECORE.io is a specialized academic platform designed to bridge the information gap between students and their courses. It serves as both a public intelligence layer and a private productivity tool.
            </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-nodejs-green/10 rounded-xl flex-shrink-0 flex items-center justify-center text-nodejs-green">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-nodejs-text mb-1">Verified Resource Badge</h4>
                  <p className="text-sm text-nodejs-muted leading-relaxed">Resources upvoted and confirmed by multiple students receive an "Exam Relevant" badge for high reliability.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-nodejs-gray rounded-3xl p-8 md:p-12 border border-nodejs-light-gray">
            <h3 className="text-xl font-bold text-nodejs-text mb-8 flex items-center gap-2">
              <Layers size={20} className="text-nodejs-green" />
              System Requirements & Architecture
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-nodejs-green mb-4">Functional Requirements</h4>
                <ul className="space-y-3">
                  {['Public Course Intelligence Layer', 'Private Academic Dashboard', 'Verified Resource Badge System', 'Anonymous Review System', 'Course Comparison Tool', 'Assignment & Deadline Tracker'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-nodejs-muted">
                      <CheckCircle size={16} className="text-nodejs-green mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-nodejs-green mb-4">Non-Functional Requirements</h4>
                <ul className="space-y-3">
                  {['High Availability (99.9%)', 'Responsive Mobile-First Design', 'Low Latency Data Retrieval', 'GDPR Compliant Data Privacy', 'Scalable Microservices Architecture', 'Intuitive User Experience'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-nodejs-muted">
                      <CheckCircle size={16} className="text-nodejs-green/60 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-nodejs-light-gray">
              <h4 className="text-xs font-black uppercase tracking-widest text-nodejs-green mb-6">Tools & Tech Stack</h4>
              <div className="flex flex-wrap gap-3">
                {['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons', 'Vite', 'Express.js', 'PostgreSQL', 'Redis'].map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 bg-nodejs-dark border border-nodejs-light-gray rounded-lg text-xs font-bold text-nodejs-text shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CourseIntelligence = () => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [compareCourses, setCompareCourses] = useState<Course[]>([]);

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCompare = (course: Course) => {
    if (compareCourses.find(c => c.id === course.id)) {
      setCompareCourses(compareCourses.filter(c => c.id !== course.id));
    } else if (compareCourses.length < 2) {
      setCompareCourses([...compareCourses, course]);
    }
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-nodejs-green/5 blur-[120px] -z-10 rounded-full" />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-nodejs-text mb-2">Course Intelligence</h1>
          <p className="text-nodejs-muted">Crowdsourced insights for your academic journey.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setIsComparing(!isComparing)}
            className={`px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${isComparing ? 'bg-nodejs-green text-white shadow-lg shadow-nodejs-green/20' : 'bg-nodejs-gray border border-nodejs-light-gray text-nodejs-muted hover:border-nodejs-green hover:text-nodejs-text'}`}
          >
            <ArrowLeftRight size={18} />
            {isComparing ? 'Exit Comparison' : 'Compare Courses'}
          </button>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-nodejs-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="w-full pl-12 pr-4 py-3 bg-nodejs-gray border border-nodejs-light-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-nodejs-green/20 focus:border-nodejs-green transition-all shadow-sm text-nodejs-text placeholder:text-nodejs-muted"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isComparing && compareCourses.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-8 bg-nodejs-gray rounded-3xl border border-nodejs-light-gray"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-nodejs-text">Course Comparison</h3>
            <div className="text-sm text-nodejs-green font-bold">{compareCourses.length}/2 Selected</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {compareCourses.map((course) => (
              <div key={course.id} className="bg-nodejs-dark p-6 rounded-2xl border border-nodejs-light-gray shadow-sm relative">
                <button 
                  onClick={() => toggleCompare(course)}
                  className="absolute top-4 right-4 p-1 text-nodejs-muted hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-nodejs-green text-white text-[10px] font-black uppercase tracking-widest rounded-md">{course.code}</span>
                  <h4 className="font-bold text-nodejs-text">{course.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-nodejs-muted block mb-1">Difficulty</span>
                    <div className="text-lg font-black text-nodejs-green">{course.difficulty}/5</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-nodejs-muted block mb-1">Workload</span>
                    <div className="text-lg font-black text-nodejs-green/80">{course.workload}/5</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-nodejs-muted block mb-1">Bulkiness</span>
                    <div className="text-sm font-bold text-nodejs-text">{course.bulkiness}/10</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-nodejs-muted block mb-1">Exam Type</span>
                    <div className="text-sm font-bold text-nodejs-text">{course.examType}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-nodejs-muted block mb-1">Lecturers</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {course.lecturers.map((lecturer, i) => (
                        <span key={i} className="px-2 py-0.5 bg-nodejs-green/10 text-nodejs-green text-[10px] font-bold rounded-md border border-nodejs-green/20">{lecturer}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-nodejs-muted block mb-1">Frequency & Attendance</span>
                    <p className="text-[11px] text-nodejs-muted leading-tight">{course.frequency} • {course.attendance}</p>
                  </div>
                </div>
              </div>
            ))}
            {compareCourses.length < 2 && (
              <div className="border-2 border-dashed border-nodejs-light-gray rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-nodejs-dark/50">
                <Plus size={32} className="text-nodejs-muted mb-2" />
                <p className="text-sm font-bold text-nodejs-muted">Select another course to compare</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isSelectedForCompare = compareCourses.find(c => c.id === course.id);
          return (
            <motion.div
              key={course.id}
              layoutId={course.id}
              onClick={() => isComparing ? toggleCompare(course) : setSelectedCourse(course)}
              className={`group bg-nodejs-gray border rounded-2xl p-6 hover:shadow-xl hover:shadow-nodejs-green/5 transition-all cursor-pointer relative overflow-hidden ${isSelectedForCompare ? 'border-nodejs-green ring-2 ring-nodejs-green/10' : 'border-nodejs-light-gray hover:border-nodejs-green'}`}
            >
              {/* Circuit Pattern Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#339933 0.5px, transparent 0.5px)`, backgroundSize: '10px 10px' }} />
              
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-12 -mt-12 transition-colors ${isSelectedForCompare ? 'bg-nodejs-green' : 'bg-nodejs-light-gray group-hover:bg-nodejs-green/20'}`} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded-md transition-colors ${isSelectedForCompare ? 'bg-white text-nodejs-green' : 'bg-nodejs-dark text-nodejs-green'}`}>
                    {course.code}
                  </span>
                  <div className={`flex items-center gap-1 text-xs font-bold transition-colors ${isSelectedForCompare ? 'text-white/80' : 'text-nodejs-muted'}`}>
                    <Users size={14} />
                    {course.reviews.length} reviews
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold mb-4 transition-colors ${isSelectedForCompare ? 'text-white' : 'text-nodejs-text group-hover:text-nodejs-green'}`}>{course.name}</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 transition-colors ${isSelectedForCompare ? 'text-white/60' : 'text-nodejs-muted'}`}>Difficulty</span>
                      <span className={`text-xs font-bold transition-colors ${isSelectedForCompare ? 'text-white' : 'text-nodejs-text'}`}>{course.difficulty}/5</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isSelectedForCompare ? 'bg-white/20' : 'bg-nodejs-dark'}`}>
                      <div 
                        className="h-full bg-nodejs-green rounded-full" 
                        style={{ width: `${(course.difficulty / 5) * 100}%` }} 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 transition-colors ${isSelectedForCompare ? 'text-white/60' : 'text-nodejs-muted'}`}>Workload</span>
                      <span className={`text-xs font-bold transition-colors ${isSelectedForCompare ? 'text-white' : 'text-nodejs-text'}`}>{course.workload}/5</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isSelectedForCompare ? 'bg-white/20' : 'bg-nodejs-dark'}`}>
                      <div 
                        className="h-full bg-nodejs-green/60 rounded-full" 
                        style={{ width: `${(course.workload / 5) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 transition-colors ${isSelectedForCompare ? 'text-white/60' : 'text-nodejs-muted'}`}>Lecturers</span>
                  <p className={`text-xs font-bold transition-colors ${isSelectedForCompare ? 'text-white' : 'text-nodejs-text'}`}>
                    {course.lecturers.join(' & ')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course.lecturerTags.slice(0, 2).map((tag, i) => (
                    <span key={i} className={`px-2 py-1 text-[10px] font-bold rounded-md border transition-colors ${isSelectedForCompare ? 'bg-white/20 border-white/10 text-white' : 'bg-nodejs-dark text-nodejs-muted border-nodejs-light-gray'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {isComparing && (
                <div className="absolute inset-0 bg-nodejs-dark/10 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${isSelectedForCompare ? 'bg-red-500 text-white' : 'bg-nodejs-green text-white'}`}>
                    {isSelectedForCompare ? <X size={24} /> : <Plus size={24} />}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-nodejs-dark/80 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedCourse.id}
              className="relative w-full max-w-4xl max-h-[90vh] bg-nodejs-gray rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-nodejs-light-gray"
            >
              <div className="p-8 border-b border-nodejs-light-gray flex items-start justify-between bg-nodejs-dark/50">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-nodejs-green text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                      {selectedCourse.code}
                    </span>
                    <h2 className="text-3xl font-black tracking-tight text-white">{selectedCourse.name}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm font-bold text-nodejs-green">
                      <Star size={16} fill="currentColor" />
                      {selectedCourse.difficulty}/5 Difficulty
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-nodejs-green/80">
                      <Clock size={16} />
                      {selectedCourse.workload}/5 Workload
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-nodejs-light-gray rounded-full transition-colors border border-transparent hover:border-nodejs-light-gray"
                >
                  <X size={24} className="text-nodejs-muted" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 bg-nodejs-gray">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <section>
                      <h4 className="text-xs font-black uppercase tracking-widest text-nodejs-muted mb-4 flex items-center gap-2">
                        <AlertCircle size={14} className="text-nodejs-green" />
                        Intelligence Breakdown
                      </h4>
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-sm font-bold text-white mb-1">Lecturers</h5>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedCourse.lecturers.map((lecturer, i) => (
                              <span key={i} className="px-3 py-1 bg-nodejs-green text-white text-xs font-bold rounded-full shadow-sm">
                                {lecturer}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-bold text-white mb-1">Frequency</h5>
                            <p className="text-sm text-nodejs-muted leading-relaxed">{selectedCourse.frequency}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white mb-1">Attendance</h5>
                            <p className="text-sm text-nodejs-muted leading-relaxed">{selectedCourse.attendance}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-bold text-white mb-1">Bulkiness</h5>
                            <p className="text-sm text-nodejs-muted leading-relaxed">{selectedCourse.bulkiness}/10</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white mb-1">Exam Type</h5>
                            <p className="text-sm text-nodejs-muted leading-relaxed">{selectedCourse.examType}</p>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white mb-1">Assignments</h5>
                          <p className="text-sm text-nodejs-muted leading-relaxed">{selectedCourse.assignmentsInfo}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white mb-1">Lecturer Style Tags</h5>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedCourse.lecturerTags.map((tag, i) => (
                              <span key={i} className="px-3 py-1 bg-nodejs-green/10 text-nodejs-green text-xs font-bold rounded-full border border-nodejs-green/20">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-xs font-black uppercase tracking-widest text-nodejs-muted mb-4 flex items-center gap-2">
                        <FileText size={14} className="text-nodejs-green" />
                        Past Questions & Resources
                      </h4>
                      <div className="space-y-3">
                        {selectedCourse.pastQuestions.map((pq) => (
                          <div key={pq.id} className="p-4 bg-nodejs-dark rounded-xl border border-nodejs-light-gray flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-nodejs-gray rounded-lg border border-nodejs-light-gray flex items-center justify-center text-nodejs-muted group-hover:text-nodejs-green transition-colors">
                                <FileText size={20} />
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-white">{pq.title}</h5>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <span className="text-[10px] text-nodejs-muted font-bold uppercase tracking-widest">{pq.year} • {pq.semester}</span>
                                  {pq.isExamRelevant && (
                                    <span className="flex items-center gap-1 text-[10px] font-black text-nodejs-green uppercase tracking-widest">
                                      <ShieldCheck size={12} />
                                      Exam Relevant
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-xs font-bold text-nodejs-muted">
                                <ThumbsUp size={14} />
                                {pq.upvotes}
                              </div>
                              <button className="p-2 bg-nodejs-gray border border-nodejs-light-gray rounded-lg text-nodejs-muted hover:text-nodejs-green hover:border-nodejs-green transition-all">
                                <Download size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button className="w-full py-3 border border-dashed border-nodejs-light-gray rounded-xl text-xs font-bold text-nodejs-muted hover:text-nodejs-green hover:border-nodejs-green hover:bg-nodejs-green/5 transition-all flex items-center justify-center gap-2">
                          <Plus size={16} /> Upload Past Question
                        </button>
                      </div>
                    </section>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-nodejs-muted flex items-center gap-2">
                          <MessageSquare size={14} className="text-nodejs-green" />
                          Student Reviews
                        </h4>
                        <button className="text-xs font-bold text-nodejs-green hover:underline">Write Review</button>
                      </div>
                      <div className="space-y-4">
                        {selectedCourse.reviews.map((review) => (
                          <div key={review.id} className="p-4 bg-nodejs-dark border border-nodejs-light-gray rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-nodejs-gray rounded-full flex items-center justify-center text-[10px] font-bold text-nodejs-muted">
                                  {review.isAnonymous ? 'A' : review.user[0]}
                                </div>
                                <span className="text-xs font-bold text-nodejs-text">{review.isAnonymous ? 'Anonymous' : review.user}</span>
                              </div>
                              <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={12} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? '' : 'text-nodejs-light-gray'} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-nodejs-muted leading-relaxed italic">"{review.comment}"</p>
                            <div className="mt-2 text-[10px] font-bold text-nodejs-muted uppercase tracking-widest">{review.date}</div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="p-6 bg-nodejs-green rounded-2xl text-white">
                      <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                        <ArrowLeftRight size={18} />
                        Course Comparison
                      </h4>
                      <p className="text-xs text-white/80 mb-4 leading-relaxed">Not sure which elective to pick? Compare this course with others in your department.</p>
                      <button className="w-full py-2.5 bg-white text-nodejs-green text-xs font-bold rounded-lg hover:bg-opacity-90 transition-colors">
                        Compare with another course
                      </button>
                    </section>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CalendarView = ({ assignments }: { assignments: Assignment[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026 to match mock data

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const days = [];
  // Add empty slots for days of the week before the 1st
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  // Add actual days
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  const getAssignmentsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return assignments.filter(a => a.deadline === dateStr);
  };

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  return (
    <div className="bg-nodejs-gray border border-nodejs-light-gray rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-nodejs-light-gray flex items-center justify-between bg-nodejs-dark/50">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Calendar size={18} className="text-nodejs-green" />
          {monthName} {year}
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-1.5 text-nodejs-muted hover:text-white transition-colors bg-nodejs-dark rounded-lg border border-nodejs-light-gray">
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextMonth} className="p-1.5 text-nodejs-muted hover:text-white transition-colors bg-nodejs-dark rounded-lg border border-nodejs-light-gray">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-nodejs-muted py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-nodejs-light-gray/20 rounded-xl overflow-hidden border border-nodejs-light-gray/20">
          {days.map((day, idx) => {
            const dayAssignments = day ? getAssignmentsForDay(day) : [];
            return (
              <div 
                key={idx} 
                className={`min-h-[100px] p-2 bg-nodejs-gray transition-colors ${day ? 'hover:bg-nodejs-dark/30' : 'bg-nodejs-dark/10'}`}
              >
                {day && (
                  <>
                    <span className="text-xs font-bold text-nodejs-muted mb-2 block">{day}</span>
                    <div className="space-y-1">
                      {dayAssignments.map(a => (
                        <div 
                          key={a.id} 
                          className={`text-[9px] p-1 rounded border leading-tight truncate ${
                            a.priority === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                            a.priority === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 
                            'bg-nodejs-green/10 border-nodejs-green/20 text-nodejs-green'
                          }`}
                          title={a.title}
                        >
                          {a.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [activeTab, setActiveTab] = useState<'tracker' | 'calendar'>('tracker');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'In Progress': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-nodejs-dark text-nodejs-muted border-nodejs-light-gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-amber-500';
      default: return 'text-nodejs-green';
    }
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-nodejs-green/5 blur-[120px] -z-10 rounded-full" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">Academic Dashboard</h1>
          <p className="text-nodejs-muted">Your personal command center for academic success.</p>
        </div>
        <div className="flex items-center p-1 bg-nodejs-gray rounded-xl border border-nodejs-light-gray">
          <button 
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'tracker' ? 'bg-nodejs-dark text-nodejs-green shadow-sm border border-nodejs-light-gray' : 'text-nodejs-muted hover:text-white'}`}
          >
            Assignment Tracker
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'calendar' ? 'bg-nodejs-dark text-nodejs-green shadow-sm border border-nodejs-light-gray' : 'text-nodejs-muted hover:text-white'}`}
          >
            Deadline Calendar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {activeTab === 'tracker' ? (
            <div className="bg-nodejs-gray border border-nodejs-light-gray rounded-3xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-nodejs-light-gray flex items-center justify-between bg-nodejs-dark/50">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <LayoutDashboard size={18} className="text-nodejs-green" />
                  Active Assignments
                </h3>
                <button className="px-3 py-1.5 bg-nodejs-green text-white text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-1.5">
                  <Plus size={14} /> Add New
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-nodejs-dark/30 border-b border-nodejs-light-gray">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-nodejs-muted">Assignment</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-nodejs-muted">Course</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-nodejs-muted">Deadline</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-nodejs-muted">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-nodejs-muted">Priority</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-nodejs-muted"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-nodejs-light-gray">
                    {assignments.map((assignment) => {
                      const course = MOCK_COURSES.find(c => c.id === assignment.courseId);
                      return (
                        <tr key={assignment.id} className="hover:bg-nodejs-dark/20 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${assignment.status === 'Done' ? 'bg-green-500' : assignment.status === 'In Progress' ? 'bg-amber-500' : 'bg-nodejs-muted'}`} />
                              <span className="text-sm font-bold text-white">{assignment.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-nodejs-dark text-nodejs-green text-[10px] font-black uppercase tracking-widest rounded-md border border-nodejs-light-gray">
                              {course?.code}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-nodejs-muted">
                              <Calendar size={14} />
                              {assignment.deadline}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border ${getStatusColor(assignment.status)}`}>
                              {assignment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`flex items-center gap-1 text-xs font-bold ${getPriorityColor(assignment.priority)}`}>
                              <AlertCircle size={14} />
                              {assignment.priority}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-1.5 text-nodejs-muted hover:text-white transition-colors">
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <CalendarView assignments={assignments} />
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-nodejs-green rounded-3xl p-6 text-white shadow-xl shadow-nodejs-green/10 relative overflow-hidden">
            {/* Card Pattern */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: `radial-gradient(white 0.5px, transparent 0.5px)`, backgroundSize: '15px 15px' }} />
            
            <div className="relative">
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                <Bell size={18} />
                Reminders
              </h4>
              <div className="space-y-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="text-xs font-bold mb-1 text-white">Calculus II Problem Set</p>
                  <p className="text-[10px] text-white/80">Due in 3 days • High Priority</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 opacity-60">
                  <p className="text-xs font-bold mb-1 text-white">CSC101 Lab 5</p>
                  <p className="text-[10px] text-white/80">Due in 6 days • Medium Priority</p>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 bg-white text-nodejs-green text-xs font-bold rounded-xl hover:bg-opacity-90 transition-colors">
                Manage Reminders
              </button>
            </div>
          </div>

          <div className="bg-nodejs-gray border border-nodejs-light-gray rounded-3xl p-6 shadow-sm relative overflow-hidden">
            {/* Card Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `linear-gradient(#339933 0.5px, transparent 0.5px), linear-gradient(90deg, #339933 0.5px, transparent 0.5px)`, backgroundSize: '15px 15px' }} />
            
            <div className="relative">
              <h4 className="text-xs font-black uppercase tracking-widest text-nodejs-muted mb-6 flex items-center gap-2">
                <BarChart2 size={14} className="text-nodejs-green" />
                Progress Overview
              </h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-nodejs-text">Overall Completion</span>
                    <span className="text-xs font-bold text-nodejs-green">68%</span>
                  </div>
                  <div className="h-2 w-full bg-nodejs-dark rounded-full overflow-hidden">
                    <div className="h-full bg-nodejs-green rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-nodejs-dark rounded-xl border border-nodejs-light-gray">
                    <span className="text-[10px] font-black uppercase tracking-widest text-nodejs-muted block mb-1">Completed</span>
                    <span className="text-lg font-black text-white">12</span>
                  </div>
                  <div className="p-3 bg-nodejs-dark rounded-xl border border-nodejs-light-gray">
                    <span className="text-[10px] font-black uppercase tracking-widest text-nodejs-muted block mb-1">Pending</span>
                    <span className="text-lg font-black text-white">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Auth = ({ mode }: { mode: 'login' | 'signup' }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    const user = { name: name || 'Student', email };
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center bg-nodejs-dark">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-nodejs-gray rounded-3xl shadow-xl shadow-nodejs-green/5 border border-nodejs-light-gray p-8 md:p-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-nodejs-green rounded-2xl flex items-center justify-center text-white shadow-lg shadow-nodejs-green/30 mx-auto mb-6">
            <BookOpen size={36} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join COURSECORE'}
          </h2>
          <p className="text-nodejs-muted">
            {mode === 'login' ? 'Access your intelligence dashboard.' : 'Start your journey to academic success.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-nodejs-muted mb-2 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-nodejs-muted" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe" 
                  className="w-full pl-12 pr-4 py-3 bg-nodejs-dark border border-nodejs-light-gray rounded-xl text-white focus:outline-none focus:border-nodejs-green transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-nodejs-muted mb-2 ml-1">Email Address</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-nodejs-muted" size={18} />
              <input 
                type="email" 
                required
                placeholder="name@university.edu" 
                className="w-full pl-12 pr-4 py-3 bg-nodejs-dark border border-nodejs-light-gray rounded-xl text-white focus:outline-none focus:border-nodejs-green transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-nodejs-muted mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-nodejs-muted" size={18} />
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                className="w-full pl-12 pr-4 py-3 bg-nodejs-dark border border-nodejs-light-gray rounded-xl text-white focus:outline-none focus:border-nodejs-green transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-nodejs-green text-white font-black uppercase tracking-widest rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-nodejs-green/20 flex items-center justify-center gap-2">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-nodejs-light-gray text-center">
          <p className="text-sm text-nodejs-muted">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <Link to={mode === 'login' ? '/signup' : '/login'} className="text-nodejs-green font-bold hover:underline">
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-nodejs-dark font-sans text-nodejs-text selection:bg-nodejs-green/20 selection:text-nodejs-green relative overflow-x-hidden">
        {/* Atmospheric Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{ 
              backgroundImage: `linear-gradient(#339933 1px, transparent 1px), linear-gradient(90deg, #339933 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Glow Effects */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-nodejs-green/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-nodejs-green/15 blur-[150px]" />
          
          {/* Computer Engineering Image Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{ 
              backgroundImage: `url('https://picsum.photos/seed/circuit/1920/1080')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%) brightness(0.8)'
            }}
          />
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#121212_100%)]" />
        </div>

        <div className="relative z-10">
          <Navbar user={user} onLogout={handleLogout} />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CourseIntelligence />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Auth mode="login" />} />
              <Route path="/signup" element={<Auth mode="signup" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}
