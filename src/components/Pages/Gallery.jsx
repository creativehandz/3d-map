import React from 'react';

const Gallery = () => {
  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <h1>Gallery</h1>
        <p>Explore our amazing collection of photos and artworks.</p>
      </header>

      <div className="gallery-content">
        <div className="gallery-item">
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Gallery Item 1" 
            className="gallery-image" 
          />
          <h2>Item 1</h2>
          <p>This is a description of the first item in the gallery.</p>
        </div>

        <div className="gallery-item">
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Gallery Item 2" 
            className="gallery-image" 
          />
          <h2>Item 2</h2>
          <p>This is a description of the second item in the gallery.</p>
        </div>

        <div className="gallery-item">
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Gallery Item 3" 
            className="gallery-image" 
          />
          <h2>Item 3</h2>
          <p>This is a description of the third item in the gallery.</p>
        </div>

        <div className="gallery-item">
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Gallery Item 4" 
            className="gallery-image" 
          />
          <h2>Item 4</h2>
          <p>This is a description of the fourth item in the gallery.</p>
        </div>
      </div>

      <footer className="gallery-footer">
        <p>&copy; 2024 Gallery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Gallery;