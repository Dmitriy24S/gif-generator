import React, { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState("");
  const [link, setLink] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=${process.env.REACT_APP_WEATHER_API_KEY}&s=${word}`
      );
      const data = await response.json();
      setLink(data.data.images.original.url);
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setWord(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const loader = <div className="loader"></div>;
  let image = <img src={link} alt={word} />;

  return (
    <div className="App ">
      <h1 className="m-4">Gif Generator</h1>
      <form onSubmit={submit} className="col-6 mx-auto px-5 input-group">
        <input
          type="text"
          className="form-control "
          onChange={handleChange}
          value={word}
          placeholder="cats"
        />
        <div className="input-group-append">
          <button className="btn btn-primary " type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-center m-4">
        {loading ? loader : image}
      </div>
    </div>
  );
}

export default App;
