import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import { useState, useEffect } from "react"

const Home = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  
  // Listen for theme changes with MutationObserver to detect class changes on html element
  useEffect(() => {
    // Initial theme setup
    setTheme(localStorage.getItem("theme") || "light");
    
    // Create a MutationObserver to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const htmlElement = document.documentElement;
          const isDarkMode = htmlElement.classList.contains('dark');
          setTheme(isDarkMode ? 'dark' : 'light');
        }
      });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.documentElement, { attributes: true });
    
    // Also check for localStorage changes (as a backup method)
    const checkThemeInStorage = () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme && storedTheme !== theme) {
        setTheme(storedTheme);
      }
    };
    
    window.addEventListener("storage", checkThemeInStorage);
    
    // Clean up
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", checkThemeInStorage);
    };
  }, [theme]);
  
  return (
    <div className={`home ${theme === "dark" ? "dark" : ""}`}>
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home