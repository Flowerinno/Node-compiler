// @ts-nocheck
import "./App.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
	const [data, setData] = useState(null);
	const [id, setId] = useState(null);
	const [isFetching, setIsFetching] = useState(false);
	const [language, setLanguage] = useState("javascript");
	const ref = useRef(null);
	const url = `http://localhost:8000`;

	const compileHandler = async () => {
		try {
			const {
				data: { id },
			} = await axios.post(
				url,
				{ code: ref.current.value, language: language },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setId(id);
			setIsFetching(true);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (!isFetching && !id) {
			return;
		}
		const fetchHandler = async () => {
			try {
				const res = await axios.get(`${url}/${id}`);
				let { result } = res.data.result[0];

				if (res) {
					setIsFetching(false);
					setId(null);
					setData(result);
				} else {
					console.log("No response from the server yet");
				}
			} catch (error) {
				throw error;
			}
		};

		let interval = setInterval(fetchHandler, 5000);

		return () => {
			clearInterval(interval);
		};
	}, [isFetching, id]);

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
