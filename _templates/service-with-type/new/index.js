module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the service? (e.g., Products, Orders)',
        validate: (input) => {
          if (!input) return 'Service name is required';
          if (!/^[A-Z][a-zA-Z]*$/.test(input)) return 'Service name must be PascalCase and start with uppercase letter';
          return true;
        }
      },
      {
        type: 'input',
        name: 'endpoint',
        message: 'What is the API endpoint? (e.g., /api/products)',
        validate: (input) => {
          if (!input) return 'Endpoint is required';
          if (!input.startsWith('/api/')) return 'Endpoint should start with /api/';
          return true;
        }
      },
      {
        type: 'input',
        name: 'endpointSingleton',
        message: 'What is the singleton endpoint? (e.g., /api/product)',
        validate: (input) => {
          if (!input) return 'Singleton endpoint is required';
          if (!input.startsWith('/api/')) return 'Singleton endpoint should start with /api/';
          return true;
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Brief description of this service:',
        default: (answers) => `Service for managing ${answers.name.toLowerCase()}`
      },
      {
        type: 'input',
        name: 'properties',
        message: 'Enter property definitions for the type (format: "name:type:optional", comma-separated):',
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
        name: 'addToVGSDK',
        message: 'Do you want to add this service to the main VGSDK class?',
        default: true
      }
    ];

    // Helper function to process properties from string
    const processProperties = (input) => {
      if (!input || typeof input !== 'string') return [];
      return input.split(',').map(prop => {
        const parts = prop.trim().split(':');
        return {
          name: parts[0]?.trim(),
          type: parts[1]?.trim() || 'string',
          optional: parts[2]?.trim() === 'optional' || parts[2]?.trim() === 'true'
        };
      }).filter(prop => prop.name);
    };

    // Check if all critical arguments are provided via CLI to bypass prompts
    if (args.name && args.endpoint && args.endpointSingleton) {
      const processedArgs = { ...args };

      // Validate critical args (simplified)
      if (!/^[A-Z][a-zA-Z]*$/.test(processedArgs.name)) {
        console.error('Validation Error: Service name must be PascalCase and start with an uppercase letter. Falling back to interactive prompt.');
        return inquirer.prompt(questions); // Fallback for critical validation failure
      }
      if (typeof processedArgs.endpoint !== 'string' || !processedArgs.endpoint.startsWith('/api/')) {
         console.error('Validation Error: Endpoint must be a string and start with /api/. Falling back to interactive prompt.');
         return inquirer.prompt(questions);
      }
      if (typeof processedArgs.endpointSingleton !== 'string' || !processedArgs.endpointSingleton.startsWith('/api/')) {
         console.error('Validation Error: Singleton endpoint must be a string and start with /api/. Falling back to interactive prompt.');
         return inquirer.prompt(questions);
      }

      // Apply filter for properties if provided as a string
      if (typeof processedArgs.properties === 'string') {
        processedArgs.properties = processProperties(processedArgs.properties);
      } else if (processedArgs.properties === undefined) {
         processedArgs.properties = []; // Default to empty array if not provided
      }

      // Apply default for description if not provided
      if (processedArgs.description === undefined && processedArgs.name) {
        processedArgs.description = `Service for managing ${processedArgs.name.toLowerCase()}`;
      } else if (processedArgs.description === undefined) {
        processedArgs.description = ''; 
      }

      // Handle addToVGSDK: hygen typically converts 'true'/'false' strings from CLI to booleans for 'confirm' types.
      // If it's passed as a boolean from CLI (e.g. via API), it's fine.
      // If it's a string 'true'/'false', it should be converted.
      // If undefined, default to true.
      if (typeof processedArgs.addToVGSDK === 'string') {
        processedArgs.addToVGSDK = processedArgs.addToVGSDK.toLowerCase() === 'true';
      } else if (processedArgs.addToVGSDK === undefined) {
        processedArgs.addToVGSDK = true; // Default to true
      }
      
      return Promise.resolve(processedArgs); // Bypass inquirer.prompt
    }

    // If not all critical args are provided, or validation above chooses to fallback, fall back to interactive prompts.
    // Ensure the original questions array uses the processProperties helper for consistency if it's used by inquirer.
    const interactiveQuestions = questions.map(q => {
      if (q.name === 'properties' && q.filter) {
        return { ...q, filter: processProperties }; // Ensure our helper is used
      }
      return q;
    });

    return inquirer.prompt(interactiveQuestions);
  }
};
