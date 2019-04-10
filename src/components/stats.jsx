import React from "react";

const Stats = props => {
  const {
    balance,
    totalPayout,
    weeklyPayout,
    lastPayoutTime
  } = props.statsData;
  return (
    <React.Fragment>
      <h4>Stats</h4>
      <table className="table table-hover table-striped">
        <tbody>
          <tr>
            <td>
              <b>Coins available:</b>
            </td>
            <td>{Math.round(balance)} tPPC</td>
          </tr>
          <tr>
            <td>
              <b>Last payout:</b>
            </td>
            <td>{lastPayoutTime} UTC</td>
          </tr>
          <tr>
            <td>
              <b>Paid out last 7 days:</b>
            </td>
            <td>{weeklyPayout} tPPC</td>
          </tr>
          <tr>
            <td>
              <b>Paid out since launch:</b>
            </td>
            <td>{totalPayout} tPPC</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Stats;
