import { useSelector } from "react-redux";
import { Container, Divider, Grid, Paper, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import * as dayjs from "dayjs";
import PageHeader from "./components/PageHeader";

export default function Dashboard() {
	const user = useSelector((state) => state.user);
	const settings = useSelector((state) => state.settings.attributes);
	const events = useSelector((state) => state.events);
	const students = useSelector((state) => state.students);
	const activeStudentCount = students.filter((s) => s.status === "active").length;

	return (
		<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<PageHeader icon={<HomeIcon fontSize="large" sx={{ mr: 1 }} />} page="Dashboard" />
			<Grid container spacing={6}>
				<Grid item xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Typography variant="h4" component="h3" gutterBottom color="primary" sx={{ textAlign: "left" }}>
							Welcome, {user.firstName} {user.lastName}.
						</Typography>
						<Divider sx={{ mb: 2 }} />
					</Paper>
				</Grid>
				<Grid item xs={12} md={8}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Typography variant="h4" component="h2" gutterBottom color="primary" sx={{ textAlign: "left" }}>
							Schedule
						</Typography>
						<Divider sx={{ mb: 2 }} />
						<FullCalendar
							plugins={[timeGridPlugin]}
							initialView="timeGridDay"
							nowIndicator={true}
							slotMinTime={settings.slotMinTime}
							slotMaxTime={settings.slotMaxTime}
							eventColor="#ee7d68"
							height="auto"
							events={events}
						/>
					</Paper>
				</Grid>
				<Grid container item xs={12} md={4} spacing={2} direction="column">
					<Paper
						sx={{
							mt: 2,
							p: 2,
							minheight: 100,
							mb: 2,
						}}
					>
						<Grid item container xs={12}>
							<Grid item xs={12}>
								<MusicNoteIcon />
							</Grid>
							<Grid item xs={12}>
								<Typography variant="button" color="initial">
									{user.studioName}
								</Typography>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<Typography sx={{ mt: 1 }} variant="body2" gutterBottom>
									{user.address} <br /> {user.phone}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
					<Paper
						sx={{
							p: 2,
							minHeight: 100,
							mb: 2,
						}}
					>
						<Grid item container xs={12}>
							<Grid item xs={12}>
								<EventIcon />
							</Grid>
							<Grid item xs={12}>
								<Typography variant="button" color="initial">
									{" "}
									Next Scheduled Event
								</Typography>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<Typography sx={{ mt: 1 }} variant="body2">
									{user.nextLesson ? user.nextLesson.title : "No events to display."} <br /> {user.nextLesson && dayjs(user.nextLesson.start).format("ddd, MMM D, YYYY h:mm A")}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
					<Paper
						sx={{
							p: 2,
							minheight: 100,
							mb: 2,
						}}
					>
						<Grid item container xs={12}>
							<Grid item xs={12}>
								<GroupIcon />
							</Grid>
							<Grid item xs={12}>
								<Typography variant="button" color="initial">
									Total Students
								</Typography>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<Typography sx={{ mt: 1 }} variant="body2" gutterBottom>
									{activeStudentCount} Active Students
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}
