const withPromise = () =>
  new Promise((resolve, reject) => {
    // ASYNC OPERATION: eg. 3 secs
    setTimeout(() => {
      resolve("FULFILLED");
    }, 3000);
    setTimeout(() => {
      reject("REJECTED");
    }, 1000);
  });

// withPromise()
//   .then(value => console.log(value))
//   .catch(err => console.log(err));

const rollTheDice = () =>
  new Promise((resolve, reject) => {
    // ASYNC CODE

    // Imagine an operation that takes from 0 to 3 seconds to complete...
    const randTime = Math.floor(Math.random() * 3000);

    // whatever is inside the setTimeout will execute between 0 and 3 seconds
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 10);
      // imagine a random number being generated

      //we only accept numbers from 0 to 6
      if (randomNumber < 7) {
        resolve("We've got a winner! The number is: " + randomNumber + " time: " + randTime);
      } else {
        // numbers like 7-8-9-10 are not valid and will be considered an error
        reject("The number is too high, you lose. The number was " + randomNumber + " time: " + randTime);
      }

      // therefore if the randomly generated number is fine we'll have a positive outcome with a "fullfillment" state of the promise that triggers the .then() method,
      // otherwise we fall in the "rejection" state of the promise that triggers the .catch() method
    }, randTime);
  });

// So when executing the promise we can already decide how we deal with either one of the possible outcomes beforehand,
// knowing that the code will manage those outcomes for us in the proper way automatically, when the promise "settles"
rollTheDice()
  .then(successMessage => console.log("SUCCESS", successMessage))
  .catch(errorMessage => console.log("ERROR: ", errorMessage));
