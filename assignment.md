Frontend Developer Candidate Assignment
==

### IMPORTANT: You have 5 working days to finish the assignment.

## How to submit

 1.	Add your work to a private git repository on bitbucket.org
 2.	Grant read access to user ‘evision-recruit’ to your repository
 3.	We will review your work and contact you in maximum 1 week

## Assignment

Build a simple web app that can display the balance result from the provided api server. This includes:

1. Displaying the account info
2. Displaying a list of credits and debit items
3. A feature for adding a credit/debit from the UI
4. Updating the balance and list of credits & debits after adding

### Considerations
- Please focus on timeliness and completeness - if you have to choose between delivering 100% of the first feature + 0% of the second, and 50%-50%, please choose the first option
- The provided api server will not always return a successfull result, be aware of this! Do not modify the provided server.
- Make it easy to build and run
- Make it look decent. Mobile friendly UI is considered a plus.
- Tests are considered a plus
- Only use 3rd party components if there is good reasoning for it. Please justify any components used.

### Requirements
- The app should take up all screen height
- The content should be horizontally centered
- The list of credits and debits should be scrollable
- The app should work in all major browser (latest version)

Example UI:
```
 _______________________
|   |               |   |
|   | Account info  |   |
|   |_______________|   |
|   |           add |   |
|   |_______________|   |
|   | scrollable    |   |
|   | list          |   |
|   |               |   |
|   |               |   |
|   |               |   |
|___|_______________|___|
```

You can run the provided api server by running:

``` javascript
node apiserver/server.js

'http://localhost:8080/api/balance'
// will return the account info + credit and debit items

'http://localhost:8080/api/balance/add'
// accepts a PUT request containing a JSON object
// { amount: number, from: string, to: string, description: string, date: date }

```