import './App.scss';
import React, { useState, useEffect } from 'react';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const DrumPad = (props) => {
  const [padStyle, changePadStyle] = useState({ style: 'inactive' });

  const playSound = () => {
    if (props.power) {
      const sound = document.getElementById(props.keyTrigger);
      sound.currentTime = 0;
      const soundPromise = sound.play();
      if (soundPromise !== undefined) {
        soundPromise.then(_ => { }).catch(err => { console.info(err) });
      }
    }
    props.updateDisplay(props.clipId.replace(/-/g, ' '));
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === props.keyCode) {
      changePadStyle({ style: props.power ? 'active' : 'active-shutdown' });
      playSound();
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === props.keyCode) {
      changePadStyle({ style: 'inactive' })
    }
  }

  const handleMouseDown = (e) => {
    changePadStyle({ style: props.power ? 'active' : 'active-shutdown' });
    playSound();
  }

  const handleMouseUp = (e) => {
    changePadStyle({ style: 'inactive' });
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.power])

  const className = `drum-pad ${padStyle.style}`
  return (
    <div
      className={className}
      id={props.clipId}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <audio
        className='clip'
        id={props.keyTrigger}
        src={props.clip}
      />
      {props.keyTrigger}
    </div>
  );
}

const PadBank = (props) => {
  const padBank = props.currentPadBank.map((currentPad, index) => {
    return (
      <DrumPad
        power={props.power}
        clip={currentPad.url}
        clipId={currentPad.id}
        keyCode={currentPad.keyCode}
        keyTrigger={currentPad.keyTrigger}
        updateDisplay={props.updateDisplay}
        key={index}
      />
    );
  });

  return <div className='pad-bank'>{padBank}</div>;
}

const App = (props) => {
  const [state, changeState] = useState({
    power: true,
    display: String.fromCharCode(160),
    currentPadBank: bankOne,
    currentPadBankId: 'Heater Kit',
    sliderVal: 0.3
  })

  const powerControl = () => {
    changeState(prevState => ({
      ...prevState,
      power: !state.power,
      display: String.fromCharCode(160)
    }))
    console.log("Power Control: ", state.power)
  }

  const selectBank = () => {
    if (state.power) {
      if (state.currentPadBankId === 'Heater Kit') {
        changeState(prevState => ({
          ...prevState,
          currentPadBank: bankTwo,
          display: 'Smooth Piano Kit',
          currentPadBankId: 'Smooth Piano Kit'
        }));
      } else {
        changeState(prevState => ({
          ...prevState,
          currentPadBank: bankOne,
          display: 'Heater Kit',
          currentPadBankId: 'Heater Kit'
        }));
      }
    }
  }

  const displayClipName = (name) => {
    if (state.power) {
      changeState(prevState => ({
        ...prevState,
        display: name
      }));
    }
  }

  const adjustVolume = (e) => {
    if (state.power) {
      changeState(prevState => ({
        ...prevState,
        sliderVal: e.target.value,
        display: 'Volume: ' + Math.round(e.target.value * 100)
      }));
      setTimeout(() => clearDisplay(), 1000);
    }
  }

  const clearDisplay = () => {
    changeState(prevState => ({
      ...prevState,
      display: ""
    }));
  }

  const powerSlider = state.power
    ? {
      float: 'right'
    }
    : {
      float: 'left'
    };
  const bankSlider =
    state.currentPadBank === bankOne
      ? {
        float: 'left'
      }
      : {
        float: 'right'
      };
  {
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = state.sliderVal;
    });
  }

  return (
    <div className='inner-container' id='drum-machine'>
      <PadBank
        clipVolume={state.sliderVal}
        currentPadBank={state.currentPadBank}
        power={state.power}
        updateDisplay={displayClipName}
      />

      <div className='logo'>
        <div className='inner-logo '>{'FCC' + String.fromCharCode(160)}</div>
        <i className='inner-logo fa fa-free-code-camp' />
      </div>

      <div className='controls-container'>
        <div className='control'>
          <p>Power</p>
          <div className='select' onClick={powerControl}>
            <div className='inner' style={powerSlider} />
          </div>
        </div>
        <p id='display'>{state.display}</p>
        <div className='volume-slider'>
          <input
            max='1'
            min='0'
            onChange={adjustVolume}
            step='0.01'
            type='range'
            value={state.sliderVal}
          />
        </div>
        <div className='control'>
          <p>Bank</p>
          <div className='select' onClick={selectBank}>
            <div className='inner' style={bankSlider} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
