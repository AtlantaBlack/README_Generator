// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

const generate = require("./utils/generateMarkdown");

/* 
title of project Y
description Y
Table of Contents
Installation Y
Usage Y
License Y
Contributing Y
Tests 
Questions
*/

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the Title of the project?",
        validate: (answer) => {
            if (!answer) {
                return "Please enter the project name.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "description",
        message: "Please write a short Description about the project:",
        validate(answer) {
            if (!answer) {
                return "Please write a short description about the project.";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "installation.confirm",
        message: "Does the project require any extra Installation steps to run?",
        choices: ["Yes", "No"]
    },
    {
        type: "editor",
        name: "installation.details",
        message: "What are the Installation requirements of this project:",
        validate(answer) {
            if (!answer) {
                return "Please write about any packages that need to be installed.";
            }
            return true;
        },
        when(answer) {
            return answer.installation.confirm === "Yes"
        }
    },
    {
        type: "input",
        name: "usage",
        message: "Please enter the Usage instructions for this project:",
        validate(answer) {
            if (!answer) {
                return "Please enter usage instructions for this project.";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "license",
        message: "Please choose a License for this project:",
        choices: ["GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0", "Unlicense"]
    },
    {
        type: "list",
        name: "contributing.confirm",
        message: "Allow other developers to Contribute to the project?",
        choices: ["Yes", "No"]
    },
    {
        type: "input",
        name: "contributing.details",
        message: "What are the guidelines for Contribution from other developers:",
        validate(answer) {
            if (!answer) {
                return "Please write preferred conventions for other contributing developers to follow.";
            }
            return true;
        },
        when(answer) {
            return answer.contributing.confirm === "Yes";
        }
    },
    {
        type: "input",
        name: "tests",
        message: "Please enter Test instructions for this project:",
        validate(answer) {
            if (!answer) {
                return "Please write any test instructions.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "author",
        message: "Please enter the GitHub username of the Project Author:",
        validate(answer) {
            if (!answer) {
                return "Please enter a GitHub username.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "Please enter the Email address of the Project Author:",
        validate(answer) {
            if (!answer) {
                return "Please enter an email address.";
            }
            return true;
        }
    },

    {
        type: "input",
        name: "credits",
        message: "How many people worked on this project?",
        validate(answer) {
            if (isNaN(answer)) {
                return "please enter a number.";
            }
            return true;
        }
    }

    
    // {
    //     type: "input",
    //     name: "credits",
    //     message: "Please list all Collaborators for this project (including Project Author):",
    //     filter(answer) {
    //         // regex: split the answer by every comma AND whitespace
    //         // return answer.split(/[, ]+/).filter(Boolean);

    //         // regex: split the answer by comma that ignores all the whitespaces around the comma
    //         // .filter(Boolean) to ignore any empty strings
    //         return answer.split(/\s*,\s*/).filter(Boolean);
    //     },
    //     validate(answer) {
    //         if (answer.length < 1) {
    //             return "Remember to add the details of the Project Author.";
    //         }
    //         return true;
    //     }
    // }
];


function askForCredits(credits) {
    let team = parseInt(credits);
    console.log(team);

    let members = [];
    for (let i = 0; i < team; i++) {
        members.push(i);
    }

    console.log("members");
    console.log(members);

    const creditQuestions = [];

    for (let j = 0; j < members.length; j++) {
        let member = j;
        creditQuestions.push(
            {
                type: "input",
                name: `collaborator.${member}.name`,
                message: `Name of collaborator ${member + 1}:`
            },
            {
                type: "input",
                name: `collaborator.${member}.url`,
                message: `GitHub of collaborator ${member + 1}:`
            }
        ) 
    }

    return creditQuestions;

    // const creditQuestions = [];

    // for (let i = 0; i < team; i++) {
    //     let member = i + 1;
    //     creditQuestions.push(
    //         {
    //             type: "input",
    //             name: "collaborator",
    //             message: `Name of collaborator ${member}:`
    //         },
    //         {
    //             type: "input",
    //             name: "url",
    //             message: `GitHub of collaborator ${member}:`
    //         }
    //     ) 
    // }
    // return creditQuestions;
}

// function askForCredits(credits) {
//     const creditQuestions = [];
//     for (let i = 0; i < credits.length; i++) {
//         const collaborator = credits[i];
//         creditQuestions.push(
//             {
//                 type: "input",
//                 name: `${collaborator}.url`,
//                 message: `GitHub or website link for ${collaborator}?`,
//                 validate(answer) {
//                     if (!answer) {
//                         return "Please enter a valid url.";
//                     }
//                     return true;
//                 }
//             }
//         )
//     }
//     return creditQuestions;
// }

const askUser = () => {
    return inquirer.prompt(questions);
}

const init = () => {
    askUser()
        .then((answers) => {
            inquirer
                .prompt(askForCredits(answers.credits))
                .then((collaborators) => {

                let installdeets = generate.installationDetails(answers.installation);
                let contributedeets = generate.contributingDetails(answers.contributing);
                let badgelink = generate.renderLicenseBadge(answers.license);

                let creditsection = generate.renderCredits(collaborators);

                let modifiedAnswers = { 
                    ...answers, 
                    creditsection,
                    installdeets, 
                    contributedeets, 
                    badgelink
                };

                console.log("modified answers:");
                console.log(JSON.stringify(modifiedAnswers, null, 4));
                
                fs.writeFileSync("userREADME.md", generate.generateMarkdown(modifiedAnswers))

                })
                .then(() => console.log("Success! Professional README generated!"))
                .catch((error) => {
                    if (error.isTtyError) {
                        console.log("An error occured.")
                    } else {
                        console.log(error);
                    }
                })
        })
        .catch((err) => console.log(err))
}

init();
    


// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
// function init() {
// }

// Function call to initialize app
// init();
