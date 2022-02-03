import React from 'react';
import {render} from 'react-dom';
import timerpic from './timer.png';

// CSS
const input = {
    backgroundColor : "#eea",
    display : "flex",
    flexDirection: "column",
    width: "fit-content",
    margin: "auto",
    fontSize : "20px",
    fontFamily : "Arial",
}
const input__label = {
    marginBottom : "30px",
    fontFamily: "Lato",
    fontWeight: "bold"
}

const label = {
    marginBottom : "20px",
    fontFamily: "Lato"
}

const inputBoxs = {
    display : "flex",
}

const inputBox = {
    margin : "20px",
    display: "flex",
    flexDirection : "column",
    alignItems: "center"
}

const input__champ = {
    width: "59px",
    height: "23px",
    marginRight: "20px",
    padding: "9px",
    fontSize: "19px",
    border: "none",
    borderRadius: "8px",
}

const timerContenu = {
    display: "none",
}

const timer_img = {
    height: "50px",
}

const hauteurTitre = {
    height : "7vh",
    backgroundColor : "#169",
    paddingTop : "10px",
    paddingBottom : "20px",
    paddingRight : "18px",
    display : "flex",
    flexDirection : "row",
    alignItems : "center",
    justifyContent : "space-between"
}
const title = {
    color : "white",
    paddingLeft : "16px",
    fontFamily : "Lato",
    display: "flex",
    alignItems: "center",
}

const hauteurContenu = {
    height : "79vh",
    backgroundColor : "#eea",
    align : "center",
    textAlign: "center",
    paddingTop :"69px",
    marginTop: "10px",
}

const timer = {
    backgroundColor : "white",
    width : "120px",
    margin : "auto",
    padding : "15px",
    fontSize : "30px",
    fontFamily : "Lato",
    borderRadius: "20px",
}
const timer_infos = {
    fontSize : "20px",
    fontFamily : "Lato",
    fontWeight: "bold"
}
const btn_timer = {
    backgroundColor: "#106699",
    color: "white",
    border : "none",
    borderRadius : "18px",
    boxShadow : "6px 0 18px rgb(0 0 0 / 6%)",
    padding : "14px",
    cursor : "pointer",
    fontFamily : "Lato",
    fontSize : "17px",
    marginRight : "10px",
    width: "fit-content",
    margin: "10px",
    fontWeight: "bold"
}

const btn_timerValid = {
    backgroundColor: "#106699",
    color: "white",
    border : "none",
    borderRadius : "18px",
    boxShadow : "6px 0 18px rgb(0 0 0 / 6%)",
    padding : "14px",
    cursor : "pointer",
    fontFamily : "Lato",
    fontSize : "17px",
    marginRight : "10px",
    width: "fit-content",
    margin: "auto",
    fontWeight: "bold"
}


let stopTimerStatus = 0;
let nbTimerEnclenches = 1;
let timeTravail = 0;
let timePause = 0;
let timerExecute = null;


class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {count:25, mode:"Pause : Have break, have a KitKat ! ", temps :"00:00"};
    }

    componentDidMount(){
        let tempsRestants = this.affichageTemps();
        this.state.temps = tempsRestants;
    }

    affichageTemps () {
        let minutes = Math.floor(this.state.count / 60);
        let secondes = this.state.count - minutes * 60;

        function str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
        }

        let tempsRestant = str_pad_left(minutes,'0',2)+':'+str_pad_left(secondes,'0',2);
        this.state.temps = tempsRestant;
    }

    compte() {
        // console.log(this.state.count);
        if (nbTimerEnclenches % 2 === 0) {
            this.setState({mode : "Pause : Have break, have a KitKat ! "});
        }
        else {
            this.setState({mode : "Travail : Au boulot !"});
        }
        this.affichageTemps();

        if (stopTimerStatus === 0) {
            //console.log(this.state.count);
            if (this.state.count < 20 && this.state.count > 1) {
                document.getElementById("timer").style.backgroundColor = "#f43";
            }
            else if (this.state.count <= 0) {
                document.getElementById("timer").style.backgroundColor = "white";
                nbTimerEnclenches++;
                stopTimerStatus = 1;
            }
            if (this.state.count > 0) {
                this.setState({count: this.state.count - 1})
            }
        }
        else if (stopTimerStatus === 1) {
            //this.setState({count: timeTravail})

            if (nbTimerEnclenches % 2 === 0) {
                this.setState({count : timePause}, ()=> {
                    console.log(this.state);
                });
            }
            else {
                this.setState({count : timeTravail}, ()=> {
                    console.log(this.state);
                });
            }
            stopTimerStatus = 0;
        }
    }

    timer() {
        timerExecute =  setInterval(this.compte.bind(this), 1000);
    }

    stopTimer() {
        clearTimeout(timerExecute);
        this.state.count = 25;
        this.state.temps = "00:00";
        this.affichageTemps();
    }

    resetTimer() {
        // this.state.count = timeTravail;
        this.setState({count: timeTravail})
        clearTimeout(timerExecute);
        this.timer();
        document.getElementById("timer").style.backgroundColor = "white";
    }

    displayTimer = () => {
        document.getElementById("timerContenu").style.display = "block";
        document.getElementById("inputsChoixTemps").style.display = "none";
        timePause = document.getElementById('timePause').value
        timeTravail = document.getElementById('timeTravail').value;
        //console.log(timeTravail);
        //this.state.count = timeTravail;
        timePause = document.getElementById('timePause').value;
        //console.log(timePause);
        //this.setState({count : timeTravail});
        this.setState({count : timeTravail}, ()=> {
            console.log(this.state);
        });
    }

    displayGestionTemps = () => {
        document.getElementById("timerContenu").style.display = "none";
        document.getElementById("inputsChoixTemps").style.display = "block";
    }

    render() {
        return (
            <div>
                <div style={hauteurTitre}>
                    <h1 style={title}>
                        <img style={timer_img} src={timerpic} alt="timer"/>
                        MON PODORO
                    </h1>
                    <p style={title} >REACT - PROJET N°1 </p>
                </div>

                <div style={hauteurContenu}>

                    <div id="inputsChoixTemps" style={input}>
                        <label style={input__label} >Rentrez la durée de travail et de la pause (en secondes) </label>
                        <div style={inputBoxs}>
                            <div style={inputBox}>
                                <label style={label} >Durée de la période de travail</label>
                                <input style={input__champ} type="number" id="timeTravail" name="dureeTravail"/>
                            </div>

                            <div style={inputBox}>
                                <label style={label}>Durée de la pause</label>
                                <input style={input__champ} type="number" id="timePause" name="dureePause"/>
                            </div>
                        </div>
                        <button style={btn_timerValid} onClick={this.displayTimer}>Valider</button>
                    </div>

                    <div id="timerContenu" style={timerContenu}>
                        <p id ="timer" style={timer}>{this.state.temps}</p>
                        <p style={timer_infos} >{this.state.mode}</p>
                        <div>
                            <button style={btn_timer} onClick={this.resetTimer.bind(this)}> Lancer / Relancer le timer </button>
                            <button style={btn_timer} onClick={this.stopTimer.bind(this)}> Arrêter le timer </button>
                            <button style={btn_timer} onClick={this.displayGestionTemps.bind(this)}> Gestion des durées de pause / travail </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

let count = 1;
const rootElt = document.getElementById("root");
render (<Demo count={count}/>, rootElt);



