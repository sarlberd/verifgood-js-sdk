module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the type interface? (e.g., Category, Equipment)',
        validate: (input) => {
          if (!input) return 'Type name is required';
          if (!/^[A-Z][a-zA-Z]*$/.test(input)) return 'Type name must be PascalCase and start with uppercase letter';
          return true;
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Brief description of this type:',
        default: (answers) => `Interface for ${answers.name} data`
      },
      {
        type: 'input',
        name: 'properties',
        message: 'Enter property definitions (format: "name:type:optional", comma-separated):',
        filter: (input) => {
          if (!input) return [];
          return input.split(',').map(prop => {
            const parts = prop.trim().split(':');
            return {
              name: parts[0]?.trim(),
              type: parts[1]?.trim() || 'string',
              optional: parts[2]?.trim() === 'optional' || parts[2]?.trim() === 'true'
            };
          }).filter(prop => prop.name);
        }
      },
      {
        type: 'confirm',
        name: 'hasImports',
        message: 'Does this type need imports from other type files?',
        default: false
      },
      {
        type: 'input',
        name: 'imports',
        message: 'Enter import statements (format: "Type:./TypeFile", comma-separated):',
        when: (answers) => answers.hasImports,
        filter: (input) => {
          if (!input) return [];
          return input.split(',').map(imp => {
            const parts = imp.trim().split(':');
            return {
              type: parts[0]?.trim(),
              path: parts[1]?.trim()
            };
          }).filter(imp => imp.type && imp.path);
        }
      }
    ];

    return inquirer.prompt(questions);
  }
};
