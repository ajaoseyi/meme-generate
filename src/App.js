import React, {useEffect, useState} from "react"
import './App.css';
import Meme from "./meme";
import loader from "./asset/loader.json"
import Lottie from "react-lottie";
const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

function App() {
const [loading, setLoading] = useState(false);
const [secondScreen, setSecondScreen] = useState(false);
const [memes, setMemes] = useState([]);
const [memesScreen, setMemesScreen] = useState(true);
const [eventImage, setEventImage] = useState("");
const [topText, setTopText] = useState("");
const [bottomText, setBottomText] = useState("");
const [eventID, setEventID] = useState();
const [finalMeme, setFinalMeme] = useState("");
const [thirdScreen, setThirdScreen] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x=>x.json().then(response=>setMemes(response.data.memes)));
  }, []);
  console.log(memes)
  //const username=samadajjj
  //const password=Oluwaseyi2002
  if (loading) {
    setTimeout(() => {
      setLoading(false);
      setThirdScreen(true);
      
    }, 7000);
  }
  return (
    <div className="App">
      {loading && (
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />{" "}
         
        </div>
      )}
      {memesScreen && (
        <div>
          <h3>Meme Generator</h3>
          <div className="image">
            {memes.map((meme) => {
              return (
                <Meme
                  meme={meme}
                  onclick={() => {
                    setEventImage(meme.url);
                    setEventID(meme.id);
                    setSecondScreen(true);
                    setMemesScreen(false);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
      {secondScreen && (
        <div className="form">
          <div className="selected_image">
            <img src={eventImage} alt="" />
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true)
              setSecondScreen(false);
              // add logic to create meme from api
              const params = {
                template_id: eventID,
                text0: topText,
                text1: bottomText,
                username: "samadajjj",
                password: "Oluwaseyi2002",
              };
              const response = await fetch(
                `https://api.imgflip.com/caption_image${objectToQueryParam(
                  params
                )}`,
                { method: "POST" }
              );
              const json = await response.json();
              setFinalMeme(json.data.url);
              
              
            }}
          >
            <div className="input_field">
              <input
                type="text"
                placeholder="Top Text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
              />
            </div>
            <div className="input_field">
              <input
                type="text"
                placeholder="Bottom Text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
              />
            </div>

            <button type="submit" className="submit_button">Submit</button>
          </form>
        </div>
      )}
      {thirdScreen && (
        <div>
          <img src={finalMeme} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
