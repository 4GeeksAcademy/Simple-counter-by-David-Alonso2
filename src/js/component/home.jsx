import React, { useEffect, useState } from "react";
import { Digit } from "./digit.jsx";

const Home = () => {
	const [timer, setTimer] = useState(0)
	const [active, setActive] = useState(false)
	const [isCountDown, setIsCountDown] = useState(false)
	const [alert, setAlert] = useState(0)

	useEffect(() => {
		if (timer == alert && alert != 0) window.alert("Tiempo agotado")
		if (active && !isCountDown) {
			const interval = setTimeout(() => {

				setTimer(value => value + 1);

			}, 1000);
			return () => clearTimeout(interval);


		}
		if (isCountDown) {

			if (timer > 0) {

				const interval = setTimeout(() => {

					setTimer(value => value - 1);

				}, 1000);
				return () => clearTimeout(interval);
			} else {
				setIsCountDown(false);
				setActive(false);

			}

		}


	}, [timer, active, isCountDown, alert])

	const startStop = () => setActive(value => !value)
	const resetTimer = () => setTimer(0)
	const handleChange = e => setTimer(parseInt(e.target.value, 10) || 0);



	return (
		<>
			<div className="d-flex justify-content-center container col-6 mt-5">


				<main className="text-center">
					<section className="counter-holder">
						<Digit number={<span className="fa fa-clock"></span>} />
						<Digit number={Math.floor(timer / 10000) % 10} />

						<Digit number={Math.floor(timer / 1000) % 10} />
						<Digit number={Math.floor(timer / 100) % 10} />
						<Digit number={Math.floor(timer / 10) % 10} />
						<Digit number={Math.floor(timer % 10)} />

					</section>
					<section className="container text-center my-2">

						<div>
							<button
								disabled={active}
								onClick={startStop} className="btn btn-success  m-3">Start</button>
							<button
								disabled={!active}
								onClick={startStop} className="btn btn-secondary  m-3">Stop</button>
							<button onClick={resetTimer} className="btn btn-danger m-3">Reset</button>
						</div>
					</section>
					<section className="container text-center my-5">
						<h2>Cuenta atrás</h2>
						<form className="form-control bg-dark n" onSubmit={e => e.preventDefault()}>
							<label className="form-text">Añadir al inicio
								<input className="form-control" type="number"
									value={timer}
									onChange={e => handleChange(e)}
								/>

							</label>
							<div>
								<input
									disabled={isCountDown}
									onClick={() => setIsCountDown(value => !value)}
									className="m-1 btn btn-success" type="submit" value={"start"} />
								<input
									disabled={!isCountDown}
									onClick={() => setIsCountDown(value => !value)}
									className="m-1 btn btn-secondary" type="submit" value={"stop"} />

							</div>

						</form>

					</section>
					<section className="text-center containe my-2">
						<h2>Crear alerta</h2>
						<form className="form-control bg-dark"
							onSubmit={e => e.preventDefault()}
						>
							<label className="form-text">Alert at
								<input type="number" className="form-control"
									onChange={e => setAlert(value => value = e.target.value)} />
							</label>
							<div><input
								onClick={() => window.alert("Alerta creada")}
								className="my-3 mx-1 btn btn-success " type="submit" value={"Create!"} />
							</div>
						</form>


					</section>
				</main>
			</div>
		</>
	)

};



export default Home;
