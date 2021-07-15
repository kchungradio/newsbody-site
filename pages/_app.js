import React from 'react'
import App from 'next/app'
import Router from 'next/router'

function KchungNewsApp({ Component, pageProps }) {
  const handleStoryClick = story => {
    Router.push('/story/[story]', `/story/${story.slug}`)
  }

  return (
    <>
      <Component {...pageProps} onStoryClick={handleStoryClick} />
    </>
  )
}

KchungNewsApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default KchungNewsApp
