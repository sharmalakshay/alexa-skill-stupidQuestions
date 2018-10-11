/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = 'nope_aint_gonna_tell_you';

const SKILL_NAME = 'Stupid Questions';
const GET_QUESTION_MESSAGE = "";
const HELP_MESSAGE = 'You can say ask me a stupid question, or, you can say... nothing... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Cool!';

const data = [
    'Why do people not believe it when someone say that earth is flat?',
    'Why is it that there is no "W" in "one", but there\'s a "W" in "Two" and we don\'t use it?',
    'Can I trust you to be a real person? You could be a fake bot on the internet. And I have standards.',
    'Why is an electrical outlet called an outlet when you plug things into it? Shouldn\'t it be called an inlet?',
    'Why does someone believe you when you say there are four billion stars, but check when you say the paint is wet?',
    'Did they purposely make dyslexia hard to spell?',
    'Why do we call them oranges when half of \’em are yellow?',
    'Why is it that when you\'re driving and looking for an address, you turn down the volume on the radio?',
    'Why can\'t women put on mascara with their mouth closed?',
    'Why isn\'t there a mouse-flavored cat food?',
    'Why is \“phonics\” not spelled the way it sounds?',
    'Why isn\’t 11 pronounced \“onety-one\”?',
    'If a word is misspelled in the dictionary, how would we ever know?',
    'What do people in China call their good plates?',
    'How important does a person have to be before they are considered assassinated instead of just murdered?',
    'Why are Softballs hard?',
    'If you mated a bull dog and a shitsu, would it be called a bullshit?',
    'Why is it that night falls but day breaks?',
    'If electricity comes from electrons, does morality come from morons?',
    'What do you call it when fat people swim naked?',
    'Why does your gynecologist leave the room when you undress?',
    'How do \“Do not walk on the grass\” signs get there?',
    'Why is the word for “a fear of long words,\” hippopotomonstrosesquippedaliophobia, so long?'
];

const handlers = {
    'LaunchRequest': function () {
        this.emit('AskStupidQuestion');
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
    'SessionEndedRequest': function(){
        this.emit('AMAZON.StopIntent');
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
