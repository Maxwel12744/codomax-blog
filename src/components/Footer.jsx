import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div>
        <Link to="/" className="brand">
          Global<span>Space</span>
        </Link>
        <p>Technology, Innovation and Ideas.</p>
      </div>
      <p>© 2026 Odhiambo Maxwel. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
