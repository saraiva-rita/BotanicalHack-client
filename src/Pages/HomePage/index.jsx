import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import shadows from '@mui/material/styles/shadows';

const plantCategories = [
  {
    category: 'Suspended',
    description:
      'Suspended or hanging plants are those that are typically displayed in hanging baskets or from the ceiling, adding an attractive vertical element to your decor.',
    imageBanner: '/images/suspended-banner.avif',
    imageSection: '/images/suspended-plant.jpeg',
  },
  {
    category: 'Purifying',
    description:
      'Purifying plants are known for their ability to improve indoor air quality by removing toxins and pollutants from the air.',
    imageSection: '/images/sansevieria-laurentii.jpeg',
    imageBanner: '/images/purifying-banner.avif',
  },
  {
    category: 'Pet Friendly',
    description:
      'These are plants that are non-toxic to pets, making them safe to have around animals like cats and dogs.',
    imageBanner: '/images/pet-friendly-banner.png',
    imageSection: '/images/pink.png',
  },
  {
    category: 'Calathea',
    description:
      'Calathea is a genus of decorative indoor plants with striking foliage patterns. They are popular for their vibrant and unique leaves.',
    imageBanner: '/images/calathea-banner.avif',
    imageSection: '/images/calathea orbifolia.jpg',
  },
  {
    category: 'Easy-to-Care',
    description:
      'These plants are low-maintenance and require minimal attention, making them suitable for beginners or busy individuals.',
    imageBanner: '/images/easy-to-care-banner.avif',
    imageSection: '/images/aloevera.png',
  },
  {
    category: 'Bonsai',
    description:
      'Bonsai is the art of cultivating miniature trees, creating aesthetically pleasing, small-scale representations of full-sized trees through careful pruning and shaping.',
    imageBanner: '/images/bonsai-banner.jpeg',
    imageSection: '/images/WisteriaBonsai.webp',
  },
];

function HomePage() {
  return (
    <div>
      <div
        className="plants-category"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box sx={{ width: 1200, height: 870 }}>
          <ImageList variant="masonry" cols={3} gap={10}>
            {plantCategories.map((plant, index) => {
              return (
                <ImageListItem key={plant._id}>
                  <div
                    key={index}
                    style={{ boxShadow: '3px 3px 3px 2px #e7e8e9' }}
                  >
                    <Link
                      to={'/plants'}
                      state={{
                        category: plant.category,
                        description: plant.description,
                        image: plant.imageBanner,
                      }}
                    >
                      {plant.category}
                    </Link>
                    <img
                      src={`${plant.imageSection}?w=50&fit=crop&auto=format`}
                      srcSet={`${plant.imageSection}?w=50&fit=crop&auto=format&dpr=2 2x`}
                      alt={plant.name}
                      loading="lazy"
                      style={{
                        width: '300px',
                        height: 'auto',
                      }}
                    />
                  </div>
                </ImageListItem>
              );
            })}
          </ImageList>
        </Box>
      </div>
      <div className="discover-allPlants">
        <div className="discover-allPlants-content">
          <h1>Discover our Plants</h1>
          <Link className="button" style={{ color: '#227a60' }} to={'/plants'}>
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
