import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas  from "react-bootstrap/Offcanvas";

const MyNavbar = () => {
    return (
        <>
        <style type="text/css">
          {`
          .bg-body-tertiary {
            background-color: #9cdbda !important;
          }
          .navbar-brand, .nav-link{
            color: #ea445a;
          }
          
          .offcanvas{
            color: #ea445a;
            background-color: #9cdbda;
          } 
          .dropdown-menu{
            background-color: #9cdbda;
          }
          .dropdown-item{
            color: #ea445a;
          }
          .dropdown-item:hover{
            background-color: #74f0ed;
          }
          `}
        </style>
            <Navbar sticky="top" expand='sm' className="bg-body-tertiary mb-3">
              <Container fluid>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
                <Navbar.Brand href="#">XOFI</Navbar.Brand>
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-sm`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                  placement="start"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                      XOFI
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="flex-grow-1 pe-3">
                    <Link to="/" className="nav-link">Home</Link>
                <NavDropdown title="Genres" id="basic-nav-dropdown">
                <NavDropdown.Item href="/genre">Genres (Not Implemented Yet)</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/genre#variableidorname">Specific Genre</NavDropdown.Item>
                <NavDropdown.Item href="/genre#anotherone">Should be Dynamicly generated</NavDropdown.Item>
                </NavDropdown>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
        </>
      );
}
export default MyNavbar;