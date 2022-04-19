// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

const generate = require("./utils/generateMarkdown");

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
        message: "GitHub username of the Project Author:",
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
        message: "Email contact of the Project Author:",
        validate(answer) {
            if (!answer) {
                return "Please enter an email address.";
            }
            return true;
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


const init = () => {
    askUser()
        .then((answers) => {
            inquirer
                .prompt(generate.askForCredits(answers.devteam))
                .then((creditAnswers) => {

                let installation = generate.installationDetails(answers.installation);
                let contribution = generate.contributingDetails(answers.contributing);
                let badgelink = generate.renderLicenseBadge(answers.license);

                let credits = generate.renderCredits(creditAnswers);

                let userdata = { 
                    ...answers, 
                    credits,
                    installation, 
                    contribution, 
                    badgelink
                };

                console.log("user data:");
                console.log(JSON.stringify(userdata, null, 4));
                
                fs.writeFileSync("userREADME.md", generate.generateMarkdown(userdata))

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
