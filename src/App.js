import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import PriceGraph from "./PriceGraph";

const data = {
  labels: ["🔧: $0/yr", "🔨: $25k/yr", "🔩: $50k/yr", "⚙️: $100k/yr"],
  datasets: [
    {
      label: "$",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)"
    }
  ]
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inspectionsPerMonth: 100,
      data: this.getUpdatedGraphData(100),
      editFormulas: false,
      pricingModelAYearlyBase: 0,
      pricingModelAIncludedMonthly: 0,
      pricingModelAPerExtra: 25,
      pricingModelBYearlyBase: 25000,
      pricingModelBIncludedMonthly: 1000,
      pricingModelBPerExtra: 15,
      pricingModelCYearlyBase: 50000,
      pricingModelCIncludedMonthly: 10000,
      pricingModelCPerExtra: 10,
      pricingModelDYearlyBase: 100000,
      pricingModelDIncludedMonthly: 100000,
      pricingModelDPerExtra: 1
    };
  }

  pricingModelAYearlyBaseChanged = e => {
    this.setState({
      pricingModelAYearlyBase: parseInt(e.target.value)
    });
  };

  pricingModelAIncludedMonthlyChanged = e => {
    this.setState({
      pricingModelAIncludedMonthly: parseInt(e.target.value)
    });
  };

  pricingModelAPerExtraChanged = e => {
    this.setState({
      pricingModelAPerExtra: parseInt(e.target.value)
    });
  };

  pricingModelBYearlyBaseChanged = e => {
    this.setState({
      pricingModelBYearlyBase: parseInt(e.target.value)
    });
  };

  pricingModelBIncludedMonthlyChanged = e => {
    this.setState({
      pricingModelBIncludedMonthly: parseInt(e.target.value)
    });
  };

  pricingModelBPerExtraChanged = e => {
    this.setState({
      pricingModelBPerExtra: parseInt(e.target.value)
    });
  };

  pricingModelCYearlyBaseChanged = e => {
    this.setState({
      pricingModelCYearlyBase: parseInt(e.target.value)
    });
  };

  pricingModelCIncludedMonthlyChanged = e => {
    this.setState({
      pricingModelCIncludedMonthly: parseInt(e.target.value)
    });
  };

  pricingModelCPerExtraChanged = e => {
    this.setState({
      pricingModelCPerExtra: parseInt(e.target.value)
    });
  };

  pricingModelDYearlyBaseChanged = e => {
    this.setState({
      pricingModelDYearlyBase: parseInt(e.target.value)
    });
  };

  pricingModelDIncludedMonthlyChanged = e => {
    this.setState({
      pricingModelDIncludedMonthly: parseInt(e.target.value)
    });
  };

  pricingModelDPerExtraChanged = e => {
    this.setState({
      pricingModelDPerExtra: parseInt(e.target.value)
    });
  };

  toggleEditFormulas = () => {
    this.setState({ editFormulas: !this.state.editFormulas });
  };

  perMonthChanged = e => {
    const newData = this.getUpdatedGraphData(e.target.value);

    this.setState({
      inspectionsPerMonth: e.target.value,
      data: newData
    });
  };

  getUpdatedGraphData = perMonth => {
    debugger;
    if (this.state) {
      const {
        pricingModelAYearlyBase,
        pricingModelAIncludedMonthly,
        pricingModelAPerExtra,
        pricingModelBYearlyBase,
        pricingModelBIncludedMonthly,
        pricingModelBPerExtra,
        pricingModelCYearlyBase,
        pricingModelCIncludedMonthly,
        pricingModelCPerExtra,
        pricingModelDYearlyBase,
        pricingModelDIncludedMonthly,
        pricingModelDPerExtra
      } = this.state;

      return [
        pricingModelAYearlyBase / 12 +
          (perMonth >= pricingModelAIncludedMonthly
            ? (perMonth - pricingModelAIncludedMonthly) * pricingModelAPerExtra
            : 0),
        pricingModelBYearlyBase / 12 +
          (perMonth >= pricingModelBIncludedMonthly
            ? (perMonth - pricingModelBIncludedMonthly) * pricingModelBPerExtra
            : 0),
        pricingModelCYearlyBase / 12 +
          (perMonth >= pricingModelCIncludedMonthly
            ? (perMonth - pricingModelCIncludedMonthly) * pricingModelCPerExtra
            : 0),
        pricingModelDYearlyBase / 12 +
          (perMonth >= pricingModelDIncludedMonthly
            ? (perMonth - pricingModelDIncludedMonthly) * pricingModelDPerExtra
            : 0)
      ];
    } else {
      return [
        25 * perMonth,
        25000 / 12 + (perMonth >= 1000 ? (perMonth - 1000) * 15 : 0),
        50000 / 12 + (perMonth >= 10000 ? (perMonth - 10000) * 10 : 0),
        100000 / 12 + (perMonth >= 100000 ? (perMonth - 100000) * 1 : 0)
      ];
    }
  };

  render() {
    let dataToRender = data;
    dataToRender.datasets[0].data = this.state.data;

    return (
      <div className="App">
        <PriceGraph data={dataToRender} />
        <input
          type="number"
          onChange={this.perMonthChanged}
          value={this.state.inspectionsPerMonth}
        />
        {this.state.inspectionsPerMonth &&
          this.state.inspectionsPerMonth > 0 && (
            <table style={{ margin: "auto" }}>
              <tr>
                <th>Pricing Model</th>
                <th>Price (Month)</th>
                <th>Price Per Crossing</th>
              </tr>
              <tr>
                <td>🔧</td>
                <td>{formatter.format(this.state.data[0])}</td>
                <td>
                  {formatter.format(
                    this.state.data[0] / this.state.inspectionsPerMonth
                  )}
                </td>
              </tr>
              <tr>
                <td>🔨</td>
                <td>{formatter.format(this.state.data[1])}</td>
                <td>
                  {formatter.format(
                    this.state.data[1] / this.state.inspectionsPerMonth
                  )}
                </td>
              </tr>
              <tr>
                <td>🔩</td>
                <td>{formatter.format(this.state.data[2])}</td>
                <td>
                  {formatter.format(
                    this.state.data[2] / this.state.inspectionsPerMonth
                  )}
                </td>
              </tr>
              <tr>
                <td>⚙️</td>
                <td>{formatter.format(this.state.data[3])}</td>
                <td>
                  {formatter.format(
                    this.state.data[3] / this.state.inspectionsPerMonth
                  )}
                </td>
              </tr>
            </table>
          )}
        <button onClick={this.toggleEditFormulas}>Edit Formulas</button>
        {this.state.editFormulas && (
          <table style={{ margin: "auto" }}>
            <tr>
              <th>Pricing Model</th>
              <th>Base Yearly</th>
              <th>Included Monthly</th>
              <th>Price per extra</th>
            </tr>
            <tr>
              <td>🔧</td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelAYearlyBaseChanged}
                  value={this.state.pricingModelAYearlyBase}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelAIncludedMonthlyChanged}
                  value={this.state.pricingModelAIncludedMonthly}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelAPerExtraChanged}
                  value={this.state.pricingModelAPerExtra}
                />
              </td>
            </tr>
            <tr>
              <td>🔨</td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelBYearlyBaseChanged}
                  value={this.state.pricingModelBYearlyBase}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelBIncludedMonthlyChanged}
                  value={this.state.pricingModelBIncludedMonthly}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelBPerExtraChanged}
                  value={this.state.pricingModelBPerExtra}
                />
              </td>
            </tr>
            <tr>
              <td>🔩</td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelCYearlyBaseChanged}
                  value={this.state.pricingModelCYearlyBase}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelCIncludedMonthlyChanged}
                  value={this.state.pricingModelCIncludedMonthly}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelCPerExtraChanged}
                  value={this.state.pricingModelCPerExtra}
                />
              </td>
            </tr>
            <tr>
              <td>⚙️</td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelDYearlyBaseChanged}
                  value={this.state.pricingModelDYearlyBase}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelDIncludedMonthlyChanged}
                  value={this.state.pricingModelDIncludedMonthly}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={this.pricingModelDPerExtraChanged}
                  value={this.state.pricingModelDPerExtra}
                />
              </td>
            </tr>
          </table>
        )}
      </div>
    );
  }
}

export default App;
