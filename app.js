const sounds = [
  {
    keys: "Q",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keys: "W",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keys: "E",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keys: "A",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keys: "S",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keys: "D",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keys: "Z",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keys: "X",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keys: "C",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function App() {
  return (
    <div id="drum-machine" className="container">
      <div id="display" className="display">
        <h1>X is Playing</h1>
        {sounds.map((item, idx) => (
          <Box text={item.keys} key={idx} audio={item.mp3} />
        ))}
      </div>
    </div>
  );
}

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }
  componentDidMount() {
    this.audio.current.addEventListener("ended", (e) => {
      const parent = e.target.parentNode;
      parent.classList.remove("active");
    });
  }
  playSound = () => {
    const id = this.audio.current.id;
    this.audio.current.play();
    const parent = this.audio.current.parentNode;
    parent.classList.add("active");
    const display = parent.parentNode;
    display.querySelector("h1").innerText = `${id} is Playing`;
  };

  render() {
    const { text, audio } = this.props;
    return (
      <div
        className="box drum-pad"
        onClick={this.playSound}
        id={`drum-${text}`}
      >
        {text}
        <audio src={audio} className="clip" id={text} ref={this.audio} />
      </div>
    );
  }
}

document.addEventListener("keydown", (e) => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    const parent = audio.parentNode;
    parent.classList.add("active");
    const display = parent.parentNode;
    display.querySelector("h1").innerText = `${id} is Playing`;
    audio.play();
  }
});

ReactDOM.render(<App />, document.getElementById("root"));
