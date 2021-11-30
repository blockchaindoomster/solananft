import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import Logo from '../../assets/images/logo.png'
import { Wallet } from '../Connect'

function Header() {
  const [childwallet, setChildWallet] = useState()
  const wallet = useWallet()
  return (
    <header className="header fixed-top">
      <div className="container">
        <div className="row">
          <div className="logo">
            <a href="#home">
              <img src={Logo} alt="no logo" />
            </a>
          </div>
          <nav className="nav">
            <div className="navigation-menu"> <i className="fa fa-times" aria-hidden="true"></i>
              <ul>
                <li><a href="#story">Story</a></li>
                <li><a href="#roadmap">RoadMap</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#team">Team</a></li>
                <li className="active"><Wallet><a href="#">{ !wallet.connected ? "Connect" : wallet.publicKey.toBase58().slice(0, 7) + "..."}</a></Wallet></li>
              </ul>
            </div>
          </nav>
          <div className="menu-bar" id="smallmenu"><i className="fa fa-bars"></i></div>
        </div>
      </div>
    </header>
  )
}

export default Header;