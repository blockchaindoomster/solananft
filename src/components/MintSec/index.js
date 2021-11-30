import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import mintNFT from "../../utils/nft"

function MintSec() {
  const wallet = useWallet()
  const connection = useConnection()
  const mint = async() => {
    if(wallet.connected) {
      try {
        await mintNFT(connection.connection, wallet)
      } catch(error) {
        console.log(error)
      }
    }
  }
  return (
    <section className="mintSec common secPad" id="mintsanya">
      <div className="container">
        <h1 className="text-center">Mint Sanya with the Button Below</h1>
        <p className="text-center"><a href="#" className="btn btn-primary btn-lg" onClick={mint}>Mint Now</a></p>
        <ul className="row minlist padT5">
        <li className="col-lg-5 ml-auto"><strong>First 1000</strong> – Mint Price 1.95 SOL (900 given away)</li>
        <li className="col-lg-5 mr-auto"><strong>1001 to 2000</strong> – Mint Price 2.45 SOL (1000 given away)</li>
        <li className="col-lg-5 ml-auto"><strong>2001 to 3000</strong> – Mint Price 3.1 SOL (1500 given away)</li>
        <li className="col-lg-5 mr-auto"><strong>3001 to 4000</strong> – Mint Price 3.9 SOL (1900 given away)</li>
        <li className="col-lg-5 ml-auto"><strong>4001 to 5000</strong> – Mint Price 4.85 SOL (2300 given away)</li>
        <li className="col-lg-5 mr-auto"><strong>5001 to 6000</strong> – Mint Price 6 SOL (3000 given away)</li>
        <li className="col-lg-5 ml-auto"><strong>6001 to 7000</strong> – Mint Price 6.9 SOL (3500 given away)</li>
        <li className="col-lg-5 mr-auto"><strong>7001 to 8000</strong> – Mint Price 7.9 SOL (4500 given away)</li>
        <li className="col-lg-5 ml-auto"><strong>8001 to 9000</strong> – Mint Price 9 SOL (5000 given away)</li>
        <li className="col-lg-5 mr-auto"><strong>9001 to 9999</strong> – Mint Price 10 SOL (8000 given away)</li>
        </ul>
      </div>
    </section>
  )
}

export default MintSec