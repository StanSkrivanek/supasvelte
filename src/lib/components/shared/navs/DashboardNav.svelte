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
	import ImageIcn from '$components/icons/ImageIcn.svelte';
	import AvatarIcn from '$components/icons/AvatarIcn.svelte';
</script>

<nav>
	<ul>
		<li><HomeIcn /><a href="/">Home</a></li>
		<li><PostIcn /><a href="/dashboard/post">Post</a></li>
		<li><CalendarIcn /><a href="/dashboard/open">Open Course</a></li>
	</ul>
	<ul>
		<!-- <li class="nav-divider" /> -->
		<p>Resgister</p>
		<li><CourseIcn /><a href="/dashboard/courses">Course</a></li>
		<li><VenueIcn /><a href="/dashboard/venues">Venue</a></li>
		<li><OrganizationIcn /><a href="/dashboard/organizations">Organization</a></li>
		<li><InstructorIcn /><a href="/dashboard/instructors">Instructor</a></li>
		<li><AvatarIcn /><a href="/dashboard/contacts">Contact</a></li>
	</ul>
	<ul>
		<!-- <li class="nav-divider" /> -->
		<p>Other</p>
		<li><ImageIcn /><a href="/dashboard/gallery">Gallery</a></li>
		<li><SettingsIcn /><a href="/dashboard/settings"> Page Settings</a></li>
	</ul>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		width: 100%;
		background-color: #1b0e30;
		padding: 1rem;
		min-height: 100vh;
		overflow: scroll;
	}
	ul {
		list-style: none;
	}
	ul li {
		display: flex;
		align-items: center;
		padding: 0.3rem;
		margin-bottom: 0.25rem;
	}
	ul li a {
		display: block;
		font-size: 1rem;
		letter-spacing: 0.05rem;
		text-decoration: none;
		color: #fff;
		opacity: 0.7;
		padding-left: 0.5rem;
	}

	ul li:hover a {
		opacity: 1;
	}
	p {
		font-size: 0.8rem;
		letter-spacing: 0.05rem;
		text-decoration: none;
		color: rgb(255, 255, 255);
		opacity: 0.7;
		padding: 0.25rem 0.5rem;
		margin-bottom: 0.25rem;
		background-color: rgb(176, 137, 254);
		text-transform: uppercase;
	}
	.nav-divider {
		margin: 1rem 0;
		border-bottom: 1px solid #fff;
		opacity: 0.2;
	}
</style>
