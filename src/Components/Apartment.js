import starIcon from "./../star-icon.svg";

function Apartment(props) {
  return (
    <div className="apartment">
      <div className="apartment-img-container">
        <img className="apartment-img" alt="img" src={props.apartmentImg} />
      </div>
      <div className="apartment-info">
        <span className={`super-host ${!props.superHost && "hidden"}`}>{`${
          props.superHost ? "SUPER HOST" : ""
        }`}</span>
        <div className="available-rooms">
          <span className="apartment-type">{props.type}</span> {" · "}
          <span className="bed-num">{`${props.beds} ${
            props.beds > 1 ? "beds" : "bed"
          }`}</span>
        </div>
        <span className="apartment-rating">
          <img className="star-icon" alt="" src={starIcon} />
          <span className="rating-num">{props.rating}</span>
        </span>
      </div>
      <div className="apartment-title">{props.title}</div>
    </div>
  );
}

export default Apartment;
