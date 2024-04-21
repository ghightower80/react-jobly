import React from "react";
import { render } from "@testing-library/react";
import Companies from "./CompanyList";
/**
 * Snapshot test for the Companies component.
 * 
 * A snapshot test is a way to capture the current state of a component's rendered output
 * and save it as a reference for future tests. It ensures that the UI does not change
 * unexpectedly over time.
 * 
 * In this test:
 * - The Companies component is rendered.
 * - The rendered output is captured as a snapshot.
 * - The captured snapshot is compared against the stored snapshot.
 * 
 * If there are any differences between the captured and stored snapshots, the test will fail,
 * indicating that the UI has changed in an unexpected way.
 */
it("matches snapshot", function () {
  const { asFragment } = render(<Companies />);
  expect(asFragment()).toMatchSnapshot();
});
