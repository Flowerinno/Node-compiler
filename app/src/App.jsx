// @ts-nocheck
import "./App.css";
import { useState, useEffect } from "react";
import EditorComponent from "./components/Editor";
import Header from "./components/header/Header";
import { compileCode, fetchData } from "./api/api";
import Modal from "./components/modal/Modal";
function App() {
	const [data, setData] = useState(null);
	const [id, setId] = useState(null);
	const [time, setTime] = useState(null);
	const [isFetching, setIsFetching] = useState(false);
	const [language, setLanguage] = useState("javascript");
	const [currentInput, setCurrentInput] = useState("");
	const [isOpen, setIsOpen] = useState();
	const url = process.env.REACT_APP_API_URL;

	// const compileHandler = async () => {
	// 	setData("Waiting for server to respond...");
	// 	try {
	// 		const {
	// 			data: { id },
	// 		} = await axios.post(
	// 			url,
	// 			{ currentInput, language: language },
	// 			{
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 			}
	// 		);
	// 		console.log(id);
	// 		setId(id);
	// 		setIsFetching(true);
	// 	} catch (error) {
	// 		setData(error.response.data.msg);
	// 		setIsFetching(false);
	// 	}
	// };

	// useEffect(() => {
	// 	if (!isFetching && !id) {
	// 		return;
	// 	}
	// 	const fetchHandler = async () => {
	// 		try {
	// 			const { data } = await axios.get(`${url}/${id}`);

	// 			let { result, compiled_in } = data;

	// 			if (result && compiled_in) {
	// 				setIsFetching(false);
	// 				setId(null);
	// 				setTime(compiled_in);
	// 				setData(result);
	// 			} else {
	// 				setData("Hm... what's taking so long!?");
	// 			}
	// 		} catch (error) {
	// 			setData("Something went wrong, please try again.");
	// 		}
	// 	};

	// 	let interval = setInterval(fetchHandler, 2000);

	// 	return () => {
	// 		clearInterval(interval);
	// 	};
	// }, [isFetching, id]);

	const handleCompile = async () => {
		setData("Waiting for server to respond...");

		try {
			const newId = await compileCode(url, currentInput, language);

			console.log(newId);
			setId(newId);
			setIsFetching(true);
		} catch (error) {
			setData(error.message);
			setIsFetching(false);
		}
	};

	useEffect(() => {
		if (!isFetching && !id) {
			return;
		}

		const interval = setInterval(
			async () => await fetchData(url, id, setData, setIsFetching, setId, setTime),
			2000
		);

		return () => clearInterval(interval);
	}, [isFetching, id]);

	return (
		<div className="app">
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
			<Header time={time} setLanguage={setLanguage} />
			<EditorComponent data={data} setCurrentInput={setCurrentInput} />
			<div className="buttons">
				<button onClick={handleCompile} id="compile-button" className='app_buttons'>
					Run
				</button>
				<button onClick={() => setData(null)} id="clear-button" className='app_buttons'>
					Clear results
				</button>
			</div>
			<button onClick={(()=> setIsOpen(true))} className='about'>?</button>
		</div>
	);
}

export default App;
