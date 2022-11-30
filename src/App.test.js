import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App component", () => {
	it("renders all elements", () => {
		render(<App />);
		expect(screen.getByTestId("select")).toBeInTheDocument();
		expect(screen.getByRole("heading")).toHaveTextContent(/Select Language/gi);
		expect(screen.getByTestId("code")).toHaveTextContent("");
		expect(screen.getByRole("button", { name: "Compile" })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Clear results" })
		).toBeInTheDocument();
	});
	it("handles user events", () => {
		render(<App />);
		const codeTable = screen.getByTestId("code");
		const solutionTable = screen.getByTestId("solution");
		const compileButton = screen.getByRole("button", { name: "Compile" });
		const clearButton = screen.getByRole("button", { name: "Clear results" });
		fireEvent.change(codeTable, { target: { value: "console.log(1)" } });
		fireEvent.click(compileButton);
		expect(codeTable.value).toBe("console.log(1)");
		expect(compileButton).toBeInTheDocument();
		fireEvent.click(clearButton);
		expect(codeTable).toHaveTextContent("");
		expect(solutionTable).toHaveTextContent("Run your code...");
	});

});
