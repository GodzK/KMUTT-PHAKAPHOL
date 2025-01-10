import pkshop from "../../frontend/src/assets/pkshop.jfif";
import crypto from "../../frontend/src/assets/crypto.jfif";
import iot from "../../frontend/src/assets/iot.png";
import tpr from "../../frontend/src/assets/TPR/tprport.png"
import tpr1 from "../../frontend/src/assets/TPR/tpr1.jpeg"
import tpr2 from "../../frontend/src/assets/TPR/tpr2.jpeg"
import tpr3 from "../../frontend/src/assets/TPR/tpr3.jpeg"
import tpr4 from "../../frontend/src/assets/TPR/tpr4.jpeg"
export const projectdata = [
    {
        projectname: "PK Shop",
        description: "🎮 FullStack Website for buying Game 🎮",
        techStack: ["React", "Express.JS", "Node.js", "MongoDB"],
        picture: pkshop,
        experience: "This is my first Fullstack project that I am very proud to present. This project taught me how frontend passes data to the backend using APIs and how Axios works!"
    },
    {
        projectname: "PKCrypto",
        description: "🎮 Cryto API  🎮",
        techStack: ["React", "Css"],
        picture: crypto,
        experience: "This is Crypto Api that makes me learn how to fetch API and level up my CSS styling skills",
        link: "https://p-koin.vercel.app/"
    },
    {
      projectname: "IOTSMARTSCAN AI",
      description: "🎮IOT for watch  🎮",
      techStack: ["React", "Css", "YoloAi","Node.js"],
      picture: iot,
      experience: "This is a Iot project that make me know how to make fullstack web and how ai work , first time fetching data api from server and knowing all around about how create website from begin ",
      link: "https://p-koin.vercel.app/"
  },
];

export const ActivityData = [
    {
      Semester: "Activity",
      Activity1: [
        {
          activityTitle: "TuePunrak 18th (English Teacher)",
          Semester: "Semester 1",
          image: tpr, // 
          description: "The Camp promotes unity and friendship among students.",
          activitypic : [tpr1,tpr2,tpr3,tpr4],
        },
        {
          activityTitle: "TuePunrak 19th (English Teacher)",
          Semester: "Semester 1",
          image: tpr, // 
          description: "The Camp promotes unity and friendship among students."
        }

      ]
    },
    {
      Semester: "Semester 2",
      Activity1: [
        {
          activityTitle: "TuePunrak 18th (English Teacher)",
          image: tpr, // 
          description: "The Camp promotes unity and friendship among students."
        },
        {
          activityTitle: "TuePunrak 19th (English Teacher)",
          image: tpr, // 
          description: "The Camp promotes unity and friendship among students."
        }

      ]
    },

  ];
  