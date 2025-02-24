# Phakaphol Portfolio Kmutt Edition

## Description
Phakaphol Portfolio is an interactive, game-like personal portfolio website built using React. It features a dynamic menu navigation system that allows users to explore different sections using keyboard controls or mouse clicks. The design incorporates smooth animations powered by AOS and a visually engaging background video to enhance the user experience.

## Features
- **Keyboard Navigation**: Navigate the menu using arrow keys and select options with Enter.
- **Interactive ASCII Text**: A unique ASCII-styled title with animated wave effects.
- **Background Video**: A looping background video for an immersive experience.
- **Animated Page Transitions**: Smooth animations using AOS for a dynamic feel.
- **Modular Component Structure**: Each section is built as a React component for maintainability.
- **Dark Themed UI**: A sleek and modern design aesthetic.

## Tech Stack
- **React**: Frontend framework for building UI components.
- **AOS (Animate On Scroll)**: Handles page transitions and animations.
- **CSS Modules**: Provides scoped and maintainable styles.
- **JavaScript (ES6+)**: Core language for interactivity and state management.

## Project Structure
```
📂 src/
 ├── assets/            # Contains background video and other media files
 ├── components/        # Reusable UI components
 │   ├── About.js
 │   ├── Activity.js
 │   ├── Contact.js
 │   ├── Project.js
 │   ├── Skill.js
 │   ├── ASCIIText.js   # ASCII text rendering component
 ├── App.js             # Main entry point
 ├── App.css            # Global styles
 ├── index.js           # Root React render file
 ├── data.js            # Stores data for the portfolio sections
 ├── transition.js      # Manages animations and transitions
```

## Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/GodzK/KMUTT-PHAKAPHOL.git
   cd frontend
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Run the Application**
   ```sh
   npm start
   ```

## Usage
- Open `http://localhost:3000/` in your browser.
- Navigate using arrow keys or click to select a section.
- Explore sections like About Me, Projects, Skills, Activity, and Contact.

## Future Enhancements
- Implement a **dark mode toggle** for better accessibility.
- Add **project filtering and sorting** functionality.
- Introduce **backend integration** to fetch dynamic content.
- Enhance **responsiveness** for improved mobile experience.
- Add **3D elements and interactive effects** using Three.js.

## License
This project is open-source and available under the [MIT License](LICENSE).

---

Let me know if you want any modifications! 🚀
