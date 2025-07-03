module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the class/module to test?',
        validate: (input) => {
          if (!input) return 'Name is required';
          return true;
        }
      },
      {
        type: 'list',
        name: 'testType',
        message: 'What type of test is this?',
        choices: [
          { name: 'API Service Test', value: 'api-service' },
          { name: 'Core Class Test', value: 'core' },
          { name: 'Utility Test', value: 'utility' },
          { name: 'Integration Test', value: 'integration' }
        ]
      },
      {
        type: 'input',
        name: 'importPath',
        message: 'What is the import path for the class?',
        default: (answers) => {
          switch (answers.testType) {
            case 'api-service':
              return `../src/apiRequests/${answers.name}`;
            case 'core':
              return `../src/core/${answers.name}`;
            case 'utility':
              return `../src/utils/${answers.name}`;
            default:
              return `../src/${answers.name}`;
          }
        }
      },
      {
        type: 'confirm',
        name: 'needsMocks',
        message: 'Does this test need mock objects?',
        default: true
      },
      {
        type: 'input',
        name: 'methods',
        message: 'Enter method names to test (comma-separated):',
        filter: (input) => input ? input.split(',').map(s => s.trim()).filter(s => s) : []
      }
    ];

    return inquirer.prompt(questions);
  }
};
