/* global fetch */

import React, { Component } from 'react'
import 'isomorphic-fetch'

import config from '../config'
import MainLayout from '../layouts/main'
import Header from '../components/header'
import RecentStories from '../components/recent-stories'
import Player from '../components/player'
import Info from '../components/player/info'

const liveStreamEpisode = {
  title: 'live stream',
  audio: {
    url: config.voscast.url
  }
}

export default class NewsBody extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hidePlayer: false,
      episodeForDetail: {},
      episodeForPlayer: liveStreamEpisode
    }

    this.playEpisode = this.playEpisode.bind(this)
    this.playLiveStream = this.playLiveStream.bind(this)
    this.getAudioUrl = this.getAudioUrl.bind(this)
  }

  static async getInitialProps () {
    const res = await fetch(config.db.api_url)
    const json = await res.json()
    const episodes = json.slice().sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
    return { episodes }
  }

  render () {
    return (
      <div>
        <MainLayout playLiveStream={this.playLiveStream}>
          <Header />
          <br />
          <RecentStories />
        </MainLayout>

        <Player
          hide={this.state.hidePlayer}
          url={this.getAudioUrl()}
        >
          <Info episode={this.state.episodeForPlayer} />
        </Player>
      </div>
    )
  }

  getAudioUrl () {
    if (this.state.episodeForPlayer.audio) {
      const audio = this.state.episodeForPlayer.audio
      if (audio.filename) return config.s3.root_url + audio.filename
      else return audio.url
    }
  }

  playLiveStream () {
    // TODO: join this fn with this.playEpisode
    this.setState({
      episodeForPlayer: liveStreamEpisode,
      hidePlayer: false
    })
  }

  playEpisode (event, episode) {
    // TODO: join this fn with this.playLiveStream
    event.stopPropagation()
    this.setState({
      episodeForPlayer: episode,
      hidePlayer: false
    })
  }
}
