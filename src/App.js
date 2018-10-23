import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import PriceGraph from "./PriceGraph";

const data = {
  labels: ["$0/yr", "$25k/yr", "$50k/yr", "$100k/yr", "$1M/yr"],
  datasets: [
    {
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)"
    }
  ]
};

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
      25 * perMonth,
      25 * perMonth,
      25 * perMonth,
      25 * perMonth
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
      </div>
    );
  }
}

export default App;
