# Unit Test Guidelines for VerifgoodSDK

## Future Unit Test Creation
To create unit tests for new files or features, follow these steps:

1. **Analyze the File**:
   - Identify the main classes, methods, and their responsibilities.
   - Note any edge cases or special conditions that need to be tested.

2. **Plan Test Cases**:
   - Write down test cases for each method, covering:
     - Normal scenarios.
     - Edge cases.
     - Error handling.

3. **Create Test File**:
   - Place the test file in the `tests/` folder.
   - Name the file `<ClassName>.test.ts`.

4. **Write Tests**:
   - Use Jest for writing tests.
   - Mock dependencies where necessary.
   - Ensure each test is independent and does not rely on others.

5. **Run Tests**:
   - Use `npm test` to run all tests.
   - Ensure all tests pass before committing changes.

### Example Prompt for Future Unit Test Creation
```
Create unit tests for the `<ClassName>` class. Cover the following:
- Constructor initialization.
- All public methods.
- Edge cases and error handling.
- Mock dependencies where necessary.
```

---

## Updating Existing Unit Tests
To update existing unit tests:

1. **Identify Changes**:
   - Review the changes made to the class or method.
   - Note any new parameters, return values, or logic.

2. **Update Test Cases**:
   - Modify existing test cases to reflect the changes.
   - Add new test cases for additional functionality.

3. **Run Tests**:
   - Use `npm test` to ensure all tests pass.
   - Fix any failing tests.

### Example Prompt for Updating Unit Tests
```
Update the unit tests for the `<ClassName>` class to reflect the following changes:
- `<Describe the changes>`
- Ensure all existing tests pass.
- Add new tests for additional functionality.
```