import { FormBuilder, FormControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {

  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();
  });


  describe('minLength validator', () => {

    it('should validade string length correctly', () => {

      const validator = CustomValidators.minLength(3);

      // Caso válido
      const validControl = new FormControl('test');
      const validResult = validator(validControl);
      expect(validResult).toBeNull();

      // Caso inválido - valor muito curto
      const invalidControl = new FormControl('ab');
      const invalidResult = validator(invalidControl);
      expect(invalidResult).not.toBeNull();
      expect(invalidResult?.['minLength']).toBeTruthy();
      expect(invalidResult?.['minLength'].required).toBe(3);
      expect(invalidResult?.['minLength'].actual).toBe(2);

      // Caso extremo - string vazia
      const emptyControl = new FormControl('');
      const emptyResult = validator(emptyControl);
      expect(emptyResult).not.toBeNull();
      expect(emptyResult?.['minLength']).toBeTruthy();
      expect(emptyResult?.['minLength'].actual).toBe(0);

      // Caso extremo - null
      const nullControl = new FormControl(null);
      const nullResult = validator(nullControl);
      expect(nullResult).not.toBeNull();

    });
  });

  describe('requiredArray validator', () => {
    it('should validate array is not empty', () => {

      const validator = CustomValidators.requiredArray();

      // Caso válido - array preenchido.
      const validArray = fb.array(['Item1', 'Item2']);
      const validResult = validator(validArray);
      expect(validResult).toBeNull();

      // Caso inválido - array vazio
      const emptyArray = fb.array([]);
      const emptyResult = validator(emptyArray);
      expect(emptyResult).not.toBeNull();
      expect(emptyResult?.['requiredArray']).toBeTruthy();

      // Caso extremo - null
      const nullControl = new FormControl(null);
      const nullResult = validator(nullControl);
      expect(nullResult).not.toBeNull();

    });
  });

  describe('patternValidator', () => {

    it('should validate array is not empty', () => {
    // Testando o padrão de email
    const emailRegex = /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validator = CustomValidators.patterValidator(emailRegex, { invalidEmail: true});

    // Case valido
    const validControl = new FormControl('test@example.com');
    const validResult = validator(validControl);
    expect(validResult).toBeNull();

    // Caso inválido
    const invalidControl = new FormControl('not-an-email');
    const invalidResult = validator(invalidControl);
    expect(invalidResult).not.toBeNull();
    expect(invalidResult?.['invalidEmail']).toBeTrue();

    // Caso extremo - string vazia não deve disparar o pattern de validação
    const emptyControl = new FormControl('');
    const emptyResult = validator(emptyControl);
    expect(emptyResult).toBeNull();

    // Caso extremo - null não deve disparar o pattern de validação
    const nullControl = new FormControl(null);
    const nullResult = validator(nullControl);
    expect(nullResult).toBeNull();
    });
  });
});
