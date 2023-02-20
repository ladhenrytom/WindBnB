import Apartment from "./Apartment";
// import stays from "./../stays";

function Main(props) {
  return (
    <main className="main">
      <div className="main-header">
        <h1 className="main-title">Stays in Finland</h1>
        <h6 className="number-of-stays">12+ stays</h6>
      </div>
      <div className="apartment-row-container">
        {props.display.map((el, index) => {
          return (
            <Apartment
              key={index + 1}
              apartmentImg={el.photo}
              superHost={el.superHost}
              type={el.type}
              beds={el.beds}
              rating={el.rating}
              title={el.title}
            />
          );
        })}
      </div>
    </main>
  );
}

export default Main;
