import { describe, test ,it, expect, vi } from 'vitest';
import * as module from "./weather-module.js"; // Adjust the import path

describe("getDate", () => {
  it("should convert a unix timestamp to a readable date", () => {
    const dateUnix = 1704124800; // Example: Friday, 1 Jan 2024
    const timezone = 0; // UTC
    const result = module.getDate(dateUnix, timezone);
    expect(result).toBe("Monday 1, Jan");
  });
});

describe("getDateopen", () => {
  it("should convert an ISO date string to a readable format", () => {
    const dateString = "2024-01-01T00:00:00Z";
    const result = module.getDateopen(dateString);
    expect(result).toBe("Jan 1");
  });

  it("should return the original string if the date is invalid", () => {
    const dateString = "invalid-date";
    const result = module.getDateopen(dateString);
    expect(result).toBe("invalid-date");
  });
});

describe("getTime", () => {
  it("should convert a unix timestamp to a readable time", () => {
    const timeUnix = 1111111111; //Friday March 18, 2005 01:58:31 (am)
    const timezone = 0; // UTC
    const result = module.getTime(timeUnix, timezone);
    expect(result).toBe("1:58 AM");
  });
});

describe("getHours", () => {
  it("should convert a unix timestamp to hours in 12-hour format", () => {
    const timeUnix = 1111111111; //Friday March 18, 2005 01:58:31 (am) UTC, our prigram rounds down to hours 
    //hence we expect : hours = 1AM
    const timezone = 0; // UTC
    const result = module.getHours(timeUnix, timezone);
    expect(result).toBe("1 AM");
  });
});

describe("mps_to_kmh", () => {
  it("should convert meters per second to kilometers per hour", () => {
    const mps = 10; // 10 m/s
    const result = module.mps_to_kmh(mps);
    expect(result).toBeCloseTo(36, 1);
  });
});

describe("aqiText", () => {
  it("should return the correct AQI level and message", () => {
    const aqi = 3;
    const result = module.aqiText[aqi];
    expect(result).toEqual({
      level: "Moderate",
      message:
        "No need to modify your usual outdoor activities unless you experience symptoms such as coughing and throat irritation.",
    });
  });
});

describe("openicon", () => {
  it("should return the correct weather description and image", () => {
    const code = 61; // Rain: Slight intensity
    const result = module.openicon[code];
    expect(result).toEqual({
      description: "Rain: Slight intensity",
      image: "images/10d",
    });
  });

  it("should return default description and image for unknown codes", () => {
    const code = 999; // Unknown code
    const result = module.openicon[code] || module.openicon.default;
    expect(result).toEqual({
      description: "Unknown weather",
      image: "images/unsure",
    });
  });
});
