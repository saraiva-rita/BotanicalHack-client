import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <div className="allPlants">
        <h1>Discover our Plants</h1>
        <Link to={'/plants'}>Learn More</Link>
        <Link to={'/plants'} state={{ category: "Pet Friendly" }}>Pet Friendly</Link>
        <Link to={'/plants'} state={{ category: "Purifying" }}>Purifying</Link>
        <Link to={'/plants'} state={{ category: "Suspended" }}>Suspended</Link>
        <Link to={'/plants'} state={{ category: "Bonsai" }}>Bonsai</Link>
        <Link to={'/plants'} state={{ category: "Easy-to-Care" }}>Easy-to-Care</Link>
        <Link to={'/plants'} state={{ category: "Calathea" }}>Calathea</Link>

      </div>
    </div>
  );
}

export default HomePage;
