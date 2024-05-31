import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MyNavbar = () => {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="\">Wexo Film</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link to="/" className="nav-link">Home</Link>
                <NavDropdown title="Genres" id="basic-nav-dropdown">
                <NavDropdown.Item href="/genre">Genres</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/genre#variableidorname">Specific Genre</NavDropdown.Item>
                <NavDropdown.Item href="/genre#anotherone">Should be Dynamicly generated</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}
export default MyNavbar;