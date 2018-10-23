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
      data: this.getUpdatedGraphData(100)
    };
  }

  perMonthChanged = e => {
    const newData = this.getUpdatedGraphData(e.target.value);

    this.setState({
      inspectionsPerMonth: e.target.value,
      data: newData
    });
  };

  getUpdatedGraphData = perMonth => {
    const newData = [
      25 * perMonth,
      25000 / 12 + (perMonth >= 1000 ? (perMonth - 1000) * 15 : 0),
      50000 / 12 + (perMonth >= 10000 ? (perMonth - 10000) * 10 : 0),
      100000 / 12 + (perMonth >= 100000 ? (perMonth - 100000) * 1 : 0)
    ];

    return newData;
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
      </div>
    );
  }
}

export default App;
