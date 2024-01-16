import Logo from "../img/Netflix_Logo.png";

const Header = () => {
  return (
    <div>
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-40">
      <img className="w-44" src={Logo} alt="logo" />
    </div>
    </div>
  );
};

export default Header;
