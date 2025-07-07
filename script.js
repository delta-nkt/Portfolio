function opentab(tabname) {
    let tabLinks = document.querySelectorAll(".modern-about-new-tab-links");
    let tabContents = document.querySelectorAll(".modern-about-new-tab-contents");
    
    tabLinks.forEach(link => link.classList.remove("active-link"));
    tabContents.forEach(content => content.classList.remove("active-tab"));
    
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}
function showPopup() {
    document.getElementById("popupForm").style.display = "flex";
}

function redirectTo(url) {
    window.open(url, '_blank'); // Opens in a new tab
}
document.addEventListener("DOMContentLoaded", function () {
    // Select all buttons and contents
    const buttons = document.querySelectorAll(".modern-tab-button");
    const contents = document.querySelectorAll(".modern-tab-content");

    // Function to show the selected tab
    function showWorkContent(tabId) {
        // Hide all content
        contents.forEach(content => {
            content.style.display = "none";
            content.style.opacity = "0";
        });

        // Remove 'active' class from all buttons
        buttons.forEach(button => {
            button.classList.remove("active");
        });

        // Show the selected tab content
        const selectedTab = document.getElementById(tabId);
        selectedTab.style.display = "block";
        setTimeout(() => {
            selectedTab.style.opacity = "1";
        }, 50); // Delay for smooth fade-in

        // Add 'active' class to the clicked button
        document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
    }

    // Attach event listeners to tab buttons
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");
            showWorkContent(tabId);
        });
    });

    // Show the first tab by default
    showWorkContent(buttons[0].getAttribute("data-tab"));
});

function toggleChat() {
    const chatBox = document.querySelector(".chat-box");
    const chatIcon = document.querySelector(".chat-icon");
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "flex";
        chatIcon.style.display = "none";
    } else {
        chatBox.style.display = "none";
        chatIcon.style.display = "flex";
    }
}

function askQuestion(element) {
    const question = element.innerText;
    document.getElementById("userInput").value = question;
    sendMessage();
}

function sendMessage() {
    const inputField = document.getElementById("userInput");
    const message = inputField.value.trim();
    if (message === "") return;

    const chatBody = document.getElementById("chatBody");

    // Check if user is already at the bottom
    const isAtBottom = chatBody.scrollHeight - chatBody.scrollTop <= chatBody.clientHeight + 10;

    const userMessage = document.createElement("div");
    userMessage.classList.add("user-message", "message");
    userMessage.innerText = message;
    chatBody.appendChild(userMessage);

    setTimeout(() => {
        const botMessage = document.createElement("div");
        botMessage.classList.add("bot-message", "message");
        botMessage.innerText = getBotResponse(message);
        chatBody.appendChild(botMessage);

        // Only auto-scroll if the user was already at the bottom
        if (isAtBottom) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }, 500);

    inputField.value = "";
}
document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents new line in input field
        sendMessage();
    }
});

function getBotResponse(question) {
    const responses = {
        "Tell me about your experience.": "I have experience working as a Software Developer at NIC, along with past roles as an intern at Basel Practitioners and Prepbytes. I have also worked as a Campus Business Manager at Prepbytes and served as a Treasurer at Bytemonk GTC. My expertise spans web development, backend development, and database management.",
        "What skills do you have?": "I am skilled in Java, Python, C++, C#, JavaScript, React.js, Node.js, .NET Core, Docker, Spring Boot, SQL, PostgreSQL, MongoDB, and Redis.",
        "How can I contact you?": "You can reach me via my portfolio website or LinkedIn. For more details, please visit my website.",
        "What is your educational background?": "I have a Bachelor's degree in Computer Science from MAKAUT with a CGPA of 9.79. I completed my Higher Secondary education at Shree Jain Vidyalaya with 79.4% in WBCHSE and my Secondary education at Shree Jain Vidyalaya with 84% in WBBSE.",
        "Tell me about your frontend projects.": "Some of my frontend projects include a To-Do List app, GitHub Profile Hunt, Foodie, a Portfolio Website, and a Music App with JavaScript-based audio controls.",
        "Tell me about your backend projects.": "I have worked on backend projects such as Voter CRUD, QR Generator, Micro-sample, and TodoManager.",
        "Tell me about your full stack projects.": "I have developed full-stack applications, integrating frontend, backend, and databases to create seamless user experiences. My work includes Sample-Micro, a microservices project with Spring Boot, Docker, and service discovery.",
        "Tell me about your machine learning projects.": "I worked on a machine learning project involving Model Comparison of RNA sequences.",
        "Tell me about your data visualization projects.": "I developed a project on Diabetes Visualization for data analysis and insights.",
        "Tell me about your game development projects.": "I have built games like Rock-Paper-Scissors and Story Teller.",
        "What tools do you use for development?": "I use tools like VS Code, Visual Studio, JMeter, PgAdmin, Git, GitHub Desktop, and Docker Desktop.",
        "What are your core computer science subjects?": "I have studied Database Management Systems, Operating Systems, and Computer Networks.",
        "Where did you complete your higher secondary education?": "I studied at Shree Jain Vidyalaya and scored 79.4% in WBCHSE.",
        "Where did you complete your secondary education?": "I studied at Shree Jain Vidyalaya and scored 84% in WBBSE.",
        "What services do you provide?": "I offer web development, backend development, database management, software solutions, and chatbot development.",
        "Can I download your resume?": "Yes, my resume is available for download on my portfolio website.",
        "Do you have a chatbot for inquiries?": "Yes, my portfolio includes a chatbot for inquiries and assistance. Visit my website for more details."
    };

    const keywords = {
        "Tell me about your experience.": ["experience", "work", "job", "career", "background"],
        "What skills do you have?": ["skills", "expertise", "abilities", "strengths"],
        "How can I contact you?": ["contact", "reach", "email", "connect", "call"],
        "What is your educational background?": ["education", "degree", "qualification", "studies"],
        "Tell me about your frontend projects.": ["frontend", "UI", "user interface", "frontend projects"],
        "Tell me about your backend projects.": ["backend", "server-side", "backend projects"],
        "Tell me about your full stack projects.": ["full stack", "end-to-end", "complete projects"],
        "Tell me about your machine learning projects.": ["machine learning", "AI", "artificial intelligence", "ML"],
        "Tell me about your data visualization projects.": ["data visualization", "graphs", "charts", "data analysis"],
        "Tell me about your game development projects.": ["game development", "games", "gaming projects"],
        "What tools do you use for development?": ["tools", "software", "development tools", "tech stack"],
        "What are your core computer science subjects?": ["computer science subjects", "subjects", "courses"],
        "Where did you complete your higher secondary education?": ["higher secondary", "high school", "12th grade"],
        "Where did you complete your secondary education?": ["secondary education", "schooling", "10th grade"],
        "What services do you provide?": ["services", "offer", "solutions"],
        "Can I download your resume?": ["resume", "CV", "curriculum vitae"],
        "Do you have a chatbot for inquiries?": ["chatbot", "bot", "assistant", "virtual assistant"]
    };

    question = question.toLowerCase();

    for (let key in keywords) {
        for (let word of keywords[key]) {
            if (question.includes(word)) {
                return responses[key];
            }
        }
    }

    return "I'm not sure about that. Can you ask something else? For more details, please visit my website.";
}

// modal functionality 
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("popup-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const closeBtn = document.querySelector(".close-btn");

    const projectDetails = {
        language: {
            title: "Programming Languages",

            description: "I have become proficient in Java, Python, C#, and C++. I have built multiple projects using these languages, gaining hands-on experience in various development scenarios."
        },
        frontend: {
            title: "Frontend Development",

            description: `Projects like TodoList, GitHub Profile Hunt, and Foodie showcase my frontend skills in React.js and JavaScript.

            1. TodoList App: I enhanced this project using React Hooks like useState and useEffect.  
            Additionally, I implemented Context API for efficient state management, making data flow seamless between parent and child components.

            2. GitHub Profile Hunt: This project integrates the GitHub API using Axios and Fetch API.Leveraged React Router with useParams for dynamic profile navigation.  
            Utilized useState for managing search input and useEffect for handling API calls efficiently.Optimized the UI using Layouts for a smoother experience.

            3. Foodie App: A React-powered blog platform with a focus on interactive UI and user engagement.Here I tried to leverage the UI benefits and material UI components of the reactJs.
            
            4. Portfolio Website: Developed a personalized portfolio site with HTML ,CSS and Javascript.Used for animations, ensuring a smooth and elegant user experience. And different kind of animated navbars and here leveraged the basic of javascript by adding different functionality and used CSS to design the UI.`
        },
        backend: {
            title: "Backend Development",

            description: `Projects like VoterCrud, QR-Generator, and Spring Boot-based applications demonstrate my backend development expertise across multiple technologies.

            1. In the .NET Core project, I have designed a multi-tier architecture to ensure abstraction and scalability. A common repository pattern
            was implemented to handle dynamic entity management using LINQ queries, enabling efficient and reusable data operations.  
            Additionally, I developed generic functions to support multiple entities dynamically, reducing code redundancy and improving maintainability.  
            To enhance security, I implemented an XSS prevention mechanism using an HTML sanitizer, effectively mitigating cross-site scripting attacks 
            and ensuring a secure backend environment.

            2. In the Node.js project, I have used the file system (fs) module to generate and store QR codes efficiently. Additionally, I leveraged the 
            QR Generator npm bundle** to create customizable and high-quality QR codes that can be easily accessed and shared.

            3. In the Spring Boot project, I have built a microservices-based architecture where three different services operate independently yet work 
            in sync. Each service is segregated and containerized using Docker, ensuring modularity and scalability while enabling seamless communication.  

            4. Apart from microservices, I also developed a To-Do Manager backend in Spring Boot, which acts as a simple CRUD application.  
            This project showcases my ability to build efficient and structured RESTful APIs, handling database operations seamlessly.`
        },
        fullstack: {
            title: "Full Stack Development",

            description: "I have built full-stack applications integrating frontend, backend, and databases for a seamless user experience. This particular project follows a microservices architecture, where different services are segregated and communicate via REST APIs. The backend is developed using .NET Core with a layered architecture, while the frontend is built with React.js. Currently, this application is under maintenance."
        },
        datavisualization: {
            title: "Data Visualization",

            description: "My Diabetes Visualization project presents medical data using modern visualization techniques. Developed using Python, this project leverages powerful libraries like NumPy, Pandas, Matplotlib, and Seaborn to analyze and visualize data effectively. It focuses on identifying outliers, segmenting key patterns, and presenting accurate insights to the user based on the given dataset and predict the diabetic range."
        },
        machinelearning: {
            title: "Machine Learning",

            description: `Model Comparison of RNA is my machine learning project where I compared different models for RNA analysis.

            1. Recent advancements in deep learning methodologies have revolutionized bioinformatics, especially in RNA sequence analysis and protein structure prediction. Our study presents a pioneering approach that integrates three cutting-edge language models—BERT, XLNet, and GPT-2 to tackle the challenges of RNA family identification and protein structure prediction. By leveraging the intricate patterns within RNA sequences, our methodology significantly enhances classification and prediction accuracy, as evidenced by extensive experimentation on diverse datasets. These findings highlight the potential of amalgamated deep learning techniques to advance our understanding of RNA biology and pave the way for further innovations in computational biology research.
            
            2. In summary, combining pretraining, auxiliary tasks, and finetuning with multiple Large Language Models significantly boosts classification accuracy in bioinformatics tasks. XLNet often outperforms our model, reaching comparable accuracy to the ensemble model.Our ensemble model integrates the strengths of these individual models, mitigating their respective drawbacks and improving overall performance. XLNet's proximity to the ensemble model underscores its significance in enhancing performance `
        },
        games:{
            title:"Python Games",
            description:"These are Python-based games designed to provide a great user experience. The UI is built using Tkinter, ensuring a simple yet interactive interface."
        }
    };

    document.querySelectorAll(".learn-more").forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const projectKey = this.getAttribute("data-project");
            if (projectDetails[projectKey]) {
                modalTitle.innerText = projectDetails[projectKey].title;
                modalDescription.innerText = projectDetails[projectKey].description;
                modal.style.display = "block";
            }
        });
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});