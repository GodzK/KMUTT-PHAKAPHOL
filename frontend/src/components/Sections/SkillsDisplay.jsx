import { accordionItems } from '../../../data/Data';
import "../../styles/layout/AppLayout.css"
import MatrixRain from '../MatrixRain/MatrixRain';

const SkillsDisplay = () => (
  <div className="h-screen font-poppins text-white overflow-hidden relative" >
    <MatrixRain />
    <ul className="c-accordion flex h-full list-none p-0 m-0" id='acc'>
      {accordionItems.map((item) => (
        <li
          key={item.id}
          id={item.id}
          className="c-accordion__item relative flex-1 h-full min-w-[2.05rem] transition-all duration-300 ease-in-out bg-cover bg-center hover:flex-[2] hover:w-1/2 hover:bg-transparent group"
          style={{
            backgroundImage: `url(${item.cover}), linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, #111111 100%)`,
            backgroundColor: '#3E66A0',
          }}
        >
          <a
            href={`#${item.id}`}
            className="c-accordion__action absolute inset-0 flex justify-center bg-gradient-to-b from-transparent to-[#111111] bg-opacity-75 no-underline"
          >
            <div className="c-accordion__content w-[55%] text-left pt-96 pl-32 pr-18 -left-[50rem] font-['Roboto_Condensed']">
              <h2 className="c-accordion__title c-accordion__title--hero text-6xl font-bold uppercase -ml-[145px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                {item.title}
              </h2>
              <p className="c-accordion__description font-medium leading-tight -ml-[145px] w-[85%] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                {item.description}
              </p>
            </div>
            <div className="c-accordion__aside absolute right-4 bottom-0 h-full flex items-center flex-nowrap whitespace-nowrap [writing-mode:vertical-rl] rotate-180 before:content-['+'] before:text-3xl before:mb-4 before:inline-block after:flex-1 after:w-px after:mt-4 after:bg-white/20">
              <h2 className="c-accordion__title font-['Roboto_Condensed'] max-h-full group-hover:max-h-0 group-hover:opacity-0 transition-all duration-300 ease-in-out">
                {item.title}
              </h2>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default SkillsDisplay; 