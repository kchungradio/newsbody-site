import React, { useState, useEffect } from 'react'

import StoriesList from '../components/stories-list'
import Page from '../components/hoc/page'
import ErrorBoundary from '../components/error-boundary'
import { findStories } from '../lib/strapi-query'

function StoriesPage({
  openStory,
  isPlaying,
  playingStory,
  onStoryClick,
  onStoryPlayClick
}) {
  const [stories, setStories] = useState([])

  const findAndSetStories = async () => {
    let response = await findStories()
    setStories(response)
  }

  useEffect(() => {
    findAndSetStories()
  }, [])

  return (
    <ErrorBoundary>
      <StoriesList
        stories={stories}
        openStory={openStory}
        isPlaying={isPlaying}
        playingStory={playingStory}
        onStoryClick={onStoryClick}
        onStoryPlayClick={onStoryPlayClick}
      />
    </ErrorBoundary>
  )
}

export default Page(StoriesPage)
