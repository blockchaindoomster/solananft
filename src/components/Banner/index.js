import hero from '../../assets/images/hero-mobile.jpg'

function Banner() {
  return (
    <section className="hero" id="home">
      <div className="showmobile">
        <img src={hero} alt="no Hero" />
      </div>
    </section>
  )
}

export default Banner;