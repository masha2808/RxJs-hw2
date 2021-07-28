import { combineLatest, fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { calculateMortgage } from './calculate';

// Build a Mortgage Claculator using Rxjs and calculateMortgage method
const loanAmount = document.getElementById('loanAmount');
const loanInterest = document.getElementById('loanInterest');
const loanLength = document.getElementById('loanLength');

const loanAmountSubscription = fromEvent(loanAmount, 'change').pipe(
  map((event: Event) => (event.target as HTMLInputElement).value)
);
const loanInterestSubscription = fromEvent(loanInterest, 'change').pipe(
  map((event: Event) => (event.target as HTMLInputElement).value)
);
const loanLengthSubscription = fromEvent(loanLength, 'change').pipe(
  map((event: Event) => (event.target as HTMLInputElement).value)
);

const allElements = combineLatest([
  loanAmountSubscription,
  loanInterestSubscription,
  loanLengthSubscription.pipe(startWith((loanLength as HTMLInputElement).value))
]);

allElements.subscribe({
  next: (value: Array<String>) =>
    showResult(Number(value[0]), Number(value[1]), Number(value[2])),
  error: (error: Error) => showError(error)
});

const showResult = (amount: Number, interest: Number, length: Number): void => {
  const result = document.getElementById('result');
  if (!checkValue(amount)) {
    result.textContent = `Error: incorrect value for Loan Amount`;
  } else if (!checkValue(interest)) {
    result.textContent = `Error: incorrect value for Interest Rate`;
  } else {
    const value = calculateMortgage(amount, interest, length);
    result.textContent = `Result: ${value}`;
  }
};

const showError = (error: Error): void => {
  const result = document.getElementById('result');
  result.textContent = `Error: ${error.message}`;
};

const checkValue = (value: Number): boolean => {
  if (value <= 0) {
    return false;
  } else {
    return true;
  }
};
