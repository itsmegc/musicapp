import React, {Component} from 'react'
import AdminNavbar from '../Navbar/adminNavbar'
import SidebarPage from '../../../Components/Admin/Sidebar/sidebarPage'
import '../AddSubject/addSubject.css';
import Select from 'react-select';
import {MDBNavbar,MDBBtn,MDBNavItem,MDBNavbarNav,MDBIcon,MDBModal,MDBModalBody,MDBModalFooter,MDBModalHeader,MDBInput} from 'mdbreact';
import {Picky} from 'react-picky';
import 'react-picky/dist/picky.css';
import swal from 'sweetalert'
import MediaComponent from "../MediaComponent/chooseMediaFile";
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import Fade from 'react-reveal'



const topicsList=[];
for(var i=1;i<=100;i++){
    topicsList.push({id:i,name:`Topic ${i}`})
}

const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:30% 45%;
`;


class EditSubject extends Component {
    constructor(props){
        super(props);
        this.state={
            loadng:true,
            subjectId:``,
            inputLink:'',
            selectedStudentType:[],
            subjectName:"",
            subjectSubtitle:"",
            authors:[{label:'Vikram Mathur',value:'Vikram Mathur',author_id:1},
            {label:'Gaurav',value:'Gaurav',author_id:2},
            {label:'Madhur',value:'Madhur',author_id:3},
            {label:'Param',value:'Param',author_id:4},
            {label:'Shalini',value:'Shalini',author_id:5},
           
            {label:'Pallavi',value:'Pallavi',author_id:6}],
            // 'Vikram Mathur', 'Gaurav', 'Madhur', 'Param', 'Shalini', 'Pallavi'
            selectedAuthors:[],
            studentType:[],
            class:[],
            subjectCost:``,
            subjectDuration:``,
                testIDs:[],
            selectedTestIDs:[],
            subjectThumbnail:null,
            editedThumbnail:null,
            subjectThumbnailUrl:``,
            subjectDescriptions:[{
                id:`1`,
                description:''
            }],
            classList:[
                { value:'0', label:'Class 6th'},
                { value:'1', label:'Class 7th'},
                { value:'2', label:'Class 8th'},
                { value:'3', label:'Class 9th'},
                { value:'4', label:'Class 10th'},
                { value:'5', label:'Class 11th'},
                { value:'6', label:'Class 12th'},
            ],
            StudentTypes:[
                { value:'0', label:'school'},
                { value:'1', label:'civil-service'},
                {value:'2', label:'humanities'},
                { value:'3', label:'other-service'},
                { value:'4', label:'CCA'}
            ],
            learningRequirements:[{
                id:`1`,
                requirement:''
            }],
            learningTopics:[{
                id:`1`,
                topic:''
            }],
            exams:[],
            selectedExams:[],
            topicsArray:[],
            selectedTopics:[],
            dragDropTopics:[],
            topicListShowing:true,
            filename:'',
            subjectList:[],
            selectedSubjectList:[],
            options: [
                { value: "0", label: "English" },
                { value: "1", label: "Hindi" }
              ],
              selectedLanguage:'',
              testCost:null
        }
        this.itemRenderer = this.itemRenderer.bind(this);
        this.handleRLDDChange = this.handleRLDDChange.bind(this);
    }



    componentWillMount(){
        if(JSON.parse(window.localStorage.getItem('subject_item'))){
           this.getSubjectDetails();
           }
           else{
               this.props.history.push('/admin/subject-list')
           }
        this.getSubjectList()
        this.getTopics();
   
    }
    



    componentDidMount(){
  
        }




        getTopics = async() =>{
            var topic_list = window.localStorage.getItem("topic_list");
            this.setState({
                topicsArray:JSON.parse(topic_list)
            })
        }

    //GETS , POSTS , FORM VALIDATION

     getSubjectDetails = async () => {
              var subject_item = JSON.parse(window.localStorage.getItem('subject_item'));
              this.setState({
              subjectId:subject_item.subject_id,  
              subjectName:subject_item.subject_name,
              subjectSubtitle:subject_item.sub_title,
              subjectCost:Number(subject_item.cost),
              old_subjectCost:Number(subject_item.old_cost),
              subjectDuration:Number(subject_item.duration),
              selectedSubjectList:JSON.parse(subject_item.related_subjects),
              subjectDescriptions:JSON.parse(subject_item.description),
              learningTopics:JSON.parse(subject_item.learning_topic),
              learningRequirements:JSON.parse(subject_item.requirements),
              selectedExams:JSON.parse(subject_item.exams),
              dragDropTopics:JSON.parse(subject_item.topics),
              selectedTopics:JSON.parse(subject_item.topics),
              subjectThumbnail:subject_item.image,
              subjectThumbnailUrl:subject_item.image,
              testCost:subject_item.test_cost,
              inputLink:subject_item.image,
              filename: (subject_item.image).substr(28,(subject_item.image).length),
              studentType:JSON.parse(subject_item.student_type),
              class:JSON.parse(subject_item.class),
              selectedLanguage:this.state.options.find(item=>item.value==subject_item.language_id),
              loading:false             
             },()=>this.getExams())
     }

     gettests=async()=>{
        this.setState({
            response: fetch('http://18.221.47.207:3000/get_tests', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },


        }).then((response) => response.json())
        .then((responseJson)=>{
        for(var v=0;v<responseJson.length;v++){
            responseJson[v].label = responseJson[v].test_name
            responseJson[v].value = responseJson[v].test_id
        }
        console.log(responseJson)
        this.setState({
            testIDs:responseJson,
            loading:false
        })
    })


         .catch((error) => {
         this.setState({
           loading:false
         })
         alert("Warning!", "Check your network!", "warning");
         console.log(error)
        console.log(error);
            })
        })
        console.log(this.state.testIDs)
     }
    getExams = async() => {
        this.setState({
            response: fetch('http://18.221.47.207:3000/get_exams', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },


        }).then((response) => response.json())
        .then((responseJson)=>{
        for(var v=0;v<responseJson.length;v++){
            responseJson[v].label = responseJson[v].exam_name
            responseJson[v].value = responseJson[v].exam_id
        }
        this.setState({
            exams:responseJson,
            loading:false
        })})


         .catch((error) => {
         this.setState({
           loading:false
         })
         alert("Warning!", "Check your network!", "warning");
         console.log(error)
        console.log(error);
            })
        })
        this.gettests()
    }

    getSubjectList = async ()=> {
        var subject_list = JSON.parse(window.localStorage.getItem('subject_list'));
        let subjectList=[];
        for(var i = 0; i< subject_list.length;i++){
            var subject_object = new Object;
            subject_object.value=subject_list[i].subject_id;
            subject_object.label = subject_list[i].subject_name;
            subjectList.push(subject_object);
        }
        if(!JSON.parse(window.localStorage.getItem('subject_item'))){
            this.props.history.push('/admin/subject-list')
        }
        else {
        this.setState({
            subjectList:subjectList.filter(item => item.value != JSON.parse(window.localStorage.getItem('subject_item')).subject_id)
        })
      }
    }


    //ADD FORM

    editSubject(){

            if(this.state.subjectName.length==0){
                swal("Check subject name!", "Please enter valid name", "error");
            }
            else if (isNaN(this.state.subjectCost)) {
                swal("Check cost field!", "Enter valid cost", "error");
             }
            else if(this.state.subjectSubtitle.length<=2){
                swal("Check subtitle field!", "Must contain more than two characters", "error");
              }
              else if(!this.state.testCost || this.state.testCost.length==0){
                swal("Check Test Cost field","Please price the test for your course!","error");
            }
            else if(!this.state.selectedExams ||  this.state.selectedExams.length==0){
                swal("Check Exams field","Please select related exams for your course!","error");
            }
            else if(!this.state.dragDropTopics || this.state.dragDropTopics.length==0){
                swal("Check Topics","Please select topics for your course!","error");
            }
            else if(!this.state.selectedSubjectList || this.state.selectedSubjectList.length==0){
                swal("Check Related Subjects","Please select subjects related to your course!","error");
            }   
            
            
            else if(parseInt(this.state.old_subjectCost) < parseInt(this.state.subjectCost)){
                swal("The discounted cost cannot be more than the original cost!","Please revisit cost section.", "error")
            }

            else{
                // var learningr = this.state.learningRequirements;
                // for(var i = 1; i < this.state.learningRequirements.length;i++){
                //     if(learningr[i].requirement.length<=0){
                //         learningr.splice(i, 1);
                //     }
                // }
                // this.setState({learningRequirements:learningr})

                this.setState({
                loading:true
                // add_modal:false
                })

                  let details= {
                  subject_id : this.state.subjectId,
                  subject_name:this.state.subjectName,
                  sub_title:this.state.subjectSubtitle,
                  cost:this.state.subjectCost,
                  old_cost:this.state.old_subjectCost,
                  duration: this.state.subjectDuration,
                  description:JSON.stringify(this.state.subjectDescriptions),
                  test_cost:this.state.testCost,
                  related_subjects:JSON.stringify(this.state.selectedSubjectList),
                  exams:JSON.stringify(this.state.selectedExams),
                  topics:JSON.stringify(this.state.dragDropTopics),
                  learning_topic:JSON.stringify(this.state.learningTopics),
                  requirements:JSON.stringify(this.state.learningRequirements),
                  student_type:JSON.stringify(this.state.studentType),
                  class:JSON.stringify(this.state.class),
                  image:this.state.inputLink,
                  language_id:this.state.selectedLanguage.value,
                  status:1,
                  }
                  let formBody=[];
                  for(let property in details){
                    let encodedKey = encodeURIComponent(property);
                    let encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                  }
                  formBody = formBody.join("&");
                  console.log(this.state.subjectId)
                  this.setState({
                    response: fetch('http://18.221.47.207:3000/edit_subject', {
                    method: 'POST',
                    headers: {
                     
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Cache-Control': 'max-age=31536000'
                    },
                    body:formBody
                    
                    
                    }).then((response) => response.json())
                    .then((responseJson)=>{
                    
                    this.props.history.push('/admin/subject-list');                        
                    })
                    .catch((error) => {
                    this.setState({
                     loading:false
                    })
                    swal("Warning!", "Check your network!", "warning");
                    console.log(error)
                     })
                    })
      }
   }
      




   //REACT PICKY EVENTS
    selectMultipleOption(value){
       this.setState({selectedTopics:value})
    }


    //ITEM RENDERER DRAG DROP
    itemRenderer(item, index) {
        return (
          <div className="item">
            <p className="title">{item.name}</p>
            <button className="delete-subject-topic-button" onClick={()=>this.deleteSubjectTopic(item)}><i className="fas fa-trash"></i></button>
          </div>
        );
      }

   //HANDLE CLICK EVENTS
   addSubjectDescription(){
    let {subjectDescriptions}=this.state
    subjectDescriptions.push({id:`${subjectDescriptions.length+1}`,description:''});
    this.setState({subjectDescriptions})
   }


   removeSubjectDescription(index){
    let {subjectDescriptions}=this.state
    if(subjectDescriptions.length>1){
    subjectDescriptions.splice(index,1);
    }
    for(var i = 0;i<subjectDescriptions.length;i++){
        subjectDescriptions[i].id = i+1;
    }
    this.setState({subjectDescriptions});
   }


   addLearningRequirement(){
    let {learningRequirements}=this.state
    learningRequirements.push({id:`${learningRequirements.length+1}`,requirement:''});
    this.setState({learningRequirements})
   }

   removeLearningRequirement(index){
    let {learningRequirements}=this.state
    if(learningRequirements.length>1){
        learningRequirements.splice(index,1);
    }
    for(var i = 0;i<learningRequirements.length;i++){
        learningRequirements[i].id = i+1;
    }
    this.setState({learningRequirements});
   }

   addLearningTopic(){
    let {learningTopics}=this.state
    learningTopics.push({id:`${learningTopics.length+1}`,topic:''});
    this.setState({learningTopics})
   }

   removeLearningTopic(index){
    let {learningTopics}=this.state
    if(learningTopics.length>1){
        learningTopics.splice(index,1);
    }
    for(var i = 0;i<learningTopics.length;i++){
        learningTopics[i].id = i+1;
    }
    this.setState({learningTopics});
   }


   addSubjectTopics(selectedTopicsArray){
    if(selectedTopicsArray.length==0){
        swal({
            title: `No Selections Made`,
            text:`You have not seleted any topics to add`,
            icon: "error",
            buttons: false,
            dangerMode: true,
          })
    }
    else{
    swal({
        title: `Confirm selection?`,
        text:`You are adding ${selectedTopicsArray.length} topics to this course`,
        icon: "info",
        buttons: true,
        dangerMode: false,
      })
      .then((willAdd) => {
        if (willAdd) {
            var array = [];
            var i = 0;

            selectedTopicsArray.forEach(element => {
                var topicObject = new Object();
                topicObject.id = element.topic_id;
                topicObject.topic_id=element.topic_id;
                topicObject.name = element.topic_name;
                topicObject.topic_name=element.topic_name;
                topicObject.sortOrder = i;
                array.push(topicObject);
                i++;

            });
           this.setState({dragDropTopics:array})
      } else {

      }
    });
   }
}

   deleteSubjectTopic(item){
    let {dragDropTopics} = this.state;
    var newTopicList = dragDropTopics.filter(Listitem=>Listitem.id!=item.id);
    var i = 0;
    newTopicList.forEach(element => {
        element.sortOrder = i;
        i++;
    });
    this.setState({dragDropTopics:newTopicList,
                   selectedTopics:newTopicList
                });
   }





    //HANDLE CHANGE FUNCTIONS

    handleSubjectNameChange=(text)=> {
        this.setState({subjectName:text.target.value})
        }

    handleSubjectSubtitleChange=(text)=> {
        this.setState({subjectSubtitle:text.target.value})
        }

    handleCostChange=(cost)=> {
        this.setState({subjectCost:cost.target.value})
        }

    handleOldCostChange=(cost)=> {
        this.setState({old_subjectCost:cost.target.value})
        }
    

    handleDurationChange=(duration)=> {
        this.setState({subjectDuration:duration.target.value})
        }

    handleTestIdChange=(testid)=>{
        this.setState({testID:testid.target.value})
    }

    handleSubjectDescription(item,index){
        let subjectDescriptions = this.state.subjectDescriptions;
        let descriptionObject = subjectDescriptions[index];
        descriptionObject.description = item.target.value;
        this.setState({subjectDescriptions});
    }

    handleLearningRequirement(item,index){
        let {learningRequirements} = this.state;
        let requirementObject = learningRequirements[index];
        requirementObject.requirement = item.target.value;
        this.setState({learningRequirements});
    }

    handleLearningTopic(item,index){
        let {learningTopics} = this.state;
        let topicObject = learningTopics[index];
        topicObject.topic = item.target.value;
        this.setState({learningTopics});
    }

    handleRLDDChange(reorderedItems) {
        this.setState({ dragDropTopics: reorderedItems });
      }




    //RENDER FUNCTIONS
    renderSubjectNameSection(){
        return(
            <div className="col-12  subject-name-section d-flex">
                 <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                      Name:
                 </label>
                 <input
                    value={this.state.subjectName}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control subject-name-form custom-form"
                        onChange={(text)=>this.handleSubjectNameChange(text)}
                    />
            </div>
        )
    }

    renderSubjectSubtitleSection(){
        return(
            <div className="col-12  subtitle-section d-flex">
                 <label htmlFor="defaultFormRegisterNameEx" className="subject-subtitle-label subject-labels">
                      Subtitle:
                 </label>
                 <input
                    value={this.state.subjectSubtitle}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control subject-subtitle-form custom-form "
                        onChange={(text)=>this.handleSubjectSubtitleChange(text)}
                    />
            </div>
        )
    }



    renderCostSection(){
        return(
                 <div className="col-12  d-flex">
                 <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
                      Discounted Cost:
                 </label>
                 <input
                
                    value={this.state.subjectCost}
                        type="number"
                        id="defaultFormRegisterNameEx"
                        className="form-control cost-form custom-form w-25"
                        onChange={(cost)=>this.handleCostChange(cost)}
                    />
                  </div>
        )
    }

    renderDiscountedSection(){
        return(
                 <div className="col-12  d-flex">
                 <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
                      Original Cost:
                 </label>
                 <input
                
                    value={this.state.old_subjectCost}
                        type="number"
                        id="defaultFormRegisterNameEx"
                        className="form-control cost-form custom-form w-25"
                        onChange={(cost)=>this.handleOldCostChange(cost)}
                    />
                  </div>
        )
    }

    renderCourseDurationSection(){
        return(
            <div className="col-12  d-flex">
            <label htmlFor="defaultFormRegisterNameEx" className="course-duration-label subject-labels">
            Duration in minutes (approx):-
            </label>
            <input
               value={this.state.subjectDuration}
                   type="text"
                   id="defaultFormRegisterNameEx"
                   className="form-control duration-form custom-form w-25"
                   onChange={(duration)=>this.handleDurationChange(duration)}
               />
             </div>
     )
    }



 
    renderTestIdSection(){
        return(
            <div className="col-12  test-id-section d-flex align-items-center">
            <label htmlFor="defaultFormRegisterNameEx" className="test-id-label subject-labels">
                 Test Cost :
            </label>
     
                  <input
                    
                    value={this.state.testCost}
                        type="number"
                        id="defaultFormRegisterNameEx"
                        className="form-control cost-form custom-form w-25"
                        onChange={(cost)=>this.setState({testCost:cost.target.value})}
                    />

             </div>
     )
    }

    handlechangeurl = text => this.setState({ inputLink: text.target.value });

    renderEditImage = () => {
        return (
          <div className="col-12  d-flex">
          <label htmlFor="defaultFormRegisterNameEx" className="course-duration-label subject-labels">
              Enter file link:
            </label>
    
        
              <input
                autoFocus
                type="text"
                value={this.state.inputLink}
                onChange={text => this.handlechangeurl(text)}
                id="defaultFormRegisterNameEx"
                className="form-control duration-form custom-form "
              />
            
           
          </div>
        );
      };


    renderSubjectDescriptions(){
        return (this.state.subjectDescriptions.map((item,index)=>{
          return ( <React.Fragment key={item.id}>
                
                    <div className="d-flex align-items-start mt-3">
                   <label className="p-1" > {index+1}.&nbsp; </label>
                   <div className="position-relative w-100 mr-4">
                   <textarea
                   label="subject-description"
                   className="subject-description-textarea w-100"
                   type="text"
                   value={item.description}
                   onChange={(text)=>this.handleSubjectDescription(text,index)}
                     />
                      <MDBIcon className='cross_icon' onClick={()=>this.removeSubjectDescription(index)} icon="times-circle" />
                      </div>
                      </div>
                    <div className="w-100" />
                    
                    </React.Fragment>
                )
                    })
        )
    }


    renderLearningRequirements(){
        return (this.state.learningRequirements.map((item,index)=>{
          return ( <React.Fragment key={item.id}>
                   <div className="d-flex align-items-start mt-3">
                   <label  className="p-1" > {index+1}.&nbsp; </label>
                   <div className="position-relative w-100 mr-4">
                   <textarea
                   label="learning-requirement-label"
                   className="subject-description-textarea w-100"
                   type="text"
                   value={item.requirement}
                   onChange={(text)=>this.handleLearningRequirement(text,index)}
                     />
                      <MDBIcon className='cross_icon' onClick={()=>this.removeLearningRequirement(index)} icon="times-circle" />
                    </div>
                    </div>
                    <div className="w-100" />
                    </React.Fragment>
                )
                    })
        )
    }


    renderLearningTopics(){
        return (this.state.learningTopics.map((item,index)=>{
            return ( <React.Fragment key={item.id}>
                     <div className="d-flex align-items-start mt-3">
                     <label className="p-1"> {index+1}.&nbsp; </label>
                     <div className="position-relative w-100 mr-4">
                     <textarea
                     label="learning-topic-label"
                     className="subject-description-textarea w-100"
                     type="text"
                     value={item.topic}
                     onChange={(text)=>this.handleLearningTopic(text,index)}
                       />
                       
                        <MDBIcon className='cross_icon' onClick={()=>this.removeLearningTopic(index)} icon="times-circle" />
                      </div>
                      </div>
                      <div className="w-100" />
                      </React.Fragment>
                  )
                      })
          )
    }

    renderSubjectDescriptionContainer(){
        return(
            <React.Fragment>
        <div className="col-12 subject-description-container  d-flex align-items-center">
          <label htmlFor="defaultFormRegisterNameEx" className="subject-labels h-100">
                        Description(s):
          </label>
          
        <div className="descriptions-container">
        {this.renderSubjectDescriptions()}
        <button className="admin-button-style ml-30px float-right mr-4 mb-3" onClick={()=>this.addSubjectDescription()}>Add para</button>
        </div>  
        </div>
        </React.Fragment>)
    }


    renderLearningRequirementsContainer(){
        return(
        <React.Fragment>
        <div className="col-12 subject-descriptions-container d-flex align-items-center">
          <label htmlFor="defaultFormRegisterNameEx" className="subject-labels h-100">
                        Learning Requirement(s):
          </label>
        <div className="descriptions-container">
        {this.renderLearningRequirements()}
        <button className="admin-button-style ml-30px float-right mr-4 mb-3" onClick={()=>this.addLearningRequirement()}>Add para</button>
        </div>
        </div>
        </React.Fragment>
        )
    }

    renderLearningTopicsContainer(){
        return(
            <React.Fragment>
         <div className="col-12 subject-description-container  d-flex align-items-center">
          <label htmlFor="defaultFormRegisterNameEx" className="subject-labels h-100">
                        Learning Topic(s):
          </label>
        <div className="descriptions-container">
        {this.renderLearningTopics()}
        <button className="admin-button-style ml-30px float-right mr-4 mb-3" onClick={()=>this.addLearningTopic()}>Add para</button>
        </div>
        </div>
        </React.Fragment>)
    }


    renderExamSection(){
        return(
            <div className="col-12 exam-section">
            <label htmlFor="defaultFormRegisterNameEx" className="exam-label subject-labels pl-0">
                 Related Exams:
            </label>
            <Select
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={e=>this.setState({selectedExams:e})}
                    value={this.state.selectedExams}
                    className='select-exam select'
                    options={this.state.exams}

                />
             </div>
     )
    }

    renderTopicListSection(){
        return(
        <React.Fragment>
        <button className="show-topics-list-button" onClick={()=>this.setState({topicListShowing:!this.state.topicListShowing})}>Topics List <i className="fa fa-chevron-down" /></button>
        {this.state.topicListShowing?
    (   <div className="topic-list-picky-container">
        <Picky
         value={this.state.selectedTopics}
         options={this.state.topicsArray}
         onChange={(value)=>this.selectMultipleOption(value)}
         open={true}
         valueKey="topic_id"
         labelKey="topic_name"
         multiple={true}
         includeSelectAll={true}
         includeFilter={true}
         dropdownHeight={350}
         keepOpen={true}
         placeholder="Topics"
           />
           <div>
            <button className="w-50 float-right admin-button-style" onClick={()=>this.addSubjectTopics(this.state.selectedTopics)}>
                Save Topics
            </button>
        </div>
        </div>)
        :
        ""}
        </React.Fragment>
        )
    }


    renderTopicStructureSection(){
       if(this.state.dragDropTopics.length!=0)
        return(

                <RLDD
                cssClasses="drag-drop-topic-list"
                items={this.state.dragDropTopics}
                itemRenderer={this.itemRenderer}
                onChange={this.handleRLDDChange}
                />
        )
        else{
            return (<p className="text-muted text-center">There are currently no topics for this course!</p>)
        }
    }

    renderSubjectTopicsSection(){
        return(
            <React.Fragment>
            <div className="col-12 subject-topics-container">
            <label htmlFor="defaultFormRegisterNameEx" className="exam-label subject-labels py-3">
                Add Topics:
            </label>
            <div className="row mx-0 bg-white">
            <div className="col-3 topic-list-column px-0">
                {this.renderTopicListSection()}
            </div>

            <div className="col-9 topic-structure-column">
            <label htmlFor="defaultFormRegisterNameEx" className="exam-label subject-labels text-center w-100">
                 Topics Order:
            </label>
                 <hr />
                 {this.renderTopicStructureSection()}
            </div>

            </div>
            </div>
            </React.Fragment>
        )
    }


    renderRelatedSubjectsSection(){
        return (
            <React.Fragment>
                <div className="col-12 related-subjects-container my-2">
                <label htmlFor="defaultFormRegisterNameEx" className="related-subjects-label subject-labels pl-0">
                 Related Subjects:
                </label>
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={e=>this.setState({selectedSubjectList:e},()=>console.log(this.state.selectedSubjectList))}
                    value={this.state.selectedSubjectList}
                    className='select-exam select'
                    options={this.state.subjectList}

                />
                </div>
            </React.Fragment>
        )
    }
    renderClassSelect(){
        return(
            <div className="col-12 my-2 d-flex">
            <label htmlFor="defaultFormRegisterNameEx" className="subject-list-label subject-labels">
                 Classes Applicable:
            </label>
            <Select
               closeMenuOnSelect={false}
               onChange={e=>this.setState({class:e})}
               value={this.state.class}
               className='promocode-type select'
               options={this.state.classList}
               isMulti
           /> 
           </div>
        )
    }
    renderConditionalInputPromo(value){
        console.log(value,"conditional value");
    
            // if(value==0){
            //     return <p className="text-muted  text-center w-100">Applicable to all Products</p>
            // }
            if(value==0){
                return this.renderClassSelect();
            }
            if(value==1){
                return 
            }
            // if(value==3){
            //     return this.renderSubjectSelect();
            // }
            // if(value==4){
            //     return this.renderUserSelect();
            // }
            else{
                return <p className="text-muted  text-center w-100">Please select a Class type!</p>
            }
        }

    renderStudentsTypeSection(){
        return(
            
            <div className="col-12  d-flex">
            <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
            Categories :
            </label>
            <Select
               closeMenuOnSelect={true}
               onChange={e=>this.setState({studentType:e})}
               value={this.state.studentType}
               className='promocode-type select w-25 '
               options={this.state.StudentTypes}
           />
             </div>
        )
    }
    renderSelect() {

   

        return (
          <div className="col-5  d-flex align-items-baseline justify-content-end">
            <span
       
              style={{fontWeight:'bold',fontSize:'18px',paddingRight:'5px'}}
            >
              Language :
            </span>
            <Select
                      closeMenuOnSelect={true}
                      onChange={e => this.setState({ selectedLanguage: e },)}
                      value={this.state.selectedLanguage}
                      className="language-select "
                      options={this.state.options}
                    />
            {/* {console.log(y)} */}
          </div>
        );
      }
      


    render(){
        return(
            <div id="add-subject-page">
            <AdminNavbar {...this.props} />

            <div className="d-flex">
              <SidebarPage {...this.props} active={3}/>

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

                    <div className="row my-3 px-4">
                    <div className="col-12 top_button_bar d-flex align-items-center ">
                    <button className="admin-button-style admin-button-style-margin" onClick={()=>this.props.history.push('/admin/subject-list')}>
                        All Subjects
                    </button>
                    <MediaComponent onSelectMediaItem={this.handleMediaChooseImage} buttonName={<MDBIcon icon="camera" /> } restriction= 'image/*' /> 
                    <button className="admin-button-style ml-auto" onClick={()=>this.editSubject()}> Save &amp; Publish</button>

                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Edit Subject</h3> 

                    {this.renderSelect()}
                    </div>
                    </div>
                <div className="d-flex">
                <div className="subject-content-container ml-4">
                <div className="row px-0 mx-0">
                {this.renderStudentsTypeSection()}
                       
                       {this.renderConditionalInputPromo(this.state.studentType.value)}
                    {this.renderSubjectNameSection()}
                    {this.renderSubjectSubtitleSection()}
                    {this.renderCostSection()}
                    {this.renderDiscountedSection()}
                    {this.renderCourseDurationSection()}
                    {this.renderTestIdSection()}
                    {this.renderEditImage()}
                    {this.renderSubjectDescriptionContainer()}
                    {this.renderLearningRequirementsContainer()}
                    {this.renderLearningTopicsContainer()}
                </div>
                </div>
                <div className="subject-select-fields-container ml-2 row align-self-start flex-column mr-4">
                {this.renderExamSection()}
                {this.renderRelatedSubjectsSection()}
                </div>
                </div>

                <div className="subject-topics-container mx-4 mt-4">
                    <div className="row p-0 mx-0">
                    {this.renderSubjectTopicsSection()}
                    </div>
                </div>

                <hr />

                    <button className="add-subject my-5 float-right mr-4" onClick={()=>this.editSubject()}>Save &amp; Publish</button>
                    
                    
                    </React.Fragment>
                   )
                }
              </div>


            </div>
        </div>
        )
    }
}


export default EditSubject;





            