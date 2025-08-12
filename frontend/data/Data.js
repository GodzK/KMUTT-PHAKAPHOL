import pkshop from "../../frontend/src/assets/pkshop.jfif";
import crypto from "../../frontend/src/assets/crypto.jfif";
import iot from "../../frontend/src/assets/iot.png";
import tpr from "../../frontend/src/assets/TPR/tprport.png";
import tpr1 from "../../frontend/src/assets/TPR/tpr1.jpeg";
import tpr2 from "../../frontend/src/assets/TPR/tpr2.jpeg";
import tpr3 from "../../frontend/src/assets/TPR/tpr3.jpeg";
import tpr4 from "../../frontend/src/assets/TPR/tpr4.jpeg";
import devinitport from "../../frontend/src/assets/Devinit/devinit.jpg";
import gsap from "../../frontend/src/assets/Devinit/gsap.png";
import css from "../../frontend/src/assets/Devinit/css.png";
import blogreact from "../../frontend/src/assets/Devinit/react.png";
import iot1 from "../../frontend/src/IOT/iot.jpg";
import iotmain from "../../frontend/src/IOT/iotmain.jpg";
import iot2 from "../../frontend/src/IOT/iot2.jpg";
import iot3 from "../../frontend/src/IOT/iot3.jpg";
import iot4 from "../../frontend/src/IOT/iot4.jpg";
import iot5 from "../../frontend/src/IOT/iot5.jpg";
import it3k from "../../frontend/src/assets/IT3K/3klogo.png";
import gta6 from "../../frontend/src/assets/GTA6/gta6.png"
import Helloworld from "../../frontend/src/assets//Helloworld/helloworldhippo.png";
import pkflix from "../../frontend/src/assets/pkflix.png";
import pheeraphat from "../../frontend/src/assets/pheeraphat-port.png"
// import moodbase from "../../frontend/src/assets/moodbase.png"
import iphone from "../../frontend/src/assets/iphone.png"
import itfunslide from  "../../frontend/src/assets/it-fun-slide.png"
import helloworld from "../../frontend/src/assets/accordion/helloworld.jpg"
import teacher from "../../frontend/src/assets/accordion/Teacher.jpg"
import ecom from "../../frontend/src/assets/ecom.png"
export const projectdata = [
  {
    projectname: "IT 3KINGS 19TH Web Application",
    description:
      "A web-based system built with Next.js for managing sports tournaments at KMUTT. It allows users to view match brackets, schedules, and real-time results, focusing on sports like badminton and ping pong.",
    techStack: [
      "Next.JS",
      "CSS",
      "AXIOS",
      "TypeScript",
      "react-zoom-pan-pinch",
    ],
    picture: it3k,
    experience:
      "This project helped me understand how to build a scalable and interactive web application using Next.js. I implemented dynamic routing, handled API data fetching, and ensured the UI was responsive for both public users and administrators.",
    link: "https://it3k.sit.kmutt.ac.th/",
  },
  {
    projectname: "IOTSMARTSCAN AI",
    description:
      "An IoT-integrated web application that uses YOLO AI for real-time object detection and scanning. The system processes visual data from connected devices and displays detection results through a web interface.",
    techStack: ["React", "CSS", "YOLO AI", "Node.js"],
    picture: iot,
    experience:
      "I learned how to build a full-stack web application that connects with AI models and IoT hardware. This involved integrating real-time detection data, optimizing performance, and handling asynchronous communication between frontend and backend.",
    link: "https://github.com/IOT4NHOR/Frontend",
  },
  {
    projectname: "PKFLIX",
    description:
      "An entertainment-themed web app inspired by Netflix, designed to simulate a movie streaming platform. It includes a dynamic UI with featured banners, media content, and filtering functionality. , and now i integrate a data to supabase now this project data is on cloud!☁️",
    techStack: ["React", "CSS", "Node.js","Supabase"],
    picture: pkflix,
    experience:
      "This project improved my frontend design skills, especially in creating engaging user interfaces. I also practiced backend API handling and managing component-based layouts for media-heavy content.",
    link: "https://pk-flix.vercel.app/",
  },
  {
    projectname: "GTA 6 Clone",
    description:
      "Recreate the viral GTA VI website with React, Tailwind CSS, and GSAP. Build and deploy a scroll-driven experience packed with cinematic animations using GSAP’s ScrollTrigger. Pin sections in place, sync video playback with scroll, and add smooth parallax and image masking effects. A modern, responsive site that brings high-impact motion design to life on the web.",
    techStack: ["React", "Tailwind", "Gsap", "CSS"],
    picture: gta6,
    experience:
      "This project deepened my understanding of Build and deploy a scroll-driven experience packed with cinematic animations using GSAP’s ScrollTrigger",
    link: "https://phakaphol-gta6-clone.vercel.app/",
  },
  {
    projectname: "Pheeraphat Portfolio",
    description:
      "A Static web with a stunning design using only html css and js but i make it for my brother pheeraphat because i saw my brother have only notion page for portfolio ",
    techStack: ["HTML",'CSS','JS'],
    picture: pheeraphat,
    experience:
      "Ant design using material ui and good structure of code",
    link: "https://pheeraphat-portfolio-lfpq.vercel.app/",
  },
  {
    projectname: "Iphone 15 clone",
    description:
      "After completing this project, I understand how to build a mobile-style UI using HTML and CSS. I gain skills in using Flexbox, animations, and responsive design. I learn to dynamically update content like time using JavaScript. I also handle user interactions such as tapping icons or unlocking screens. Overall, I improve my ability to recreate real-world interfaces and structure front-end code efficiently.",
    techStack: ["HTML",'CSS','JS'],
    picture: iphone,
    experience:
      "Ant design using material ui and good structure of code",
    link: "https://iphone-clone-godzk.vercel.app/",
  },

  {
    projectname: "PK Shop",
    description:
      "🎮 A full-stack e-commerce website for buying video games. Users can browse games, add them to the cart, and complete purchases through an interactive and dynamic interface. 🎮",
    techStack: ["React", "Express.js", "Node.js", "MongoDB"],
    picture: pkshop,
    experience:
      "This project deepened my understanding of full-stack development, especially in handling REST APIs, managing state in React, and structuring a MongoDB database for real-world e-commerce scenarios.",
    link: "https://github.com/GodzK/PkShop",
  },
  {
    projectname: "Phakaphol-Ecommerce-Template",
    description:
      "Roby is a sleek and modern HTML/CSS-based ecommerce landing page template designed for promoting and selling sneakers, especially targeting a fashion-conscious audience. It's fully responsive and visually engaging with a product-focused layout.",
    techStack: ["HTML", "CSS", "JS"],
    picture:ecom,
    link: "https://phakaphol-ecommerce-landing-page.vercel.app/",
  },
  {
    projectname: "PKCrypto",
    description:
      "A lightweight cryptocurrency tracking application that fetches real-time market data via API and displays key price information for popular coins.",
    techStack: ["React", "CSS"],
    picture: crypto,
    experience:
      "I gained hands-on experience with REST API consumption, real-time data visualization, and crafting a clean user interface using CSS for presenting financial metrics.",
    link: "https://p-koin.vercel.app/",
  },
  {
    projectname: "IT-Fundamental slide Show",
    description:
      "A modern, responsive landing page for an Online Learning Platform, designed and built by Pk Phakaphol Tcsk, a frontend developer 👑This project showcases a clean UI with vibrant course sections, testimonials, and a bold hero section to encourage users to explore educational content.",
    techStack: ["Gsap", "CSS", "JS"],
    picture:itfunslide,
    link: "https://starterpack-it-fundamental-slidesho.vercel.app/",
  },
  {
    projectname: "Hello World Booking Application",
    description:
      "A full-stack booking system where users can reserve appointments and manage schedules. Developed in a team, my main role was to build and maintain the backend API and ensure smooth data flow.",
    techStack: ["React", "CSS", "Node.js"],
    picture: Helloworld,
    experience:
      "This was my first collaborative full-stack project. I was responsible for designing the database schema, setting up backend routes, and integrating them with frontend components for seamless booking functionality.",
    link: "https://github.com/GodzK/Fullstack-Booking",
  },
  
];

export const ActivityData = [
  {
    Semester: "Semester 1",
    Activity1: [
      {
        activityTitle: "BorntoDev Devinit (Frontend Developer)",
        Semester: "Before Semester 1",
        image: devinitport,
        description:
          "I participated as a content writer and frontend developer, focusing on blog creation related to React.js and animation using GSAP. This opportunity enhanced my communication skills and deepened my frontend knowledge.",
        activitypic: [gsap, css, blogreact],
      },
      {
        activityTitle: "TuePunRak 18th (English Teacher)",
        Semester: "Semester 1",
        image: tpr,
        description:
          "I volunteered to teach English to children in remote rural areas. This camp emphasized building teamwork, leadership, and compassion, while creating meaningful connections with the local community.",
        activitypic: [tpr1, tpr2, tpr3, tpr4],
      },
      {
        activityTitle: "IOT Hackathon (KMUTT)",
        Semester: "Semester 1",
        image: iot1,
        description:
          "My first hackathon experience at KMUTT, where I worked with a team to develop an AI-powered IoT web application using YOLO. I learned about rapid prototyping, AI integration, and project pitching.",
        activitypic: [iotmain, iot2, iot3, iot4, iot5],
      },
    ],
  },
  {
    Semester: "Semester 2",
    Activity1: [],
  },
  {
    Semester: "Semester 3",
    Activity1: [],
  },
];
export const accordionItems = [
  {
    id: 'cf',
    title: 'Quality Assurance',
    description: 'Automate Tester',
    cover: helloworld,
  },
  {
    id: 'corp',
    title: 'Teacher',
    description: 'Programming and English',
    cover: teacher,
  },
  {
    id: 'lead',
    title: 'LEADERSHIP',
    description: 'Vice President of Class',
    cover: tpr3,
  },
  {
    id: 'warehouse',
    title: 'FrontEnd Developer',
    description: 'Ux/Ui Designer',
    cover: iot5,
  },
];
export const socialLinks = [
  { id: "github", name: "Github", link: "https://github.com/GodzK", text: "Github" ,icon: 'fa-github'},
  { id: "ig", name: "Instagram", link: "https://www.instagram.com/pk._tcsk/", text: "Instagram" , icon: 'fa-instagram' },
  { id: "Borntodev", name: "Borntodev", link: "https://www.borntodev.com/author/godzk25gmail-com/", text: "Borntodev" ,icon: 'fa-bold'},
  { id: "Facebook", name: "Facebook", link: "https://www.facebook.com/phakaphol.dherachaisuphakij/", text: "Facebook", icon: 'fa-facebook' },
]
 