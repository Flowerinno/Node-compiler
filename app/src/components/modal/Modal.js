import React from "react";
import "./Modal.css";
const Modal = ({ isOpen, setIsOpen }) => {
	if (!isOpen) return null;
    console.log(isOpen)
	return (
		<div className="modal_container">
            <div className="modal">
			<h2>About node compiler application by Aleksandr Kononov:</h2>
			<ul>
				<li>"Backend - Node.js: When a user sends their code via a POST request, the server returns an id that represents a file created on a Docker container for security reasons. To handle load balancing, we use RabbitMQ. After the code is sent, it is executed on the Docker environment and the results are saved to a PostgreSQL database. Next, we await the RabbitMQ consumer to retrieve the compiled results from the database and deliver them back to the user. As an additional feature, we have implemented database dumping from Postgres to an AWS S3 cluster. We hope you have a good day!"</li>
					<li><a href='https://github.com/Flowerinno' target="_blank">@Github</a></li>
					<li><a href="https://www.linkedin.com/in/aleksandr-kononov-56b804222/" target="_blank">@LinkedIn</a></li>
			</ul>
			<button onClick={() => setIsOpen(false)} className='modal_button'>CLOSE THIS MODAL I DON'T WANT TO READ THIS</button>
            </div>
		</div>
	);
};

export default Modal;
