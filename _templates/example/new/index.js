module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the example service name? (e.g., TestService)',
        default: 'TestService'
      }
    ];

    return inquirer.prompt(questions);
  }
};
