import { Component } from 'react'
import Router from 'next/router'

import destroyToken from '../../lib/destroy-token'

/*
 * Causes page component to be redirected to `/auth/sign-in` if there is no
 * `this.props.session` available.
 */

const ensureSignedIn = Page => {
  return class EnsureSignedIn extends Component {
    static getInitialProps(ctx) {
      // If the page has a prop fetcher invoke it
      return Page.getInitialProps ? Page.getInitialProps(ctx) : {}
    }

    constructor(props) {
      super(props)

      // in the browser
      if (process.browser) {
        // if no session, sign in
        if (!props.session) {
          Router.push('/auth/sign-in')
        }

        // if expired, destroy token and sign in
        if (props.session && new Date().getTime() / 1000 > props.session.exp) {
          destroyToken()
          Router.push('/auth/sign-in')
        }
      }
    }

    componentDidUpdate() {
      // On the client redirect to the sign in page if the session
      // gets signed out in another tab
      if (process.browser && !this.props.session) {
        Router.push('/auth/sign-in')
      }
    }

    render() {
      if (this.props.session) {
        return (
          <div>
            <Page {...this.props} />
          </div>
        )
      } else {
        return null
      }
    }
  }
}

export default ensureSignedIn
