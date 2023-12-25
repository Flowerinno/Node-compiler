import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import useWindowDimensions from "../utils/dimensions";
import "./Editor.css";
import { createTheme } from "@uiw/codemirror-themes";
import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import { python } from "@codemirror/lang-python";
const myTheme = createTheme({
	theme: "dark",
	settings: {
		background: "#282c34",
		foreground: "#abb2bf",
		caret: "#ecf3f5",
		selection: "#e2e8eeb3",
		selectionMatch: "#e2e8eeb3",
		lineHighlight: "#303742",
		gutterBackground: "#353941",
		gutterForeground: "#b3b6bb",
	},
	styles: [
		{ tag: t.comment, color: "#73c990" },
		{ tag: t.variableName, color: "#0080ff" },
		{ tag: [t.string, t.special(t.brace)], color: "#c994a4" },
		{ tag: t.number, color: "#c0c0d1" },
		{ tag: t.bool, color: "#2e76be" },
		{ tag: t.null, color: "#2e76be" },
		{ tag: t.keyword, color: "#a51d56" },
		{ tag: t.operator, color: "#b32e3a" },
		{ tag: t.className, color: "#b1b7bd" },
		{ tag: t.definition(t.typeName), color: "#9ea6ad" },
		{ tag: t.typeName, color: "#5c6166" },
		{ tag: t.angleBracket, color: "#9b2942" },
		{ tag: t.tagName, color: "#5c6166" },
		{ tag: t.attributeName, color: "#ff6e00" },
	],
});
const extensions = [javascript({ jsx: true }), python()];

export const EditorComponent = ({ data, setCurrentInput }) => {

	const onChange = React.useCallback((value, viewUpdate) => {
		setCurrentInput(value);
	}, [setCurrentInput]);

	const { width, height } = useWindowDimensions();
	const editorWidth = Math.min(width, 700) + "px";
	const editorHeight = height - 150 + "px";

	return (
		<div className="editor_container">
			<ReactCodeMirror
				value="console.log('hello world!');"
				height={editorHeight}
				width={editorWidth}
				onChange={onChange}
				theme={myTheme}
				extensions={extensions}
			/>
			<div className="output_container">
				<span className="output_result">
					{data ? "data" : "Output will be here"}
				</span>
			</div>
		</div>
	);
};
export default EditorComponent;
