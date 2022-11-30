// @ts-nocheck
import "./App.css";
import { useState, useRef } from "react";
import axios from "axios";

function App() {
	const [data, setData] = useState(null);
	const [language, setLanguage] = useState("javascript");
	const ref = useRef(null);
	const url = `http://localhost:8000`;

	const compileHandler = async () => {
		try {
			const { data } = await axios.post(
				url,
				{ code: ref.current.value, language: language },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setData(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="app">
			<header style={{ display: "flex" }}>
				<select
					data-testid="select"
					onClick={(e) => setLanguage(e.target.value)}
				>
					<option value="javascript">javascript</option>
					<option value="python">python</option>
				</select>
				<h1>Select language, insert your code and we'll do the rest!</h1>
			</header>
			<div className="compiler">
				<textarea
					className="code"
					ref={ref}
					placeholder="Code goes here..."
					data-testid="code"
				></textarea>
				<div className="solution" data-testid="solution">
					{data ? data : "Run your code..."}
				</div>
			</div>
			<div className="buttons">
				<button onClick={compileHandler} id="compile-button">
					Compile
				</button>
				<button onClick={() => setData(null)} id="clear-button">
					Clear results
				</button>
			</div>
		</div>
	);
}

export default App;
