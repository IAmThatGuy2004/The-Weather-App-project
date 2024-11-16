import { describe, test ,it, expect } from 'vitest';
import { fetchCity } from './main-style';  // Adjust the path as needed

describe('Basic math test', () => {
    it('should add 1 + 2 to equal 3', () => {
      expect(1 + 2).toBe(3);  // This test will pass because 1 + 2 equals 3
    });
  });


  describe('fetchCity', () => {
    it('should return city and country correctly', async () => {
      const result = await fetchCity();
      expect(result).toBe('This is your city & country: Kelowna, CA');
    });
  });