import logo from "./../logo.svg";
import searchIconOrange from "./../search-orange.svg";
import searchIconWhite from "./../search-white.svg";
import locationIcon from "./../location-icon.svg";
import { useState, useEffect } from "react";
import stays from "./../stays";
import closeIcon from "./../close-icon.svg";

function Header(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [city, setCity] = useState("");
  const [guestsAdult, setGuestsAdult] = useState(0);
  const [guestsChildren, setGuestsChildren] = useState(0);
  const [guestsTotal, setGuestsTotal] = useState("");

  function handleNavExpansion(e) {
    if (e.target.classList.contains("shown-text")) {
      setIsExpanded(true);
      // e.target.parentElement.nextSibling.classList.remove("hidden");
    }
    if (
      e.target.parentElement.classList.contains("nav-item-placeholders") &&
      e.target.classList.contains("shown-text")
    ) {
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("nav-item-expand-active");
      });
      e.target.parentElement.parentElement.classList.add(
        "nav-item-expand-active"
      );
    }
    if (e.target.classList.contains("nav-overlay")) {
      setIsExpanded(false);
      closeErrorMsg();
    } else if (
      e.target.classList.contains("search-box") &&
      document.querySelector(".error-msg").classList.contains("hidden")
    ) {
      setIsExpanded(false);
    }
    if (e.target.classList.contains("search-container-icon")) {
      setIsExpanded(true);
    }
  }

  useEffect(() => {
    isExpanded ? expandNav() : collapseNav();
  });

  useEffect(() => {
    setGuestsTotal((guestsAdult + guestsChildren).toString());
  }, [guestsAdult, guestsChildren]);

  function expandNav() {
    document
      .querySelector(".nav-items-container")
      .classList.add("nav-items-container-expand");
    document.querySelector(".nav-items").classList.add("nav-items-expand");
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.add("nav-item-expand");
    });
    document.querySelectorAll(".hidden-text").forEach((text) => {
      text.classList.remove("hidden");
    });
    document.querySelectorAll(".suggestions").forEach((suggestion) => {
      suggestion.classList.remove("hidden");
    });

    document.querySelector(".search-container-icon").classList.add("hidden");
    document.querySelector(".nav-overlay").classList.remove("hidden");
  }
  function collapseNav() {
    document
      .querySelector(".nav-items-container")
      .classList.remove("nav-items-container-expand");
    document.querySelector(".nav-items").classList.remove("nav-items-expand");
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("nav-item-expand");
    });
    document.querySelectorAll(".hidden-text").forEach((text) => {
      text.classList.add("hidden");
    });
    document.querySelectorAll(".suggestions").forEach((suggestion) => {
      suggestion.classList.add("hidden");
    });
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("nav-item-expand-active");
    });

    document.querySelector(".search-container-icon").classList.remove("hidden");
    document.querySelector(".nav-overlay").classList.add("hidden");
  }

  function handleCity(e) {
    if (e.target.id) {
      setCity(e.target.innerHTML);
    }
  }

  function handleChange(e) {
    if (e.target.classList.contains("location-text")) {
      setCity(e.target.value);
    }
    if (e.target.classList.contains("guest-text")) {
      if (+e.target.value && +e.target.value > 0) {
        setGuestsTotal(+e.target.value);
      } else {
        return;
      }
    }
  }

  function handleTotalGuests(e) {
    if (e.target.classList.contains("guests-suggestion-control")) {
      if (e.target.classList.contains("minus")) {
        e.target.classList.contains("adult")
          ? decreaseGuestsAdult()
          : decreaseGuestsChildren();
      }
      if (e.target.classList.contains("plus")) {
        e.target.classList.contains("adult")
          ? increaseGuestsAdult()
          : increaseGuestsChildren();
      }
    }
  }

  function increaseGuestsAdult() {
    setGuestsAdult((prev) => prev + 1);
  }
  function decreaseGuestsAdult() {
    setGuestsAdult((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  }
  function increaseGuestsChildren() {
    setGuestsChildren((prev) => prev + 1);
  }
  function decreaseGuestsChildren() {
    setGuestsChildren((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  }

  function appendStayLength(x) {
    document.querySelector(".number-of-stays").innerHTML =
      x + `${x > 0 ? "+ stays" : " stays"}`;
  }

  function staysDisplayed(e) {
    if (
      e.target.classList.contains("search-box-icon") ||
      e.target.classList.contains("search-box-text")
    ) {
      setIsExpanded(false);
    }
    let x = [];
    if (city.toLowerCase().includes("helsinki")) {
      if (+guestsTotal > 0) {
        x = stays.filter(
          (el) => el.city === "Helsinki" && el.maxGuests >= guestsTotal
        );
      } else {
        x = stays.filter((el) => el.city === "Helsinki");
      }
      appendStayLength(x.length);
      props.setDisplay(x);
    } else if (city.toLowerCase().includes("turku")) {
      if (+guestsTotal > 0) {
        x = stays.filter(
          (el) => el.city === "Turku" && el.maxGuests >= guestsTotal
        );
      } else {
        x = stays.filter((el) => el.city === "Turku");
      }
      appendStayLength(x.length);
      props.setDisplay(x);
    } else if (city.toLowerCase().includes("oulu")) {
      if (+guestsTotal > 0) {
        x = stays.filter(
          (el) => el.city === "Oulu" && el.maxGuests >= guestsTotal
        );
      } else {
        x = stays.filter((el) => el.city === "Oulu");
      }
      appendStayLength(x.length);
      props.setDisplay(x);
    } else if (city.toLowerCase().includes("vaasa")) {
      if (+guestsTotal > 0) {
        x = stays.filter(
          (el) => el.city === "Vaasa" && el.maxGuests >= guestsTotal
        );
      } else {
        x = stays.filter((el) => el.city === "Vaasa");
      }
      appendStayLength(x.length);
      props.setDisplay(x);
    } else if (+guestsTotal) {
      x = stays.filter((el) => el.maxGuests >= guestsTotal);
      appendStayLength(x.length);
      props.setDisplay(x);
    } else if (
      (city && !city.toLowerCase().includes("vaasa")) ||
      (city && !city.toLowerCase().includes("helsinki")) ||
      (city && !city.toLowerCase().includes("turku")) ||
      (city && !city.toLowerCase().includes("oulu"))
    ) {
      openErrorMsg();
    }
  }
  function openErrorMsg() {
    document.querySelector(".error-msg").classList.remove("hidden");
    document.querySelector(".nav-overlay").classList.remove("hidden");
  }
  function closeErrorMsg() {
    document.querySelector(".error-msg").classList.add("hidden");
  }

  return (
    <nav className="nav">
      <div className="nav-brand">
        <img alt="" src={logo} />
      </div>
      <div className="nav-items-container" onClick={handleNavExpansion}>
        <div className="nav-items">
          <div className="nav-item  location-container">
            <div className="nav-item-placeholders">
              <h6 className="hidden-text hidden">LOCATION</h6>
              <input
                className="shown-text location-text"
                placeholder="Add a location"
                value={city}
                name="city"
                onChange={handleChange}
              />
            </div>
            <div
              className=" suggestions location-suggestion-container hidden"
              onClick={handleCity}
            >
              <div className="location-suggestion-item">
                <img
                  alt=""
                  src={locationIcon}
                  className="location-suggestion-icon"
                />
                <h6 className="location-suggestion-text" id="Helsinki">
                  Helsinki, Finland
                </h6>
              </div>
              <div className="location-suggestion-item">
                <img
                  alt=""
                  src={locationIcon}
                  className="location-suggestion-icon"
                />
                <h6 className="location-suggestion-text" id="Turku">
                  Turku, Finland
                </h6>
              </div>
              <div className="location-suggestion-item">
                <img
                  alt=""
                  src={locationIcon}
                  className="location-suggestion-icon"
                />
                <h6 className="location-suggestion-text" id="Oulu">
                  Oulu, Finland
                </h6>
              </div>
              <div className="location-suggestion-item">
                <img
                  alt=""
                  src={locationIcon}
                  className="location-suggestion-icon"
                />
                <h6 className="location-suggestion-text" id="Vaasa">
                  Vaasa, Finland
                </h6>
              </div>
            </div>
          </div>
          <div className="nav-item  guests-container">
            <div className="nav-item-placeholders">
              <h6 className="hidden-text hidden">GUESTS</h6>
              <input
                className="shown-text guest-text"
                placeholder="Add guests"
                value={
                  +guestsTotal
                    ? +guestsTotal === 0 && !isFinite(guestsTotal)
                      ? ""
                      : guestsTotal +
                        `${+guestsTotal > 1 ? " guests" : " guest"}`
                    : ""
                }
                name="guestsTotal"
                onChange={handleChange}
              />
            </div>
            <div
              className="suggestions guests-suggestion-container hidden"
              onClick={handleTotalGuests}
            >
              <div className="guests-suggestion-item">
                <h6 className="guests-suggestion-header">Adults</h6>
                <h6 className="guests-suggestion-content">Ages 13 or above</h6>
                <div className="guests-suggestion-control-container">
                  <div className="guests-suggestion-control minus adult">-</div>
                  <div className="guests-suggestion-entry">{guestsAdult}</div>
                  <div className="guests-suggestion-control plus adult">+</div>
                </div>
              </div>
              <div className="guests-suggestion-item">
                <h6 className="guests-suggestion-header">Children</h6>
                <h6 className="guests-suggestion-content">Ages 2 - 12</h6>
                <div className="guests-suggestion-control-container">
                  <div className="guests-suggestion-control minus children">
                    -
                  </div>
                  <div className="guests-suggestion-entry">
                    {guestsChildren}
                  </div>
                  <div className="guests-suggestion-control plus children">
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-item  search-container">
            <div className="nav-item-placeholders" onClick={handleNavExpansion}>
              <img
                alt=""
                className="search-container-icon"
                src={searchIconOrange}
              />
            </div>
            <div
              className="hidden-text search-box hidden"
              onClick={staysDisplayed}
            >
              <img alt="" className="search-box-icon" src={searchIconWhite} />
              <h6 className="search-box-text">Search</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-overlay hidden" onClick={handleNavExpansion}></div>
      <div className="error-msg hidden" onClick={handleNavExpansion}>
        <span className="error-close" onClick={closeErrorMsg}>
          <img alt="" src={closeIcon} />
        </span>
        <div className="oops">Oops!</div>
        <p className="error-txt">
          Location not found. Try readjusting search parameters
        </p>
      </div>
    </nav>
  );
}

export default Header;
