import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const anthLinks = (<ul>
    <li><Link to='/profiles'>Developers</Link></li>
    <li><Link to='/posts'>Posts</Link></li>
    <li><Link to='/dashboard'>
    <i className='fas fa-user'></i>{' '} <span className="hide-sm">
    Dashboard </span></Link></li>

    <li><a href="#!" onClick={logout}><i className='fas fa-sign-out-alt'></i>{' '} <span className="hide-sm">Logout</span></a></li>

  </ul>);
  const guestLinks = (<ul>
    <li><Link to='/profiles'>Developers</Link></li>
   <li><Link to='/register'>Register</Link></li>
    <li><Link to='/login'>Login</Link></li>
  </ul>);
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
        </h1>
       { !loading && isAuthenticated ? anthLinks : guestLinks}
      </nav>

    </div>
  )
}
export default connect((state) => {
  return { auth: state.auth }
}, { logout })(Navbar);
