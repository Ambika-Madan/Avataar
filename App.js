import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Carousel from './Carousel';
import Carous from './Carous';

function calculateVisibleAndHiddenItems(menuItems, menuWidth) {
  let currentWidth = 0;
  const visibleItems = [];
  const hiddenItems = [];

  for (const item of menuItems) {
    const itemWidth = 100; // You may need to adjust this based on your styling
    if (currentWidth + itemWidth <= menuWidth) {
      visibleItems.push(item);
      currentWidth += itemWidth;
    } else {
      hiddenItems.push(item);
    }
  }

  return { visibleItems, hiddenItems };
}

function App() {
  const menuItems = [' Home ', ' About ', ' Pictures ', ' Journey ', ' Next ', ' FAQ '];

  const [menuWidth, setMenuWidth] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const aboutRef = useRef(null); // Ref for the 'About' section
  const picturesRef = useRef(null); // Ref for the 'Pictures' section
  const journeyRef= useRef(null);

  const handleMoreClick = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const updateMenuWidth = () => {
      const menuContainer = document.getElementById('menu-container');
      setMenuWidth(menuContainer.clientWidth);
    };

    updateMenuWidth();
    window.addEventListener('resize', updateMenuWidth);

    return () => {
      window.removeEventListener('resize', updateMenuWidth);
    };
  }, []);

  const { visibleItems, hiddenItems } = calculateVisibleAndHiddenItems(menuItems, menuWidth);

  const scrollToSection = (ref, section) => {
    if (section === 'Pictures') {
      picturesRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="menu-container" className="menu-container">
          <div className="menu">
            {visibleItems.map((item) => (
              <a
                key={item}
                className="menu-item"
                href="#"
                onClick={() => scrollToSection(aboutRef, item)}
              >
                {item}
              </a>
            ))}
            {hiddenItems.length > 0 && (
              <div className="more-menu">
                <a className="more-trigger" onClick={handleMoreClick} href="#">
                  More
                </a>
                {showMore && (
                  <div className="more-dropdown">
                    {hiddenItems.map((item) => (
                      <a
                        key={item}
                        className="menu-item"
                        href="#"
                        onClick={() => scrollToSection(aboutRef, item)}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Add the Carousel component for the Pictures Section */}
        <div ref={picturesRef} className="carousel-container">
          <Carousel />
        </div>
        <div ref={aboutRef} className="section">
          <h2>
          I study as all students do . From a young age theory has bored me so i always found solace in Mathematics as it challenged my mind and fed my curiosity. As time progressed computer science was introduced to me .I still remember how it felt when the first code i typed compiled properly. Computers became a new domain for me and i loved it.Everytime I startb to code I lear new things. For eg React js is very new to me .I just started learning it, so exploring new  techniques and getting new ideas make the world a better place for me
          </h2>
        </div>

        <div ref={picturesRef} className="section1" style={{ maxHeight: '1000px', margintop:'10px' }}>
          {/* Adjust the max height and overflow properties as needed */}
         
          <Carous/>
          <h2>This is what I do (Other Than Studying)</h2>
        </div>
        <div ref={journeyRef} className='section2'>
          <h2>I am from a place in Uttar Pradesh , Moradabad . My family believes in education ans stability so from a young age these values have been a very integral part of me. I am an avid reader and have always been intersected in academics. When i was young i was very fond of reading Encyclopedias and Atlas. Anything creatives drives me towards it .For as long as I can remember I have painted and sketched . Other than this I also write songs and poems </h2>

        </div>
      </header>
    </div>
  );
}

export default App;
