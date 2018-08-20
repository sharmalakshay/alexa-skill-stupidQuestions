/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.058eae46-3dd7-49f0-898a-bbd9e3d83b1e';

const SKILL_NAME = 'Stupid Questions';
const GET_QUESTION_MESSAGE = "";
const HELP_MESSAGE = 'You can say ask me a stupid question, or, you can say... nothing... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Cool!';

const data = [
    'Why do people not believe it when someone say earth is flat?',
    'Why is it that there is no "W" in "one", but there\'s a "W" in "Two" and we don\'t use it?',
    'Can I trust you to be a real person? You could be a fake bot on the internet. And I have standards.'
];

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'AskStupidQuestion': function () {
        const questionsArray = data;
        const questionsIndex = Math.floor(Math.random() * questionsArray.length);
        const randomQuestion = questionsArray[questionsIndex];
        //const speechOutput = GET_QUESTION_MESSAGE + randomFact;
        const speechOutput = randomQuestion;

        this.response.cardRenderer(SKILL_NAME, randomQuestion);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.FallbackIntent': function(){
        const questionsArray = data;
        const questionsIndex = Math.floor(Math.random() * questionsArray.length);
        const randomQuestion = questionsArray[questionsIndex];
        //const speechOutput = GET_QUESTION_MESSAGE + randomFact;
        const speechOutput = randomQuestion;

        this.response.cardRenderer(SKILL_NAME, randomQuestion);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
