import "./footer.css";

const Footer = () => {
  const Technologies = [
    "CSS",
    "Express",
    "HTML",
    "Node",
    "PostgreSQL",
    "React",
    "Redux",
    "Sequelize",
  ];

  return (
    <div className="splash-footer">
      {Technologies.map((ele) => {
        return <div key={ele}>{ele}</div>;
      })}
      <a class="ara-github" href="https://github.com/arasargsyan0622">
        <img
          className="socials-btn"
          src="/images/github.png"
          alt="github"
        />
      </a>
      <a
        class="ara-linkedin"
        href="https://www.linkedin.com/in/ara-sargsyan-9a8a07237"
      >
        <img
          className="socials-btn"
          src="/images/linkedin.png"
          alt="linkedin"
        />
      </a>
    </div>
  );
};

export default Footer;
