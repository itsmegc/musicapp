import React, { Component } from "react";
import SidebarPage from "../Sidebar/sidebarPage";
import { MDBTable, MDBIcon } from "mdbreact";
import AdminNavbar from "../Navbar/adminNavbar";
import "./reports.css";
import CanvasJSReact from "./canvasjs.react";
import { Pie } from "react-chartjs-2";
import { css } from "@emotion/core";
import Fade from 'react-reveal/Fade'
import GridLoader from "react-spinners/GridLoader";
import ReportsNew from "./ReportsNew";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 30% 45%;
`;

var dataPie = {
  labels: ["40%", "20%", "40%"],
  series: [40, 20, 40]
};
var legendPie = {
  names: ["Open", "Bounce", "Unsubscribe"],
  types: ["info", "danger", "warning"]
};
class Reports extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  constructor(props) {
    super(props);

    this.state = {
      header_data: [],
      child_data: [],
      modal_co: false,
      selected_menu: null,
      menu_id: false,
      delete_id: "",
      loading: true,
      new_name: "",
      url: "",
      add_modal: false,
      parent_id: 0,
      add_id: false,
      menu_data: [],
      selected: 0,
      solutionsList: [],
      productsList: [],
      categoryList: [],
      subCategoryList: [],
      arrayValue: [],
      arrayValue1: [],
      menu_page: [
        { name: "Pages" },
        { name: "Products" },
        { name: "Solutions" },
        { name: "Categories" },
        { name: "Sub-categories" }
      ],
      id: null,
      select_show: false,
      edit_modal: false,
      sub_id: null,
      sign_ups: [],
      total_orders: [],
      revenue: 0,
      queries: [],
      pie_data: [{ label: "Loading...", y: 0, id:0 }],
      exams: [],
      verticals: [],
      subjects: [],
      exams_pie: [{ label: "Loading...", y: 0 }],
      verticals_pie: [{ label: "Loading...", y: 0 }],
      exams_pie_selected: true,
      subject_pie_selected: false,
      all_exams_data: [],
      all_subjects_data: [],
      all_verticals_data: [],
      show_all_course: false,
      show_all_exam: false,
      show_all_vertical: false,
      showgraph: false
    };
  }



  componentWillMount() {
    this.getSignups();
    this.getQuery();
    this.getRevenue();
    this.getSubjects();
  }

  getRevenue = async () => {
    this.setState({
      // response: fetch("http://localhost:8000/get_lectures", {
      response: fetch("http://18.221.47.207:3000/get_revenue_report", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            revenue: responseJson
          });
        })
        .catch(error => {
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };


  getChartData(subjects_pie) {
    var top_subjects = [],
      count = 0,
      count2 = 0,
      count3 = 0,
      top_exams = [],
      top_verticals = [];
    for (var v = 0; v < this.state.subjects.length; v++) {
      for (var v1 = 0; v1 < subjects_pie.length; v1++) {
        if (subjects_pie[v1].label == this.state.subjects[v].subject_name) {
          top_subjects.push(this.state.subjects[v]);
        }
      }
      count++;
    }
    if (count == this.state.subjects.length) {
      for (var t1 = 0; t1 < top_subjects.length; t1++) {
        for (var t2 = 0; t2 < JSON.parse(top_subjects[t1].exams).length; t2++) {
          top_exams.push(JSON.parse(top_subjects[t1].exams)[t2]);
        }

        count2++;
      }
      if (count2 == top_subjects.length) {
        var exam_ids = this.count(top_exams, function (item) {
          return item.exam_name;
        });
        this.removeUndefinedExams(exam_ids);

        for (var t3 = 0; t3 < top_exams.length; t3++) {
          for (
            var t4 = 0;
            t4 < JSON.parse(top_exams[t3].verticals).length;
            t4++
          ) {
            top_verticals.push(JSON.parse(top_exams[t3].verticals)[t4]);
          }

          count3++;
        }
      }
      if (count3 == top_exams.length) {
        var vertical_ids = this.count(top_verticals, function (item) {
          return item.vertical_name;
        });
        this.removeUndefinedVerticals(vertical_ids);
      }
    }
  }

  removeUndefinedExams(data) {
    console.log(data);

    var graph2 = [];

    for (var key2 in data) {
      if (key2 != "undefined") {
        graph2.push({ label: key2, y: data[key2] });
      }
    }
    var all_exams_data = graph2;
    var sorted_graph = graph2
      .sort((a, b) => {
        return a.y - b.y;
      })
      .reverse();
    this.setState({
      exams_pie: sorted_graph.slice(0, 5),
      all_exams_data: all_exams_data,
      loading: false
    });
  }

  removeUndefinedVerticals(data) {
    console.log(data);

    var graph2 = [];

    for (var key2 in data) {
      if (key2 != "undefined") {
        graph2.push({ label: key2, y: data[key2] });
      }
    }
    var all_verticals_data = graph2;
    var sorted_graph = graph2
      .sort((a, b) => {
        return a.y - b.y;
      })
      .reverse();
    this.setState({
      verticals_pie: sorted_graph.slice(0, 5),
      all_verticals_data: all_verticals_data,
      loading: false
    });
  }


  removeUndefined(data) {
    console.log(data)
    var graph = [];
    
    for (var key in data) {
      if (key != "undefined") {
        graph.push({ label: key, y: data[key] });
      }
    }
    var all_subjects_data = graph;
    var sorted_graph = graph
      .sort((a, b) => {
        return a.y - b.y;
      })
      .reverse();

    this.setState(
      {
        pie_data: sorted_graph.slice(0, 5),
        all_subjects_data: all_subjects_data
      },
      () => this.getChartData(this.state.pie_data)
    );
  }


  getExams = async () => {
    this.setState({
      // response: fetch("http://localhost:8000/get_lectures", {
      response: fetch("http://18.221.47.207:3000/get_exams", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            exams: responseJson
          });
        })
        .catch(error => {
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };
  getSubjects = async () => {
    this.setState({
      // response: fetch("http://localhost:8000/get_lectures", {
      response: fetch("http://18.221.47.207:3000/get_subjects", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              subjects: responseJson
            },
            () => this.getOrders()
          );
        })
        .catch(error => {
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };
  getVerticals = async () => {
    this.setState({
      // response: fetch("http://localhost:8000/get_lectures", {
      response: fetch("https://www.vimasmiham.com/get_verticals", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            verticals: responseJson
          });
        })
        .catch(error => {
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };
  getSignups = async () => {
    this.setState({
      // response: fetch("http://localhost:8000/get_lectures", {
      response: fetch("http://18.221.47.207:3000/get_signup_report", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            sign_ups: responseJson
          });
        })
        .catch(error => {
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };
  count(ary, classifier) {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
      var p = classifier(item);
      counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;

      return counter;
    }, {});
  }

  getOrders = async () => {
    this.setState({
      // response: fetch("http://localhost:8000/get_lectures", {
      response: fetch("http://18.221.47.207:3000/get_order_report", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          var all_items = [],
            count = 0;
          for (var v = 0; v < responseJson.length; v++) {
            for (
              var v1 = 0;
              v1 < JSON.parse(responseJson[v].items).length;
              v1++
            ) {
              all_items.push(JSON.parse(responseJson[v].items)[v1]);
            }
            count++;
          }

          this.setState(
            {
              total_orders: responseJson
            },
            () => {
              if (count == responseJson.length) {
                var sub_ids = this.count(all_items, function (item) {
                  return item.subject_name
                });
                this.removeUndefined(sub_ids);
              }
            }
          );
        })
        .catch(error => {
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };
  getQuery = async () => {
    this.setState({
      // response: fetch("http://localhost:8000/get_lectures", {
      response: fetch("http://18.221.47.207:3000/get_contact_queries", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            queries: responseJson
          });
        })
        .catch(error => {
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };




  renderSelectExam() {
    if (this.state.subject_pie_selected) {
      return (
        <span
          className="select-exam"
          onClick={() =>
            this.setState({
              subject_pie_selected: false,
              exams_pie_selected: true
            })
          }
        >
          Exams
        </span>
      );
    }
  }
  renderAllCourses() {
    if (this.state.show_all_course) {
      return (
        <MDBTable
          striped
          bordered
          style={{ backgroundColor: "#F9F9F9", marginTop: 20 }}
        >
          <thead>
            <th style={{ paddingTop: 0, paddingBottom: 0 }}>
              <td
                className="report-td"
                style={{
                  border: "none",
                  paddingLeft: 0,
                  color: "#1761a0",
                  fontWeight: "bold"
                }}
              >
                Subject Name
              </td>
            </th>
            <th style={{ paddingTop: 0, paddingBottom: 0 }}>
              <td
                className="report-td"
                style={{
                  border: "none",
                  paddingLeft: 0,
                  color: "#1761a0",
                  fontWeight: "bold"
                }}
              >
                Number of purchase
              </td>
            </th>
          </thead>
          <tbody>
            {this.state.all_subjects_data.map((item, index) => {
              return (
                <tr>
                  <td className="report-td">{item.label}</td>
                  <td className="report-td">{item.y}</td>
                </tr>
              );
            })}
          </tbody>
        </MDBTable>
      );
    }
  }
  renderAllExams() {
    if (this.state.show_all_exam) {
      return (
        <MDBTable
          striped
          bordered
          style={{ backgroundColor: "#F9F9F9", marginTop: 20 }}
        >
          <thead>
            <th style={{ paddingTop: 0, paddingBottom: 0 }}>
              <td
                className="report-td"
                style={{
                  border: "none",
                  paddingLeft: 0,
                  color: "#1761a0",
                  fontWeight: "bold"
                }}
              >
                Exam Name
              </td>
            </th>
            <th style={{ paddingTop: 0, paddingBottom: 0 }}>
              <td
                className="report-td"
                style={{
                  border: "none",
                  paddingLeft: 0,
                  color: "#1761a0",
                  fontWeight: "bold"
                }}
              >
                Number of purchase
              </td>
            </th>
          </thead>
          <tbody>
            {this.state.all_exams_data.map((item, index) => {
              return (
                <tr>
                  <td className="report-td">{item.label}</td>
                  <td className="report-td">{item.y}</td>
                </tr>
              );
            })}
          </tbody>
        </MDBTable>
      );
    }
  }
  renderAllVerticals() {
    if (this.state.show_all_vertical) {
      return (
        <MDBTable
          striped
          bordered
          style={{ backgroundColor: "#F9F9F9", marginTop: 20 }}
        >
          <thead>
            <th style={{ paddingTop: 0, paddingBottom: 0 }}>
              <td
                className="report-td"
                style={{
                  border: "none",
                  paddingLeft: 0,
                  color: "#1761a0",
                  fontWeight: "bold"
                }}
              >
                Exam Name
              </td>
            </th>
            <th style={{ paddingTop: 0, paddingBottom: 0 }}>
              <td
                className="report-td"
                style={{
                  border: "none",
                  paddingLeft: 0,
                  color: "#1761a0",
                  fontWeight: "bold"
                }}
              >
                Number of purchase
              </td>
            </th>
          </thead>
          <tbody>
            {this.state.all_verticals_data.map((item, index) => {
              return (
                <tr>
                  <td className="report-td">{item.label}</td>
                  <td className="report-td">{item.y}</td>
                </tr>
              );
            })}
          </tbody>
        </MDBTable>
      );
    }
  }


  renderLinechart() {
    if (this.state.showgraph) {
      return (
        <Fade>
          <ReportsNew subject={this.state.selected_subject_info}/>
        </Fade>
      )
    }
    else return null
  }

  handleGraphClick(e) {
    this.setState({selected_subject_info:e[0]._chart.legend.legendItems[e[0]._index].text,showgraph:true})
  }
  handleGraphClickExams(e){
    this.setState({selected_exam_info:e[0]._chart.legend.legendItems[e[0]._index].text,showgraph:true})
  }
  renderViewALl() {
    if (this.state.show_all_course == false) {
      return (
        <p
          onClick={() => this.setState({ show_all_course: true })}
          className="view_all_report"
        >
          View All
        </p>
      );
    } else {
      return (
        <p
          onClick={() => this.setState({ show_all_course: false })}
          className="view_all_report"
        >
          Show Less
        </p>
      );
    }
  }
  renderViewALl2() {
    if (this.state.show_all_exam == false) {
      return (
        <p
          onClick={() => this.setState({ show_all_exam: true })}
          className="view_all_report"
        >
          View All
        </p>
      );
    } else {
      return (
        <p
          onClick={() => this.setState({ show_all_exam: false })}
          className="view_all_report"
        >
          Show Less
        </p>
      );
    }
  }
  renderViewALl3() {
    if (this.state.show_all_vertical == false) {
      return (
        <p
          onClick={() => this.setState({ show_all_vertical: true })}
          className="view_all_report"
        >
          View All
        </p>
      );
    } else {
      return (
        <p
          onClick={() => this.setState({ show_all_vertical: false })}
          className="view_all_report"
        >
          Show Less
        </p>
      );
    }
  }
  render() {
    console.log(
      this.state.all_exams_data,
      this.state.all_subjects_data,
      this.state.all_verticals_data
    );
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
      );
    } else {
      var exam_data = [],
        exam_label = [];
      for (var v = 0; v < this.state.exams_pie.length; v++) {
        exam_data.push(this.state.exams_pie[v].y);
        exam_label.push(this.state.exams_pie[v].label);
      }
      var subject_data = [],
        subject_label = [];
        console.log(this.state.pie_data)
      for (var v = 0; v < this.state.pie_data.length; v++) {
        subject_data.push(this.state.pie_data[v].y);
        subject_label.push(this.state.pie_data[v].label);
      }
      var vertical_data = [],
        vertical_label = [];
      for (var v = 0; v < this.state.verticals_pie.length; v++) {
        vertical_data.push(this.state.verticals_pie[v].y);
        vertical_label.push(this.state.verticals_pie[v].label);
      }
      var data = {
        labels: exam_label,
        onElementsClick: elems => console.log(elems),
        getElementsAtEvent: elems => console.log(elems),
        datasets: [
          {
            label: "",
            data: exam_data,
            backgroundColor: [
              "#C0504E",
              "#9BBB59",
              "#23BFAA",
              "#84A7D1",
              "#1761A0"
            ],
            borderColor: [
              "#C0504E",
              "#9BBB59",
              "#23BFAA",
              "#84A7D1",
              "#1761A0"
            ],
            borderWidth: 1
          }
        ]
      };
      var data2 = {
        labels: subject_label,
        onElementsClick: elems => console.log(elems),
        getElementsAtEvent: elems => console.log(elems),
        datasets: [
          {
            label: "",
            data: subject_data,
            backgroundColor: [
              "#C0504E",
              "#9BBB59",
              "#23BFAA",
              "#84A7D1",
              "#1761A0"
            ],
            borderColor: [
              "#C0504E",
              "#9BBB59",
              "#23BFAA",
              "#84A7D1",
              "#1761A0"
            ],
            borderWidth: 1
          }
        ]
      };
      var data3 = {
        labels: vertical_label,
        onElementsClick: elems => console.log(elems),
        getElementsAtEvent: elems => console.log(elems),
        datasets: [
          {
            label: "",
            data: vertical_data,
            backgroundColor: [
              "#C0504E",
              "#9BBB59",
              "#23BFAA",
              "#84A7D1",
              "#1761A0"
            ],
            borderColor: [
              "#C0504E",
              "#9BBB59",
              "#23BFAA",
              "#84A7D1",
              "#1761A0"
            ],
            borderWidth: 1
          }
        ]
      };
      const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: ""
        },
        data: [
          {
            type: "pie",
            click: () =>
              this.setState({
                subject_pie_selected: true,
                exams_pie_selected: false
              }),
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}",
            dataPoints: this.state.exams_pie_selected
              ? this.state.exams_pie
              : this.state.pie_data
          }
        ]
      };

      const options2 = {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: ""
        },
        axisY: {
          title: ""
        },
        data: [
          {
            type: "stepArea",
            xValueFormatString: "YYYY",
            dataPoints: [
              { x: new Date(2000, 0), y: 40 },
              { x: new Date(2001, 0), y: 62 },
              { x: new Date(2002, 0), y: 53 },
              { x: new Date(2003, 0), y: 49 },
              { x: new Date(2004, 0), y: 52 },
              { x: new Date(2005, 0), y: 32 },
              { x: new Date(2006, 0), y: 28 },
              { x: new Date(2007, 0), y: 46 },
              { x: new Date(2008, 0), y: 55 },
              { x: new Date(2009, 0), y: 88 },
              { x: new Date(2010, 0), y: 68 },
              { x: new Date(2011, 0), y: 63 },
              { x: new Date(2012, 0), y: 65 },
              { x: new Date(2013, 0), y: 68 },
              { x: new Date(2014, 0), y: 48 },
              { x: new Date(2015, 0), y: 39 },
              { x: new Date(2016, 0), y: 40 },
              { x: new Date(2017, 0), y: 46 }
            ]
          }
        ]
      };
      return (
        <div className="font-family wrapper">
          <AdminNavbar {...this.props} />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <SidebarPage {...this.props} />
            <div style={{ width: "100%", backgroundColor: "#F1F1F1" }}>
              <div style={{ padding: 15 }}>
                <h3 className="">Dashboard</h3>
                {/* <hr/> */}
              </div>

              <div className="rowDefault" style={{ flex: 4 }}>
                <div className="top-card ">
                  <div
                    className="rowDefault"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 10
                    }}
                  >
                    <MDBIcon
                      icon="user-plus"
                      size="3x"
                      style={{ color: "#FF9500", marginLeft: 15 }}
                    />
                    <div>
                      <p className="top-card-text" style={{ fontSize: 15 }}>
                        Sign Ups
                      </p>
                      <p
                        className="top-card-text"
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        {this.state.sign_ups.length}
                      </p>
                    </div>
                  </div>
                  <hr style={{ margin: 0 }} />
                  <p
                    style={{ textAlign: "end", marginTop: 5, color: "#afafaf" }}
                  >
                    <MDBIcon icon="calendar-alt" style={{ marginRight: 10 }} />
                    Till Date
                  </p>
                </div>

                <div className="top-card ">
                  <div
                    className="rowDefault"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 10
                    }}
                  >
                    <MDBIcon
                      icon="address-book"
                      size="3x"
                      style={{ color: "#87CB16", marginLeft: 15 }}
                    />
                    <div>
                      <p className="top-card-text" style={{ fontSize: 15 }}>
                        Orders
                      </p>
                      <p
                        className="top-card-text"
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        {this.state.total_orders.length}
                      </p>
                    </div>
                  </div>
                  <hr style={{ margin: 0 }} />
                  <p
                    style={{ textAlign: "end", marginTop: 5, color: "#afafaf" }}
                  >
                    {" "}
                    <MDBIcon icon="calendar-alt" style={{ marginRight: 10 }} />
                    Till Date
                  </p>
                </div>
                <div className="top-card ">
                  <div
                    className="rowDefault"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 10
                    }}
                  >
                    <MDBIcon
                      icon="hand-holding-usd"
                      size="3x"
                      style={{ color: "#FF4A55", marginLeft: 15 }}
                    />
                    <div>
                      <p className="top-card-text" style={{ fontSize: 15 }}>
                        Revenue
                      </p>
                      <p
                        className="top-card-text"
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        Rs.{this.state.revenue.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <hr style={{ margin: 0 }} />
                  <p
                    style={{ textAlign: "end", marginTop: 5, color: "#afafaf" }}
                  >
                    <MDBIcon icon="calendar-alt" style={{ marginRight: 10 }} />
                    Till Date
                  </p>
                </div>
                <div className="top-card ">
                  <div
                    className="rowDefault"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 10
                    }}
                  >
                    <MDBIcon
                      icon="question-circle"
                      size="3x"
                      style={{ color: "#1DC7EA", marginLeft: 15 }}
                    />
                    <div>
                      <p className="top-card-text" style={{ fontSize: 15 }}>
                        Queries
                      </p>
                      <p
                        className="top-card-text"
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        {this.state.queries.length}
                      </p>
                    </div>
                  </div>
                  <hr style={{ margin: 0 }} />
                  <p
                    style={{ textAlign: "end", marginTop: 5, color: "#afafaf" }}
                  >
                    <MDBIcon icon="calendar-alt" style={{ marginRight: 10 }} />
                    Till Date
                  </p>
                </div>
              </div>
              <div className="piediv">
                <p style={{ fontSize: 20, textAlign: "center" }}>
                  Most Purchased Courses
                </p>

                <div style={{ margin: 10 }}>
                  <Pie
                    width={600}
                    height={300}
                    options={{ maintainAspectRatio: false }}
                    data={data2}
                    onElementsClick={(e) => this.handleGraphClick(e)}

                  />

                  {this.renderViewALl()}
                  <div id="course_table"></div>

                  {this.renderAllCourses()}
                </div>
              </div>
              {this.renderLinechart()}
              <div className="piediv">
                <p style={{ fontSize: 20, textAlign: "center" }}>
                  Most Purchased Exams
                </p>

                <div style={{ margin: 10 }}>
                  <Pie
                    data={data}
                    width={600}
                    height={300}
                    options={{ maintainAspectRatio: false }}
                    onElementsClick={(e)=>this.handleGraphClickExams(e)}
                  /* onRef={ref => this.chart = ref} */
                  />
                  {this.renderViewALl2()}
                  <div id="course_table"></div>
                  {this.renderAllExams()}
                </div>
              </div>

              {/* <div className="piediv">
                <p style={{ fontSize: 20, textAlign: "center" }}>
                  Most Purchased Verticals
                </p>

                <div style={{ margin: 10 }}>
                  <Pie
                    width={600}
                    height={300}
                    options={{ maintainAspectRatio: false }}
                    data={data3}

                  />
                  {this.renderViewALl3()}
                  <div id="course_table"></div>
                  {this.renderAllVerticals()}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Reports;
