import { Component } from 'react'
import request from 'axios'

import { Router } from '../routes'
import Page from '../components/hoc/page'
import Story from '../components/story'
import config from '../config'

class NewsBody extends Component {
  static async getInitialProps ({ query }) {
    // query.authorSlug comes from url defined in ../routes.js
    const { authorSlug } = query

    // set request parameters based on query
    let options = {}
    if (authorSlug) options.params = { authorSlug }

    // get stories from api
    const res = await request.get(config.api.storiesUrl, options)

    // sort by date descending
    const stories = res.data.slice().sort((a, b) =>
      new Date(b.publishedAt) - new Date(a.publishedAt)
    )

    return { authorSlug, stories }
  }

  render () {
    const {
      session,
      authorSlug,
      stories,
      onStoryPlayClick
    } = this.props

    const isHome = !authorSlug
    const isUsersPage = session && (authorSlug === session.slug)
    const noStories = stories && stories.length === 0

    return (
      <div>

        {session && (isHome || isUsersPage) && (
          <div>
            <button onClick={() => Router.pushRoute('new-story')}>
              New Story
            </button>
            <button onClick={() => Router.pushRoute('edit-profile')}>
              Edit Profile
            </button>
          </div>
        )}

        <div>
          {noStories && <p>No stories here...</p>}
          {stories.map(story => (
            <Story
              key={`${story.authorId}_${story.createdAt}`}
              story={story}
              isUsersStory={session && session.id === story.authorId}
              onPlayClick={onStoryPlayClick}
            />
          ))}
        </div>

        <style jsx>{`
          button {
            margin: 0 10px 10px 0;
          }
        `}</style>

      </div>
    )
  }
}

export default Page(NewsBody)