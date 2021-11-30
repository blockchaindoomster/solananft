import logo from '../../assets/images/logo.png'
import discordicon from '../../assets/images/discord-icon.png'

function Footer() {
  return (
    <footer id="connect">
      <div className="container">
        <div className="row">
          <div className="col-md-5"> <img src={logo} alt="no logo" />
            <div className="copyright padT5">Copyright &copy; 2021 SANAYA THE SUCCUBUS.</div>
          </div>
          <div className="col-md-7 mr-0 ml-auto">
            <div className="social"> <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a> <a href="#"><img src={discordicon} alt="no discord" style={{marginTop:'-5px'}} /></a> </div>
            <div className="footer-link"> <a href="#">Interface (Token) Contract</a> <a href="#">Implementation Contract</a> </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer