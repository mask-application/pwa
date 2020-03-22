import React from "react";
import "./HeaderStyle.scss";
import {PersianLan} from "../../constants/Strings";

export default function Header(props){

       if(props.iconyHeader) {  //هدر دارای آیکون
           return (
               <div className="app-header"></div>
           )
       }else if(props.stackHeader){ //هدر با دکمه برگشت(صفحه داخلی)
           return (
               <div className="app-header"></div>
           )
       }else{
           return (
               <div className={`app-header simple-app-header`}>{PersianLan.app_header}</div>
           )
       }


}