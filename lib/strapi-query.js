import axios from 'axios'
import config from '../config'

const { api } = config

export const findStories = async () => {
  const storiesUrl = api.baseUrl + api.endpoints.stories
  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const getStoriesByChannel = async author => {
  const storiesUrl = api.baseUrl + api.endpoints.stories + '?author=' + author
  const stories = await axios.get(storiesUrl)
  return stories.data
}

export const getStoryBySlug = async slug => {
  const storiesUrl = api.baseUrl + api.endpoints.stories + '?slug=' + slug
  const story = await axios.get(storiesUrl)
  return story.data[0]
}
