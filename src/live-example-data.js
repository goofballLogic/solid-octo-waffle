/*

    Some sample data

*/
export const team = [
    
    { "name": "Andrew", "id": "asg", "color": "0,116,217" },
    { "name": "Dirk", "id": "dr", "color": "61,153,112" },
    { "name": "Omer", "id": "oc", "color": "46, 204, 64" }, // 1,255,112
    { "name": "Imran", "id": "im", "color": "127,219,255"}

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

    id: "role1",
    title: "Get stuff done in time",
    specifics: "We won't commit to things we can't deliver so that we get everything prioritised finished on time. \"End of sprint\" means the end of Friday (not over the weekend!)",
    measurement: "Were all commits Done before the end of the sprint?",
},
{ 
    id: "role2",
    title: "Focus on top priorities first",
    specifics: "Get it working first. Refine the solution as you have time available. Define test plans and implement basic functionality during the first half of the sprint.",
    measurement: "Was basic functionality and test planning complete by Wednesday?"
},
{ 
    id: "role3",
    title: "Keep the app fully running at all times",
    specifics: "We should be able to pull the latest code without fear of it breaking our development environment.",
    measurement: "Did all our code pushes go through without breaking CI or another team member's build/environment?"
} ];
/*

    This template can be used to customise data displayed when selecting a role

*/
export const roleTemplate = [ "title", "specifics", "measurement" ];
/*

    Behaviours are the measurement against which we are scoring users

*/
export const behaviours = [ {

    id: "behaviour1",
    roleId: "role1",
    title: "Role 1 Behaviour 1",
    description: "Ut sed quam sed purus fermentum imperdiet non ac quam. Morbi pellentesque gravida vehicula. Suspendisse libero metus, bibendum ut nisi ut, consequat condimentum urna.",
    upScore: 2,
    downScore: 2

}, {

    id: "behaviour2",
    roleId: "role1",
    title: "Role 1 Behaviour 2 which has a long title which might not fit in",
    description: "Maecenas metus diam, luctus non pulvinar ac, rhoncus et eros. Donec eleifend ex nisl, a laoreet dolor viverra varius.",
    upScore: 2,
    downScore: 1

}, {

    id: "behaviour3",
    roleId: "role1",
    title: "Role 1 Behaviour 3",
    description: "Duis odio velit, mollis id dolor a, maximus vehicula justo.",
    upScore: 3

}, {

    id: "behaviour4",
    roleId: "role2",
    title: "Role 2 Behaviour 1",
    description: "Fusce hendrerit felis sit amet risus aliquam luctus.",
    upScore: 1,
    downScore: 1

}, {

    id: "behaviour5",
    roleId: "role2",
    title: "Role 2 Behaviour 2 (a negative behaviour)",
    description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    downScore: 1

}, {

    id: "behaviour6",
    roleId: "role3",
    title: "Role 3 Behaviour 1 (discouraged behaviour)",
    description: "Sed in placerat mi, sit amet pellentesque magna. Vestibulum malesuada lacus non consectetur suscipit.",
    upScore: 1,
    downScore: 2

}, {

    id: "behaviour7",
    roleId: "role3",
    title: "Role 3 Behaviour 2",
    description: "Ut quis elit diam. Duis ultricies hendrerit libero vitae sodales. Vestibulum cursus tortor pulvinar ipsum pharetra faucibus. Nam et purus eu augue condimentum volutpat sed sed neque. Donec sodales feugiat laoreet.",
    upScore: 2,
    downScore: 2

} ];
/*
    
    This template can be used to customize the display of behaviour data in the selector

*/
export const behaviourTemplate = [ 
    
    "title", 
    "description",
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

];