<div class="row">
	<div class="header-item logo"><a href="/">Logo</a></div>
	<div class="header-item">
		<nav class="menu">
			<ul >
				<li>
					<a href="/" class="menu-item">Home</a>
				</li>
				<li>
					<a href="/courses" class="menu-item-has-children">courses</a>
				</li>
				<li>
					<a href="/venues" class="menu-item">venues</a>
				</li>
				<li>
					<a href="/organisations" class="menu-item">organisations</a>
				</li>
			</ul>
		</nav>
	</div>
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	a {
		text-decoration: none;
	}
  .logo a {
		font-size: 30px;
		color: #000000;
		font-weight: 700;
		text-decoration: none;
	}
  .menu > ul > li {
		display: inline-block;
		/* line-height: 50px; */
		margin-left: 8px;
		/*margin-left: 25px;*/
	}
.menu > ul > li > a {
		font-size: 15px;
		font-weight: 500;
		color: #000000;
		position: relative;
		text-transform: capitalize;
		transition: color 0.3s ease;
	}
.menu > ul > li:hover > a {
		color: #ff4d6a;
	}
</style>
