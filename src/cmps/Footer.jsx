import { Link } from "react-router-dom";
import {FooterLinks} from './app/FooterLinks'

export function Footer() {
    return (
        <footer className="full">

            <FooterLinks />

            <section className="footer-nav-container">
                <label >
                    © 2021 Home & Go, Inc
                <Link>About</Link>
                    <Link>Login</Link>
                    <Link>Become a host</Link>
                </label>
                <label>
                    <i class="fas fa-globe"></i>
                    <span>English (US)</span>
                    <span>$ US</span>
                    <div>
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                </label>
            </section>
        </footer>
    )
}