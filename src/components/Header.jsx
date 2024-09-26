import { Navbar, Nav, Container, NavLink } from 'react-bootstrap'
import routes from '../utils/routes'
export default function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="#home" className="text-primary">
          Filmvisarna
        </Navbar.Brand>
        <Navbar.Toggle className="text-primary" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-primary">
            {routes
              .filter((x) => x.menuLabel)
              .map(({ path, menuLabel }, i) => (
                <li className="nav-item">
                  <NavLink className="nav-link" href={path}>
                    {menuLabel}
                  </NavLink>
                </li>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
