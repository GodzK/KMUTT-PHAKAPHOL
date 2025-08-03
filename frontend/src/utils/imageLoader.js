// Utility function to load all images from a folder
export const loadImagesFromFolder = (folderPath) => {
  const images = [];
  
  // Import all images from the folder
  const imageModules = import.meta.glob('/src/assets/**/*.{jpg,jpeg,png,gif,webp}', { eager: true });
  
  // Filter images from the specific folder
  Object.keys(imageModules).forEach(path => {
    if (path.includes(folderPath)) {
      images.push(imageModules[path].default);
    }
  });
  
  return images;
};

// Specific folder loaders
export const loadDevinitImages = () => loadImagesFromFolder('Devinit');
export const loadIT3KImages = () => loadImagesFromFolder('IT3K');
export const loadIOTImages = () => loadImagesFromFolder('IOT');
export const loadSCBImages = () => loadImagesFromFolder('SCB');
export const loadITStarterpackImages = () => loadImagesFromFolder('ITStarterpack'); 