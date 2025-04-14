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
import Helloworld from "../../frontend/src/assets//Helloworld/helloworldhippo.png";
import pkflix from "../../frontend/src/assets/pkflix.png";
import moodbase from "../../frontend/src/assets/moodbase.png"

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
    projectname: "(Mood base) Coffee Shop",
    description:
      "This project is a media recommendation system designed to help people who are emotionally struggling—whether due to depression, grief, burnout, or feeling disconnected from the world—find media content that offers true empathy and emotional healing.",
    techStack: ["React", "Express.js", "Node.js", "MongoDB"],
    picture: moodbase,
    experience:
      "It categorizes content (movies, series, books, podcasts, and poetry) by detailed mood profiles, such as: Low energy or mental fatigue Feelings of worthlessness or numbnessA desire for comfort or deeper understanding",
    link: "https://github.com/GodzK/PkShop",
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
    projectname: "Hello World Booking Application",
    description:
      "A full-stack booking system where users can reserve appointments and manage schedules. Developed in a team, my main role was to build and maintain the backend API and ensure smooth data flow.",
    techStack: ["React", "CSS", "Node.js"],
    picture: Helloworld,
    experience:
      "This was my first collaborative full-stack project. I was responsible for designing the database schema, setting up backend routes, and integrating them with frontend components for seamless booking functionality.",
    link: "https://github.com/GodzK/Fullstack-Booking",
  },
  {
    projectname: "PKFLIX",
    description:
      "An entertainment-themed web app inspired by Netflix, designed to simulate a movie streaming platform. It includes a dynamic UI with featured banners, media content, and filtering functionality.",
    techStack: ["React", "CSS", "Node.js"],
    picture: pkflix,
    experience:
      "This project improved my frontend design skills, especially in creating engaging user interfaces. I also practiced backend API handling and managing component-based layouts for media-heavy content.",
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
