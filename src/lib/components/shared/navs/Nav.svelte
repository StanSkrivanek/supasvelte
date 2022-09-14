<script>
	// import { page } from '$app/stores';
	// $: console.log('page', $page);
	// $: console.log('page', $page.url.pathname);

	import HomeIcn from '$components/icons/HomeIcn.svelte';
	import PostIcn from '$components/icons/PostIcn.svelte';
	import VenueIcn from '$components/icons/VenueIcn.svelte';
	import InstructorIcn from '$components/icons/InstructorIcn.svelte';
	import SettingsIcn from '$components/icons/SettingsIcn.svelte';
	import CourseIcn from '$components/icons/CourseIcn.svelte';
	import CalendarIcn from '$components/icons/CalendarIcn.svelte';
	import OrganizationIcn from '$components/icons/OrganizationIcn.svelte';
</script>

<nav>
	<ul>
		<li><HomeIcn /><a href="/">Home</a></li>
		<li><PostIcn /><a href="/dashboard/post">Post</a></li>
		<li><CalendarIcn /><a href="/dashboard/schedule">Schedule</a></li>
		<li class="nav-divider" />
		<li><CourseIcn /><a href="/dashboard/courses">Courses</a></li>
		<li><VenueIcn /><a href="/dashboard/venue">Venues</a></li>
		<li><OrganizationIcn /><a href="/dashboard/organization">Organizations</a></li>
		<li><InstructorIcn /><a href="/dashboard/instructor">Instructors</a></li>
		<li class="nav-divider" />
		<li><SettingsIcn /><a href="/dashboard/settings"> Page Settings</a></li>
	</ul>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		width: 100%;
		background-color: #1b0e30;
		padding: 2rem 1rem;
		min-height: 100vh;
		overflow: scroll;
	}
	ul {
		list-style: none;
	}
	ul li {
		display: flex;
		align-items: center;
		padding: 0.1rem 0.5rem;
		margin-bottom: 0.25rem;
	}
	ul li a {
		display: block;
		font-size: 1rem;
		text-decoration: none;
		color: #fff;
		opacity: 0.5;
		padding-left: 0.5rem;
	}

	ul li:hover a {
		opacity: 1;
	}
	.nav-divider {
		margin: 1rem 0;
		border-bottom: 1px solid #fff;
		opacity: 0.2;
	}
</style>
