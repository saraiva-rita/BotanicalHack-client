import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const plantCategories = [
  {
    category: 'Suspended',
    description:
      'Suspended or hanging plants are those that are typically displayed in hanging baskets or from the ceiling, adding an attractive vertical element to your decor.',
    image: '/images/suspended-plant.jpeg',
  },
  {
    category: 'Purifying',
    description:
      'Purifying plants are known for their ability to improve indoor air quality by removing toxins and pollutants from the air.',
    image: '/images/sansevieria-laurentii.jpeg',
  },
  {
    category: 'Pet Friendly',
    description:
      'These are plants that are non-toxic to pets, making them safe to have around animals like cats and dogs.',
    image: '/images/pink.png',
  },
  {
    category: 'Calatheas',
    description:
      'Calathea is a genus of decorative indoor plants with striking foliage patterns. They are popular for their vibrant and unique leaves.',
    image: '/images/calathea orbifolia.jpg',
  },
  {
    category: 'Easy-to-Care',
    description:
      'These plants are low-maintenance and require minimal attention, making them suitable for beginners or busy individuals.',
    image: '/images/aloevera.png',
  },
  {
    category: 'Bonsai',
    description:
      'Bonsai is the art of cultivating miniature trees, creating aesthetically pleasing, small-scale representations of full-sized trees through careful pruning and shaping.',
    image: '/images/WisteriaBonsai.webp',
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
        <Box sx={{ width: 1350, height: 870 }}>
          <ImageList variant="masonry" cols={3} gap={10}>
            {plantCategories.map((plant, index) => {
              return (
                <ImageListItem key={plant._id}>
                  <div key={index}>
                    <Link
                      to={'/plants'}
                      state={{
                        category: plant.category,
                        description: plant.description,
                        image: plant.image,
                      }}
                    >
                      {plant.category}
                    </Link>
                    <img
                      src={`${plant.image}?w=50&fit=crop&auto=format`}
                      srcSet={`${plant.image}?w=50&fit=crop&auto=format&dpr=2 2x`}
                      alt={plant.name}
                      loading="lazy"
                      style={{ width: '300px', height: 'auto' }}
                    />
                  </div>
                </ImageListItem>
              );
            })}
          </ImageList>
        </Box>
      </div>
      <div className="discover-allPlants">
        <h1>Discover our Plants</h1>
        <Link className="button" to={'/plants'}>
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
