import React, { Component, Fragment} from 'react'
import AdminNavbar from '../Navbar/adminNavbar'
import SidebarPage from '../../../Components/Admin/Sidebar/sidebarPage'
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import Fade from 'react-reveal'
import './test.css'
import {MDBIcon} from 'mdbreact';
import Select from 'react-select';
import swal from 'sweetalert';
import { thisExpression } from '@babel/types';



const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:30% 45%;
`;

export default class AddTest extends Component {


    constructor(props){
        super(props);
        this.state={
            loading:false,
            testTitle:'',
            numberOfQuestions:null,
            compulsoryQuestions:[],
            selectedSubject:[],
            difficultyLevels:[{value:1,label:"Easy"},{value:2, label:"Moderate"},{value:3,label:"Tough"}],
            selectedDifficultyLevel:[],
            topics:null,
            subjectList:[],
            testArray:[],
            testCost:null,
            total_questions:0,
            testTime:null,
            testType:[{value:1,label:'Objective'},{value:2,label:"Subjective"}],
            selectedTestType:null,
            selectedTestValue:0
            
        }
    }

    componentWillMount(){
        this.getSubjects();
    }

        
    componentDidMount(){
        console.log("State",this.state)
        
    }


    getSubjects = async() => {
        this.setState({loading:true})
        var subjectList = JSON.parse(window.localStorage.getItem("subject_list"))
        subjectList.forEach(element => {
            element.value = element.subject_id;
            element.label = element.subject_name;
        });
        this.setState({subjectList,loading:false})
    }


    //HANDLE FUNCTIONS



    getTopics = async (subject_id) =>{

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
            //   var response = JSON.parse(responseJson)
            console.log((responseJson[0]))
            let testArray = this.state.testArray;
            JSON.parse(responseJson[0].topics).forEach(element => {
                var topic = new Object();
                topic.topic_id = element.topic_id;
                testArray.push(topic);
            });
            this.setState({topics:JSON.parse(responseJson[0].topics), 
                            testArray, loading:false})
          }).catch((error) => {
           this.setState({
             loading:false
           })
           swal("Warning!", "Check your network!", "warning");
             console.log(error)
             })
            })
    }


    addTest(){
            // this.setState({
            //     loading:true
            //     })
            var finalTestArray = []
            this.state.testArray.forEach(element => {
        
                    if(!(element.easy == 0 && element.moderate == 0 && element.tough==0)){
                        finalTestArray.push(element)
                    } 
               })
       

            console.log(this.state.selectedSubject)
            console.log(finalTestArray)
            
            let details = { 
                test_name:this.state.testTitle,
                status:1,
                test_config:JSON.stringify(finalTestArray),
                // cost:this.state.testCost,
                duration:this.state.testTime,
                subject_id:this.state.selectedSubject.subject_id,
                test_type:this.state.selectedTestType.label,
            
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
              response: fetch('http://18.221.47.207:3000/add_test', {
              method: 'POST',
              headers: {
               
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'max-age=31536000'
              },
              body:formBody
            
              
              }).then((response) => response.json())
              .then((responseJson)=>{  
                swal("Success!", "Test added", "success");
                }).then((value)=>this.props.history.push('/admin/test'))
              .catch((error) => {
              this.setState({
               loading:false
              })
              swal("Warning!", "Check your network!", "warning");
              console.log(error)
               })
             })


             }      


    handleInputChange(data,item,difficulty){
        if(isNaN(data)||data.length===0)
        data = 0;
        let testArray= this.state.testArray
        console.log(testArray)
        let testObject = testArray.find(topic=>topic.topic_id===item.topic_id)
        if(difficulty===0){
            testObject.easy = data;
            if(!testObject.moderate)
            testObject.moderate = 0;
            if(!testObject.tough)
            testObject.tough = 0;

        }
        if(difficulty===1){
            testObject.moderate = data;
            if(!testObject.easy)
            testObject.easy = 0;
            if(!testObject.tough)
            testObject.tough = 0;
        }
        if(difficulty==2){
            testObject.tough = data;
            if(!testObject.easy)
            testObject.easy = 0;
            if(!testObject.moderate)
            testObject.moderate = 0;
        }
        // for(var i=0;i<=testArray.length;i++){
        //     if (testArray[i].topic_id === item.topic_id){
        //         testArray[i].config = test;
        //     }


        this.setState({testArray},()=>this.getTotalQuestions(testArray))
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
 
        
    


    renderTopicsSection(){
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
            return (
                <Fragment>
                <div className="topicsSection col-6">
                    <table style={{width:"100%"}} className="test-topics-table">
                        <tr>
                            <th>Topics</th>
                            <th>Easy</th>
                            <th>Moderate</th>
                            <th>Difficult</th>
                            
                        </tr>
                     
                    <tbody style={{marginTop:'20px'}}>
                    
                    {this.state.topics.map((item,index)=>{
                        return(
                            <tr key={item.id}>
                                {/* <div key={item.id} className="test-topic-item col-12"> */}
                                <td>{item.name}</td>
                                <td><input type="number" onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,0)} className="number-of-questions-input"  /></td>
                                <td><input type="number" onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,1)} className="number-of-questions-input"  /></td>
                               <td><input type="number" onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,2)} className="number-of-questions-input"  /></td> 
                             </tr>
                        )
                    }) }
                        </tbody>
                    </table>
                    
                    {this.renderTotalQuestion()}
               
                </div>
                   
                 <hr />
                </Fragment>
            )
        }
    }

    handleSubjectSelect(e){
        this.setState({selectedSubject:e,loading:true})
        this.getTopics(e.value);
        console.log(e.value)

    }


    renderTestSubjectSection(){
        return(
            <div className="col-6  test-subject-section">
                 <label htmlFor="defaultFormRegisterNameEx" className="question-topics-label subject-labels question-label ">
                      Subject:
                 </label>
                 <Select
                    closeMenuOnSelect={true}
                    onChange={e=>this.handleSubjectSelect(e)}
                    value={this.state.selectedSubject}
                    className='select-question-topics select'
                    options={this.state.subjectList}

                />
                {console.log(this.state.selectedAuthors, 'Selected Authors:')}

            </div>
        )
    }

renderTestTitle(){
    return(
        <div className="col-6 test-title-section">
            <label htmlFor="defaultFormRegisterNameEx" className="question-topics-label subject-labels question-label ">
                      Test name:
            </label>
            <input
            value={this.state.testTitle}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control  custom-form"
                onChange={(text)=>this.setState({testTitle:text.target.value})}
            />
        </div>
    )
}
   

// renderTestCost(){
//     return(
//         <div className="col-4 test-cost-section">
//             <label htmlFor="defaultFormRegisterNameEx" className="question-topics-label subject-labels question-label ">
//                       Cost:
//             </label>
//             <input
//             value={this.state.testCost}
//                 type="number"
//                 id="defaultFormRegisterNameEx"
//                 className="form-control  custom-form"
//                 onChange={(text)=>this.setState({testCost:text.target.value})}
//             />
//         </div>
//     )
// }

renderTotalQuestion(){
   if(this.state.total_questions!=0){
    return(
       <>
            <hr />
                
                <div className="rowDefault total-cost-section total-question-section" style={{justifyContent:'flex-end',alignItems:'center'}} >
                    <h5 style={{marginBottom:0}}>
                              Total Questions
                    </h5>
                   <h4 className='total_question_value'>{this.state.total_questions}</h4>
                </div>
       </>
    )
   }
}


renderTestTime(){
    return(
        <div className="col-4 test-cost-section">
            <label htmlFor="defaultFormRegisterNameEx" className="question-topics-label subject-labels question-label ">
                      Time(in Min):
            </label>
            <input
            value={this.state.testTime}
                type="number"
                id="defaultFormRegisterNameEx"
                className="form-control  custom-form"
                onChange={(text)=>this.setState({testTime:text.target.value})}
            /> 
        </div>
    )
}

renderTestType(){
    return (
        <div className="col-4 diffiulty-level-section">

            <label htmlFor="defaultFormRegisterNameEx" className="difficulty-label subject-labels question-label ">
                 Test Type:
             </label>
             <Select
                closeMenuOnSelect={true}
                onChange={e=>this.setState({selectedTestType:e},()=>{
                    if(this.state.selectedTestType.label=='Objective'){
                        this.setState({objective:1})
                    }
                    else this.setState({objective:0})
                })}
                value={this.state.selectedTestType}
                className='select-difficulty select'
                options={this.state.testType}

            />
        </div>
    )
}
    render() {
        console.log(this.state)
        return (
            <div id="add-subject-page" className="add-test-page">
            <AdminNavbar {...this.props} />

            <div className="d-flex">
              <SidebarPage {...this.props} active={9}/>

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
                    <button className="admin-button-style" onClick={()=>this.props.history.push('/admin/test')}>
                        All Tests
                    </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add Test</h3> 
                    <button className="admin-button-style" onClick={()=>this.addTest()}> Save &amp; Publish</button>
                    </div>
                    </div>


                    <div className="row px-2 my-2 mx-0">
                        {this.renderTestType()}
                     {this.renderTestTitle()}
                     {/* {this.renderTestCost()} */}
                     <hr />
                     {this.renderTestTime()}
                     {this.renderTestSubjectSection()}
                     <hr />
                     {console.log(this.state.topics,"topics")}
                     {this.renderTopicsSection()}  
                     <div></div>         
                    <button className="add-subject" onClick={()=>this.addTest()}>Save &amp; Publish</button>
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
