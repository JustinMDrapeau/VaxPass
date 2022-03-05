
import ClinicDataService from "../services/ClinicDataService";

test('adds 1 + 2 to equal 3', () => {
    expect(3).toBe(3);
  });

test('adds 2 + 2 to equal 3', () => {
    expect(3).toBe(3);
});

test('tests clinic data service', () => {
    expect(ClinicDataService.testFn()).toBe(3);
})