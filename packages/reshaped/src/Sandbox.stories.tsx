import React, { useState } from "react";

import Autocomplete from "components/Autocomplete";
import Button from "components/Button";
import Calendar from "components/Calendar";
import Card from "components/Card";
import FormControl from "components/FormControl";
import HiddenInput from "components/HiddenInput";
import Image from "components/Image";
import Popover from "components/Popover";
import RadioGroup from "components/RadioGroup";
import Text from "components/Text";
import ToggleButton from "components/ToggleButton";
import ToggleButtonGroup from "components/ToggleButtonGroup";
import View from "components/View";

export default {
	title: "Sandbox",
	chromatic: { disableSnapshot: true },
};

const Preview: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<View padding={25} gap={6}>
			<View position="absolute" insetTop={0} insetStart={0}>
				<Image src="./logo.svg" />
			</View>

			{props.children}
		</View>
	);
};

export const preview = () => {
	return (
		<Preview>
			<Component />
		</Preview>
	);
};

const Component = () => {
	const [value, setValue] = useState<string>("");

	const options = [
		{
			value: "card",
			label: "Card",
		},
		{
			value: "apple-pay",
			label: "Apple Pay",
		},
		{
			value: "PayPal",
			label: "PayPal",
		},
	];

	return (
		<FormControl group>
			<FormControl.Label>Payment method</FormControl.Label>

			<RadioGroup name="payment-method" value={value} onChange={(args) => setValue(args.value)}>
				<View gap={2} direction="row">
					{options.map((option) => (
						<View.Item grow>
							<Card as="label" selected={value === option.value}>
								<HiddenInput type="radio" name="test-name" value={option.value} />
								<Text>{option.label}</Text>
							</Card>
						</View.Item>
					))}
				</View>
			</RadioGroup>
		</FormControl>
	);
};

export const flightBooking = () => {
	return (
		<Preview>
			<FlightBookingComponent />
		</Preview>
	);
};

type Airport = {
	code: string;
	name: string;
	label: string;
};

const airports: Airport[] = [
	{ code: "SYD", name: "Sydney Airport, Australia", label: "SYD – Sydney Airport, Australia" },
	{
		code: "MEL",
		name: "Melbourne Airport (Tullamarine), Australia",
		label: "MEL – Melbourne Airport (Tullamarine), Australia",
	},
	{
		code: "LAX",
		name: "Los Angeles International Airport, USA",
		label: "LAX – Los Angeles International Airport, USA",
	},
	{
		code: "JFK",
		name: "John F. Kennedy International Airport, New York, USA",
		label: "JFK – John F. Kennedy International Airport, New York, USA",
	},
	{ code: "LHR", name: "Heathrow Airport, London, UK", label: "LHR – Heathrow Airport, London, UK" },
	{
		code: "CDG",
		name: "Charles de Gaulle Airport, Paris, France",
		label: "CDG – Charles de Gaulle Airport, Paris, France",
	},
	{
		code: "ATL",
		name: "Hartsfield–Jackson Atlanta International Airport, USA",
		label: "ATL – Hartsfield–Jackson Atlanta International Airport, USA",
	},
	{ code: "DXB", name: "Dubai International Airport, UAE", label: "DXB – Dubai International Airport, UAE" },
	{
		code: "HKG",
		name: "Hong Kong International Airport, Hong Kong",
		label: "HKG – Hong Kong International Airport, Hong Kong",
	},
	{ code: "BNE", name: "Brisbane Airport, Australia", label: "BNE – Brisbane Airport, Australia" },
	{ code: "PER", name: "Perth Airport, Australia", label: "PER – Perth Airport, Australia" },
	{
		code: "DFW",
		name: "Dallas Fort Worth International Airport, USA",
		label: "DFW – Dallas Fort Worth International Airport, USA",
	},
];

const FlightBookingComponent = () => {
	const [tripType, setTripType] = useState<string[]>(["return"]);
	const [sourceQuery, setSourceQuery] = useState("");
	const [destinationQuery, setDestinationQuery] = useState("");
	const [source, setSource] = useState("");
	const [destination, setDestination] = useState("");
	const [departureDate, setDepartureDate] = useState<Date | null>(null);
	const [returnDate, setReturnDate] = useState<Date | null>(null);
	const [departureDateOpen, setDepartureDateOpen] = useState(false);
	const [returnDateOpen, setReturnDateOpen] = useState(false);

	const isReturn = tripType.includes("return");
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const filteredSourceAirports = airports.filter(
		(airport) =>
			airport.code.toLowerCase().includes(sourceQuery.toLowerCase()) ||
			airport.name.toLowerCase().includes(sourceQuery.toLowerCase())
	);

	const filteredDestinationAirports = airports.filter(
		(airport) =>
			airport.code.toLowerCase().includes(destinationQuery.toLowerCase()) ||
			airport.name.toLowerCase().includes(destinationQuery.toLowerCase())
	);

	const formatDate = (date: Date | null) => {
		if (!date) return "Select date";
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<Card padding={6}>
			<View gap={6}>
				<Text variant="title-3">Book Your Flight</Text>

				<View gap={4}>
					{/* Trip Type Toggle */}
					<FormControl>
						<FormControl.Label>Trip type</FormControl.Label>
						<ToggleButtonGroup
							value={tripType}
							onChange={(args) => {
								setTripType(args.value);
								if (!args.value.includes("return")) {
									setReturnDate(null);
								}
							}}
						>
							<ToggleButton value="oneway">One Way</ToggleButton>
							<ToggleButton value="return">Return</ToggleButton>
						</ToggleButtonGroup>
					</FormControl>

					{/* Source Airport */}
					<FormControl>
						<FormControl.Label>From</FormControl.Label>
						<Autocomplete
							name="source"
							placeholder="Select departure airport"
							value={sourceQuery}
							onChange={(args) => setSourceQuery(args.value)}
							onItemSelect={(args) => {
								setSource(args.value);
								setSourceQuery(args.value);
							}}
						>
							{filteredSourceAirports.length > 0 ? (
								filteredSourceAirports.map((airport) => (
									<Autocomplete.Item key={airport.code} value={airport.label}>
										<View direction="column">
											<Text weight="bold">{airport.code}</Text>
											<Text variant="caption-1" color="neutral-faded">
												{airport.name}
											</Text>
										</View>
									</Autocomplete.Item>
								))
							) : (
								<View padding={4}>
									<Text color="neutral-faded">No airports found</Text>
								</View>
							)}
						</Autocomplete>
					</FormControl>

					{/* Destination Airport */}
					<FormControl>
						<FormControl.Label>To</FormControl.Label>
						<Autocomplete
							name="destination"
							placeholder="Select arrival airport"
							value={destinationQuery}
							onChange={(args) => setDestinationQuery(args.value)}
							onItemSelect={(args) => {
								setDestination(args.value);
								setDestinationQuery(args.value);
							}}
						>
							{filteredDestinationAirports.length > 0 ? (
								filteredDestinationAirports.map((airport) => (
									<Autocomplete.Item key={airport.code} value={airport.label}>
										<View direction="column">
											<Text weight="bold">{airport.code}</Text>
											<Text variant="caption-1" color="neutral-faded">
												{airport.name}
											</Text>
										</View>
									</Autocomplete.Item>
								))
							) : (
								<View padding={4}>
									<Text color="neutral-faded">No airports found</Text>
								</View>
							)}
						</Autocomplete>
					</FormControl>

					{/* Date Selection */}
					<View gap={4} direction="row">
						{/* Departure Date */}
						<View.Item grow>
							<FormControl>
								<FormControl.Label>Departure</FormControl.Label>
								<Popover
									active={departureDateOpen}
									onOpen={() => setDepartureDateOpen(true)}
									onClose={() => setDepartureDateOpen(false)}
									position="bottom-start"
								>
									<Popover.Trigger>
										{(attributes) => (
											<Button variant="outline" fullWidth attributes={attributes}>
												{formatDate(departureDate)}
											</Button>
										)}
									</Popover.Trigger>
									<Popover.Content>
										<Calendar
											value={departureDate}
											min={today}
											max={returnDate || undefined}
											onChange={(args) => {
												setDepartureDate(args.value);
												setDepartureDateOpen(false);
											}}
										/>
									</Popover.Content>
								</Popover>
							</FormControl>
						</View.Item>

						{/* Return Date */}
						{isReturn && (
							<View.Item grow>
								<FormControl>
									<FormControl.Label>Return</FormControl.Label>
									<Popover
										active={returnDateOpen}
										onOpen={() => setReturnDateOpen(true)}
										onClose={() => setReturnDateOpen(false)}
										position="bottom-start"
									>
										<Popover.Trigger>
											{(attributes) => (
												<Button
													variant="outline"
													fullWidth
													attributes={attributes}
													disabled={!departureDate}
												>
													{formatDate(returnDate)}
												</Button>
											)}
										</Popover.Trigger>
										<Popover.Content>
											<Calendar
												value={returnDate}
												min={departureDate || today}
												onChange={(args) => {
													setReturnDate(args.value);
													setReturnDateOpen(false);
												}}
											/>
										</Popover.Content>
									</Popover>
								</FormControl>
							</View.Item>
						)}
					</View>

					{/* Search Button */}
					<Button
						color="primary"
						fullWidth
						disabled={!source || !destination || !departureDate || (isReturn && !returnDate)}
					>
						Search Flights
					</Button>
				</View>
			</View>
		</Card>
	);
};
