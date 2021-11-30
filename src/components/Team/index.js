import sanya1 from '../../assets/images/sanya1.jpg'
import sanya2 from '../../assets/images/sanya2.jpg'
import sanya3 from '../../assets/images/sanya3.jpg'

function Team() {
  return (
    <section className="teamSec common secPad text-center" id="team">
      <div className="container">
        <h1>Team</h1>
        <div className="row">
          <div className="col-md-4">
            <figure><img src={sanya1} alt="no sanya1" /></figure>
            <h3>Sanya the Succubus 1</h3>
          </div>
          <div className="col-md-4">
            <a href="skype:live:.cid.276a5580aca4209b?chat" target="_blank">
              <figure><img src={sanya2} alt="no sanya2" /></figure>
              <h3>@Blockchain Master</h3>
            </a>
          </div>
          <div className="col-md-4">
            <figure><img src={sanya3} alt="no sanya3" /></figure>
            <h3>Sanya the Succubus 3</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team