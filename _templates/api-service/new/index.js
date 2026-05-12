module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the API service? (e.g., Categories, Equipements)',
        validate: (input) => {
          if (!input) return 'Service name is required';
          if (!/^[A-Z][a-zA-Z]*$/.test(input)) return 'Service name must be PascalCase and start with uppercase letter';
          return true;
        }
      },
      {
        type: 'input',
        name: 'endpoint',
        message: 'What is the API endpoint? (e.g., /api/categories)',
        validate: (input) => {
          if (!input) return 'Endpoint is required';
          if (!input.startsWith('/api/')) return 'Endpoint should start with /api/';
          return true;
        }
      },
      {
        type: 'input',
        name: 'endpointSingleton',
        message: 'What is the singleton endpoint? (e.g., /api/categorie)',
        validate: (input) => {
          if (!input) return 'Singleton endpoint is required';
          if (!input.startsWith('/api/')) return 'Singleton endpoint should start with /api/';
          return true;
        }
      },      {
        type: 'confirm',
        name: 'hasCustomMethods',
        message: 'Do you want to add custom methods beyond CRUD?',
        default: false
      },
      {
        type: 'input',
        name: 'customMethodsInput',
        message: 'Enter custom methods (format: "name:description:param1:type1,param2:type2", semicolon-separated):',
        when: (answers) => answers.hasCustomMethods,
        filter: (input) => {
          if (!input) return [];
          return input.split(';').map(method => {
            const parts = method.trim().split(':');
            const name = parts[0]?.trim();
            const description = parts[1]?.trim() || `Custom ${name} method`;
            const paramsStr = parts[2]?.trim() || '';
            
            const params = paramsStr ? paramsStr.split(',').map(param => {
              const paramParts = param.trim().split(':');
              return {
                name: paramParts[0]?.trim(),
                type: paramParts[1]?.trim() || 'any'
              };
            }).filter(p => p.name) : [];
            
            return { name, description, params };
          }).filter(m => m.name);
        },
        validate: (input) => {
          if (!input) return true;
          const methods = input.split(';');
          for (const method of methods) {
            const parts = method.trim().split(':');
            if (!parts[0]?.trim()) return 'Each method must have a name';
            if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(parts[0].trim())) return 'Method names must be valid JavaScript identifiers';
          }
          return true;
        }
      }
    ];

    return inquirer.prompt(questions);
  }
};
