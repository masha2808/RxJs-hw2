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
  next: (value: Array<string>) =>
    showResult(parseInt(value[0]), parseInt(value[1]), parseInt(value[2])),
  error: (error: Error) => showError(error)
});

const showResult = (amount: number, interest: number, length: number): void => {
  const result = document.getElementById('result');
  if (valueIsNotGreaterThanZero(amount)) {
    result.textContent = `Error: incorrect value for Loan Amount`;
  } else if (valueIsNotGreaterThanZero(interest)) {
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

const valueIsNotGreaterThanZero = (value: number): boolean => {
  return value <= 0 ? true : false;
};
