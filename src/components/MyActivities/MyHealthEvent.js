import React, {Fragment, useState , useReducer} from "react";
import {useHistory} from "react-router-dom";
import "./MyActivitiesStyle.scss";
import {PersianLan} from "../../constants/Strings";
import Button from '@material-ui/core/Button';
import {Person, LocationOn, People, ExpandMore} from "@material-ui/icons";
import Modal from '@material-ui/core/Modal';
import {MyHealthEventConsts} from "../../constants/MyHealthEventConsts";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {bindActionCreators} from "redux";
import {ActionCreator} from "../../redux/actions";
import {connect} from "react-redux";


function MyHealthEvent(props) {

    let history  = useHistory();

    const [open, setOpen] = useState(false); // for open modal

    const [item, setItem] = useState([]);  //for set modal values
    const [selectedItem , setSelectedItem] = useState(null);  // for the item that selected to show it's modal
// console.log( localStorage.getItem("myHealthItems"));
//     let savedData = localStorage.getItem("myHealthItems") || {};
//     console.log("@@@@@@@@@@############", JSON.parse(savedData).fever);
//     let jsonData = typeof savedData === "string" ? savedData : {};

    const [fever, setFever] = useState(localStorage.getItem("myHealthFever"));  // تب
    const [soreThroat, setSoreThroat] = useState(localStorage.getItem("myHealthSoreThroat"));  // گلودرد
    const [dryCough, setDryCough] = useState(localStorage.getItem("myHealthDryCough"));  // سرفه خشگ
    const [holdingThe‌ٰ‌‌‌‌Breath, setHoldingTheBreath] = useState(localStorage.getItem("myHealthShortnessOfBreath"));  // نگه داشتن نفس
    const [breathrate, setBreathrate] = useState(localStorage.getItem("myHealthBreathRate"));  // تعداد تنفس
    const [adenoid, setAdenoid] = useState(localStorage.getItem("myHealthNasalCongestion"));  // گرفتگی بینی
    const [bodyPain, setBodyPain] = useState(localStorage.getItem("myHealthIBodyPain"));  // بدن درد
    const [runnynose, setRunnynose] = useState(localStorage.getItem("myHealthIRunnyNose"));  // آبریزش بینی
    const [sneeze, setSneeze] = useState(localStorage.getItem("myHealthSneeze"));  //عطسه
    const [headache, setHeadache] = useState(localStorage.getItem("myHealthIHeadache"));  //سردرد
    const [inaction, setInaction] = useState(localStorage.getItem("myHealthLethargy")); //بیحالی

    const addHealth = () => {
        console.log(fever);
        const data = {
            "fever" : fever,
            "sore_throat" : soreThroat,
            "dry_cough" : dryCough,
            "shortness_of_breath" : holdingThe‌ٰ‌‌‌‌Breath,
            "breath_rate" : breathrate,
            "nasal_congestion" : adenoid,
            "body_pain" : bodyPain,
            "runny_nose" : runnynose,
            "sneeze" : sneeze,
            "headache" : headache,
            "lethargy" : inaction
        }


        console.log(data);

        props.createHealthEventInBulk(data , history);

    }

    const setSelectedItemVal = (val) => {
        switch (selectedItem){
            case 1: {setFever(val); break}
            case 2: {setSoreThroat(val); break}
            case 3: {setDryCough(val); break}
            case 4: {setHoldingTheBreath(val); break}
            case 5: {setBreathrate(val); break}
            case 6: {setAdenoid(val); break}
            case 7: {setBodyPain(val); break}
            case 8: {setRunnynose(val); break}
            case 9: {setSneeze(val); break}
            case 10: {setHeadache(val); break}
            case 11: {setInaction(val); break}

        }
    }

    return (
        <div className={`contentWrapper MyHealthEventsWrapper`}>
            <div className="topMessage">
                {PersianLan.myActivitiesTab.healthEventTopMsg}
            </div>
            <div className="healthItemsContainer">
                <div onClick={() => {
                    setItem(MyHealthEventConsts.fever);
                    setSelectedItem(1);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">تب: </span>
                        <span className="item-value">{fever}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>
                <Divider/>
                {/*--------------------------------------------------------*/}
                <div onClick={() => {
                    setItem(MyHealthEventConsts.soreThroat);
                    setSelectedItem(2);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">گلودرد: </span>
                        <span className="item-value">{soreThroat}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>
                <Divider/>
                {/*--------------------------------------------------------*/}
                <div onClick={() => {
                    setItem(MyHealthEventConsts.dryCough);
                    setSelectedItem(3);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">سرفه خشک: </span>
                        <span className="item-value">{dryCough}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>
                <Divider/>
                {/*--------------------------------------------------------*/}
                <div onClick={() => {
                    setItem(MyHealthEventConsts.holdingThe‌ٰ‌‌‌‌Breath);
                    setSelectedItem(4);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">نگه داشتن نفس: </span>
                        <span className="item-value">{holdingThe‌ٰ‌‌‌‌Breath}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>
                <Divider/>
                {/*--------------------------------------------------------*/}
                <div onClick={() => {
                    setItem(MyHealthEventConsts.breathrate);
                    setSelectedItem(5);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">تعداد تنفس: </span>
                        <span className="item-value">{breathrate}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>
                <Divider/>
                {/*--------------------------------------------------------*/}
                <div onClick={() => {
                    setItem(MyHealthEventConsts.adenoid);
                    setSelectedItem(6);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">گرفتگی بینی: </span>
                        <span className="item-value">{adenoid}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>
                <Divider/>
                {/*--------------------------------------------------------*/}
                <div onClick={() => {
                    setItem(MyHealthEventConsts.bodyPain);
                    setSelectedItem(7);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">بدن درد: </span>
                        <span className="item-value">{bodyPain}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>
                <Divider/>
                {/*--------------------------------------------------------*/}
                <div onClick={() => {
                    setItem(MyHealthEventConsts.runnynose);
                    setSelectedItem(8);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">آبریزش بینی: </span>
                        <span className="item-value">{runnynose}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>
                <Divider/>
                {/*--------------------------------------------------------*/}
                <div onClick={() => {
                    setItem(MyHealthEventConsts.sneeze);
                    setSelectedItem(9);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">عطسه: </span>
                        <span className="item-value">{sneeze}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>
                <Divider/>
                {/*--------------------------------------------------------*/}
                <div onClick={() => {
                    setItem(MyHealthEventConsts.headache);
                    setSelectedItem(10);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">سردرد: </span>
                        <span className="item-value">{headache}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>
                <Divider/>
                {/*--------------------------------------------------------*/}
                <div onClick={() => {
                    setItem(MyHealthEventConsts.inaction);
                    setSelectedItem(11);
                    setOpen(true);
                }}>
                    <div>
                        <span className="item-label">بی حالی: </span>
                        <span className="item-value">{inaction}</span>
                    </div>
                    <div>
                        <ExpandMore/>
                    </div>
                </div>

            </div>

            <div style={{position:"absolute" , bottom:20 ,width: "97%",
                display:"flex",
                justifyContent: "center"}}>
            <Button onClick={() => {
                addHealth();
            }}
                    disableElevation
                    className="addHealthBtn"
                    color="primary"
                    variant="contained">{PersianLan.myActivitiesTab.addHealthConditionBtn}</Button>

            </div>

            {/*------------------------------------------------------------------------*/}
            {/*------------------------------------------------------------------------*/}
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="myHealthDialogContainer">
                    <List component="div">
                        {
                            item.map((val , index) => {
                                return (
                                    <Fragment key={val}>
                                        <ListItem button onClick={() => {
                                            setSelectedItemVal(val);
                                            setOpen(false);
                                        }}>
                                            <ListItemText primary={val}/></ListItem>
                                        <Divider/>
                                    </Fragment>
                                )})}
                    </List>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreator , dispatch);
}

export default connect(mapStateToProps , mapDispatchToProps)(MyHealthEvent);