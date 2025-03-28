import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    greeting = 'Earthlings';

    changeHandler(event) {
        //console.log(event.target.value);
        this.greeting = event.target.value;
    }
}