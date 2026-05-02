function Header({ cartCount }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home">TrustCart</a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#engine">Engine</a>
        <a href="#products">Products</a>
        <a href="#details">Trust Review</a>
      </nav>
      <a className="cart-link" href="#products">Cart ({cartCount})</a>
    </header>
  );
}

export default Header;
