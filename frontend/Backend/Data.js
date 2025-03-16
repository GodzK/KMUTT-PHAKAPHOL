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
export const projectdata = [
  {
    projectname: "IT 3KINGS 19TH Web Appication ",
    description:
      "This project is a dynamic web application built using Next.js, a powerful React-based framework that enables Server-Side Rendering (SSR) and Static Site Generation (SSG). The application is designed to provide an interactive tournament bracket management system, primarily focusing on badminton and ping pong tournaments. Users can view and manage match schedules and results efficiently. The platform caters to both general viewers and administrators, ensuring a seamless experience for tracking tournament progress and updating match details.",
    techStack: [
      "Next.JS",
      "Css",
      "AXIOS",
      "Typescript",
      "react-zoom-pan-pinch",
    ],
    picture: it3k,
    experience:
      "This project is a dynamic web application built using Next.js, a React-based framework, to create an interactive tournament bracket management system. The application, named  allows users to view and manage match schedules and results for sports tournaments, with a primary focus on badminton and ping pong. It is designed to cater to both general viewers and administrators, offering a seamless experience for tracking tournament progress and updating match details.",
    link: "https://it3k.sit.kmutt.ac.th/",
  },
  {
    projectname: "IOTSMARTSCAN AI",
    description:
      "This is an IoT-based full-stack web application that incorporates AI-powered object detection using YOLO (You Only Look Once) for real-time scanning and recognition. The project integrates both frontend and backend technologies to deliver a seamless and intelligent scanning experience.",
    techStack: ["React", "Css", "YoloAi", "Node.js"],
    picture: iot,
    experience:
      "I learned how to build an end-to-end full-stack application, integrate AI models into a web application, and optimize real-time data processing for IoT devices. ",
    link: "https://p-koin.vercel.app/",
  },
  {
    projectname: "PK Shop",
    description:
      "🎮A full-stack e-commerce website for purchasing games. This platform allows users to browse, select, and buy games with a fully integrated shopping cart and backend API for handling transactions. 🎮",
    techStack: ["React", "Express.JS", "Node.js", "MongoDB"],
    picture: pkshop,
    experience:
      "I gained valuable experience in full-stack development, specifically in how frontend components communicate with backend APIs. Additionally, I learned how to use Axios for making API requests and managing state in React applications.",
  },
  {
    projectname: "PKCrypto",
    description:
      "A cryptocurrency tracking application that utilizes an API to fetch real-time data on various cryptocurrencies. The project focuses on fetching, displaying, and updating crypto prices dynamically.",
    techStack: ["React", "Css"],
    picture: crypto,
    experience:
      "This project helped me understand API integration, working with real-time data, and improving my CSS styling skills to present financial data in a clean and structured format.",
    link: "https://p-koin.vercel.app/",
  },
  {
    projectname: "Hello World Booking Application ",
    description:
      "A full-stack booking system that allows users to book appointments and manage reservations. This project was developed as part of a team collaboration, where I was responsible for building the backend API for booking management.",
    techStack: ["React", "Css", "YoloAi", "Node.js"],
    picture: Helloworld,
    experience:
      "This was my first full-stack project where I worked collaboratively in a team. I focused on backend development, creating a REST API to manage bookings, and ensuring smooth data transactions between the frontend and backend.",
    link: "https://github.com/GodzK/Fullstack-Booking",
  },
  {
    projectname: "PKFLIX ",
    description:
      "A full-stack booking system that allows users to book appointments and manage reservations. This project was developed as part of a team collaboration, where I was responsible for building the backend API for booking management.",
    techStack: ["React", "Css", "YoloAi", "Node.js"],
    picture: pkflix,
    experience:
      "This was my first full-stack project where I worked collaboratively in a team. I focused on backend development, creating a REST API to manage bookings, and ensuring smooth data transactions between the frontend and backend.",
    link: "https://github.com/GodzK/Fullstack-Booking",
  },
];

export const ActivityData = [
  {
    Semester: "Semester 1 ",
    Activity1: [
      {
        activityTitle: "Borntodev Devinit (Frontend Developer) ",
        Semester: "Before Semester 1",
        image: devinitport,
        description:
          "Blogger Wrinting a frontned developer content is a good experience for me this work make me known how to ",
        activitypic: [gsap, css, blogreact],
      },

      {
        activityTitle: "TuePunrak 18th (English Teacher)",
        Semester: "Semester 1",
        image: tpr,
        description: "The Camp promotes unity and friendship among students.",
        activitypic: [tpr1, tpr2, tpr3, tpr4],
      },
      {
        activityTitle: "IOT HACKATRON",
        Semester: "Semester 1",
        image: iot1,
        description:
          "This is my first hackatron in kmutt i've learned a lot of lesson about hosting and building web application and using ai with yolo",
        activitypic: [iotmain, iot2, iot3, iot4, iot5],
      },
    ],
  },
  {
    Semester: "Semester 2",
    Activity1: [
      {
        activityTitle: "TuePunrak 18th (English Teacher)",
        image: tpr,
        description: "The Camp promotes unity and friendship among students.",
      },
      {
        activityTitle: "TuePunrak 19th (English Teacher)",
        image: tpr,
        description: "The Camp promotes unity and friendship among students.",
      },
    ],
  },
  {
    Semester: "Semester 3",
    Activity1: [
      {
        activityTitle: "TuePunrak 18th (English Teacher)",
        image: tpr,
        description: "The Camp promotes unity and friendship among students.",
      },
      {
        activityTitle: "TuePunrak 19th (English Teacher)",
        image: tpr,
        description: "The Camp promotes unity and friendship among students.",
      },
    ],
  },
];
