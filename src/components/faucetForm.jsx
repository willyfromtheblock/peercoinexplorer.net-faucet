import HCaptcha from "@hcaptcha/react-hcaptcha";
import React, { Component } from "react";

class FaucetForm extends Component {
  constructor(props) {
    super(props);
    this.recaptchaRef = React.createRef();
  }

  state = {
    data: "",
    disabled: true,
  };

  handleSubmit = (e) => {
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

  onVerifyCaptcha = (token) => {
    console.log(token);
  };

  render() {
    const { data, disabled } = this.state;
    return (
      <React.Fragment>
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            <h4>Payout address:</h4>
            <input
              type="input"
              className="form-control form-control-md"
              name="addressInput"
              style={{ marginTop: "15px" }}
              placeholder="Enter testnet address"
              value={data["addressInput"] || ""}
              onChange={(e) => this.handleChange(e)}
            />
            <small className="form-text text-muted">
              Current Payout is <b>10</b> Testnet PPC.
            </small>
          </div>
        </div>
        <div
          className="row"
          style={{ display: "inline-block", margin: "15px" }}
        >
          <HCaptcha
            sitekey="9883ec3c-45e5-4fa7-9861-e85cfb1afdb5"
            onVerify={(e) => this.props.raiseCaptcha(e)}
          />
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <button
              disabled={disabled}
              className={this.renderButtonClass()}
              onClick={(e) => this.handleSubmit(e)}
              style={{ margin: "10px" }}
            >
              Request
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FaucetForm;
