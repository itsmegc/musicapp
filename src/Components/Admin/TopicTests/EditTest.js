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



const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:30% 45%;
`;

export default class EditTest extends Component {


    constructor(props){
        super(props);
        this.state={
            loading:false,
            testTitle:'',
            numberOfQuestions:null,
            compulsoryQuestions:[],
            selectedSubject:[],
            difficultyLevels:[{value:1,label:"Easy"},{value:2, label:"Moderate"},{value:3,label:"Tough"}],
            topics:null,
            subjectList:[],
            testArray:[],
            testCost:null,
            total_questions:0,
            testTime:null
            
        }
    }

    componentWillMount(){
        this.getSubjects();
    }
    
    componentDidMount(){
        console.log("State",this.state)
        
    }




    //HANDLE FUNCTIONS
    handleSubjectSelect(e){
        this.setState({selectedSubject:e,loading:true})
        this.getTopics(e.value);
        console.log(e.value)

    }


    getSubjects(){
        this.setState({loading:true})
        var subjectList = JSON.parse(window.localStorage.getItem("subject_list"))
        this.getDetails(subjectList)
    }


    getDetails(subjectList){
        var testItem = JSON.parse(window.localStorage.getItem("test_item"));
        console.log(testItem)
        let subject_id = subjectList.find(item=>item.subject_id === testItem.subject_id).subject_id;
        let subject_name =  subjectList.find(item=>item.subject_id === testItem.subject_id).label;
        this.setState({
            test_id:testItem.test_id,
            testTitle:testItem.test_name,
            testCost:testItem.cost,
            testArray:JSON.parse(testItem.test_config),  
            testTime:testItem.duration,
            subjectList:subjectList,
            selectedSubject:{"value":subject_id,"label":subject_name},
            testConfig:JSON.parse(testItem.test_config), 
            subjectId:subject_id
        },()=>this.getTopics(subject_id))  
    }

    getTopics = async (subject_id) =>{
            console.log(subject_id,"subject_id")
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
            console.log((responseJson[0]))
            this.setState({topics:JSON.parse(responseJson[0].topics), 
                            loading:false})
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
       

            console.log(finalTestArray)
              let details = { 
                test_id:this.state.test_id,
                test_name:this.state.testTitle,
                status:1,
                test_config:JSON.stringify(finalTestArray),
                cost:this.state.testCost,
                duration:this.state.testTime  ,
             //   language_id:language.value            
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
              response: fetch('http://18.221.47.207:3000/edit_test', {
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
        if(isNaN(data)){
        data = 0;
        }
        let testArray= this.state.testArray
        console.log(testArray)
        let testObject = testArray.find(topic=>topic.topic_id===item.topic_id)


        if(testObject != undefined){
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
        }
        else{

            testObject = new Object()
            testObject.topic_id = item.topic_id
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
            testArray.push(testObject)
        }
        console.log(testObject)
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
                        var testConfig = this.state.testArray.find(config=>config.topic_id === item.topic_id);
                        console.log(item)
                        console.log(testConfig)
                        return(
                         
                            <tr key={item.id}>
                                {/* <div key={item.id} className="test-topic-item col-12"> */}
                                <td>{item.name}</td>
                                <td><input type="number" value={testConfig === undefined?0:testConfig.easy} onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,0)} className="number-of-questions-input"  /></td>
                                <td><input type="number" value={ testConfig === undefined?0:testConfig.moderate} onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,1)} className="number-of-questions-input"  /></td>
                               <td><input type="number" value={ testConfig === undefined?0:testConfig.tough} onChange={(e)=>this.handleInputChange(parseInt(e.target.value),item,2)} className="number-of-questions-input"  /></td> 
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
   

renderTestCost(){
    return(
        <div className="col-4 test-cost-section">
            <label htmlFor="defaultFormRegisterNameEx" className="question-topics-label subject-labels question-label ">
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
                    <h1 className="px-5 my-3"> Edit Test</h1>
                    <div className="row px-5 my-5 mx-0">
                     {this.renderTestTitle()}
                     {this.renderTestCost()}
                     <hr />
                     {this.renderTestTime()}
                     {this.renderTestSubjectSection()}
                     <hr />
                     {console.log(this.state.topics,"topics")}
                     {this.renderTopicsSection()}  
                     <div></div>         
                    <button className="add-subject" onClick={()=>this.addTest()}>Save</button>
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
