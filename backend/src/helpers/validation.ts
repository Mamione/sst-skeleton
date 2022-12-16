/* eslint-disable @typescript-eslint/no-explicit-any */
import ContestRepository from '@/repositories/contest';
import OrganizationRepository from '@/repositories/organization';
import validator from 'validator';

interface ValidationErrorItem {
  attribute: string;
  validationMessage: string;
}
class Validation {
  errors:ValidationErrorItem[] = [];
  passed = true;
  is_not = false;

  empty(attribute: string, value: any, ignore_whitespace = false) {
    if (!this.is_not) { //check if value is empty if not then add error
      if (!validator.isEmpty(value, {ignore_whitespace})) {
        this.addValidationErrorMessage(attribute, 'This cannot be empty.');
      }
    } else { //check if value is NOT empty if not then add error
      if (validator.isEmpty(value, {ignore_whitespace})) {
        this.addValidationErrorMessage(attribute, 'This must be empty.');
      }
    }
    this.is_not = false;
    return this;
  }

  string(attribute: string, value: string) {

    if (!this.is_not) { //check if value is a string if not then add error
      if (typeof value !== 'string') {
        this.addValidationErrorMessage(attribute, 'This must be a string.');
      }
    } else { //check if value is not a string if it is then add error
      if (typeof value === 'string') {
        this.addValidationErrorMessage(attribute, 'This cannot be a string.');
      }
    }
    this.is_not = false;
    return this;
  }

  alphaNumeric(attribute: string, value: any) {

    if (!this.is_not) { //check if value Alpha Numeric, if it is then add validation error
      if (!validator.isAlphanumeric(value)) {
        this.addValidationErrorMessage(attribute, 'This can only use alpha-numeric characters.');
      }
    } else {  //check if value is not Alpha Numeric, if it is then add validation error
      if (validator.isAlphanumeric(value)) {
        this.addValidationErrorMessage(attribute, 'This cannot be only alpha-numeric characters.');
      }
    }
    this.is_not = false;
    return this;
  }

  emptyAlphaNumberic(attribute: string, value: string, ignore_whitespace = false) {

    if (!this.is_not) {
      if (validator.isEmpty(value, { ignore_whitespace })) { //check if value is empty no need to check if it's not alphanumeric
        this.addValidationErrorMessage(attribute, 'This must be empty.');
      }
    } else { //check if value is not empty and is Alpha Numeric, otherwise add validation error
      if (validator.isEmpty(value, { ignore_whitespace }) || !validator.isAlphanumeric(value)) {
        this.addValidationErrorMessage(attribute, 'This cannot be empty and must be an alpha-numeric value.');
      }
    }
    this.is_not = false;
    return this;
  }

  async organizaitonExists(attribute: string, organizationId: string) {
    const organizationRepository = new OrganizationRepository();
    const exists = await organizationRepository.get(organizationId);
    if (!this.is_not) {
      if (!exists) {
        this.addValidationErrorMessage(attribute, 'The organization does not exists.');
      }
    } else {
      if (exists) {
        this.addValidationErrorMessage(attribute, 'The organization already exists.');
      }
    }
    this.is_not = false;
    return this;
  }

  async contestExists(attribute: string, contestId: string) {
    const contestRepository = new ContestRepository();
    const exists = await contestRepository.getContest(contestId);
    if (!this.is_not) {
      if (!exists) {
        this.addValidationErrorMessage(attribute, 'The contest does not exists.');
      }
    } else {
      if (exists) {
        this.addValidationErrorMessage(attribute, 'The contest already exists.');
      }
    }
    this.is_not = false;
    return this;
  }

  addValidationErrorMessage(attribute: string, validationMessage: string) {
    this.failPassed();
    this.errors.push({
      attribute,
      validationMessage
    });
  }

  failPassed(value = false) {
    this.passed = value;
  }

  isPassed() {
    return this.passed;
  }

  getValidationErrors() {
    return this.errors;
  }

  not() {
    this.is_not = true;
    return this;
  }


  //Would like
  // interface Validations {
  //   testVal: any
  // }
  // interface TestEntity {
  //   testVal: any
  //   not: Validations
  // }

  // export const test = (): TestEntity  => {


  //   return {
  //     testVal: () => {
  //       //
  //     },
  //     not: {
  //       testVal: () => {
  //         //
  //       }
  //     }
  //   }
  // }

  // test().not.testVal
  // test().testVal

}

export { ValidationErrorItem , Validation };
