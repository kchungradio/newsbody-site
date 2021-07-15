import { Component } from 'react'

import Global from '../global'
import Header from '../header'

const wrapWithLayout = Page =>
  class WrapWithLayout extends Component {
    static getInitialProps(ctx) {
      return Page.getInitialProps ? Page.getInitialProps(ctx) : {}
    }

    render() {
      return (
        <div className="background">
          <Global />

          <div className="layout">
            <Header />
            <Page {...this.props} />
          </div>

          <style jsx>{`
            .background {
              margin-bottom: 85px;
            }
            .layout {
              padding: 20px 40px;
            }
          `}</style>
        </div>
      )
    }
  }

export default wrapWithLayout
