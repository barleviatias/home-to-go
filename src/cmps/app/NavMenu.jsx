import { Link } from 'react-router-dom';


export function NavMenu({ logout }) {

        let sessionUser = sessionStorage.getItem('loggedinUser');
        sessionUser = JSON.parse(sessionUser);

        return (<section className="user-menu">{!sessionUser && <div>
                <div>
                        <Link to="/login">log in</Link>
                        <Link to="/login">sign up</Link>
                </div>
                <div>
                        <Link to="/host">Host your home</Link>
                        <Link to="/about">about</Link>
                        <Link to="/help">help</Link>
                        <Link to="/explore">explore</Link>

                </div>
        </div>}
                {sessionUser && <div>
                        <Link to="/msg">Messages</Link>
                        <Link to="/notif">Notifications</Link>
                        <Link to="/trips">Trips</Link>
                        <Link to="/whis">Whis list</Link>
                        <Link to="/host">Host your home</Link>
                        <Link to="/user">account</Link>
                        <Link to="/help">help</Link>
                        <button onClick={() => { logout() }} ><Link to="/">logout</Link></button>
                </div>}
        </section>)
}