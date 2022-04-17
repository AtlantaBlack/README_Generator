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
        message: "Enter the title of the project:",
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
        message: "Enter a short description about the project:",
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
        message: "Confirm if project requires extra installation steps to run:",
        choices: ["Yes", "No"]
    },
    {
        type: "editor",
        name: "installation.details",
        message: "Enter the installation requirements of this project:",
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
        message: "Enter the usage instructions for this project:",
        validate(answer) {
            if (!answer) {
                return "Please write about how to use this project.";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "license",
        message: "Please choose a license for this project:",
        choices: ["GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0", "Unlicense"]
    },
    {
        type: "list",
        name: "contributing.confirm",
        message: "Allow other developers to contribute to the project?",
        choices: ["Yes", "No"]
    },
    {
        type: "input",
        name: "contributing.details",
        message: "Enter guidelines for project contribution from other developers:",
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
        message: "Enter test instructions for this project:",
        validate(answer) {
            if (!answer) {
                return "Please any test instructions.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "author",
        message: "Enter project author's GitHub username:",
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
        message: "Enter project author's email address:",
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
        message: "List all collaborators on this project:",
        filter(answer) {
            return answer.split(/[ ,]+/).filter(Boolean);
        },
        validate(answer) {
            if (answer.length < 1) {
                return "Please list at least one contributor.";
            }
            return true;
        }
    },
];

const askUser = () => {
    return inquirer.prompt(questions);
}

function askForCredits(credits) {
    const creditsList = credits;
    const creditQuestions = [];
    for (let i = 0; i < creditsList.length; i++) {
        const collaborator = creditsList[i];
        creditQuestions.push(
            {
                type: "input",
                name: `collaborator.${collaborator}.url`,
                message: `GitHub or website link for ${collaborator}?`
            }
        )
    }
    return creditQuestions;
}

const init = () => {
    askUser()
        .then((answers) => {
            inquirer
                .prompt(askForCredits(answers.credits))
                .then((collabAnswers) => {
                    console.log(JSON.stringify(collabAnswers, null, 2))
                })
                .catch((error) => {
                    if (error.isTtyError) {
                        console.log("oops")
                    } else {
                        console.log(error);
                    }
                })

            console.log(JSON.stringify(answers, null, 2));


            let badgelink = generate.renderLicenseBadge(answers.license);
            let installdeets = generate.installationDetails(answers.installation);
            let contributedeets = generate.contributingDetails(answers.contributing);



            let modifiedAnswers = { ...answers, installdeets, contributedeets, badgelink};

            // console.log(JSON.stringify(modifiedAnswers, null, 4));
            
            fs.writeFileSync("userREADME.md", generate.generateMarkdown(modifiedAnswers))
        })
        .then( () => console.log("success") )
        .catch( (err) => console.log(err) )
}

init();
    


// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
// function init() {
// }

// Function call to initialize app
// init();
