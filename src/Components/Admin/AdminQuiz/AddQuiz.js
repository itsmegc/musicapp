import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../Sidebar/sidebarPage";
import GridLoader from "react-spinners/GridLoader";
import Select from "react-select";
import Fade from "react-reveal";
import swal from "sweetalert";
import Picky from "react-picky";
// import "react-picky/dist/picky.css"; //
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import "./quiz.css";
import { MDBInput } from "mdbreact";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 20% 45%;
`;


export default class AddQuiz extends Component {
  constructor(props) {
    super(props);
    this.status = {
      loading:false,
      quizTitle:'',
      subjects:[],
      subjectTopics:[],
      slectedSubject:{},
      selectedSubjectTopic:{},
      questionListShowing:false,
      selectedQuestions:[],
      dragDropQuestions:[]
    };

    this.itemRenderer = this.itemRenderer.bind(this);
    this.handleRLDDChange = this.handleRLDDChange.bind(this);
  }

  componentWillMount() {
    this.getSubjects();
  }



  getSubjects(){
      this.setState({loading:true})
      fetch("http://18.221.47.207:3000/get_subjects", {
          method:'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
            responseJson.forEach(element => {
                    element.label = element.subject_name;
                    element.value = element.subject_id;
            })
            console.log(responseJson)
        this.setState({subjects:responseJson, loading:false})
      }
      );
    
  }

  getSubjectTopics(subject_id){

        this.setState({loading:true})
        
        let formData = new FormData()
        formData.append('subject_id',subject_id)
    for (let key of formData.entries()) {
                console.log(key[0] + ',with photo ' + key[1]);
            }
        fetch("http://18.221.47.207:3000/get_subject_topics", {
            method:'POST',
            body:formData
        })
        .then(response => response.json())
        .then(responseJson => {
            let topics = JSON.parse(responseJson[0].topics)
            topics.forEach(element => {
                    element.label = element.name;
                    element.value = element.topic_id;
            })
            console.log(topics)
        this.setState({subjectTopics:topics, loading:false})
        }
        );
    
  }

  getTopicQuestions(topic_id){

        this.setState({loading:true})
        
        let formData = new FormData()
        formData.append('topics',topic_id)
    for (let key of formData.entries()) {
                console.log(key[0] + ',with photo ' + key[1]);
            }
        fetch("http://18.221.47.207:3000/get_topic_questions ", {
            method:'POST',
            body:formData
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)

            responseJson.forEach((element, index) => {
                    element.label = `${index+1}. ${element.question_title}`;
                    element.value = element.question_id;
                    element.id = element.question_id
            })
        this.setState({topicQuestions:responseJson, loading:false})
        }
        );
    
  }

  addQuiz(){
    if(this.state.selectedSubject == null || this.state.selectedSubject.length <= 0){
        swal("","Please choose a subject!", 'warning')
    }
    else if(this.state.selectedSubjectTopic == null || this.state.selectedSubjectTopic.length <= 0){
        swal("","Please choose a topic!", 'warning')
    }
    else if(this.state.selectedQuestions == null || this.state.selectedQuestions.length <= 0){
        swal("","Please choose a few questions for the quiz!", 'warning')
    }
    else{

        let questions = []
        this.state.dragDropQuestions.forEach(element => {
            questions.push(element.question_id)
        });
        let formData  = new FormData();
        formData.append('topic_id', this.state.selectedSubjectTopic.value)
        formData.append('questions', JSON.stringify(questions))
        formData.append('subject_id', this.state.selectedSubject.value)
        formData.append('quiz_name', this.state.quizTitle)
        console.log(formData)
        for (let key of formData.entries()) {
            console.log(key[0] + ',with photo ' + key[1]);
        }
        fetch("http://18.221.47.207:3000/add_quiz", {
            method:"POST",
            body:formData
        })
        .then(response => {
            console.log(response)
            swal("Quiz succesfully added", '', 'success')
            this.props.history.push('/admin/quiz')
        })
        .catch(error=> {
            console.log(error)
            swal("Network issue", "Please check your network", "warning")
        })
    }
  }

  //ITEM RENDERER DRAG DROP
  itemRenderer(item, index) {
    return (
      <div className="item" key={item.question_id}>
        <p className="title">{item.question_title}</p>
        <button
          className="delete-subject-topic-button"
          onClick={() => this.deleteLecture(item)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    );
  }

  handleRLDDChange(reorderedItems) {
    this.setState({ dragDropQuestions: reorderedItems });
  }


  addTopicQuestions(selectedQuestions) {
    console.log(selectedQuestions)
    if (!selectedQuestions) {
      swal({
        title: `No Selections Made`,
        text: `You have not seleted any topics to add`,
        icon: "error",
        buttons: false,
        dangerMode: true
      });
    } else {
      swal({
        title: `Confirm selection?`,
        text: `You are adding ${selectedQuestions.length} topics to this course`,
        icon: "info",
        buttons: true,
        dangerMode: false
      }).then(willAdd => {
        if (willAdd) {
          var array = [];
          var i = 0;

          selectedQuestions.forEach(element => {
            var questionObject = new Object();
            questionObject = element;
            questionObject.sortOrder = i;
            array.push(questionObject);
            i++;
          });
          console.log(array);
          this.setState({ dragDropQuestions: array });
        } else {
        }
      });
    }
  }

  deleteLecture(item) {
    let { dragDropQuestions } = this.state;
    console.log("deleted", item);
    var newQuestionsList = dragDropQuestions.filter(
      Listitem => Listitem.id != item.id
    );
    var i = 0;
    newQuestionsList.forEach(element => {
      element.sortOrder = i;
      i++;
    });
    console.log("topics", newQuestionsList);
    this.setState({
      dragDropQuestions: newQuestionsList,
      selectedQuestions: newQuestionsList
    });
  }



  renderQuizTitle(){
    return(
        <div className="col-12  subject-name-section d-flex">
             <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                  Title:
             </label>
             <input
                
                value={this.state.quizTitle}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control subject-name-form custom-form"
                    onChange={(text)=>this.setState({quizTitle:text.target.value})}
                />
        </div>
    )
}

  renderSubjectSelect = () => {
    return (
      <div className="col-12  test-id-section d-flex align-items-center">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="test-id-label subject-labels"
        >
          Subject :
        </label>
        <Select
          closeMenuOnSelect={true}
          onChange={e => this.setState({ selectedSubject: e }, ()=>this.getSubjectTopics(this.state.selectedSubject.subject_id))}
          value={this.state.selectedSubject}
          className="select-testid select "
          options={this.state.subjects}
        />
      </div>
    );
  };

  renderTopicSelect = () => {
    return (
      <div className="col-12  test-id-section d-flex align-items-center">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="test-id-label subject-labels"
        >
          Topic :
        </label>
        <Select
          closeMenuOnSelect={true}
          onChange={e => this.setState({ selectedSubjectTopic: e }, ()=>this.getTopicQuestions(this.state.selectedSubjectTopic.topic_id))}
          value={this.state.selectedSubjectTopic}
          className="select-testid select "
          options={this.state.subjectTopics}
        />
      </div>
    );
  };


  renderQuestionsPickySection() {
    return (
      <React.Fragment>
        <button
          className="show-topics-list-button mb-3"
          onClick={() =>
            this.setState({ questionListShowing: !this.state.questionListShowing })
          }
        >
          {" "}
          Questions list <i className="fa fa-chevron-down" />
        </button>
        {this.state.questionListShowing ? (
          <div className="lecture-list-picky-container">
            <Select
              closeMenuOnSelect={false}
              isMulti
              onChange={e =>
                this.setState({ selectedQuestions: e }, () =>
                  console.log(this.state.selectedQuestions)
                )
              }
              value={this.state.selectedQuestions}
              className="select-exam select w-100"
              options={this.state.topicQuestions}
            />
            <div>
              <button
                className="w-50 float-right admin-button-style"
                onClick={() =>
                  this.addTopicQuestions(this.state.selectedQuestions)
                }
              >
                Save questions
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }

  renderQuestionsStructureSection() {
    if (this.state.dragDropQuestions)
      return (
        <RLDD
          cssClasses="drag-drop-topic-list"
          items={this.state.dragDropQuestions}
          itemRenderer={this.itemRenderer}
          onChange={this.handleRLDDChange}
          
        />
      );
    else {
      return (
        <p className="text-center text-muted">
          There are no questions currently selected for this quiz!
        </p>
      );
    }
  }

  renderQuestionsSection() {
    return (
      <React.Fragment>
        <div className="col-12 subject-topics-container">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className="exam-label subject-labels py-3"
          >
            Add Questions:
          </label>
          <div className="row mx-0 bg-white">
            <div className="col-3 topic-list-column px-0">
              {this.renderQuestionsPickySection()}
            </div>

            <div className="col-9 topic-structure-column">
              <label
                htmlFor="defaultFormRegisterNameEx"
                className="exam-label subject-labels text-center w-100"
              >
                Questions Order:
              </label>
              <hr />
              {this.renderQuestionsStructureSection()}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div id="add-subject-page">
        <AdminNavbar {...this.props} />

        <div className="d-flex">
          <SidebarPage {...this.props} active={10} />

          <div className="add-subject-column">
          {this.state.loading?
                     (
                    <div className='sweet-loading'>
                        <GridLoader
                        css={override}
                        sizeUnit={"px"}
                        size={5}
                        color={'#c01825'}
                        loading={this.state.loading}
                        />
                        </div>
                    )
                    :
                    (
            <React.Fragment>
              <Fade>
                <div>
                <div className="row my-3 px-4">
                  <div className="col-12 d-flex align-items-center justify-content-between">
                    <button
                      className="admin-button-style"
                      onClick={() => this.props.history.push("/admin/quiz")}
                    >
                      All Quizzes
                    </button>
                    <button
                      className="admin-button-style"
                      onClick={() => this.addQuiz()}
                    >
                      {" "}
                      Save &amp; Publish
                    </button>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add Quiz</h3>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="subject-content-container ml-4">
                    <div className="row px-0 mx-0">
                      {this.renderQuizTitle()}
                      {this.renderSubjectSelect()}
                      {this.renderTopicSelect()}
                      
                      {/* <hr /> */}
                    </div>
                  </div>
                  <div className="subject-select-fields-container ml-2 row align-self-start flex-column mr-4"></div>
                </div>
                <div className="subject-topics-container mx-4 mt-4">
                  <div className="row p-0 mx-0">
                    {this.renderQuestionsSection()}
                  </div>
                  {/* <hr /> */}
                </div>
                <button
                  className="add-subject my-5 float-right mr-4"
                  onClick={() => this.addQuiz()}
                >
                  Save &amp; Publish
                </button>
                </div>
              </Fade>
            </React.Fragment>

                )
              }
            </div>
        </div>
      </div>
    );
  }
}
