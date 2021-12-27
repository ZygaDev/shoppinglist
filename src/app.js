let React = require("react");
import { Container, Table, Button, Row, Col, Form, Alert } from "react-bootstrap";

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shopItems: ["mleko", "chleb"],
			message: "",
		};
	}

	addItem(e) {
		e.preventDefault();
		const { shopItems } = this.state;
		const newItem = this.newItem.value;

		const exists = shopItems.includes(newItem);

		if (exists) {
			this.setState({
				message: "Ten produkt znajduje się już na liście.",
			});
		} else if (newItem == " " || newItem == "") {
			this.setState({
				message: "Nie możesz dodać pustego produktu",
			});
		} else {
			newItem !== "" &&
				this.setState({
					shopItems: [...this.state.shopItems, newItem],
					message: "",
				});
		}

		this.addForm.reset();
	}

	removeItem(item) {
		const newshopItems = this.state.shopItems.filter((oldItem) => {
			return oldItem !== item;
		});
		this.setState({
			shopItems: [...newshopItems],
		});

		if (newshopItems.length === 0) {
			this.setState({
				message: "Twoja lista zakupów jest pusta.",
			});
		}
	}
	clearAll() {
		this.setState({
			shopItems: [],
			message: "Twoja lista zakupów jest pusta.",
		});
	}
	render() {
		const { shopItems, message } = this.state;
		return (
			<Container>
				<Row>
					<Col xs={12}>
						{" "}
						<Form
							ref={(input) => (this.addForm = input)}
							onSubmit={(e) => {
								this.addItem(e);
							}}
						>
							<Form.Label> Lista zakupów</Form.Label>
							<Row>
								<Col xs={10}>
									<Form.Control
										type="text"
										placeholder="Produkt"
										id="newItemInput"
										ref={(input) => (this.newItem = input)}
									/>
								</Col>
								<Col xs={2}>
									<Button variant="primary" type="submit">
										Dodaj
									</Button>
								</Col>
							</Row>
						</Form>{" "}
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<div className="content">
							{(message !== "" || shopItems.length === 0) && (
								<Alert variant="warning ">{message}</Alert>
							)}
							{shopItems.length > 0 && (
								<Table striped bordered hover responsive>
									<thead>
										<tr>
											<th colSpan="2">Produkt</th>
											<th className="text-right">Usuń</th>
										</tr>
									</thead>
									<tbody>
										{shopItems.map((item) => {
											return (
												<tr key={item}>
													<td className="text-secondary" colSpan="2">
														{item}
													</td>
													<td className="text-right">
														<Button
															onClick={(e) => this.removeItem(item)}
															variant="primary"
															type="submit"
														>
															X
														</Button>
													</td>
												</tr>
											);
										})}
									</tbody>
									<tfoot>
										<tr>
											<td colSpan="2">&nbsp;</td>
											<td className="text-right">
												<Button
													onClick={(e) => this.clearAll()}
													variant="primary"
													type="submit"
												>
													Wyczyść
												</Button>
											</td>
										</tr>
									</tfoot>
								</Table>
							)}
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}
