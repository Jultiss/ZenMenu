import { NavLink } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span className="nav-icon">📅</span>
        <span className="nav-label">Plan</span>
      </NavLink>
      
      <NavLink to="/recherche" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span className="nav-icon">🔍</span>
        <span className="nav-label">Recherche</span>
      </NavLink>
      
      <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span className="nav-icon">🛒</span>
        <span className="nav-label">Courses</span>
      </NavLink>
    </nav>
  );
}
