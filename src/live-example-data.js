/*

    Some sample data

*/
export const team = [
    
    { "name": "Andrew", "id": "asg", "color": "0,116,217", "roles": [ "tar"] },
    { "name": "Dirk", "id": "dr", "color": "61,153,112", "roles": [ "own" ] },
    { "name": "Omer", "id": "oc", "color": "46, 204, 64", "roles": [ "bar" ] }, // 1,255,112
    { "name": "Imran", "id": "im", "color": "127,219,255", "roles": [ "tar" ] }

];
/*

    Events are individual scorings of users against a behaviour

*/
export const events = [

    { "id": "asg", "when": "2017-09-17", "score": -1, description: "Andrew did something noted here" },
    { "id": "dr", "when": "2017-09-17", "score": 2, description: "Dirk did something noted here" },
    { "id": "oc", "when": "2017-09-17", "score": 2, description: "Omer did something noted here" },
    { "id": "asg", "when": "2017-10-10", "score": -1, description: "Andrew did something noted here" },
    { "id": "dr", "when": "2017-10-10", "score": 2, description: "Dirk did something noted here" },
    { "id": "im", "when": "2017-10-10", "score": 4, description: "Imran did something noted here" },
    { "id": "oc", "when": "2017-10-10", "score": 4, description: "Omer did something noted here" },
    { "id": "asg", "when": "2017-10-17", "score": 3, description: "Andrew did something noted here" },
    { "id": "dr", "when": "2017-10-17", "score": 1, description: "Dirk did something noted here" },
    { "id": "dr", "when": "2017-10-17", "score": 1, description: "Dirk did something noted here" },
    { "id": "oc", "when": "2017-10-17", "score": 1, description: "Omer did something noted here" },
    { "id": "asg", "when": "2017-11-17", "score": -1, description: "Andrew did something noted here" },
    { "id": "im", "when": "2017-11-17", "score": -1, description: "Imran did something noted here" },
    { "id": "dr", "when": "2017-11-17", "score": 5, description: "Dirk did something noted here" },
    { "id": "oc", "when": "2017-11-17", "score": 3, description: "Omer did something noted here" },
    { "id": "asg", "when": "2017-12-10", "score": -1, description: "Andrew did something noted here" },
    { "id": "asg", "when": "2017-12-10", "score": -1, description: "Andrew did something noted here" },
    { "id": "dr", "when": "2017-12-10", "score": 2, description: "Dirk did something noted here" },
    { "id": "oc", "when": "2017-12-10", "score": 1, description: "Omer did something noted here" },
    { "id": "im", "when": "2017-12-10", "score": 1, description: "Imran did something noted here" },
    { "id": "asg", "when": "2017-12-17", "score": 3, description: "Andrew did something noted here" },
    { "id": "dr", "when": "2017-12-17", "score": 2, description: "Dirk did something noted here" },
    { "id": "oc", "when": "2017-12-17", "score": 4, description: "Omer did something noted here" }

];
/*

    Some roles which are a grouping of behaviours

*/
export const roles = [ { 

    id: "bar",
    title: "Business architect",
    description: "The business architect is repsonsible for ensuring business rules are coherent and appropriate.",
    behaviours: [ 
        { id: "leader", weight: 5 },
        { id: "analytical", weight: 10 },
        { id: "biz", weight: 10 }
    ]
},
{ 
    id: "tar",
    title: "Technical architect",
    description: "The technical architect should ensure that technical decisions correctly balance agility, robustness and time-to-market.",
    behaviours: [ 
        { id: "leader", weight: 5 },
        { id: "analytical", weight: 10 },
        { id: "tech", weight: 10 }
    ]
},
{ 
    id: "own",
    title: "Business owner",
    description: "The business owner should ensure that the experiment is being correctly targetting the major sources of uncertainty about the business model.",
    behaviours: [
        { id: "leader", weight: 25 }
    ]
} ];
/*

    This template can be used to customise data displayed when selecting a role

*/
export const roleTemplate = [ "title", "specifics", "measurement" ];
/*

    Behaviours are the measurement against which we are scoring users

*/
export const behaviours = [ {

    id: "leader",
    title: "Leader",
    description: "Being an inspiring leader for the team",
    upScore: 1,
    downScore: 1

}, {

    id: "analytical",
    title: "Analytical",
    description: "Having an analytical mindset",
    upScore: 1,
    downScore: 1

}, {

    id: "biz",
    title: "Business mindedness",
    description: "Having a business-oriented mindset",
    upScore: 1,
    downScore: 1

}, {

    id: "tech",
    title: "Being technology savvy",
    description: "Thinking through the technological implications",
    upScore: 1,
    downScore: 1

} ];
/*
    
    This template can be used to customize the display of behaviour data in the selector

*/
export const behaviourTemplate = [ 
    
    "title", 
    "description"
    /*,
    { 
                
        "key": "up",
        "prop": "upScore",
        "className": "score {key} {truthiness}"
        
    },
    { 
        "key": "down",
        "prop": "downScore",
        "className": "score {key} {truthiness}"
        
    } 
    */

];