import React, { useEffect, useState, useRef } from "react";
import { Parallax } from "react-parallax";
import PropTypes from "prop-types";

const Cover = ({ img, title }) => {
  const [blur, setBlur] = useState(0);
  const coverRef = useRef(null);  

  useEffect(() => {
    const handleScroll = () => {
      if (coverRef.current) {
        const rect = coverRef.current.getBoundingClientRect();
        const scrollPercentage = 1 - (rect.bottom / window.innerHeight);
        setBlur(Math.max(0, Math.min(5, scrollPercentage * 10)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={coverRef}>
      <Parallax
        bgImage={img}
        bgImageAlt={title}
        strength={300}
        bgImageStyle={{
          filter: `blur(${blur}px)`,
          transition: 'filter 0.1s ease-out',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      >
        <div className="h-[700px] flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="bg-black bg-opacity-60 w-full max-w-6xl py-8 px-4 sm:py-12 sm:px-8 md:py-16 md:px-12 lg:py-20 lg:px-16 shadow-md flex flex-col items-center text-white text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 md:mb-6">{title}</h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
            </p>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

Cover.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Cover;
