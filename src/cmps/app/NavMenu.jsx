import { Link } from 'react-router-dom';


export function NavMenu({ logout, toggleUserMenu, loggedInUser, modalPosition }) {

        return (<section className="user-menu" style={{ top: modalPosition.y + 40, left: modalPosition.x }} onClick={toggleUserMenu}>{!loggedInUser && <div>
                <div>
                        <Link to="/login">log in</Link>
                        {/* <Link to="/login">sign up</Link> */}
                </div>
                <div>
                        <Link to="/host">Host your home</Link>
                        <Link to="/about">about</Link>
                        <Link to="/help">help</Link>
                </div>
        </div>}
                {loggedInUser && <div>
                        <div>
                                <Link to="/msg">Messages</Link>
                                <Link to="/notif">Notifications</Link>
                                <Link to="/orders">Orders</Link>
                                <Link to="/wishlist">wish list</Link>
                                {loggedInUser.isHost && <Link to={`/host/${loggedInUser._id}`}>Dashboard</Link>}
                                {!loggedInUser.isHost && <Link to="/host">Host your home</Link>}
                        </div>
                        <div>
                                <Link to="/user">account</Link>
                                <Link to="/help">help</Link>
                                <Link to="/"> <button onClick={() => { logout() }}>logout</button> </Link>
                        </div>
                </div>}
        </section>)
}
