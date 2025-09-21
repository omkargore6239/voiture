import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { siteData } from '../data/siteData';

const ImageModal = ({ image, isOpen, onClose, onNext, onPrev }) => {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative max-w-4xl max-h-full p-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <X size={32} />
        </button>
        
        <img
          src={image.image}
          alt={image.title}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
          }}
        />
        
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          <h3 className="font-semibold">{image.title}</h3>
          <p className="text-sm opacity-75">{image.category}</p>
        </div>
        
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const GalleryGrid = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => onImageClick(index)}
        >
          <img
            src={image.image}
            alt={image.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`;
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-semibold">{image.title}</h3>
            <p className="text-gray-300 text-sm">{image.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalImage, setModalImage] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', ...new Set(siteData.gallery.map(item => item.category))];

  const filteredImages = selectedCategory === 'All' 
    ? siteData.gallery 
    : siteData.gallery.filter(item => item.category === selectedCategory);

  const openModal = (index) => {
    setModalIndex(index);
    setModalImage(filteredImages[index]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const nextImage = () => {
    const nextIndex = (modalIndex + 1) % filteredImages.length;
    setModalIndex(nextIndex);
    setModalImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = modalIndex === 0 ? filteredImages.length - 1 : modalIndex - 1;
    setModalIndex(prevIndex);
    setModalImage(filteredImages[prevIndex]);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Gallery
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Take a visual tour of our modern facilities, classrooms, laboratories, and campus life at Voiture Coaching Institute.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Images Count */}
          <div className="mb-8">
            <p className="text-center text-gray-600">
              Showing {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <GalleryGrid 
              images={filteredImages} 
              onImageClick={openModal}
            />
          ) : (
            <div className="text-center py-12">
              <Camera size={64} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <ImageModal
        image={modalImage}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />

      {/* Facilities Overview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-gradient">Facilities</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              State-of-the-art infrastructure designed to provide the best learning environment for our students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Modern Classrooms</h3>
              <p className="text-gray-600">Air-conditioned classrooms with smart boards and comfortable seating arrangements</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Science Laboratories</h3>
              <p className="text-gray-600">Well-equipped physics, chemistry, and biology labs for practical learning</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Digital Library</h3>
              <p className="text-gray-600">Extensive collection of books, journals, and digital resources for comprehensive study</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
