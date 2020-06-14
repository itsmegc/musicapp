import React, { Component, Fragment} from 'react'
import AdminNavbar from '../Navbar/adminNavbar'
import SidebarPage from '../../../Components/Admin/Sidebar/sidebarPage'
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import Fade from 'react-reveal'
import './examinations.css'
import {MDBIcon} from 'mdbreact';
import Select from 'react-select';
import swal from 'sweetalert';
import reactReveal from 'react-reveal';
import editExamination from './editExamination';
import Editlecture from '../Lectures/Editlecture';



const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:30% 45%;
`;

export default class AddExam extends Component {


    constructor(props){
        super(props);
        this.state={
            loading:false,
            examTitle:'',
            numberOfQuestions:null,
            compulsoryQuestions:[],
            selectedSubject:null,
            difficultyLevels:[{value:1,label:"Easy"},{value:2, label:"Moderate"},{value:3,label:"Tough"}],
            selectedDifficultyLevel:[],
            topics:null,
            subjectList:[],
            testArray:[],
            testCost:'',
            total_questions:0,
            examDuration:'',
            examSubjects:[],
            chosenSubjects:[]         
        }
    }

    componentWillMount(){
        this.getSubjects();
    }

        
    componentDidMount(){
        console.log("State",this.state)
        
    }


   


    //GET FUNCTIONS

    getSubjects = async() => {
        this.setState({loading:true})
        var subjectList = JSON.parse(window.localStorage.getItem("subject_list"))
        subjectList.forEach(element => {
            element.value = element.subject_id;
            element.label = element.subject_name;
        });
        this.setState({subjectList,loading:false})
    } 

    getTopics = (subject_id) =>{

        this.setState({loading:true})
        let details = {
        subject_id:subject_id,
      };
      console.log(details,'details')
      let formBody = [];
      for (let property in details) {
       let encodedKey = encodeURIComponent(property);
       let encodedValue = encodeURIComponent(details[property]);
       formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log("fetching details")
      this.setState({
       response: fetch('http://18.221.47.207:3000/get_subject_topics', {
         method: 'POST',
         headers: {
           
           'Content-Type': 'application/x-www-form-urlencoded',
           'Cache-Control': 'max-age=31536000'
       },
      body:formBody
       
         
       }).then(response => response.json())
       .then(responseJson=>{
         console.log("fetching topics for selected Subject")
         this.setState({topics:JSON.parse(responseJson[0].topics), loading:false},()=>this.addExamSubject(this.state.topics, subject_id))
       }).catch((error) => {
        this.setState({
          loading:false
        })
        swal("Warning!", "Check your network!", "warning");
          console.log(error)
          })
         })

    }

    //ADD FUNCTIONS

    addExamSubject (topics, subject_id){
 

    console.log("fetched topics" , topics)
    
    let examSubjectsArray = this.state.examSubjects;
    let examSubject = examSubjectsArray.find(item=>item.subject_id == subject_id);


    let subjectConfig = [];
    topics.forEach(element => {
        var topicObject = new Object();
        topicObject.topic_id = element.topic_id;
        topicObject.topic_name = element.name
        console.log(element, "add exam subject topic element")
        subjectConfig.push(topicObject)
    });
    examSubject.subject_config = subjectConfig

    console.log("added new subject object to exams array", examSubjectsArray)
    this.setState({examSubjects:examSubjectsArray})
    }

  

    //HANDLE FUNCTIONS

    handleSubjectSelect(){
        console.log("selected subject", this.state.selectedSubject);
        let { examSubjects } = this.state
        if(examSubjects.find(item=>item.subject_id === this.state.selectedSubject.value)){
            swal("Warning!", "Subject already chosen", "warning");
        }
        else{
         let subject =  new Object();      
         subject.subject_id = this.state.selectedSubject.value
         subject.subject_name = this.state.selectedSubject.label
         examSubjects.push(subject);
         console.log("added subject to exams array", examSubjects)
         this.setState({examSubjects},()=>this.getTopics(subject.subject_id))
        }
    }

    handleInputChange(data,item,difficulty, subject_id){
        let examSubjectsArray = this.state.examSubjects
      //  console.log(subject_id)
        let examSubjectItemConfig = examSubjectsArray.find(item=>item.subject_id===subject_id).subject_config;
        if(isNaN(data)||data.length===0)
        data = 0;
      //  console.log(item)
        let topicConfigItem = examSubjectItemConfig.find(topic=>topic.topic_id === item.topic_id)
      //  console.log(topicConfigItem);
       
        if(difficulty===0){
            topicConfigItem.easy = data;
            if(!topicConfigItem.moderate)
            topicConfigItem.moderate = 0;
            if(!topicConfigItem.tough)
            topicConfigItem.tough = 0;

        }
        if(difficulty===1){
            topicConfigItem.moderate = data;
            if(!topicConfigItem.easy)
            topicConfigItem.easy = 0;
            if(!topicConfigItem.tough)
            topicConfigItem.tough = 0;
        }
        if(difficulty==2){
            topicConfigItem.tough = data;
            if(!topicConfigItem.easy)
            topicConfigItem.easy = 0;
            if(!topicConfigItem.moderate)
            topicConfigItem.moderate = 0;
        }

        console.log(examSubjectItemConfig)
        this.setState({examSubjects:examSubjectsArray})


        // this.setState({testArray},()=>this.getTotalQuestions(testArray))
    }
    
    handleSaveConfig(id){
        let chosenSubjects = [...this.state.chosenSubjects];
        let subject = this.state.examSubjects.find(item=>item.subject_id == id);
        if(typeof chosenSubjects.find(item=>item.subject_id == id) === "undefined"){
          chosenSubjects.push(subject);
        //  console.log(subject)
        }
        else{
          let oldSubject =chosenSubjects.find(item=>item.subject_id === id);
          oldSubject = subject;
        }
      //  console.log(subject)
        this.setState({chosenSubjects});
    }

    getTotalQuestions(testArray){
    var total_easy = 0,total_moderate=0,total_tough=0
    for(var v=0;v<testArray.length;v++){
        if(testArray[v].easy){
            total_easy=total_easy+testArray[v].easy
        }
        if(testArray[v].moderate){
            total_moderate=total_moderate+testArray[v].moderate
        }
        if(testArray[v].tough){
            total_tough=total_tough+testArray[v].tough
        }
    }
    this.setState({total_questions:total_easy+total_moderate+total_tough})
    }



    //RENDR FUNCTIONS 

    renderExamTitle(){
        return(
            <div className="col-6 test-title-section d-flex justify-content-start align-items-center my-2">
                <label htmlFor="defaultFormRegisterNameEx" className="subject-labels">
                        Name:
                </label>
                <input
                value={this.state.examTitle}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control  custom-form"
                    onChange={(text)=>this.setState({examTitle:text.target.value})}
                />
            </div>
        )
    }

    renderExamCost(){
        return(
            <div className="col-6 test-cost-section d-flex justify-content-start align-items-center my-2">
                <label htmlFor="defaultFormRegisterNameEx" className="question-topics-label subject-labels ">
                        Cost:
                </label>
                <input
                value={this.state.testCost}
                    type="number"
                    id="defaultFormRegisterNameEx"
                    className="form-control  custom-form"
                    onChange={(text)=>this.setState({testCost:text.target.value})}
                />
            </div>
        )
    }

    renderTotalQuestion(subject_id){
    // if(this.state.total_questions!=0){
        
        let subjectConfig = this.state.examSubjects.find(item=>item.subject_id === subject_id).subject_config;
        if(subjectConfig){
        let easy = 0;
        let moderate = 0;
        let tough = 0;
        console.log(subjectConfig)
        subjectConfig.forEach(element => {
            // console.log(element)
           
            if(typeof element.easy === "undefined"){}
            else{
                easy = easy + element.easy
            }

            if(typeof element.moderate === "undefined"){}
            else{
                moderate = moderate + element.moderate
            }

            if(typeof element.tough === "undefined"){}
            else{
                tough = tough + element.tough
            }
        });

        let total = easy + moderate + tough;

        return(
        <>
                <hr /> 
                    <div className="rowDefault total-cost-section total-question-section" style={{justifyContent:'flex-end',alignItems:'center'}} >
                        <h5 style={{marginBottom:0}}>
                                Total Questions
                        </h5>
                    <h4 className='total_question_value'>{total}</h4>
                    </div>
        </>
        )
    
    }
    }

    renderExamTime(){
        return(
            <div className="col-6 test-cost-section d-flex justify-content-start align-items-center my-2">
                <label htmlFor="defaultFormRegisterNameEx" className="question-topics-label subject-labels">
                        Exam duration (in Min):
                </label>
                <input
                value={this.state.examDuration}
                    type="number"
                    id="defaultFormRegisterNameEx"
                    className="form-control w-25  custom-form"
                    onChange={(text)=>this.setState({examDuration:text.target.value})}
                /> 
            </div>
        )
    }

    renderTopicsSection(subject_id){


        //if in chosen subject renderChosenSubjectTopics
        // else render SubjectTopics
    if(!this.state.topics){
            return (<div className='sweet-loading'>
            <GridLoader
            css={override}
            sizeUnit={"px"}
            size={5}
            color={'#c01825'}
            loading={this.state.loading}
            />
            </div>)
        
    } else {

        let subject = this.state.chosenSubjects.find(item=>item.subject_id == subject_id)
        if(typeof subject === "undefined"){  
        return (      
                <Fragment>
                <div className="topicsSection col-6">
                    <table style={{width:"100%"}} className="test-topics-table">
                        <thead>
                        <tr>
                            <th>Topics</th>
                            <th>Easy</th>
                            <th>Moderate</th>
                            <th>Difficult</th>
                            
                        </tr>
                        </thead>
                    <tbody style={{marginTop:'20px'}}>
                    
                    {this.state.topics.map((item,index)=>{
                        console.log(item,"topic item")
                            return(
                                <tr key={item.id}>
                                    {/* <div key={item.id} className="test-topic-item col-12"> */}
                                    <td>{item.name}</td>
                                    <td><input type="number" onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,0, subject_id)} className="number-of-questions-input"  /></td>
                                    <td><input type="number" onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,1, subject_id)} className="number-of-questions-input"  /></td>
                                    <td><input type="number" onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,2, subject_id)} className="number-of-questions-input"  /></td> 
                                 </tr>
                                )
                           }
                       )
                        }
                         </tbody>
                    </table>
                    <button className="add-subject mt-3 float-right" onClick={()=>this.handleSaveConfig(subject_id)}> Save Config</button>
                    {this.renderTotalQuestion(subject_id)}
               
                </div>
                   
            
                </Fragment>
                        
                 )
             }
             else{
                // let topicConfig = subject.subject_config.find(topic=>topic.topic_id === item.topic_id);
                return(
                        <Fragment>
                        <div className="topicsSection col-6">
                            <table style={{width:"100%"}} className="test-topics-table">
                                <thead>
                                <tr>
                                    <th>Topics</th>
                                    <th>Easy</th>
                                    <th>Moderate</th>
                                    <th>Difficult</th>
                                    
                                </tr>
                                </thead>
                            <tbody style={{marginTop:'20px'}}>
                            
                            {subject.subject_config.map((item,index)=>{
                                console.log(item,"topic item")
                                    return(
                                          <tr key={item.id}>
                                {/* <div key={item.id} className="test-topic-item col-12"> */}
                                <td>{item.topic_name}</td>
                                <td><input type="number" value={item.easy?item.easy:0} onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,0, subject_id)} className="number-of-questions-input"  /></td>
                                <td><input type="number" value ={item.moderate?item.moderate:0} onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,1, subject_id)} className="number-of-questions-input"  /></td>
                                <td><input type="number" value={item.tough?item.tough:0} onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,2, subject_id)} className="number-of-questions-input"  /></td> 
                             </tr>
                                        )
                                   }
                               )
                                }
                                 </tbody>
                            </table>
                            <button className="add-subject mt-3 float-right" onClick={()=>this.handleSaveConfig(subject_id)}> Save Config</button>
                            {this.renderTotalQuestion(subject_id)}
                       
                        </div>
                           
                    
                        </Fragment>
                )
             
                       
            
        }
}
    }

    renderExamSubjectsSection(){       
        return this.state.examSubjects.map((subject,index)=>{
            console.log(subject)
            return(
                <React.Fragment key={subject.subject_id}>
                <div className="col-6 test-subject-section d-flex justify-content-start align-items-center my-2 " >
                <p>{`${index+1}.${subject.subject_name}`}</p>
                
                </div>
                <div className="w-100"></div>
                {this.renderTopicsSection(subject.subject_id)} 
                </React.Fragment>
            )
        })

    }

    renderExamSubjectContainer(){
        return (
            <div className="col-12">
                <label htmlFor="defaultFormRegisterNameEx" className="question-topics-label subject-labels">
                        Exam Subjects:
                </label>
                {this.renderExamSubjectsSection()}
                <div className="d-flex w-50 align-items-center  mt-5">
                <Select
                closeMenuOnSelect={true}
                onChange={e=>this.setState({selectedSubject:e})}
                value={this.state.selectedSubject}
                className='select-exam select mb-5'
                options={this.state.subjectList}
                />
                    <button className="add-subject" onClick={()=>this.handleSubjectSelect()}><MDBIcon far icon="plus-square" /> Add subject</button>
                </div>
            </div>
            )
    }




    addExamination(){
          let details = { 
            exam_name:this.state.examTitle,
            status:1,
            exam_config:JSON.stringify(this.state.chosenSubjects),
            cost:this.state.testCost,
            duration:this.state.examDuration
          };

          console.log(details,'add-without photo')
          let formBody = [];
          for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          
          this.setState({
          response: fetch('http://18.221.47.207:3000/add_examination', {
          method: 'POST',
          headers: {
           
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'max-age=31536000'
          },
          body:formBody
        
          
          }).then((response) => response.json())
          .then((responseJson)=>{  
            swal("Success!", "Exam added", "success");
            }).then((value)=>this.props.history.push('/admin/examinations'))
          .catch((error) => {
          this.setState({
           loading:false
          })
          swal("Warning!", "Check your network!", "warning");
          console.log(error)
           })
         })


         }  

    render() {
        console.log(this.state, "state")
        return (
            <div id="add-subject-page" className="add-test-page">
            <AdminNavbar {...this.props} />

            <div className="d-flex">
              <SidebarPage {...this.props} active={12}/>

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
                    <div className="row my-3 px-4">
                    <div className="col-12">
                    <button className="admin-button-style" onClick={()=>this.props.history.push('/admin/examinations')}>
                        All Examinations
                    </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add Examination</h3> 
                    <button className="admin-button-style" onClick={()=>this.addExamination()}> Save &amp; Publish</button>
                    </div>
                    </div>


                    <div className="row px-2 my-2 mx-0">
                     {this.renderExamTitle()}
                     <div className="w-100"></div>
                     {this.renderExamCost()}
                     <div className="w-100"></div>
                     {this.renderExamTime()}
                     <hr />
                     
                     {this.renderExamSubjectContainer()} 
                     <div className="w-100"></div>
                
                    
                    
                    <hr />
                    <button className="add-subject" onClick={()=>this.addExamination()}>Save &amp; Publish</button>
                    </div>
                    </Fade>
                    </React.Fragment>
                   )
                }
              </div>


            </div>
            </div>
        )
    }

}
