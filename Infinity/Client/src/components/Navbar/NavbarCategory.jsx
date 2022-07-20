const NavbarCategory = ({ setSelectedCategory, category }) => {
  return (
    <li>
      <a
        href="javascript:void(0)"
        onClick={() => setSelectedCategory(category)}
      >
        {category}
      </a>
    </li>
  );
};

export default NavbarCategory;
