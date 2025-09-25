import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

// Direct gallery data
const galleryImages = [
  { id: 1, image: "/images/gallery/1.jpg" },
  { id: 2, image: "/images/gallery/2.jpg" },
  { id: 3, image: "/images/gallery/3.jpg" },
  { id: 4, image: "/images/gallery/4.jpg" },
  { id: 5, image: "/images/gallery/5.jpg" },
  { id: 6, image: "/images/gallery/6.jpg" },
  { id: 7, image: "/images/gallery/7.jpg" },
  { id: 8, image: "/images/gallery/8.jpg" },
  { id: 9, image: "/images/gallery/9.jpg" },
  { id: 10, image: "/images/gallery/10.jpg" },
  { id: 11, image: "/images/gallery/11.jpg" },
  { id: 12, image: "/images/gallery/12.jpg" }
];

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
          alt={`Gallery image ${image.id}`}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
          }}
        />
        
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
  // State for animation delay for images
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`group relative overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
          onClick={() => onImageClick(index)}
          style={{
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateX(0)' : 'translateX(-50px)',
            transitionDelay: `${index * 100}ms`,
            transitionProperty: 'opacity, transform'
          }}
        >
          <img
            src={image.image}
            alt={`Gallery image ${image.id}`}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`;
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
          </div>
        </div>
      ))}
    </div>
  );
};

const Gallery = () => {
  const [modalImage, setModalImage] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setModalIndex(index);
    setModalImage(galleryImages[index]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const nextImage = () => {
    const nextIndex = (modalIndex + 1) % galleryImages.length;
    setModalIndex(nextIndex);
    setModalImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = modalIndex === 0 ? galleryImages.length - 1 : modalIndex - 1;
    setModalIndex(prevIndex);
    setModalImage(galleryImages[prevIndex]);
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
          {/* Images Count */}
          <div className="mb-8">
            <p className="text-center text-gray-600">
              Showing {galleryImages.length} images
            </p>
          </div>

          {/* Gallery Grid */}
          <GalleryGrid 
            images={galleryImages} 
            onImageClick={openModal}
          />
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
    </div>
  );
};

export default Gallery;
