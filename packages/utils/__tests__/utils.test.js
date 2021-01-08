"use strict";
const moment = require("moment");
const utils = require("..");
const { dateTimeCompare } = utils;
test("dateTimeCompare compare test case 1", () => {
  const r = dateTimeCompare(moment(), moment());
  expect(r).toBeLessThanOrEqual(1);
  expect(r).toBeGreaterThanOrEqual(-1);
});
