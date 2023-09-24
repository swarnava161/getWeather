import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import "./Home.css";
const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);
  const [backgroundImage, setBackgroundImage] = useState(null);

  // useEffect(() => {
  //   // This will run when the weatherData changes
  //   if (weatherData) {
  //     const weatherDescription = weatherData.weather[0].description;
  //     setBackgroundImage(getWeatherBackgroundImage(weatherDescription));
  //   }
  // }, [weatherData]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/weather?city=${searchValue}`
      );

      setWeatherData(response.data);

      setLoading(false);
      setBackgroundImage(
        getWeatherBackgroundImage(response.data.weather[0].description)
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getWeatherBackgroundImage = (description) => {
    switch (description) {
      case "clear sky":
        return "https://tse3.mm.bing.net/th?id=OIP.6SHvNIwgNa9DAmUOV36b5QHaEo&pid=Api&P=0&h=180";
      case "few clouds":
      case "scattered clouds":
        return "https://tse4.mm.bing.net/th?id=OIP.6wR-l2SZf1giu7DUpe0MqAHaE6&pid=Api&P=0&h=180";
      case "broken clouds":
        return "https://tse1.mm.bing.net/th?id=OIP.1dLvFOgQtMDcPehQLdBg2AHaE6&pid=Api&P=0&h=180";
      case "overcast clouds":
        return "https://tse3.mm.bing.net/th?id=OIP.AGW-P1Z49Fm2cjVnWcd4ZgHaEK&pid=Api&P=0&h=180";
      case "light rain":
        return "https://tse1.mm.bing.net/th?id=OIP.mjAizYm_jiguVHWCQwDfgQHaEK&pid=Api&P=0&h=180";
      case "moderate rain":
      case "heavy intensity rain":
        return "https://tse4.mm.bing.net/th?id=OIP.WaNvE9XfkVCTHC0oeFT7SgHaEK&pid=Api&P=0&h=180";
      case "haze":
        return "https://tse1.mm.bing.net/th?id=OIP.kF7zeGA4wlSSlQpg8UfEQAHaE8&pid=Api&P=0&h=180";
      default:
        return "https://tse4.mm.bing.net/th?id=OIP.pMtiwNyw0UG43KAwnHoLQAHaEo&pid=Api&P=0&h=180";
    }
  };
  const convertToCelsius = (temperature) => {
    return (temperature - 273.15).toFixed(1);
  };

  let tempColor; // Default color: ice blue

  if (weatherData) {
    const tempValue = convertToCelsius(weatherData.main.temp);
    const tempValueAsNumber = parseFloat(tempValue);

    // Set the color based on the temperature value
    if (tempValueAsNumber > 50) {
      tempColor = "linear-gradient(to right, red, orange)"; // Linear gradient from red to orange
    } else if (tempValueAsNumber > 40 && tempValueAsNumber < 50) {
      tempColor = "linear-gradient(to right, red, orange, #fffe0c)"; // Linear gradient from red to orange to yellow
    } else if (tempValueAsNumber > 25 && tempValueAsNumber < 40) {
      tempColor = "linear-gradient(to right, red, #fffe0c)"; // Linear gradient from orange to yellow
    } else if (tempValueAsNumber > 10 && tempValueAsNumber < 25) {
      tempColor = "linear-gradient(to right, #fffe0c, white)"; // Linear gradient from yellow to white
    } else if (tempValueAsNumber > 0 && tempValueAsNumber < 10) {
      tempColor = "linear-gradient(to right, #5fd6ef, white)"; // Linear gradient from #5fd6ef to white
    } else {
      tempColor = "linear-gradient(to right, #5fd6ef, blue)"; // Linear gradient from #5fd6ef to blue
    }
  }

  const temperatureStyle = {
    backgroundImage: tempColor,
    backgroundSize: "100% 100%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            backgroundImage && isAuthenticated
              ? `url(${backgroundImage})`
              : 'url("https://tse2.mm.bing.net/th?id=OIP.jLEy27pBuaqtlPL7M4Y1pgAAAA&pid=Api&P=0&h=180")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div
          className="container d-flex justify-content-center flex-column "
          style={{ minHeight: "100vh" }}
        >
          <form onSubmit={handleSearch} className="mb-3">
            <div className="input-group">
              <input
                type="search"
                className="form-control p-2 f-5 "
                placeholder="Enter city name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="submit" className="btn btn-dark">
                <FaSearch />
              </button>
            </div>
          </form>

          {weatherData ? (
            <div
              className="card border border-white "
              style={{
                background: "transparent",
                backgroundColor: "rgba(0,0,0,0.8)",
              }}
            >
              <div
                className="card-body border border-white"
                style={{ background: "transparent" }}
              >
                {!isAuthenticated ? (
                  <div className="text-white">
                    <h2 className="card-title text-center ">
                      {weatherData.name}
                    </h2>

                    <div className="text-center p-2 ">
                      <p className="card-text">
                        <span className="fw-bold fs-5">Temperature:</span>{" "}
                        {convertToCelsius(weatherData.main.temp)}°C
                      </p>
                      {/* Additional weather information */}
                    </div>

                    <div className="card-text text-center p-2">
                      <span>
                        <Link to="/login">Login</Link>
                      </span>{" "}
                      to view complete information
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="card border border-white"
                      style={{ background: "transparent" }}
                    >
                      <div
                        className="card-body border text-white"
                        style={{
                          background: "transparent",
                          position: "relative",
                        }}
                      >
                        <>
                          <h2 className="card-title text-center name ">
                            {weatherData.name}
                          </h2>

                          {/* Weather Info with Icons */}
                          <div className="weather-info ">
                            <div className="temp-info text-center ">
                              <div className="d-flex justify-content-center align-items-center ">
                                <div className="px-4 d-flex flex-column align-items-center justify-content-between ">
                                  <span>MIN. Temp:</span>
                                  <span className="min fw-bold">
                                    {convertToCelsius(
                                      weatherData.main.temp_min
                                    )}
                                    °C
                                  </span>
                                </div>
                                <span
                                  className="temp fw-bold "
                                  style={temperatureStyle}
                                >
                                  {convertToCelsius(weatherData.main.temp)}°C
                                </span>
                                <div className="px-4 d-flex flex-column align-items-center justify-content-between ">
                                  <span>MAX. Temp:</span>
                                  <span className="max fw-bold">
                                    {convertToCelsius(
                                      weatherData.main.temp_max
                                    )}
                                    °C
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              className="humidity-info d-flex flex-column justify-content-between align-items-center  "
                              style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                              }}
                            >
                              <span className="fs-">Humidity </span>
                              <span className="humidity-animation">
                                {" "}
                                {weatherData.main.humidity}%{" "}
                                <span>
                                  <WiHumidity />
                                </span>
                              </span>
                            </div>
                            <div
                              className="wind-info d-flex flex-column justify-content-between align-items-center"
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                              }}
                            >
                              <span className="fs- ">Wind Speed</span>
                              <span>
                                {weatherData.wind.speed} km/h{" "}
                                <WiStrongWind className="icon-animation " />
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="text-center pt-5 d-flex flex-column justify-content-between align-items-center">
                            <div className="description py-2">
                              <span className="fs-4 ">
                                {weatherData.weather[0].description}
                              </span>
                            </div>

                            {/* Feels Like */}
                            <div className="feels-like p-1">
                              <span>
                                <p>
                                  (Feels Like:{" "}
                                  {convertToCelsius(
                                    weatherData.main.feels_like
                                  )}
                                  °C)
                                </p>
                              </span>
                            </div>
                            <div></div>
                          </div>
                        </>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div
              className="container my-3 fs-3 text-center fw-bold text-white py-5  border border-white rounded-2"
              style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            >
              <span
                style={{
                  backgroundImage: "linear-gradient(to right, red, orange)",
                  backgroundSize: "100% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "2px 2px 4px rgba(555, 555, 555, 0.3)",
                }}
              >
                {" "}
                No weather data available
              </span>
            </div>
          )}

          {/* Add conditional rendering for the background image */}
          {/* {weatherData && weatherData.current.condition.text.includes('rain') && (
        <div className="rain-gif">Rain GIF or Background Image</div>
      )} */}
        </div>
      </div>
    </>
  );
};

export default Home;
