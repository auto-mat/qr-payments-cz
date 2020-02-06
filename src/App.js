import React from 'react';
import './App.css';
var QRCode = require('qrcode.react');

const qs = require('query-string');
const qparams = qs.parse(window.location.search);

const downloadQR = () => {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "payment-qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: qparams["msg"] || "AUTOMAT KLUB PRATEL",
            iban: qparams["iban"] || "CZ8620100000002400063333",
            vs: qparams["vs"] || 0,
            amount: qparams["amount"] || 500,
        }
    }

    render() {
        return (
           <div>
             <QRCode
                 id="qr-code"
                 value={this.getQRCode()}
                 size={290}
                 level={"H"}
                 includeMargin={true}
             />
             <br/>
             <button onClick={downloadQR}> Stáhnout QR kód </button>
            <br/>
            <br/>
           <form>
           <table className="table">
           <tbody>
            <tr>
            <td>
            <label>Zpráva</label>
            </td>
            <td>
            <input
              id="msg-input"
              className="wide-input"
              onChange={this.handleMsg}
              value={this.state.msg}
            />
            </td>
            </tr>
            <tr>
            <td>
            <label>IBAN</label>
            </td>
            <td>
            <input
             id="iban-input"
             className="wide-input"
             onChange={this.handleIban}
             value={this.state.iban}
            />
            </td>
            </tr>
            <tr>
            <td>
            <label>Častka</label>
            </td>
            <td>
            <input
             id="amount-input"
             type="number"
             onChange={this.handleAmount}
             value={this.state.amount}
            />
            </td>
            </tr>
            <tr>
            <td>
            <label>VS</label>
            </td>
            <td>
            <input
             id="vs-input"
             type="number"
             onChange={this.handleVs}
             value={this.state.vs}
            />
            </td>
            </tr>
            </tbody>
            </table>
           </form>
          </div>
        )
    }

    handleMsg = e => {
        this.setState({ msg: e.target.value });
    }

    handleVs = e => {
        this.setState({ vs: e.target.value });
    }

    handleIban = e => {
        this.setState({ iban: e.target.value });
    }

    handleAmount = e => {
        this.setState({ amount: e.target.value });
    }

    getQRCode() {
        return "SPD*1.0*ACC:"+ this.state.iban + "*AM:" + this.state.amount + ".00*CC:CZK*MSG:" + this.state.msg + "*FRQ:1M*X-VS:" + this.state.vs + "*"
    }
}

function App() {
  return (
    <div className="App">
      <p>
          Zadejte částka a VS: QR kód vytvoří trvalý přikaz s intervalem každý měsíc
      </p>
      <PaymentForm/>
      <br/>
      ~~~
      <p>
      Implementuje<br/> "Standard ČBA –Formát pro sdílení platebních údajů v rámci tuzemského platebního styku v CZK prostřednictvím QR kódů" <br/> <a href="https://cbaonline.cz/upload/538-qr-kody-2015.pdf">Verze 1.1–srpen 2015</a>
      </p>
      <br/>
      ~~~
      <p>
      <a href="https://github.com/auto-mat/qr-payments-cz">Zdroják</a>
      </p>
      <p>
      Copyright © 2020 <a href="https://auto-mat.cz/">Auto*mat z.s.</a> License <a href="https://www.gnu.org/licenses/agpl-3.0.txt">AGPLv3.0 or later</a>
      </p>
    </div>
  );
}

export default App;
