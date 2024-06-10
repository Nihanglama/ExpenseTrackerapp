import smaran from "../assets/Images/Smaran.png";
import saksham from "../assets/Images/Saksham.png";
import subash from "../assets/Images/Subash.png";

import "../assets/Styles/developerteamcards.css";

const cardData = [
  {
    id: 1,
    image: smaran,
    fullName: "Smaran Sapkota",
    position: "Frontend Developer",
    github: "https://www.github.com/smaransapkota",
    linkedin: "https://www.github.com/smaransapkota",
  },
  {
    id: 2,
    image: saksham,
    fullName: "Saksham Kadayat",
    position: "Frontend Developer",
    github: "https://www.github.com/smaransapkota",
    linkedin: "https://www.github.com/smaransapkota",
  },
  {
    id: 3,
    image: subash,
    fullName: "Subash Tamang",
    position: "Backend Developer",
    github: "https://www.github.com/smaransapkota",
    linkedin: "https://www.github.com/smaransapkota",
  },
];
export default function Developerteamcards() {
  return (
    <div className="dev-cards globalFonts">
      <div className="dev-cards-responsive-wrapper">
        {cardData.map((card) => (
          // <div className="dev-lists" key={card.id}>
          <div className="card-wrapper" key={card.id}>
            <img src={card.image} alt="" />
            <h3>{card.fullName}</h3>
            <p>{card.position}</p>
            <a href={card.github}>
              <i className="fa-brands fa-github"></i>
            </a>
            <a href={card.linkedin}>
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
          // </div>
        ))}
      </div>
    </div>
  );
}
