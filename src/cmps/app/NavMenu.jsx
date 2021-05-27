import { Link } from 'react-router-dom';
export function NavMenu() {
	let sessionUser = sessionStorage.getItem('loggedinUser');
	sessionUser = JSON.parse(sessionUser);
	return <section className="nav-menu">{!sessionUser && <div>
        <Link to="/login">login</Link>
        <Link to="/login">signup</Link>
        <Link to="/host">Host your home</Link>
        <Link to="/about">about</Link>
        </div>}
	{sessionUser && <div>
        <Link to="/msg">Messages</Link>
        <Link to="/notif">Notifications</Link>
        <Link to="/trips">Trips</Link>
        <Link to="/whis">Whis list</Link>
        </div>}
        </section>;
}
