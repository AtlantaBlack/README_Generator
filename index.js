// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const gen = require("./utils/generateMarkdown");

const questions = [
    {
        type: "input",
        name: "title",
        message: "Title of the project:",
        validate: (answer) => {
            if (!answer) {
                return "Please enter the name of the project.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "description",
        message: "Short description about the project:",
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
        message: "Does the project require extra installation steps to run?",
        choices: ["Yes", "No"]
    },
    {
        type: "editor",
        name: "installation.details",
        message: "Enter installation requirements and/or instructions for the project:",
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
        type: "editor",
        name: "usage",
        message: "Enter usage instructions for the project:",
        validate(answer) {
            if (!answer) {
                return "Please enter usage instructions for the project.";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "license",
        message: "Choose a license for this project:",
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
        message: "Enter guidelines for contribution from other developers:",
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
        message: "Enter test instructions for the project:",
        validate(answer) {
            if (!answer) {
                return "Please write any test instructions for the project.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "author",
        message: "Name of the Project Author:",
        validate(answer) {
            if (!answer) {
                return "Please enter a name or GitHub username.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "Email contact of the Project Author:",
        validate(answer) {
            // using regex to validate an email (include @ and .)
            // https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
            const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if (regexEmail.test(answer)) {
                return true;
            } else {
                return "Please enter a valid email address.";
            }
        }
    },
    {
        type: "input",
        name: "devteam",
        message: "How many developers worked on this project?",
        validate(answer) {
            if (isNaN(answer)) {
                return "Please enter a number.";
            }
            return true;
        }
    }
];


const askUser = () => {
    return inquirer.prompt(questions);
}

// follow up questions for the project collaborators
function askForCredits(devteam) {
    let team = parseInt(devteam);

    // create array for each team member
    let members = [];
    for (let i = 0; i < team; i++) {
        members.push(i);
    }

    // create array of follow-up questions to ask
    const creditQuestions = [];
    for (let j = 0; j < members.length; j++) {
        let member = j;
        creditQuestions.push(
            { // ask the developer's name
                type: "input",
                name: `collaborator.${member}.name`,
                message: `Name of Collaborator ${member + 1}:`,
                validate: (answer) => {
                    if (!answer) {
                        return "Please enter the developer's name.";
                    }
                    return true;
                }
            },
            { // ask the github url of the developer
                type: "input",
                name: `collaborator.${member}.url`,
                message: `GitHub/Website URL of Collaborator ${member + 1}:`
            }
        ) 
    }
    return creditQuestions;
}


function init() {
    // welcome message uses magenta colour [35m
    console.log("\x1b[35m Welcome to the Good README Generator. Let's get started! \x1b[0m");
    askUser() // ask the main questions
        .then((answers) => {
            inquirer // ask the follow-up questions for credits section
                .prompt(askForCredits(answers.devteam))
                .then((creditAnswers) => {

                // get updated values for the following details
                let installation = gen.installationDetails(answers.installation);
                let contributing = gen.contributingDetails(answers.contributing);
                let badgelink = gen.renderLicenseBadge(answers.license);
                let credits = gen.renderCredits(creditAnswers);

                // make new user data with the updated info
                let userdata = { 
                    ...answers, // include the original answer values
                    installation,
                    contributing,
                    badgelink,
                    credits
                };

                // console.log("user data:");
                // console.log(JSON.stringify(userdata, null, 4));
                
                // write file using new user data
                fs.writeFileSync("userREADME.md", gen.generateMarkdown(userdata))
                })
                .then(() => 
                    // message uses magenta and cyan
                    console.log("\x1b[35m Success! \x1b[36m Project README generated! \x1b[0m"))
                .catch((error) => {
                    if (error.isTtyError) {
                        // error message to display in red
                        console.log("\x1b[31m An error occured. \x1b[0m")
                    } else {
                        console.log(error);
                    }
                })
        })
        .catch((err) => console.log(err))
}

// start the app
init();
