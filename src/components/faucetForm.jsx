import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";

class FaucetForm extends Component {
  constructor(props) {
    super(props);
    this.recaptchaRef = React.createRef();
  }

  state = {
    data: "",
    disabled: true
  };

  handleSubmit = e => {
    e.preventDefault();
    this.recaptchaRef.current.reset();
    this.props.raiseSubmit(this.state.data["addressInput"]);
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data }, () => this.validate());
  };

  validate = () => {
    const { data } = this.state;

    if(!data["addressInput"] || data["addressInput"].length === 0) {
      this.setState({disabled: true})
    } else {
      this.setState({disabled: false})
    }
  }

  renderButtonClass = () => {
    const { success } = this.props;
    if (success === true) {
      return "btn btn-success";
    } else if (success === false) {
      return "btn btn-danger";
    }
    return "btn btn-primary";
  };

  render() {
    const { data, disabled } = this.state;
    return (
      <div>
        <div className="form-group">
        <label>Payout address:</label><br/>
          <input
            type="input"
            className="form-control-md"
            name="addressInput"
            placeholder="Enter testnet address"
            value={data["addressInput"] || ""}
            onChange={e => this.handleChange(e)}
          />
          <small className="form-text text-muted">
            Current Payout is <b>100</b> Testnet PPC.
          </small>
        </div>
        <div style={{ display: "inline-block" }}>
          <ReCAPTCHA
            ref={this.recaptchaRef}
            sitekey="6LcxrpwUAAAAABFB6T__3nwyZcTMqJLEbwa7EaH8"
            size="compact"
            badge="inline"
            onChange={e => this.props.raiseCaptcha(e)}
          />
          <button
          disabled={disabled}
            className={this.renderButtonClass()}
            onClick={e => this.handleSubmit(e)}
            style={{ marginTop: "5px" }}
          >
            Request
          </button>
        </div>
      </div>
    );
  }
}

export default FaucetForm;
