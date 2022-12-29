// @ts-nocheck
import "./App.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
	const [data, setData] = useState(null);
	const [id, setId] = useState(null);
	const [time, setTime] = useState(null);
	const [isFetching, setIsFetching] = useState(false);
	const [language, setLanguage] = useState("javascript");
	const ref = useRef(null);

	const url = process.env.REACT_APP_API_URL;

	const compileHandler = async () => {
		setData("Waiting for server to respond...");
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
			setData(error.response.data.msg);
			setIsFetching(false);
		}
	};
	useEffect(() => {
		if (!isFetching && !id) {
			return;
		}
		const fetchHandler = async () => {
			try {
				const { data } = await axios.get(`${url}/${id}`);
				
				let { result, compiled_in } = data;

				if (result && compiled_in) {
					setIsFetching(false);
					setId(null);
					setTime(compiled_in);
					setData(result);
				} else {
					setData("Hm... what's taking so long!?");
				}
			} catch (error) {
				setData("Something went wrong, please try again.");
			}
		};

		let interval = setInterval(fetchHandler, 2000);

		return () => {
			clearInterval(interval);
		};
	}, [isFetching, id]);

	return (
		<div className="app">
			<header>
				<select
					data-testid="select"
					onClick={(e) => setLanguage(e.target.value)}
				>
					<option value="javascript">javascript</option>
					<option value="python">python</option>
				</select>
				<h1>Select language, insert your code and we'll do the rest!</h1>
				<span
					style={{
						visibility: time ? "visible" : "hidden",
						color: "black",
						fontWeight: "bold",
					}}
				>
					Executed in: {time}
				</span>
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
