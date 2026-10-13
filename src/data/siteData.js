// ============================================================
// THE CODING ZONE — Site Data (sourced from launchpad.pdf)
// ============================================================

export const SITE = {
  name: 'The Coding Zone',
  tagline: 'Think Create Code',
  phone: '8310326185',
  phoneDisplay: '+91 83103 26185',
  email: 'info@thecodingzone.in',
  website: 'www.thecodingzone.in',
  whatsappLink: "https://wa.me/918310326185?text=Hi%20Priyanka%20Ma'am!%20I'm%20interested%20in%20a%20free%20demo%20class%20at%20The%20Coding%20Zone.",
  address: {
    line1: 'Vadagaon Main Road, Vadagaon',
    city: 'Belgaum (Belagavi)',
    state: 'Karnataka',
    pin: '590005',
    full: 'Codingzone, Vadagaon Main Road, Vadagaon, Belgaum, Karnataka – 590005',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3848.292!2d74.5176!3d15.8497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDUwJzU5LjAiTiA3NMKwMzEnMDMuNiJF!5e0!3m2!1sen!2sin!4v1697200000000!5m2!1sen!2sin',
  },
  audience: 'Grade 9 to 12 & Diploma Students',
  mission: 'To inspire kids and teens to fall in love with coding.',
  vision: 'To build the largest coding platform to empower future leaders.',
  founder: {
    name: 'Priyanka Desurkar',
    role: 'Founder & CEO',
    credentials: 'B.E & M.Tech',
    // Original quote from brochure (grammar-corrected as flagged in plan):
    quote:
      'Coding is a lifelong skill that prepares kids for the challenges of tomorrow, empowering them at every level.',
    initials: 'PD',
    image: '/images/priyanka-desurkar-square.jpg',
  },
};

export const STATS = [
  { target: 15, suffix: '', label: 'Comprehensive Modules' },
  { target: 2,  suffix: '', label: 'Specialized Learning Tracks' },
  { target: 4,  suffix: '', label: 'Industry Certifications' },
  { target: 12, suffix: '+', label: 'Modern Tools & Technologies' },
];

export const HIGHLIGHTS = [
  {
    icon: 'Code2',
    color: 'orange',
    title: '100% Practical Learning',
    desc: 'Every concept taught through real projects',
  },
  {
    icon: 'GraduationCap',
    color: 'teal',
    title: 'Grade 9–12 & Diploma',
    desc: 'Tailored curriculum for teen learners',
  },
  {
    icon: 'Cpu',
    color: 'amber',
    title: 'Industry-Standard Tools',
    desc: 'Python, Git, VS Code, TensorFlow & more',
  },
  {
    icon: 'Award',
    color: 'purple',
    title: '4 Skill Certifications',
    desc: 'Recognised credentials upon completion',
  },
];

export const TOOLS = [
  { name: 'HTML5',             logo: '/tools/html5.png' },
  { name: 'CSS3',              logo: '/tools/css3.png' },
  { name: 'JavaScript',        logo: '/tools/javascript.png' },
  { name: 'VS Code',           logo: '/tools/vscode.png' },
  { name: 'Python',            logo: '/tools/python.png' },
  { name: 'Google Colab',      logo: '/tools/google-colab.png' },
  { name: 'Netlify',           logo: '/tools/netlify.png' },
  { name: 'GitHub',            logo: '/tools/github.png' },
  { name: 'Data Science',      logo: '/tools/data-science.png' },
  { name: 'Flask',             logo: '/tools/flask.png' },
  { name: 'Machine Learning',  logo: '/tools/machine-learning.png' },
  { name: 'TensorFlow',        logo: '/tools/tensorflow.png' },
];

export const CERTIFICATIONS = [
  {
    title: 'Front End Developer',   // Fixed from brochure typo "Font End"
    desc: 'Master HTML, CSS, JavaScript & deployment with Netlify.',
    color: 'orange',
    icon: 'Monitor',
  },
  {
    title: 'Python Programmer',
    desc: 'Build real applications with Python, OOP & data structures.',
    color: 'teal',
    icon: 'Terminal',
  },
  {
    title: 'Data Scientist',
    desc: 'Analyse datasets with NumPy, Pandas, Matplotlib & Seaborn.',
    color: 'orange',
    icon: 'BarChart2',
  },
  {
    title: 'AI Programmer',
    desc: 'Build ML models & image classifiers using TensorFlow.',
    color: 'teal',
    icon: 'Brain',
  },
];

export const TRACKS = [
  {
    id: 'frontend',
    number: 'Track 01',
    title: 'Front End Development',
    color: 'teal',
    accentColor: '#0F7B83',
    moduleRange: 'Modules 1 – 7',
    tagline: 'Build beautiful, interactive websites from scratch.',
    projects: [
      'Responsive Todo List App (HTML + CSS)',
      'Registration Form Web Page (HTML)',
      'Pokémon Website with Live API (JS)',
      'Complete Restaurant Website (HTML, CSS, JS)',
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'ES6', 'Git', 'GitHub', 'Netlify', 'VS Code'],
    modules: [
      {
        id: 'm1',
        num: 'M01',
        title: 'Introduction to Web Development',
        topics: ['What is web development?', 'How do websites work?', 'History of the web', 'Client-Server model (FE vs BE)', 'Setting up an IDE'],
        activities: 'VS Code setup & Extensions',
      },
      {
        id: 'm2',
        num: 'M02',
        title: 'Introduction to HTML',
        topics: ['HTML structure', 'Tags & attributes', 'Tables', 'Forms', 'Semantic tags'],
        activities: 'Portfolio page, Tables in HTML',
      },
      {
        id: 'm3',
        num: 'M03',
        title: 'Introduction to CSS',
        topics: ['Internal vs Inline vs External CSS', 'Class vs ID', 'Selectors, Combinators & Specificity', 'Box Model', 'Display & Positioning', 'Flexbox & Grid', 'Media queries & Responsive design'],
        activities: 'Portfolio page with CSS, Airbnb landing page clone',
      },
      {
        id: 'm4',
        num: 'M04',
        title: 'Introduction to JavaScript – I',
        topics: ['Variables & scoping', 'Data types, Strings & Numbers', 'Operators & Loops', 'Functions, Arrays & Objects', 'Event loop, Closures, Hoisting, Currying'],
        activities: 'JS Loops, JS Objects',
      },
      {
        id: 'm5',
        num: 'M05',
        title: 'JavaScript ES6',
        topics: ['let vs const vs var', 'Template literals', 'Destructuring', 'Spread & Rest operators', 'Classes'],
        activities: 'Realtime Application, JS Functions',
      },
      {
        id: 'm6',
        num: 'M06',
        title: 'Git & GitHub',
        topics: ['What is version control?', 'Git vs GitHub', 'Commonly used git commands'],
        activities: 'Git commands, Version control workflow',
      },
      {
        id: 'm7',
        num: 'M07',
        title: 'DOM & Deployment',
        topics: ['Document Object Model (DOM)', 'DOM manipulation', 'Events API & eventListener', 'Event Bubbling & Capturing', 'Deployment on Netlify'],
        activities: 'Netlify deployment, Tic Tac Toe game',
      },
    ],
  },
  {
    id: 'python',
    number: 'Track 02',
    title: 'Python & AI Programming',
    color: 'orange',
    accentColor: '#F26A1B',
    moduleRange: 'Modules 8 – 15',
    tagline: 'From Python basics to Machine Learning & AI applications.',
    projects: [
      'Rock Paper Scissors Game (Python)',
      'Roll-a-Dice Simulator (Python)',
      'Sentiment Analysis of Product Reviews',
      'Image Classifier using TensorFlow',
    ],
    tools: ['Python', 'Tkinter', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Flask', 'TensorFlow', 'Google Colab'],
    modules: [
      {
        id: 'm8',
        num: 'M08',
        title: 'Introduction to Python',
        topics: ['Python fundamentals', 'Variables, keywords & operators', 'Data types & conditionals', 'While & For loops', 'Functions & modules'],
        activities: 'Guess the Number, Triangle star pattern',
      },
      {
        id: 'm9',
        num: 'M09',
        title: 'Advanced Python – Data Structures & OOP',
        topics: ['List, Tuple, Dictionary, Set', 'Classes & Objects', 'Constructor & Destructor', 'Inheritance, Abstraction, Encapsulation, Polymorphism'],
        activities: 'Tic Tac Toe, Password Generator',
      },
      {
        id: 'm10',
        num: 'M10',
        title: 'Introduction to Tkinter (GUI)',
        topics: ['What is a GUI?', 'Windows & Widgets', 'Multiple windows'],
        activities: 'Calculator, Digital Clock',
      },
      {
        id: 'm11',
        num: 'M11',
        title: 'Introduction to Data Science',
        topics: ['NumPy, Pandas', 'Matplotlib & Seaborn', 'Plotting graphs'],
        activities: 'Scatter plot, Bar plot',
      },
      {
        id: 'm12',
        num: 'M12',
        title: 'Data Analysis & Visualisation',
        topics: ['Importing & cleaning data', 'Line graph, Bar graph, Pictograph', 'Histogram & Scatterplot'],
        activities: 'Line graph, Data cleaning',
      },
      {
        id: 'm13',
        num: 'M13',
        title: 'Introduction to Machine Learning',
        topics: ['Types of ML', 'Types of data', 'Data preprocessing', 'Regression techniques'],
        activities: 'Linear Regression, Logistic Regression',
      },
      {
        id: 'm14',
        num: 'M14',
        title: 'Machine Learning II',
        topics: ['Classification algorithms', 'Building a recommendation system'],
        activities: 'Image classification, Recommendation system',
      },
      {
        id: 'm15',
        num: 'M15',
        title: 'Python Flask – Deployment Basics',
        topics: ['Introduction to Flask', 'Creating basic web pages', 'Advanced Flask concepts', 'Building & deploying your own web app'],
        activities: 'Login page, Wikipedia search app',
      },
    ],
  },
];

export const BENEFITS = [
  { icon: 'Lightbulb', color: 'orange', title: 'Creativity',        desc: 'Express ideas through code, games, and animations.' },
  { icon: 'Brain',     color: 'teal',   title: 'Logical Thinking',  desc: 'Develop problem-solving and algorithmic thinking.' },
  { icon: 'Shield',    color: 'amber',  title: 'Confidence',        desc: 'Build real projects and see your own ideas come alive.' },
  { icon: 'Zap',       color: 'purple', title: 'Problem Solving',   desc: 'Approach any challenge with a coder\'s mindset.' },
];

export const INCLUSIONS = [
  'All Practical Classes',
  'Concept & Project Classes',
  'Revision Classes',
  'Assessments & Quizzes',
  'Class Summary Notes',
  'Practice Projects',
];

export const TESTIMONIALS = [
  {
    quote: 'CodingZone is an amazing place to learn and explore your coding skills.',
    name: 'Hemill Ravani',
    role: 'Student',
    location: 'Australia',
    initials: 'HR',
    color: '#0F7B83',
  },
  {
    quote: "Priyanka Ma'am is a truly dedicated coding teacher. She went to great lengths to ensure my son understood the basics.",
    name: 'Avani Ravani',
    role: 'Parent',
    location: 'Australia',
    initials: 'AR',
    color: '#F26A1B',
  },
  {
    quote: 'Highly recommended. An amazing place for kids to learn technical skills practically, giving them a head start into the technical world.',
    name: 'Sweta Sawant',
    role: 'Parent',
    location: 'Dandeli, Karnataka',
    initials: 'SS',
    color: '#7C3AED',
  },
  {
    quote: 'One of the best places to learn coding. It has improved my logical thinking, creativity, and confidence.',
    name: 'Shreyash Sawant',
    role: 'Student',
    location: 'Dandeli, Karnataka',
    initials: 'SS',
    color: '#B47A10',
  },
];
