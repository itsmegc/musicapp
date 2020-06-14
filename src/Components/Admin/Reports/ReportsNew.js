import React, { Component } from "react";
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";
import {
  LineChart as LineChartGraph,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 20% 45%;
`;

function getMonthLocale(index) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return monthNames[index];
}

export default class ReportsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      props:this.props,
      subject:null,
      orders: []
    };
  }

  componentWillReceiveProps(props){
    this.setState({props, subject:props.subject})
  }

  componentDidMount() {
    fetch("http://18.221.47.207:3000/get_orders", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson =>
        this.setState({ orders: responseJson, loading: false }, () => console.log(this.state))
      );

  }

  getCountPerMonth() {

    if(this.state.subject != null){
    let countArray = [
      { month: "January", subjects: 0, tests: 0 },
      { month: "February", subjects: 0, tests: 0 },
      { month: "March", subjects: 0, tests: 0 },
      { month: "April", subjects: 0, tests: 0 },
      { month: "May", subjects: 0, tests: 0 },
      { month: "June", subjects: 0, tests: 0 },
      { month: "July", subjects: 0, tests: 0 },
      { month: "August", subjects: 0, tests: 0 },
      { month: "Spetember", subjects: 0, tests: 0 },
      { month: "October", subjects: 0, tests: 0 },
      { month: "November", subjects: 0, tests: 0 },
      { month: "December", subjects: 0, tests: 0 }
    ];

    this.state.orders.forEach(order => {
      let month = new Date(order.ts).getMonth();
      console.log(month);
      //getMonthLocale((new Date(order.ts)).getMonth())
      JSON.parse(order.items).forEach(item => {
        if(item.subject_name === this.state.subject){
          if (item.subject_included == 1) {
            countArray[month].subjects = countArray[month].subjects + 1
          }
          if (item.test_included == 1) {
            countArray[month].tests = countArray[month].tests + 1
  
          }
        }
      });
    });

    return countArray
  }
  else{

  }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="sweet-loading">
          <GridLoader
            css={override}
            sizeUnit={"px"}
            size={5}
            color={"#2fb2eb"}
            loading={this.state.loading}
          />
        </div>
      )
    }

    else {
      return (

        <div>
          <LineChartGraph
            width={500}
            height={300}
            data={this.getCountPerMonth()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="subjects"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="tests" stroke="#82ca9d" />
          </LineChartGraph>
        </div>
      );
    }

  }
}
