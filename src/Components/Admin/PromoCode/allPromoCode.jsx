import React from 'react'
import SidebarPage from '../Sidebar/sidebarPage';
import AdminNavbar from '../Navbar/adminNavbar'
import {MDBTable,MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter, MDBTableHead } from "mdbreact";
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader'; 
import './allPromoCode.css';
import {FormGroup,Input,Label} from 'reactstrap';
import { Button } from 'react-bootstrap';
import ActivePNG from '../../../Assets/images/activestatus.png';
import InactivePNG from '../../../Assets/images/inactivestatus.png';
import swal from 'sweetalert';

const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:20% 45%;
`;


class AllPromoCode extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            order_data:[]
        }
    }


    componentWillMount(){
     this.getPromos();
    }



    //status
    
    changeStatus(item,status){
        this.setState({
            loading:true
          })
           let details = {
           promo_id:item.promo_id,
           status:status
         };
         console.log(details,'details')
         let formBody = [];
         for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
         }
         formBody = formBody.join("&");
         
         this.setState({
          response: fetch('http://18.221.47.207:3000/promo_status', {
            method: 'POST',
            headers: {
             
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cache-Control': 'max-age=31536000'
          },
         body:formBody
           
            
          }).then((response) => response.json())
          .then((responseJson)=>{
               window.location.reload()
            
          }
         
          )
            .catch((error) => {
           this.setState({
             loading:false
           })
           swal("Warning!", "Check your network!", "warning");
         console.log(error)
             })
           })
    }



    //GET FUNCTION
    getPromos = async() => {
        console.log("fetching orders")
         this.setState({
          loading:true
      })
       this.setState({
      response: fetch('http://18.221.47.207:3000/get_promo_codes', {
       method: 'GET',
       headers: {
        
         'Content-Type': 'application/x-www-form-urlencoded',
       
      },
      
      
       
      }).then((response) => response.json())
      .then((responseJson)=>{
        console.log(responseJson,'promos') 
     this.setState({  
        order_data:responseJson,
        loading:false
     })
      }
      
      )
       .catch((error) => {
      this.setState({
        loading:false
      })
      alert("Warning!", "Check your network!", "warning");
      console.log(error)
        })
       })
    }



    componentDidMount(){
        window.localStorage.removeItem('subject_item');
    }


    //TIMESTAMP FUNCTION
    commentdate(timestamp){ 
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Novr", "Dec"
      ];
        var dt = new Date(timestamp);
        var dd = dt.getDate(); 
        var mm = (dt.getMonth()+1); 
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
       return (  dd +"/"+mm+ "/" +(dt.getFullYear()).toString());
      }
    
    //CLICK HANDLERS
    handleOptionChange = (index) => {
        let {order_data}=this.state
        var orders=order_data[index];
        orders.status==1?order_data.status=0:order_data.status=1;
        this.setState({order_data});
    }

    handleEditSubject(item){
        window.localStorage.setItem('promo_item', JSON.stringify(item))
        window.localStorage.setItem('promo_list',JSON.stringify(this.state.subjects))
        this.props.history.push('/admin/edit-promocode');
    }



    //RENDER 

  
    renderActiveStatus(item){
        if(item.status==1){
          return <img src={ActivePNG} alt="Course is active" className="course-status-icon" onClick={()=>this.changeStatus(item,0)}/>
        }
        else{
          return <img src={InactivePNG} alt="Course is INactive" className="course-status-icon" onClick={()=>this.changeStatus(item,1)} />
        }
      }

      

    renderOrderTableContent(){
        return this.state.order_data.map((item,index)=>{
            return(
            <tr key={index}>
               <td className="promo-code-td">{item.promo_code} <br/>
                    <button className="edit-promo-button" onClick={()=>this.handleEditSubject(item)}>Edit</button>
                </td>
                <td>{item.type}</td>
                <td>{item.discount} %</td>
                <td>{item.minimum_order} &#8377;</td>
               <td>{this.commentdate(item.start_date)}</td>
               <td>{this.commentdate(item.end_date)}</td>
               <td>{this.renderActiveStatus(item,index)}</td>
            </tr>
            )
        })
    }


    renderOrdersTable(){
        return(
            <MDBTable  striped className="pages_table" style={{backgroundColor:'#F9F9F9'}}>
                <MDBTableHead>
                   <tr style={{backgroundColor:'white'}}>
                      {/* <th><input type="checkbox" onClick={(event)=> this.setState({all_selected:!this.state.all_selected},()=>this.handleAllChecked(event))   }  checked={this.state.all_selected}  value="checkedall" /></th> */}

                       <th className="" >Promocode</th>
                       <th>Type</th>
                        <th>Discount</th>
                        <th>Min Cart Value</th>
                       <th>Start Date </th>
                       <th>End Date </th>
                      <th>Status</th>
                     </tr>
                </MDBTableHead>
                <MDBTableBody>
                 {this.renderOrderTableContent()}
                </MDBTableBody>
            </MDBTable>
        )
    }

    render(){
        console.log(this.state);
        return(
            <div id="promo-code-page">

                <AdminNavbar {...this.props} />

                <div className="d-flex">

                <SidebarPage {...this.props}  active={5} />

                <div className="subject-list-column">
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
                            <div className="row mx-0 d-flex align-items-center">
                                
                            <h3 className="pl-2 my-3 promocode-title"> PromoCode </h3>
                            <button className="float-right add_new_button" style={{height:'30px'}} onClick={()=> this.props.history.push('/admin/add-promocode')}>Add New </button>
                            </div>
                            {this.renderOrdersTable()}
                            </React.Fragment>
                        )
                    }

                </div>
                </div>
            </div>
        )
    

        }
}



export default AllPromoCode;