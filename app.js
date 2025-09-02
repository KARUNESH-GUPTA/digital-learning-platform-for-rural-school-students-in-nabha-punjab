// WorldShift Loop - Application Logic
class WorldShiftLoop {
    constructor() {
        this.currentLanguage = 'english';
        this.currentUser = null;
        this.currentRole = null;
        this.isOffline = false;
        this.voiceEnabled = false;
        this.currentCourse = null;
        
        // Application data
        this.data = {
            languages: {
                punjabi: "ਪੰਜਾਬੀ",
                hindi: "हिंदी", 
                english: "English"
            },
            courses: [
                {
                    id: 1,
                    title: {punjabi: "ਗਣਿਤ", hindi: "गणित", english: "Mathematics"},
                    description: {punjabi: "ਮੂਲ ਗਣਿਤ ਸਿੱਖੋ", hindi: "बुनियादी गणित सीखें", english: "Learn Basic Mathematics"},
                    lessons: 12,
                    quizzes: 5,
                    difficulty: "Beginner",
                    category: "math"
                },
                {
                    id: 2,
                    title: {punjabi: "ਵਿਗਿਆਨ", hindi: "विज्ञान", english: "Science"},
                    description: {punjabi: "ਵਿਗਿਆਨ ਦੇ ਮੂਲ ਸਿਧਾਂਤ", hindi: "विज्ञान के मूल सिद्धांत", english: "Basic Science Principles"},
                    lessons: 15,
                    quizzes: 7,
                    difficulty: "Intermediate",
                    category: "science"
                },
                {
                    id: 3,
                    title: {punjabi: "ਅੰਗਰੇਜ਼ੀ", hindi: "अंग्रेजी", english: "English Language"},
                    description: {punjabi: "ਅੰਗਰੇਜ਼ੀ ਭਾਸ਼ਾ ਸਿੱਖੋ", hindi: "अंग्रेजी भाषा सीखें", english: "Learn English Language"},
                    lessons: 20,
                    quizzes: 8,
                    difficulty: "Beginner",
                    category: "english"
                }
            ],
            students: [
                {
                    id: 1,
                    name: "Simran Kaur",
                    class: "7th Grade",
                    school: "Govt. School Nabha",
                    points: 450,
                    badges: ["First Quiz", "Week Streak", "Math Master"],
                    progress: {math: 75, science: 60, english: 80}
                },
                {
                    id: 2,
                    name: "Arjan Singh",
                    class: "8th Grade", 
                    school: "Govt. School Nabha",
                    points: 520,
                    badges: ["Science Explorer", "Quiz Champion", "Perfect Attendance"],
                    progress: {math: 85, science: 90, english: 70}
                }
            ],
            teachers: [
                {
                    id: 1,
                    name: "Gurpreet Singh",
                    subject: "Mathematics",
                    school: "Govt. School Nabha",
                    students: 35,
                    courses: 3
                },
                {
                    id: 2,
                    name: "Manjit Kaur",
                    subject: "Science",
                    school: "Govt. School Nabha", 
                    students: 42,
                    courses: 4
                }
            ],
            achievements: [
                {name: {punjabi: "ਪਹਿਲਾ ਕੁਇਜ਼", hindi: "पहला क्विज", english: "First Quiz"}, icon: "🏆"},
                {name: {punjabi: "ਹਫ਼ਤਾ ਸਟ੍ਰੀਕ", hindi: "सप्ताह स्ट्रीक", english: "Week Streak"}, icon: "🔥"},
                {name: {punjabi: "ਗਣਿਤ ਮਾਸਟਰ", hindi: "गणित मास्टर", english: "Math Master"}, icon: "🧮"},
                {name: {punjabi: "ਵਿਗਿਆਨ ਖੋਜੀ", hindi: "विज्ञान खोजी", english: "Science Explorer"}, icon: "🔬"}
            ],
            motivationalQuotes: [
                {punjabi: "ਪੜ੍ਹਾਈ ਹੀ ਸਫਲਤਾ ਦੀ ਕੁੰਜੀ ਹੈ", hindi: "शिक्षा ही सफलता की चाबी है", english: "Education is the key to success"},
                {punjabi: "ਹਰ ਦਿਨ ਕੁਝ ਨਵਾਂ ਸਿੱਖੋ", hindi: "हर दिन कुछ नया सीखें", english: "Learn something new every day"}
            ],
            notifications: [
                {type: "assignment", message: {punjabi: "ਨਵਾਂ ਕੰਮ ਮਿਲਿਆ", hindi: "नया असाइनमेंट मिला", english: "New assignment received"}},
                {type: "quiz", message: {punjabi: "ਕੁਇਜ਼ ਦਾ ਸਮਾਂ", hindi: "क्विज का समय", english: "Quiz time"}},
                {type: "achievement", message: {punjabi: "ਨਵਾਂ ਬੈਜ ਜਿੱਤਿਆ", hindi: "नया बैज जीता", english: "New badge earned"}}
            ]
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showLanguageModal();
        this.updateOfflineStatus();
        this.setRandomQuote();
    }

    setupEventListeners() {
        // Language selection - Fix the event handling
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // Use currentTarget to get the button element, not the clicked child element
                const language = e.currentTarget.getAttribute('data-lang');
                console.log('Language selected:', language); // Debug log
                this.setLanguage(language);
                this.hideLanguageModal();
                this.showPage('landingPage');
            });
        });

        // Language toggle in header
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                this.showLanguageModal();
            });
        }

        // Voice toggle
        const voiceToggle = document.getElementById('voiceToggle');
        if (voiceToggle) {
            voiceToggle.addEventListener('click', () => {
                this.toggleVoice();
            });
        }

        // Offline toggle
        const offlineToggle = document.getElementById('offlineToggle');
        if (offlineToggle) {
            offlineToggle.addEventListener('click', () => {
                this.toggleOfflineMode();
            });
        }

        // Role selection
        document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const role = e.currentTarget.dataset.role;
                this.selectRole(role);
                this.showPage('loginPage');
            });
        });

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.login();
            });
        }

        // Demo login
        const demoLogin = document.getElementById('demoLogin');
        if (demoLogin) {
            demoLogin.addEventListener('click', () => {
                this.demoLogin();
            });
        }

        // Logout buttons
        const logoutButtons = ['logoutBtn', 'teacherLogout', 'adminLogout', 'parentLogout'];
        logoutButtons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('click', () => this.logout());
            }
        });

        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Course navigation
        const backBtn = document.getElementById('backToDashboard');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.backToDashboard();
            });
        }

        // Course creation
        const createCourseForm = document.getElementById('createCourseForm');
        if (createCourseForm) {
            createCourseForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createCourse();
            });
        }

        // Lesson controls
        const audioBtn = document.getElementById('audioBtn');
        if (audioBtn) {
            audioBtn.addEventListener('click', () => {
                this.playAudio();
            });
        }

        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadLesson();
            });
        }

        const quizBtn = document.getElementById('quizBtn');
        if (quizBtn) {
            quizBtn.addEventListener('click', () => {
                this.takeQuiz();
            });
        }

        // Help and contact
        const helpBtn = document.getElementById('helpBtn');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                this.showHelp();
            });
        }

        const contactBtn = document.getElementById('contactBtn');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                this.showContact();
            });
        }
    }

    showLanguageModal() {
        const modal = document.getElementById('languageModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideLanguageModal() {
        const modal = document.getElementById('languageModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    setLanguage(language) {
        console.log('Setting language to:', language); // Debug log
        this.currentLanguage = language;
        const currentLangElement = document.getElementById('currentLanguage');
        if (currentLangElement) {
            currentLangElement.textContent = this.data.languages[language];
        }
        this.updateAllText();
    }

    updateAllText() {
        const langKey = this.currentLanguage === 'punjabi' ? 'pa' : 
                       this.currentLanguage === 'hindi' ? 'hi' : 'en';
        
        document.querySelectorAll('[data-en]').forEach(element => {
            const text = element.getAttribute(`data-${langKey}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    selectRole(role) {
        this.currentRole = role;
        const titleElement = document.getElementById('loginTitle');
        if (titleElement) {
            const titles = {
                student: {english: 'Student Login', hindi: 'छात्र लॉगिन', punjabi: 'ਵਿਦਿਆਰਥੀ ਲਾਗਇਨ'},
                teacher: {english: 'Teacher Login', hindi: 'शिक्षक लॉगिन', punjabi: 'ਅਧਿਆਪਕ ਲਾਗਇਨ'},
                admin: {english: 'Admin Login', hindi: 'एडमिन लॉगिन', punjabi: 'ਐਡਮਿਨ ਲਾਗਇਨ'},
                parent: {english: 'Parent Login', hindi: 'अभिभावक लॉगिन', punjabi: 'ਮਾਤਾ-ਪਿਤਾ ਲਾਗਇਨ'}
            };
            titleElement.textContent = titles[role][this.currentLanguage];
        }
    }

    login() {
        const username = document.getElementById('username')?.value;
        const password = document.getElementById('password')?.value;
        
        if (username && password) {
            this.currentUser = { username, role: this.currentRole };
            this.showDashboard();
        } else {
            alert('Please enter username and password');
        }
    }

    demoLogin() {
        this.currentUser = { username: 'demo', role: this.currentRole };
        this.showDashboard();
    }

    showDashboard() {
        switch (this.currentRole) {
            case 'student':
                this.showPage('studentDashboard');
                this.loadStudentData();
                break;
            case 'teacher':
                this.showPage('teacherDashboard');
                this.loadTeacherData();
                break;
            case 'admin':
                this.showPage('adminDashboard');
                this.loadAdminData();
                break;
            case 'parent':
                this.showPage('parentDashboard');
                this.loadParentData();
                break;
        }
    }

    loadStudentData() {
        const student = this.data.students[0]; // Demo student
        const pointsEl = document.getElementById('studentPoints');
        const badgesEl = document.getElementById('studentBadges');
        const streakEl = document.getElementById('studentStreak');
        
        if (pointsEl) pointsEl.textContent = student.points;
        if (badgesEl) badgesEl.textContent = student.badges.length;
        if (streakEl) streakEl.textContent = '7';
        
        this.renderCourses();
        this.renderProgress();
        this.renderLeaderboard();
        this.renderAchievements();
    }

    loadTeacherData() {
        this.renderTeacherCourses();
        this.renderStudentsList();
    }

    loadAdminData() {
        // Admin data is mostly static in the HTML
    }

    loadParentData() {
        this.renderNotifications();
    }

    renderCourses() {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;
        
        coursesGrid.innerHTML = '';
        
        this.data.courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-header">
                    <h3 class="course-title">${course.title[this.currentLanguage]}</h3>
                    <p class="course-description">${course.description[this.currentLanguage]}</p>
                    <div class="course-meta">
                        <span>${course.lessons} lessons</span>
                        <span>${course.difficulty}</span>
                    </div>
                </div>
                <div class="course-body">
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${this.getStudentProgress(course.category)}%"></div>
                        </div>
                        <p class="progress-text">${this.getStudentProgress(course.category)}% complete</p>
                    </div>
                    <button class="btn btn--primary btn--full-width mt-8">
                        ${this.currentLanguage === 'punjabi' ? 'ਕੋਰਸ ਸ਼ੁਰੂ ਕਰੋ' : 
                          this.currentLanguage === 'hindi' ? 'कोर्स शुरू करें' : 'Start Course'}
                    </button>
                </div>
            `;
            
            courseCard.addEventListener('click', () => {
                this.openCourse(course);
            });
            
            coursesGrid.appendChild(courseCard);
        });
    }

    renderProgress() {
        const progressCards = document.getElementById('progressCards');
        if (!progressCards) return;
        
        progressCards.innerHTML = '';
        
        const student = this.data.students[0];
        Object.entries(student.progress).forEach(([subject, progress]) => {
            const progressCard = document.createElement('div');
            progressCard.className = 'progress-card';
            progressCard.innerHTML = `
                <h4>
                    <span class="subject-icon ${subject}">📚</span>
                    ${this.getSubjectName(subject)}
                </h4>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <p class="progress-text">${progress}% complete</p>
                <p class="text-sm text-secondary">Last activity: 2 days ago</p>
            `;
            progressCards.appendChild(progressCard);
        });
    }

    renderLeaderboard() {
        const leaderboardList = document.getElementById('leaderboardList');
        if (!leaderboardList) return;
        
        leaderboardList.innerHTML = '';
        
        // Sort students by points
        const sortedStudents = [...this.data.students].sort((a, b) => b.points - a.points);
        
        sortedStudents.forEach((student, index) => {
            const leaderboardItem = document.createElement('div');
            leaderboardItem.className = 'leaderboard-item';
            leaderboardItem.innerHTML = `
                <div class="rank ${index < 3 ? 'top3' : ''}">${index + 1}</div>
                <div class="student-info">
                    <div class="student-name">${student.name}</div>
                    <div class="student-class">${student.class}</div>
                </div>
                <div class="points">${student.points} pts</div>
            `;
            leaderboardList.appendChild(leaderboardItem);
        });
    }

    renderAchievements() {
        const badgesGrid = document.getElementById('badgesGrid');
        if (!badgesGrid) return;
        
        badgesGrid.innerHTML = '';
        
        const student = this.data.students[0];
        this.data.achievements.forEach(achievement => {
            const isEarned = student.badges.includes(achievement.name.english);
            const badgeCard = document.createElement('div');
            badgeCard.className = `badge-card ${isEarned ? 'earned' : ''}`;
            badgeCard.innerHTML = `
                <div class="badge-icon">${achievement.icon}</div>
                <h4 class="badge-name">${achievement.name[this.currentLanguage]}</h4>
                <p class="badge-description">
                    ${isEarned ? 
                        (this.currentLanguage === 'punjabi' ? 'ਪ੍ਰਾਪਤ ਕੀਤਾ' : 
                         this.currentLanguage === 'hindi' ? 'प्राप्त किया' : 'Earned') :
                        (this.currentLanguage === 'punjabi' ? 'ਲਾਕਡ' : 
                         this.currentLanguage === 'hindi' ? 'लॉक्ड' : 'Locked')}
                </p>
            `;
            badgesGrid.appendChild(badgeCard);
        });
    }

    renderTeacherCourses() {
        const teacherCoursesGrid = document.getElementById('teacherCoursesGrid');
        if (!teacherCoursesGrid) return;
        
        teacherCoursesGrid.innerHTML = '';
        
        this.data.courses.slice(0, 2).forEach(course => { // Teacher has 2 courses
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-header">
                    <h3 class="course-title">${course.title[this.currentLanguage]}</h3>
                    <p class="course-description">${course.description[this.currentLanguage]}</p>
                </div>
                <div class="course-body">
                    <div class="course-meta">
                        <span>${course.lessons} lessons</span>
                        <span>35 students enrolled</span>
                    </div>
                    <div class="btn-group mt-8">
                        <button class="btn btn--outline btn--sm">Edit</button>
                        <button class="btn btn--primary btn--sm">View</button>
                    </div>
                </div>
            `;
            teacherCoursesGrid.appendChild(courseCard);
        });
    }

    renderStudentsList() {
        const studentsList = document.getElementById('studentsList');
        if (!studentsList) return;
        
        studentsList.innerHTML = '';
        
        this.data.students.forEach(student => {
            const studentItem = document.createElement('div');
            studentItem.className = 'student-item';
            studentItem.innerHTML = `
                <div class="student-details">
                    <div class="student-name">${student.name}</div>
                    <div class="student-class">${student.class}</div>
                </div>
                <div class="student-progress">
                    <div class="progress-item">
                        Math: <span class="progress-score">${student.progress.math}%</span>
                    </div>
                    <div class="progress-item">
                        Science: <span class="progress-score">${student.progress.science}%</span>
                    </div>
                    <div class="progress-item">
                        English: <span class="progress-score">${student.progress.english}%</span>
                    </div>
                </div>
            `;
            studentsList.appendChild(studentItem);
        });
    }

    renderNotifications() {
        const notificationsList = document.getElementById('notificationsList');
        if (!notificationsList) return;
        
        notificationsList.innerHTML = '';
        
        this.data.notifications.forEach((notification, index) => {
            const notificationItem = document.createElement('div');
            notificationItem.className = 'notification-item';
            notificationItem.innerHTML = `
                <div class="notification-icon ${notification.type}">
                    ${notification.type === 'assignment' ? '📝' : 
                      notification.type === 'quiz' ? '❓' : '🏆'}
                </div>
                <div class="notification-content">
                    <div class="notification-message">${notification.message[this.currentLanguage]}</div>
                    <div class="notification-time">${index + 1} hours ago</div>
                </div>
            `;
            notificationsList.appendChild(notificationItem);
        });
    }

    openCourse(course) {
        this.currentCourse = course;
        this.showPage('courseView');
        
        const titleEl = document.getElementById('courseTitle');
        const descEl = document.getElementById('courseDescription');
        
        if (titleEl) titleEl.textContent = course.title[this.currentLanguage];
        if (descEl) descEl.textContent = course.description[this.currentLanguage];
        
        this.renderLessons(course);
    }

    renderLessons(course) {
        const lessonsList = document.getElementById('lessonsList');
        if (!lessonsList) return;
        
        lessonsList.innerHTML = '';
        
        for (let i = 1; i <= course.lessons; i++) {
            const lessonItem = document.createElement('div');
            lessonItem.className = 'lesson-item';
            lessonItem.innerHTML = `
                <div class="lesson-number">${i}</div>
                <div class="lesson-info">
                    <div class="lesson-title">Lesson ${i}: ${this.generateLessonTitle(course, i)}</div>
                    <div class="lesson-duration">15 minutes</div>
                </div>
                <div class="lesson-status ${i <= 3 ? 'completed' : 'in-progress'}">
                    ${i <= 3 ? (this.currentLanguage === 'punjabi' ? 'ਪੂਰਾ' : 
                               this.currentLanguage === 'hindi' ? 'पूरा' : 'Completed') :
                               (this.currentLanguage === 'punjabi' ? 'ਪ੍ਰਗਤੀ ਵਿੱਚ' : 
                                this.currentLanguage === 'hindi' ? 'प्रगति में' : 'In Progress')}
                </div>
            `;
            
            lessonItem.addEventListener('click', () => {
                this.selectLesson(i, course);
                document.querySelectorAll('.lesson-item').forEach(item => item.classList.remove('active'));
                lessonItem.classList.add('active');
            });
            
            lessonsList.appendChild(lessonItem);
        }
    }

    selectLesson(lessonNumber, course) {
        const lessonTitle = document.getElementById('lessonTitle');
        const lessonBody = document.getElementById('lessonBody');
        
        if (lessonTitle) {
            lessonTitle.textContent = `Lesson ${lessonNumber}: ${this.generateLessonTitle(course, lessonNumber)}`;
        }
        if (lessonBody) {
            lessonBody.innerHTML = this.generateLessonContent(course, lessonNumber);
        }
    }

    generateLessonTitle(course, lessonNumber) {
        const titles = {
            math: [`Basic Addition`, `Subtraction`, `Multiplication`, `Division`, `Fractions`],
            science: [`Matter and Energy`, `Plants and Animals`, `Solar System`, `Weather`, `Human Body`],
            english: [`Alphabet`, `Basic Grammar`, `Vocabulary`, `Reading`, `Writing`]
        };
        
        const categoryTitles = titles[course.category] || titles.math;
        return categoryTitles[lessonNumber - 1] || `${course.category.charAt(0).toUpperCase() + course.category.slice(1)} Basics`;
    }

    generateLessonContent(course, lessonNumber) {
        const content = {
            english: `<h4>Lesson ${lessonNumber}</h4>
                     <p>This lesson covers important concepts in ${course.title.english}. You'll learn through interactive examples and practice exercises.</p>
                     <p>Key points:</p>
                     <ul>
                         <li>Understanding basic concepts</li>
                         <li>Practical applications</li>
                         <li>Problem solving techniques</li>
                     </ul>`,
            hindi: `<h4>पाठ ${lessonNumber}</h4>
                   <p>यह पाठ ${course.title.hindi} की महत्वपूर्ण अवधारणाओं को कवर करता है। आप इंटरैक्टिव उदाहरणों और अभ्यास अभ्यासों के माध्यम से सीखेंगे।</p>
                   <p>मुख्य बिंदु:</p>
                   <ul>
                       <li>बुनियादी अवधारणाओं को समझना</li>
                       <li>व्यावहारिक अनुप्रयोग</li>
                       <li>समस्या समाधान तकनीकें</li>
                   </ul>`,
            punjabi: `<h4>ਪਾਠ ${lessonNumber}</h4>
                     <p>ਇਹ ਪਾਠ ${course.title.punjabi} ਦੇ ਮਹੱਤਵਪੂਰਣ ਸੰਕਲਪਾਂ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ। ਤੁਸੀਂ ਇੰਟਰੈਕਟਿਵ ਉਦਾਹਰਣਾਂ ਅਤੇ ਅਭਿਆਸ ਅਭ੍ਯਾਸਾਂ ਰਾਹੀਂ ਸਿੱਖੋਗੇ।</p>
                     <p>ਮੁੱਖ ਨੁਕਤੇ:</p>
                     <ul>
                         <li>ਬੁਨਿਆਦੀ ਸੰਕਲਪਾਂ ਨੂੰ ਸਮਝਣਾ</li>
                         <li>ਵਿਹਾਰਕ ਉਪਯੋਗ</li>
                         <li>ਸਮੱਸਿਆ ਹੱਲ ਕਰਨ ਦੀਆਂ ਤਕਨੀਕਾਂ</li>
                     </ul>`
        };
        
        return content[this.currentLanguage];
    }

    createCourse() {
        const title = document.getElementById('courseTitleInput')?.value;
        const description = document.getElementById('courseDescriptionInput')?.value;
        const category = document.getElementById('courseCategoryInput')?.value;
        
        if (title && description && category) {
            alert(`Course "${title}" created successfully!`);
            const form = document.getElementById('createCourseForm');
            if (form) form.reset();
            this.switchTab('teacher-courses');
        }
    }

    switchTab(tabId) {
        // Remove active class from all tabs and panes
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to selected tab and pane
        const tabBtn = document.querySelector(`[data-tab="${tabId}"]`);
        if (tabBtn) {
            tabBtn.classList.add('active');
        }
        
        const paneId = tabId.charAt(0).toUpperCase() + tabId.slice(1) + 'Tab';
        const pane = document.getElementById(paneId) || document.getElementById(tabId + 'Tab');
        if (pane) {
            pane.classList.add('active');
        }
    }

    backToDashboard() {
        switch (this.currentRole) {
            case 'student':
                this.showPage('studentDashboard');
                break;
            case 'teacher':
                this.showPage('teacherDashboard');
                break;
            case 'admin':
                this.showPage('adminDashboard');
                break;
            case 'parent':
                this.showPage('parentDashboard');
                break;
        }
    }

    playAudio() {
        const audioBtn = document.getElementById('audioBtn');
        if (audioBtn) {
            audioBtn.classList.add('audio-playing');
            
            // Simulate audio playback
            setTimeout(() => {
                audioBtn.classList.remove('audio-playing');
            }, 3000);
        }
        
        if (this.voiceEnabled && 'speechSynthesis' in window) {
            const titleEl = document.getElementById('lessonTitle');
            if (titleEl) {
                const text = titleEl.textContent;
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = this.currentLanguage === 'punjabi' ? 'pa-IN' : 
                               this.currentLanguage === 'hindi' ? 'hi-IN' : 'en-US';
                speechSynthesis.speak(utterance);
            }
        }
    }

    downloadLesson() {
        alert(`Lesson downloaded for offline viewing!`);
    }

    takeQuiz() {
        alert(`Starting quiz for current lesson...`);
    }

    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        const voiceBtn = document.getElementById('voiceToggle');
        if (voiceBtn) {
            voiceBtn.innerHTML = `<span>${this.voiceEnabled ? '🔊' : '🔇'}</span>`;
        }
        
        if (this.voiceEnabled) {
            alert('Voice guidance enabled');
        } else {
            alert('Voice guidance disabled');
        }
    }

    toggleOfflineMode() {
        this.isOffline = !this.isOffline;
        this.updateOfflineStatus();
        
        if (this.isOffline) {
            alert('Switched to offline mode. Some features may be limited.');
        } else {
            alert('Connected to online mode. All features available.');
        }
    }

    updateOfflineStatus() {
        const offlineStatus = document.getElementById('offlineStatus');
        if (offlineStatus) {
            if (this.isOffline) {
                offlineStatus.textContent = '📱 Offline';
                offlineStatus.className = 'status status--offline';
            } else {
                offlineStatus.textContent = '📶 Online';
                offlineStatus.className = 'status status--online';
            }
        }
    }

    setRandomQuote() {
        const quoteElement = document.getElementById('dailyQuote');
        if (quoteElement && this.data.motivationalQuotes.length > 0) {
            const randomQuote = this.data.motivationalQuotes[Math.floor(Math.random() * this.data.motivationalQuotes.length)];
            quoteElement.textContent = randomQuote[this.currentLanguage];
        }
    }

    // Fixed the getStudentProgress function to use the correct category mapping
    getStudentProgress(category) {
        const student = this.data.students[0];
        return student.progress[category] || 0;
    }

    getSubjectName(subject) {
        const subjects = {
            math: {english: 'Mathematics', hindi: 'गणित', punjabi: 'ਗਣਿਤ'},
            science: {english: 'Science', hindi: 'विज्ञान', punjabi: 'ਵਿਗਿਆਨ'},
            english: {english: 'English', hindi: 'अंग्रेजी', punjabi: 'ਅੰਗਰੇਜ਼ੀ'}
        };
        return subjects[subject] ? subjects[subject][this.currentLanguage] : subject;
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        
        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update text for current language
        this.updateAllText();
    }

    logout() {
        this.currentUser = null;
        this.currentRole = null;
        this.showPage('landingPage');
    }

    showHelp() {
        const helpText = {
            english: 'Welcome to WorldShift Loop! This platform helps rural students in Punjab access quality education in their preferred language. You can browse courses, track progress, and learn offline.',
            hindi: 'WorldShift Loop में आपका स्वागत है! यह प्लेटफॉर्म पंजाब के ग्रामीण छात्रों को उनकी पसंदीदा भाषा में गुणवत्तापूर्ण शिक्षा प्राप्त करने में मदद करता है।',
            punjabi: 'WorldShift Loop ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ! ਇਹ ਪਲੇਟਫਾਰਮ ਪੰਜਾਬ ਦੇ ਪੇਂਡੂ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਉਨ੍ਹਾਂ ਦੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਵਿੱਚ ਗੁਣਵੱਤਾ ਸਿੱਖਿਆ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।'
        };
        alert(helpText[this.currentLanguage]);
    }

    showContact() {
        const contactText = {
            english: 'Contact us:\nEmail: support@worldshiftloop.org\nPhone: +91-9876543210\nAddress: Nabha, Punjab, India',
            hindi: 'हमसे संपर्क करें:\nईमेल: support@worldshiftloop.org\nफोन: +91-9876543210\nपता: नाभा, पंजाब, भारत',
            punjabi: 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ:\nਈਮੇਲ: support@worldshiftloop.org\nਫੋਨ: +91-9876543210\nਪਤਾ: ਨਾਭਾ, ਪੰਜਾਬ, ਭਾਰਤ'
        };
        alert(contactText[this.currentLanguage]);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing WorldShift Loop...');
    new WorldShiftLoop();
});