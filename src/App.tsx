import './App.css'
import DotGrid from './DotGrid';
import CircularText from './CircularText';
import { useState, useEffect } from 'react';
  


function App() {
  const [showCaption, setShowCaption] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Array of available images
  const images = ['/gfw.png', '/he.png', '/gfw2.png', 'af2.jpeg', '/he2.png', '/trase.jpeg', '/he3.jpeg', '/af.jpeg'];

  // Update cursor when caption is active
  useEffect(() => {
    if (showCaption) {
      document.body.classList.add('globe-cursor');
    } else {
      document.body.classList.remove('globe-cursor');
    }
  }, [showCaption]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScreenClick = () => {
    setShowCaption(true);
    
    // Cycle to next image
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    // Hide caption after 1.2 seconds
    setTimeout(() => {
      setShowCaption(false);
    }, 1200);
  };

  return (
    <div onClick={handleScreenClick} style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Image caption that follows cursor */}
      {showCaption && (
        <div 
          className="cursor-caption"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y + 15,
          }}
        >
          <img 
            src={images[currentImageIndex]} 
            alt="Caption" 
            style={{ 
              width: '350px', 
              height: '280px', 
              objectFit: 'contain',
              borderRadius: '3px'
            }}
          />
        </div>
      )}
      
      <CircularText
        text="*ENDLESSSTUDIO"
        onHover="speedUp"
        spinDuration={20}
        className="custom-class"
      />
      <DotGrid
        dotSize={3}
        gap={20}
        baseColor="#013379"
        activeColor="#FA0F56"
        proximity={170}
        shockRadius={180}
        shockStrength={10}
        resistance={750}
        returnDuration={1.5}
      />
      <div className="text-container">
        <p>10+ years of experience in creating digital maps and geospatial applications</p>
        <a className="email-link" href="mailto:hola@endlessstud.io">hola@endlessstud.io</a>
      </div>
    </div>
  )
}

export default App
