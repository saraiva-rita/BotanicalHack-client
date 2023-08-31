import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <div className="allPlants">
        <h1>Discover our Plants</h1>
        <Link to={'/plants'}>Learn More</Link>
      </div>
    </div>
  );
}

export default HomePage;
