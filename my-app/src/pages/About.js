import React from "react";

const About = () => {

  const temperatureStyle = {
    backgroundImage: "linear-gradient(to right, red, orange)",
    backgroundSize: "100% 100%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "2px 2px 4px rgba(555, 555, 555, 0.3)",
  };
  return (
    <div className="container text-white  mt-2" style={{ minHeight:"100vh"}}>
      <div className="border border-white p-3 rounded-2" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
      <h1 className="mt-4 text-center fs-2 mb-3">About <span className="fs-1" style={temperatureStyle}>Get Weather</span> </h1>
      <p>
      Get Weather is a user-friendly and reliable application that provides accurate weather forecasts for locations worldwide. Stay informed about the current weather conditions, temperature, humidity, wind speed, and more, all at your fingertips.
      </p>
      <h2 className="mt-4" style={temperatureStyle}>Features</h2>
      <ul>
        <li>Real-time Weather Updates: Get up-to-date weather information with real-time updates.</li>
        <li>Search Functionality: Easily search for the weather forecast of any city or location.</li>
        <li>Responsive Design: Enjoy a seamless experience on any device, whether it's a desktop, tablet, or mobile.</li>
        <li>Intuitive User Interface: Navigate the app effortlessly with a user-friendly interface.</li>
        <li>Accurate Forecasting: Powered by reliable weather data sources, the app delivers accurate forecasts.</li>
      </ul>
      <h2 className="mt-4" style={temperatureStyle}>Technologies Used</h2>
      <p>
      Get Weather is built using modern web technologies, including:
        React for the frontend, allowing for efficient and interactive user interfaces.
        Axios for making HTTP requests to retrieve weather data from the backend server.
        Node.js and Express for the backend server, providing a robust and scalable infrastructure.
        OpenWeatherMap API to fetch weather data for different locations.
      </p>
      <h2 className="mt-4" style={temperatureStyle}>Contact Us</h2>
      <p>
        For any inquiries or feedback, please email us at <a href="mailto:info@myweatherapp.com">info@Get Weather.com</a>.
      </p>
      </div>
    </div>
  );
};

export default About;

