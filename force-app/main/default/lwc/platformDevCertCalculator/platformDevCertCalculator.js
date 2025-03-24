//import { LightningElement, track } from 'lwc';
//Without track
import { LightningElement } from 'lwc';

const devFundamentalsWeight = 0.23 ;
const processAutoWeight = 0.30;;
const userInterfaceWeight = 0.25;
const testDebugDeployWeight = 0.22;
const pdiPassingScore = 68;

export default class PlatformDevCertCalculator extends LightningElement {

    devFundamentalsScore = 50;
    processAutoScore = 50;
    userInterfaceScore = 50;
    testDebugDeployScore = 50;

    certificationScore = 0;
    numberOfQuestions = 60;
    
    showResources = false;
    //showGoodJob = false;

    // This will hold the highest Id on the attempt history
    highestId = 0;

    //@track attemptHistory = [
    //Without track
    // attemptHistory = [
    //     {Id: 1, Score: 50},
    //     {Id: 2, Score: 67},
    //     {Id: 3, Score: 70},
    //     {Id: 4, Score: 90},
    // ];

    attemptHistory = [];  // Let's start fresh, no history yet.

    calculateScore() {
        let devFundamentalsWeightScore  = this.devFundamentalsScore * devFundamentalsWeight;
        let processAutoWeightScore = this.processAutoScore * processAutoWeight;
        let userInterfaceWeightScore = this.userInterfaceScore * userInterfaceWeight;
        let testDebugDeployWeightScore = this.testDebugDeployScore * testDebugDeployWeight;
        this.certificationScore = (
            devFundamentalsWeightScore + 
            processAutoWeightScore + 
            userInterfaceWeightScore + 
            testDebugDeployWeightScore).toFixed(2);  // Format to 2 decimal places only
        
        this.showResourceIfFailed();
        this.addAttemptHistory(this.certificationScore);
    }

    handleChange(event) {
        console.log(event.target.name, event.target.value);
        // console.log(event.target.type);
        // console.log(event.target.label);
        const inputName = event.target.name;
        let value = Number(event.target.value);

        if (inputName === 'devFundamentals') {
            this.devFundamentalsScore = value;
        } else if (inputName === 'processAuto') {
            this.processAutoScore = value;
        } else if (inputName === 'userInterface') {
            this.userInterfaceScore = value;
        } else if (inputName === 'testDebugDeploy') {
            this.testDebugDeployScore = value;
        }
    }

    showResourceIfFailed() {
        if (this.certificationScore < pdiPassingScore) {
            this.showResources = true;            
        } else {
            this.showResources = false;
        }
        this.showGoodJob = !this.showRsources;
    }


    //Used with track example
    //addAttemptHistory(score) {
    //Below is used with complex object example (with capital S for Score)
    addAttemptHistory(Score) {
        // Solution using 'track'
        /*
        let randomId = Math.floor(Math.random() * 100);        
        console.log(randomId);
        this.attemptHistory.push(
            { Id: randomId, Score: score }
        );
        */

        // My Solution: Get the max Id number and use it to generate new Id when adding score
        // This will avoid Id duplication and also when deleting all attempts
        this.highestId = Math.max(...this.attemptHistory.map(obj => obj.Id));
        if (this.highestId < 0) {
            this.highestId = 0;
        }
        console.log('TypeOf highestId:', typeof this.highestId, this.highestId);
        //console.log('Score:', Score, Math.round(Score));

        // Solution without 'track'
        // Complex object (reactive)
        const attempt = 
            {
                //Id: this.attemptHistory.length + 1, Score
                Id: this.highestId + 1, Score
            }
        this.attemptHistory = [...this.attemptHistory, attempt];  // spread operator

    }
    
    deleteAttemptHandler(event) {
        console.log('this is called from parent to handle delete', event.detail);
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
        //console.log('New attempt history ' + this.attemptHistory);
    }
}