const NavbarCategory = ({ setSelectedCategory, category }) => {
  return (
    <li>
      <a onClick={() => setSelectedCategory(category)}>{category}</a>
    </li>
  );
};

export default NavbarCategory;
