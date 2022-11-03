import "./App.css";

const api = {
  base: "https://api.open-meteo.com/v1/forecast",
};

function App() {
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
          ></input>
        </div>
      </main>
    </div>
  );
}

export default App;
