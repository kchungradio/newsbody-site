import { Component } from 'react'
import ReactPlayer from 'react-player'

import Duration from './duration'
import config from '../../config'

const { primary, secondary } = config.colors

export default class Player extends Component {
  state = {
    playedPercent: 0,
    playedSeconds: 0,
    duration: 0
  }

  onProgress = ({ played: playedPercent, playedSeconds }) => {
    // only update time slider if not currently seeking
    if (!this.state.seeking) {
      this.setState({ playedPercent, playedSeconds })
    }
  }
  onSeekMouseDown = () => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ playedPercent: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  render() {
    const {
      audioUrl,
      title,
      isPlaying,
      setPlayState,
      togglePlayPause
    } = this.props
    const { playedPercent, playedSeconds, duration } = this.state

    return (
      <div className="player">
        <ReactPlayer
          ref={player => {
            this.player = player
          }}
          className="react-player"
          width="0"
          height="0"
          url={audioUrl}
          playing={isPlaying}
          onPlay={() => setPlayState(true)}
          onPause={() => setPlayState(false)}
          onEnded={() => setPlayState(false)}
          onError={e => console.log('onError', e)}
          onProgress={this.onProgress}
          onDuration={duration => this.setState({ duration })}
          config={{ file: { forceAudio: true } }}
          progressInterval={1000}
        />

        <img
          className="play-button"
          src={`/${isPlaying ? 'pause' : 'play'}.svg`}
          onClick={togglePlayPause}
        />

        <div className="stack">
          <div className="title">
            <span>{title}</span>
          </div>
          <Duration seconds={playedSeconds} />
          /
          <Duration seconds={duration} />
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={playedPercent}
            onMouseDown={this.onSeekMouseDown}
            onChange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
          />
        </div>

        {/* input[type=range] css generated with
          http://danielstern.ca/range.css */}
        <style jsx>{`
          .player {
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: ${secondary};
          }
          img {
            width: 55px;
            cursor: pointer;
            margin: 0 15px;
          }
          .stack {
            width: 100%;
            margin-right: 15px;
          }

          input[type='range'] {
            -webkit-appearance: none;
            width: 100%;
            margin: 11.5px 0;
            padding: 12px 0;
            background: ${secondary};
          }
          input[type='range']:focus {
            outline: none;
          }
          input[type='range']::-webkit-slider-runnable-track {
            width: 100%;
            height: 2px;
            cursor: pointer;
            background: ${primary};
            border: 0px solid ${secondary};
          }
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 2px;
            height: 25px;
            margin-top: -11.5px;
            cursor: pointer;
            background: ${primary};
          }
          input[type='range']:focus::-webkit-slider-runnable-track {
            background: ${primary};
          }
          input[type='range']::-moz-range-track {
            width: 100%;
            height: 2px;
            cursor: pointer;
            background: ${primary};
            border: 0px solid ${secondary};
          }
          input[type='range']::-moz-range-thumb {
            width: 2px;
            height: 25px;
            cursor: pointer;
            background: ${primary};
            border: 0px solid ${primary};
          }
          input[type='range']::-ms-track {
            width: 100%;
            height: 2px;
            cursor: pointer;
            background: transparent;
            border-color: transparent;
            color: transparent;
          }
          input[type='range']::-ms-fill-lower {
            background: ${primary};
            border: 0px solid ${secondary};
          }
          input[type='range']::-ms-fill-upper {
            background: ${primary};
            border: 0px solid ${secondary};
          }
          input[type='range']::-ms-thumb {
            width: 2px;
            height: 25px;
            cursor: pointer;
            background: ${primary};
            border: 0px solid ${primary};
          }
          input[type='range']:focus::-ms-fill-lower {
            background: ${primary};
          }
          input[type='range']:focus::-ms-fill-upper {
            background: ${primary};
          }
        `}</style>
      </div>
    )
  }
}
