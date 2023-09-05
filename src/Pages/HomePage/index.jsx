import { Link } from "react-router-dom";

const plantCategories = [
  {
    category: "Pet Friendly",
    description:
      "These are plants that are non-toxic to pets, making them safe to have around animals like cats and dogs.",
  },

  {
    category: "Purifying",
    description:
      "Purifying plants are known for their ability to improve indoor air quality by removing toxins and pollutants from the air.",
  },

  {
    category: "Calathea",
    description:
      "Calathea is a genus of decorative indoor plants with striking foliage patterns. They are popular for their vibrant and unique leaves.",
  },

  {
    category: "Easy-to-Care",
    description:
      "These plants are low-maintenance and require minimal attention, making them suitable for beginners or busy individuals.",
  },

  {
    category: "Plants",
    description:
      "Suspended or hanging plants are those that are typically displayed in hanging baskets or from the ceiling, adding an attractive vertical element to your decor.",
  },

  {
    category: "Bonsai",
    description:
      "Bonsai is the art of cultivating miniature trees, creating aesthetically pleasing, small-scale representations of full-sized trees through careful pruning and shaping.",
  },
];

function HomePage() {
  return (
    <div>
      <div className="allPlants">
        <h1>Discover our Plants</h1>
        <Link to={"/plants"}>Learn More</Link>
        {plantCategories.map((plant, index) => {
          return (
            <div key={index}>
              <Link to={"/plants"} state={{ category: plant.category, description: plant.description }}>
                {plant.category}
              </Link>
            </div>
          );
        })}
        {/* <Link to={'/plants'} state={{ category: "Pet Friendly" }}>Pet Friendly</Link>
        <Link to={'/plants'} state={{ category: "Purifying" }}>Purifying</Link>
        <Link to={'/plants'} state={{ category: "Suspended" }}>Suspended</Link>
        <Link to={'/plants'} state={{ category: "Bonsai" }}>Bonsai</Link>
        <Link to={'/plants'} state={{ category: "Easy-to-Care" }}>Easy-to-Care</Link>
        <Link to={'/plants'} state={{ category: "Calathea" }}>Calathea</Link> */}
      </div>
    </div>
  );
}

export default HomePage;
