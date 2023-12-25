import "./Header.css";
const Header = ({ time, setLanguage }) => {
	return (
		<header>
			<select data-testid="select" onClick={(e) => setLanguage(e.target.value)}>
				<option value="javascript">javascript</option>
				<option value="python">python</option>
			</select>
			<h1>
				Select language, insert your code and we'll do the rest!{" "}
			</h1>
			<span
				style={{
					color: "#947e7e",
					fontWeight: "bold",
				}}
			>
				Executed in: {time ?? 0}
			</span>
		</header>
	);
};

export default Header;
