import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/esm/Navbar";
import './NavBar.css'
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar expand="lg" className="navbar-class bg-body-tertiary" >
      <Container>
        <Navbar.Brand  
            as={NavLink}
            to="/"> 
            SillMap
        </Navbar.Brand>
        <Navbar.Toggle />
       
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-between w-100">
                <Nav.Link as={NavLink} to="/graph">Граф навыков</Nav.Link>
                <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;