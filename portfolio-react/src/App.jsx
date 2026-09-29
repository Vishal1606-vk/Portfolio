import Base from "./components/Base.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

// Page order = order of the components below.
export default function App() {
  return (
    <>
      <Base />
      <div className="wrap">
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
