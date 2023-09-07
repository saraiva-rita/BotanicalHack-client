import { Container } from "@mui/material";
import {Typography} from "@mui/material";

function About() {
  return (
    <div>
      <div className="about-page-banner">
        <div className="details-banner-wrapper grey-color">
          <div className="banner-content">
            <h2>About</h2>
            <p>
              Embrace the Green: Where Nature's Beauty and Inspiration Flourish!
              Step into a lush, vibrant world of greenery and tranquility and
              embark on a journey of discovery as you explore the captivating
              realm of plants and their boundless wonders.
            </p>
          </div>
        </div>
      </div>

      <Container
      >
        <div >
          <Typography variant="body1" component="p"
          sx={{textAlign: 'justify', margin: '40px 60px'}}>
            Welcome to the vibrant world of plants, where nature's poetry
            unfolds in leaves, petals, and roots. At our website, we celebrate
            the profound beauty and boundless inspiration that these green
            companions offer. Whether you're an experienced gardener or just
            taking your first steps into the wonderful world of plants, you've
            found a welcoming home here. Our mission is simple: to kindle your
            passion for plants, empower your green thumb, and sow the seeds of
            inspiration in your heart.
          </Typography>
        </div>

        <Container sx={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
          <img src="/images/about-page-img1.jpg" alt="" style={{width: '500px', height:'320px', }}/>
          <img src="/images/about-page-img2.png" alt="" style={{width: '500px', height:'320px',  }} />
        </Container>

        <div>
          <Typography variant="body1" component="p"
          sx={{textAlign: 'justify', margin: '40px 60px'}}>
            Plants, with their enduring grace, whisper life's most profound
            lessons. They teach us patience as we wait for a bud to bloom,
            resilience as they weather storms and flourish, and the joy of
            nurturing something beautiful. Through our website, we invite you to
            explore the incredible diversity of flora, discover practical
            gardening tips, and unlock the secrets of a thriving green
            sanctuary. Join us on this journey, where every leaf and bloom tells
            a story of growth, and let the enchanting world of plants inspire
            your own blossoming life.
          </Typography>
        </div>
      </Container>
    </div>
  );
}

export default About;


