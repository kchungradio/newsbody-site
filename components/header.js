import Link from 'next/link'

const Header = () => (
  <div className="header">
    <h1>
      <Link href="/">
        <a>
          <img src="/newsbody_flat_black.png" alt="KCHUNG News Body" />
        </a>
      </Link>
    </h1>

    <nav>
      {'*  '}
      <Link href="/">
        <a>Stories</a>
      </Link>
      <span> | </span>
      <Link href="/participate">
        <a>Participate</a>
      </Link>
      <span> | </span>
      <Link href="/about">
        <a>About</a>
      </Link>
      {'  *'}
    </nav>
    <hr />

    <style jsx>{`
      .header {
        top: 0px;
        position: sticky;
        background: rgb(239, 123, 126);
        padding-top: 20px;
        margin-top: -20px;
      }
      img {
        width: 100%;
      }
      nav {
        padding-top: 5px;
        font-size: 22px;
      }
      hr {
        margin-left: -2px;
      }
    `}</style>
  </div>
)

export default Header
