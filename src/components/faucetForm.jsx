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

    if (!data["addressInput"] || data["addressInput"].length === 0) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

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
        <div className="row justify-content-md-center">
          <div className="col-md-5">
            <label>Payout address:</label>
            <br />
            <input
              type="input"
              className="form-control form-control-md"
              name="addressInput"
              placeholder="Enter testnet address"
              value={data["addressInput"] || ""}
              onChange={e => this.handleChange(e)}
            />
            <small className="form-text text-muted">
              Current Payout is <b>100</b> Testnet PPC.
            </small>
          </div>
        </div>
        <div
          className="row"
          style={{ display: "inline-block", margin: "20px" }}
        >
          <ReCAPTCHA
            ref={this.recaptchaRef}
            sitekey="6Ld2vZwUAAAAAImBK9viyesKx_sGDhQ0QbWFOJq6"
            onChange={e => this.props.raiseCaptcha(e)}
            size="compact"
          />
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-5">
            <button
              disabled={disabled}
              className={this.renderButtonClass()}
              onClick={e => this.handleSubmit(e)}
              style={{ margin: "10px" }}
            >
              Request
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FaucetForm;
