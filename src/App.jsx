import React, { useMemo, useState } from "react";
import {
  BookOpen, LayoutDashboard, Compass, ClipboardCheck, Search, Bell,
  Menu, X, Clock3, Star, PlayCircle, ArrowRight, CheckCircle2,
  GraduationCap, Users, Trophy, CircleHelp, ChevronRight, LogIn, UserPlus
} from "lucide-react";
import "./App.css";

const team = [
  { name: "Gourakkagari Navyasri", roll: "25255A0507" },
  { name: "Hasini", roll: "24251A05A3" },
  { name: "Rupa", roll: "24251A05A5" }
];

const courses = [
  { id: 1, title: "React JS: From Basics to Projects", category: "Development", level: "Beginner", lessons: 18, hours: "6h 20m", rating: "4.9", color: "lavender", icon: "⚛️", description: "Learn components, props, state, and build interactive user interfaces." },
  { id: 2, title: "Java Programming Essentials", category: "Programming", level: "Beginner", lessons: 24, hours: "8h 10m", rating: "4.8", color: "peach", icon: "☕", description: "Understand Java syntax, object-oriented programming, and core concepts." },
  { id: 3, title: "SQL & Database Design", category: "Database", level: "Intermediate", lessons: 15, hours: "5h 45m", rating: "4.7", color: "mint", icon: "🗄️", description: "Practice SQL queries, relational tables, joins, and database design." },
  { id: 4, title: "HTML & CSS Web Design", category: "Design", level: "Beginner", lessons: 20, hours: "7h 05m", rating: "4.9", color: "blue", icon: "🎨", description: "Create responsive websites using semantic HTML and modern CSS." },
  { id: 5, title: "Spring MVC Fundamentals", category: "Development", level: "Intermediate", lessons: 16, hours: "6h 00m", rating: "4.8", color: "mint", icon: "🌱", description: "Explore controllers, services, request mapping, and MVC architecture." },
  { id: 6, title: "Python for Data Analysis", category: "Programming", level: "Beginner", lessons: 22, hours: "9h 15m", rating: "4.8", color: "peach", icon: "🐍", description: "Start working with Python, data structures, and useful data tools." }
];

const quizQuestions = [
  { question: "Which React hook is commonly used to manage component state?", options: ["useRoute()", "useState()", "useStyle()", "useServer()"], answer: 1 },
  { question: "Which language is primarily used to style a web page?", options: ["SQL", "Java", "CSS", "Spring"], answer: 2 },
  { question: "Which SQL command is used to retrieve data from a table?", options: ["SELECT", "PUSH", "PAINT", "SEND"], answer: 0 }
];

function App() {
  // Start every new visit on Login. This is demo-only authentication.
  const [page, setPage] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [enrolled, setEnrolled] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [notice, setNotice] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const categories = ["All", "Development", "Programming", "Database", "Design"];
  const filteredCourses = useMemo(() => courses.filter((course) => {
    const matchesSearch = `${course.title} ${course.description} ${course.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (category === "All" || course.category === category);
  }), [search, category]);

  const enrolledCourses = courses.filter((course) => enrolled.includes(course.id));
  const progress = enrolled.length ? Math.round((completed.length / enrolled.length) * 100) : 0;

  function navigate(nextPage) {
    const publicPages = ["Login", "Register"];
    if (!isLoggedIn && !publicPages.includes(nextPage)) {
      setPage("Login");
      setNotice("Please log in first to access courses and learning tools.");
      setMobileOpen(false);
      return;
    }
    setPage(nextPage);
    setMobileOpen(false);
    setNotice("");
  }

  function toggleEnrollment(id) {
    if (enrolled.includes(id)) {
      setEnrolled(enrolled.filter((courseId) => courseId !== id));
      setCompleted(completed.filter((courseId) => courseId !== id));
      setNotice("Course removed from your learning list.");
    } else {
      setEnrolled([...enrolled, id]);
      setNotice("You are enrolled! The course is now in your dashboard.");
    }
  }

  function startQuiz() {
    setQuizStarted(true);
    setQuestionIndex(0);
    setAnswers({});
    setQuizFinished(false);
  }

  function chooseAnswer(optionIndex) {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  }

  function nextQuestion() {
    if (questionIndex < quizQuestions.length - 1) setQuestionIndex(questionIndex + 1);
    else setQuizFinished(true);
  }

  function resetQuiz() {
    setQuizStarted(false);
    setQuizFinished(false);
    setQuestionIndex(0);
    setAnswers({});
  }

  function handleRegister(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setNotice("Passwords do not match. Please try again.");
      return;
    }
    // This only demonstrates the frontend flow; it does not save an account.
    setPassword("");
    setConfirmPassword("");
    setPage("Login");
    setNotice("Registration form checked. Please log in. Real account creation requires the Spring MVC backend.");
  }

  function handleLogin(e) {
    e.preventDefault();
    // Demo only: accepts any non-empty email/password. Connect Spring MVC for real verification.
    setIsLoggedIn(true);
    setPage("Home");
    setMobileOpen(false);
    setPassword("");
    setNotice("Demo login successful. Welcome to LearnSpace!");
  }

  function logout() {
    setIsLoggedIn(false);
    setPage("Login");
    setSearch("");
    setPassword("");
    setConfirmPassword("");
    setMobileOpen(false);
    setNotice("You have logged out.");
  }

  const score = quizQuestions.reduce((total, q, index) => total + (answers[index] === q.answer ? 1 : 0), 0);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <span className="brand-mark"><GraduationCap size={22} /></span>
          <span>Learn<span className="brand-accent">Space</span></span>
          <button className="icon-button close-menu" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>
        <div className="workspace-label">{isLoggedIn ? "LEARNING SPACE" : "WELCOME TO LEARNSPACE"}</div>
        <nav className="main-nav">
          {!isLoggedIn ? (
            <>
              <button className={page === "Login" ? "nav-item active" : "nav-item"} onClick={() => navigate("Login")}><LogIn size={18} />Login</button>
              <button className={page === "Register" ? "nav-item active" : "nav-item"} onClick={() => navigate("Register")}><UserPlus size={18} />Create account</button>
            </>
          ) : (
            <>
              <button className={page === "Home" ? "nav-item active" : "nav-item"} onClick={() => navigate("Home")}><LayoutDashboard size={18} />Home</button>
              <button className={page === "Courses" ? "nav-item active" : "nav-item"} onClick={() => navigate("Courses")}><Compass size={18} />Explore courses</button>
              <button className={page === "Dashboard" ? "nav-item active" : "nav-item"} onClick={() => navigate("Dashboard")}><BookOpen size={18} />My learning</button>
              <button className={page === "Quiz" ? "nav-item active" : "nav-item"} onClick={() => navigate("Quiz")}><ClipboardCheck size={18} />Practice quiz</button>
              <button className="nav-item" onClick={logout}><LogIn size={18} />Log out</button>
            </>
          )}
        </nav>
        <div className="sidebar-bottom">
          {!isLoggedIn ? (
            <div className="help-card">
              <div className="help-icon"><CircleHelp size={19} /></div>
              <strong>Start learning today</strong>
              <p>Log in or create an account to explore courses.</p>
              <button onClick={() => navigate("Register")}>Create account <ArrowRight size={14} /></button>
            </div>
          ) : (
            <>
              <div className="help-card">
                <div className="help-icon"><CircleHelp size={19} /></div>
                <strong>Need a little help?</strong>
                <p>Keep learning, one step at a time.</p>
                <button onClick={() => setNotice("Tip: Explore courses, enroll, and track your progress from My learning.")}>Learning tips <ArrowRight size={14} /></button>
              </div>
              <div className="profile-row"><div className="avatar">{userName ? userName.split(" ").map(part => part[0]).slice(0, 2).join("").toUpperCase() : "ST"}</div><div className="profile-text"><strong>{userName || "Student"}</strong><span>Learning account</span></div><span className="online-dot" /></div>
            </>
          )}
        </div>
      </aside>

      {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="breadcrumb">Learning platform <ChevronRight size={15} /> <strong>{page}</strong></div>
          <div className="topbar-actions">
            {isLoggedIn && page !== "Login" && page !== "Register" && (
              <label className="top-search"><Search size={17} /><input value={search} onChange={(e) => { setSearch(e.target.value); if (page !== "Courses") setPage("Courses"); }} placeholder="Search courses..." /></label>
            )}
            {isLoggedIn && (
              <>
                <button className="icon-button notification" onClick={() => setNotice("You're all caught up. Welcome back to LearnSpace!")} aria-label="Notifications"><Bell size={19} /><span /></button>
                <div className="avatar top-avatar">{userName ? userName.split(" ").map(part => part[0]).slice(0, 2).join("").toUpperCase() : "ST"}</div>
              </>
            )}
          </div>
        </header>

        <div className="page-content">
          {notice && <div className="notice"><CheckCircle2 size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={16} /></button></div>}

          {!isLoggedIn && page !== "Login" && page !== "Register" && (
            <AuthPage title="Welcome Back!" subtitle="Please log in to access your learning space.">
              <form onSubmit={handleLogin}>
                <label>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                <button className="primary-button auth-submit" type="submit">Login <ArrowRight size={17} /></button>
              </form>
            </AuthPage>
          )}

          {isLoggedIn && page === "Home" && <HomePage navigate={navigate} enrolledCount={enrolled.length} progress={progress} />}
          {isLoggedIn && page === "Courses" && <CoursesPage courses={filteredCourses} categories={categories} category={category} setCategory={setCategory} enrolled={enrolled} toggleEnrollment={toggleEnrollment} />}
          {isLoggedIn && page === "Dashboard" && <DashboardPage enrolledCourses={enrolledCourses} completed={completed} progress={progress} setCompleted={setCompleted} />}
          {isLoggedIn && page === "Quiz" && <QuizPage started={quizStarted} startQuiz={startQuiz} questionIndex={questionIndex} answers={answers} chooseAnswer={chooseAnswer} nextQuestion={nextQuestion} finished={quizFinished} score={score} resetQuiz={resetQuiz} />}

          {page === "Login" && !isLoggedIn && (
            <AuthPage title="Welcome Back!" subtitle="Login to continue your learning journey.">
              <form onSubmit={handleLogin}>
                <label>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                <button className="primary-button auth-submit" type="submit">Login <ArrowRight size={17} /></button>
              </form>
              <p className="auth-switch">Don't have an account? <button type="button" className="text-button" onClick={() => navigate("Register")}>Register here</button></p>
            </AuthPage>
          )}

          {page === "Register" && !isLoggedIn && (
            <AuthPage title="Create Your Account" subtitle="Join LearnSpace and start learning today.">
              <form onSubmit={handleRegister}>
                <label>Full Name</label>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" required />
                <label>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" minLength="6" required />
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" minLength="6" required />
                <button className="primary-button auth-submit" type="submit">Create Account <ArrowRight size={17} /></button>
              </form>
              <p className="auth-switch">Already registered? <button type="button" className="text-button" onClick={() => navigate("Login")}>Login here</button></p>
            </AuthPage>
          )}

          {isLoggedIn && <TeamSection />}
          <footer className="footer">© 2026 LearnSpace · Online Learning Platform <span>Built with React JS</span></footer>
        </div>
      </main>
    </div>
  );
}

function AuthPage({ title, subtitle, children }) {
  return (
    <section className="auth-card">
      <div className="auth-mark"><GraduationCap size={28} /></div>
      <div className="eyebrow">LEARNSPACE ACCOUNT</div>
      <h1>{title}</h1>
      <p className="auth-subtitle">{subtitle}</p>
      {children}
      <div className="auth-note"><CircleHelp size={15} /> Demo form — backend authentication will be connected later.</div>
    </section>
  );
}

function HomePage({ navigate, enrolledCount, progress }) {
  return <>
    <section className="welcome-row">
      <div><div className="eyebrow"><span className="eyebrow-dot" /> YOUR LEARNING JOURNEY</div><h1>Learn something <span>new today.</span></h1><p className="lead">Build useful skills, explore new ideas, and move one step closer to your goals.</p><button className="primary-button" onClick={() => navigate("Courses")}>Explore courses <ArrowRight size={17} /></button></div>
      <div className="hero-art"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-book"><BookOpen size={58} strokeWidth={1.5} /></div><span className="floating-chip chip-top"><Star size={15} fill="currentColor" /> Keep growing</span><span className="floating-chip chip-bottom"><GraduationCap size={17} /> Your next chapter</span></div>
    </section>
    <section className="stats-grid">
      <StatCard icon={<BookOpen size={20}/>} tint="purple" label="Courses enrolled" value={enrolledCount} helper="Your learning list" />
      <StatCard icon={<ClipboardCheck size={20}/>} tint="orange" label="Quizzes available" value="03" helper="Practice your skills" />
      <StatCard icon={<Trophy size={20}/>} tint="green" label="Learning progress" value={`${progress}%`} helper="Keep up the momentum" />
    </section>
    <section className="section-block">
      <div className="section-heading"><div><h2>Pick up where you left off</h2><p>A few courses to get you moving.</p></div><button className="text-button" onClick={() => navigate("Courses")}>View all courses <ArrowRight size={16}/></button></div>
      <div className="course-grid">{courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} compact onAction={() => navigate("Courses")} actionLabel="View course" />)}</div>
    </section>
    <section className="quote-banner"><div className="quote-symbol">“</div><div><strong>Small steps lead to big achievements.</strong><p>Consistency is more important than speed. Keep showing up for yourself.</p></div><div className="quote-decoration">✳</div></section>
  </>;
}

function StatCard({ icon, tint, label, value, helper }) {
  return <div className="stat-card"><div className={`stat-icon ${tint}`}>{icon}</div><div className="stat-copy"><span>{label}</span><strong>{value}</strong><small>{helper}</small></div></div>;
}

function CoursesPage({ courses: visibleCourses, categories, category, setCategory, enrolled, toggleEnrollment }) {
  return <section className="page-section"><div className="page-title-row"><div><div className="eyebrow">GROW YOUR SKILLS</div><h1>Explore courses</h1><p className="lead">Find a course that fits your goals and start learning.</p></div><div className="result-pill"><BookOpen size={16}/>{visibleCourses.length} courses</div></div>
    <div className="filter-row">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`filter-chip ${category === item ? "selected" : ""}`}>{item}</button>)}</div>
    {visibleCourses.length ? <div className="course-grid">{visibleCourses.map((course) => <CourseCard key={course.id} course={course} enrolled={enrolled.includes(course.id)} onAction={() => toggleEnrollment(course.id)} actionLabel={enrolled.includes(course.id) ? "Enrolled · Remove" : "Enroll now"} />)}</div> : <div className="empty-state"><Search size={30}/><h3>No courses found</h3><p>Try a different search term or category.</p></div>}
  </section>;
}

function CourseCard({ course, enrolled, onAction, actionLabel, compact = false }) {
  return <article className={`course-card ${compact ? "compact-card" : ""}`}><div className={`course-cover ${course.color}`}><span className="course-emoji">{course.icon}</span><span className="course-category">{course.category}</span><span className="cover-decoration">✳</span></div><div className="course-card-body"><div className="course-meta"><span>{course.level}</span><span><Star size={14} fill="currentColor"/>{course.rating}</span></div><h3>{course.title}</h3><p>{course.description}</p><div className="course-details"><span><PlayCircle size={15}/>{course.lessons} lessons</span><span><Clock3 size={15}/>{course.hours}</span></div><button className={enrolled ? "secondary-button full-button" : "outline-button full-button"} onClick={onAction}>{actionLabel || "View course"} <ArrowRight size={15}/></button></div></article>;
}

function DashboardPage({ enrolledCourses, completed, progress, setCompleted }) {
  return <section className="page-section"><div className="page-title-row"><div><div className="eyebrow">YOUR PERSONAL SPACE</div><h1>My learning</h1><p className="lead">Track your courses and celebrate each step forward.</p></div><div className="avatar large-avatar">ST</div></div>
    <div className="progress-panel"><div className="progress-panel-top"><div><span className="muted-label">OVERALL PROGRESS</span><h2>{progress}% <span>completed</span></h2></div><div className="progress-badge"><Trophy size={19}/></div></div><div className="progress-track"><div style={{ width: `${progress}%` }} /></div><p>{completed.length} of {enrolledCourses.length} enrolled courses marked complete</p></div>
    <div className="section-heading dashboard-heading"><div><h2>Your enrolled courses</h2><p>Mark a course complete when you've finished it.</p></div></div>
    {enrolledCourses.length ? <div className="dashboard-course-list">{enrolledCourses.map((course) => { const done = completed.includes(course.id); return <div className="dashboard-course" key={course.id}><div className={`mini-course-icon ${course.color}`}>{course.icon}</div><div className="dashboard-course-copy"><strong>{course.title}</strong><span>{course.lessons} lessons · {course.hours}</span><div className="mini-progress"><span style={{ width: done ? "100%" : "35%" }} /></div></div><button className={done ? "completed-button" : "outline-button"} onClick={() => setCompleted(done ? completed.filter((id) => id !== course.id) : [...completed, course.id])}>{done ? <><CheckCircle2 size={16}/> Completed</> : "Mark complete"}</button></div>; })}</div> : <div className="empty-state"><BookOpen size={30}/><h3>No enrolled courses yet</h3><p>Explore the course library and enroll in your first course.</p></div>}
  </section>;
}

function QuizPage({ started, startQuiz, questionIndex, answers, chooseAnswer, nextQuestion, finished, score, resetQuiz }) {
  if (!started) return <section className="page-section"><div className="page-title-row"><div><div className="eyebrow">TEST YOUR KNOWLEDGE</div><h1>Practice quiz</h1><p className="lead">A quick check-in to reinforce what you've learned.</p></div></div><div className="quiz-intro"><div className="quiz-art"><ClipboardCheck size={54}/><span>?</span></div><div className="quiz-intro-copy"><span className="quiz-label">QUICK PRACTICE</span><h2>Ready for a little challenge?</h2><p>This sample quiz contains 3 multiple-choice questions about web development. Choose an answer for each question to see your score.</p><div className="quiz-facts"><span><CircleHelp size={16}/>3 questions</span><span><Clock3 size={16}/>About 2 minutes</span></div><button className="primary-button" onClick={startQuiz}>Start quiz <ArrowRight size={17}/></button></div></div></section>;
  if (finished) return <section className="page-section"><div className="quiz-result"><div className="result-trophy"><Trophy size={42}/></div><div className="eyebrow">QUIZ COMPLETED</div><h1>You did it!</h1><p className="lead">You scored {score} out of {quizQuestions.length}.</p><div className="result-score">{Math.round(score / quizQuestions.length * 100)}<span>%</span></div><p>{score === quizQuestions.length ? "Perfect score — excellent work!" : "Keep practicing. Every attempt helps you improve."}</p><button className="primary-button" onClick={resetQuiz}>Try again <ArrowRight size={17}/></button></div></section>;
  const q = quizQuestions[questionIndex];
  return <section className="page-section"><div className="page-title-row"><div><div className="eyebrow">PRACTICE QUIZ</div><h1>Knowledge check</h1><p className="lead">Take your time and choose the best answer.</p></div></div><div className="quiz-card"><div className="quiz-progress-label"><span>Question {questionIndex + 1} of {quizQuestions.length}</span><span>{Math.round((questionIndex + 1) / quizQuestions.length * 100)}%</span></div><div className="progress-track"><div style={{ width: `${(questionIndex + 1) / quizQuestions.length * 100}%` }}/></div><h2>{q.question}</h2><div className="answer-list">{q.options.map((option, i) => <button key={option} className={`answer-option ${answers[questionIndex] === i ? "chosen" : ""}`} onClick={() => chooseAnswer(i)}><span className="answer-letter">{String.fromCharCode(65 + i)}</span>{option}{answers[questionIndex] === i && <CheckCircle2 size={18}/>}</button>)}</div><div className="quiz-footer"><span>{Object.keys(answers).length} answer(s) selected</span><button className="primary-button" disabled={answers[questionIndex] === undefined} onClick={nextQuestion}>{questionIndex === quizQuestions.length - 1 ? "See results" : "Next question"} <ArrowRight size={16}/></button></div></div></section>;
}

function TeamSection() {
  return <section className="team-section"><div className="team-heading"><div className="team-icon"><Users size={20}/></div><div><h2>Our project team</h2><p>Online Learning Platform · React JS frontend</p></div></div><div className="team-grid">{team.map((member, index) => <div className="team-member" key={member.roll}><div className={`team-avatar avatar-${index + 1}`}>{member.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</div><div><strong>{member.name}</strong><span>Roll No: {member.roll}</span></div><span className="member-number">0{index + 1}</span></div>)}</div></section>;
}

export default App;
