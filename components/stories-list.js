import Story from '../components/story'

export default function StoriesList({ stories, onStoryClick }) {
  if (!stories || !stories.length) return <div>No stories here...</div>

  return stories.map(story => (
    <Story key={story.id} story={story} onClick={onStoryClick} />
  ))
}
