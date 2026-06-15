import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">TP Laboratorio</NavLink>
      <div className="navbar__links">
        <NavLink to="/" end className="nav-link">Posts</NavLink>
        <NavLink to="/crear" className="nav-link">Crear</NavLink>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
