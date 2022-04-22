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
            /* using regex to validate an email (include @ and .) by M.R.Safari & Mohamad Shiralizadeh:
            https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation */
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

// ask the main questions
const askQuestions = () => {
    return inquirer.prompt(questions);
}

// ask the follow-up questions for credits section
const askForCredits = (answers) => {
    return inquirer.prompt(creditDetails(answers.devteam));
}

// make the follow up questions for the project collaborators
const creditDetails = (devteam) => {
    let team = parseInt(devteam); // make the number input a number

    let members = []; // create array for each team member
    for (let i = 0; i < team; i++) {
        members.push(i);
    }

    const creditQuestions = []; // create array of follow-up questions to ask
    for (let j = 0; j < members.length; j++) {
        let member = j;
        creditQuestions.push( // add to the credit questions array with following Qs:
            { // ask the developer's name
                type: "input",
                name: `developer.${member}.name`,
                message: `Name of Developer ${member + 1}:`,
                validate: (answer) => {
                    if (!answer) {
                        return "Please enter the developer's name.";
                    }
                    return true;
                }
            },
            { // ask the github url of the developer
                type: "input",
                name: `developer.${member}.url`,
                message: `GitHub/Website URL of Developer ${member + 1}:`,
                validate: (answer) => {
                    if (answer) {
                        /* regex validation by Nodarii & Ani Naslyan copied from following stack overflow: 
                            https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
                        regex explanation: https://regex101.com/r/KR2b6n/1 */
                        const regexUrl = /^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?$/gm;
                        if (regexUrl.test(answer)) {
                            return true;
                        } else {
                            return "Please enter a valid url.";
                        }
                    }
                    return true;
                }
            }
        ) 
    }
    return creditQuestions;
}
    
// write file using compiled user data
const writeToFile = (userdata) => {
    fs.writeFileSync("userREADME.md", gen.generateMarkdown(userdata));
}

// message when starting the app
const welcomeMessage = () => {
    // welcome message uses magenta colour [35m for welcome text; return text to black after [30m
    return console.log("\x1b[35m Welcome to the Good README Generator. Let's get started! \x1b[30m");
}

const readmeGenerator = () => {
    askQuestions() // ask the main questions
        .then((answers) => { // with the answers:
            askForCredits(answers) // ask follow-up questions for credit section
                .then((creditAnswers) => {
                    let credits = gen.renderCredits(creditAnswers);
                    let userdata = { // make new user data with the updated info
                        ...answers, // include the original answer values
                        credits // include credits
                    };
                    writeToFile(userdata); // write to the file
                })
                // success message uses magenta
                .then(() => console.log("\x1b[35m Success! Project README generated! \x1b[30m"))
                .catch((error) => {
                    if (error.isTtyError) {
                        // error message to display in red
                        console.log("\x1b[31m An error occured. \x1b[30m")
                    } else {
                        console.log(error);
                    }
                });
        })
        .catch((err) => console.log(err));
}

// initialise the app
const init = () => {
    welcomeMessage();
    readmeGenerator();
}

// start the app
init();
