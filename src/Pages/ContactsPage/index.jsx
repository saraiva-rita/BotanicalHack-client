import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton } from "@mui/material";

function Contacts() {
  return (
    <div>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <img
          src="/images/contact-page-opt2.jpeg"
          alt=""
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
        />
        <Container
          sx={{
            position: "absolute",
            zIndex: "10",
            backgroundColor: "rgba(59, 81, 74, 0.8)",
            color: "white",
            maxWidth: "800px",
            width: "90%",
            padding: "20px",
            textAlign: "center",
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'center',

          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "40px",
            }}
          >
            <div style={{ margin: "40px" }}>
              <img
                src="/images/rita-contact-page.jpeg"
                alt=""
                style={{ width: "200px", borderRadius: "100px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <h2>Rita Saraiva</h2>
              <div style={{ marginTop: "20px" }}>
                <IconButton
                  onClick={() =>
                    window.open("https://github.com/saraiva-rita", "_blank")
                  }
                >
                  <GitHubIcon sx={{ fontSize: "3.5rem" }}></GitHubIcon>
                </IconButton>
                <IconButton
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/rita-saraiva/",
                      "_blank"
                    )
                  }
                >
                  <LinkedInIcon sx={{ fontSize: "3.5rem" }}></LinkedInIcon>
                </IconButton>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "40px",
            }}
          >
            <div style={{ margin: "40px" }}>
              <img
                src="/images/filipa-contact-page.jpeg"
                alt=""
                style={{ width: "200px", borderRadius: "100px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2>Filipa Flora</h2>
              <div style={{ marginTop: "20px" }}>
                <IconButton
                  onClick={() =>
                    window.open("https://github.com/filipaflora", "_blank")
                  }
                >
                  <GitHubIcon sx={{ fontSize: "3.5rem" }}></GitHubIcon>
                </IconButton>
                <IconButton
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/filipaflora/",
                      "_blank"
                    )
                  }
                >
                  <LinkedInIcon sx={{ fontSize: "3.5rem" }}></LinkedInIcon>
                </IconButton>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Contacts;
