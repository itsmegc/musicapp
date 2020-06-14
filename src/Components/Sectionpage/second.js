import React, { Component } from "react";
import "./second.css";
import HomeHeader from "../../Reusable/Header/homeHeader";
import MainFooterPage from "../../Reusable/Footer/footer";




export default class second extends Component {
  state = {
   
    loading: true,
   
  };
  UNSAFE_componentWillMount() {
    let artistDetail = JSON.parse(localStorage.getItem("artist"));
    let artist_id = artistDetail.id;
    this.setState({ artist_id,
      name:artistDetail.title,
      img:artistDetail.image,
      description:artistDetail.description})
    

  }

  render() {
    
  
      return (
        <div  id='second' >
          <HomeHeader
          
          />
          <div  className="container pt-5 ">

          
          <div className="artistDiv1 d-flex pt-5 pb-5" >
          <img className='ImageSize mt-5'  
          alt='art'
          src={this.state.img} />
          
          <div className='artistDetail m-5'>
          <h1 style={{color:'black'}}>{this.state.name}</h1>
          <hr className='HrTag' ></hr>
          <hr className='HrTag' ></hr>
            

          <h4 className='mt-4' style={{fontWeight:'600'}}> about {this.state.name}</h4>
         <h6 className='mt-2' style={{color:'black'}}>{this.state.content}</h6>

         <h4 className='mt-4' style={{fontWeight:'600'}}>Songs</h4>
         <li>xxx</li>
         <li>xxx</li>
         <li>xxx</li>
         <li>xxx</li>
          </div>
          </div>


         
        </div>
          
        

        
         
              <MainFooterPage  />
           
        </div>
      );
    
  }
}
