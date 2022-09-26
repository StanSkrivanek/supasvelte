<div class="sbc-card">
	<div class="sbc-top__c">
		<div class="sbc-section--top">
			<div class="sbc-place">
				<div class="sbc-venue">Le CHEILE</div>
				<div class="sbc-city">MALLOW</div>
			</div>
			<div class="sbc-info">
				<div class="sbc-info-data">JUNE 1, 2024</div>
				<div class="sbc-info-data">GROUP 1</div>
				<div class="sbc-info-data">10:30 AM</div>
			</div>
		</div>
		<div class="sbc-mid__c">
			<div class="sbc-section--mid">
				<div class="address__w">
					<div class="sbc-venue__c">
						<p class="sbc-info-label">Address</p>
						<p class="sbc-info-data">Venue Name</p>
						<p class="sbc-info-data">Address 1</p>
						<p class="sbc-info-data">Address 2</p>
						<p class="sbc-info-data">P51 PF10</p>
						<p class="sbc-info-label">Phone</p>
						<p class="sbc-info-data">+353 22 42439</p>
					</div>
					<div class="sbc-info"><img src="https://via.placeholder.com/140" alt="Trainer" /></div>
				</div>
			</div>
			<div class="card--divider">
				<p>course details</p>
			</div>
			<div class="sbc-course-details">
				<div class="detail__w">
					<p class="sbc-info-label">starts</p>
					<p class="sbc-info-data">Jun 1, 2022</p>
				</div>
				<div class="detail__w">
					<p class="sbc-info-label">ends</p>
					<p class="sbc-info-data">Sep 1, 2022</p>
				</div>
				<div class="detail__w">
					<p class="sbc-info-label">Group</p>
					<p class="sbc-info-data">Group 1</p>
				</div>
				<div class="detail__w">
					<p class="sbc-info-label">Week day</p>
					<p class="sbc-info-data">Tuesday</p>
				</div>
				<div class="detail__w">
					<p class="sbc-info-label">from</p>
					<p class="sbc-info-data">10:30am</p>
				</div>
				<div class="detail__w">
					<p class="sbc-info-label">to</p>
					<p class="sbc-info-data">12:00pm</p>
				</div>
				<div class="detail__w">
					<p class="sbc-info-label">costs</p>
					<p class="sbc-info-data">€120</p>
				</div>
				<div class="detail__w">
					<p class="sbc-info-label">Funded by</p>
					<p class="sbc-info-data">Oranization Name</p>
				</div>
			</div>
			<div class="card--divider">
				<p>Trainers</p>
			</div>
			<div class="trainers__c">
				<div class="trainer__w">
					<img src="https://via.placeholder.com/48" alt="Trainer" />
					<p class="sbc-info-data">Trainers Name</p>
				</div>
				<div class="trainer__w">
					<img src="https://via.placeholder.com/48" alt="Trainer" />
					<p class="sbc-info-data">Trainers Name</p>
				</div>
			</div>
			<div class="sbc-download">
				<button>Download Form</button>
			</div>
		</div>
		<div class="sbc-footer__c">
			<p class="sbc-info-label">Application Close</p>
			<p class="sbc-info-data">Jun 3, 2024</p>
			<button>SHOW/HIDE</button>
		</div>
	</div>
</div>

<style>
	.sbc-card {
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 0.25rem;
		color: var(--col-white);
		background: var(--img-overlay-gradient-main);
	}
	.sbc-section--top {
		display: flex;
		justify-content: space-between;
		font-family: 'MainSemiBold';
		color: var(--col-white);
		border-bottom: 1px solid #99a3ba;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
	}
	.sbc-venue {
		flex: 1 0 50%;
		margin-bottom: 0.25rem;
	}
	.sbc-city {
		font-size: 0.8rem;
		font-family: 'MainRegular';
		margin-bottom: 1rem;
	}
	.sbc-info {
		flex: 0 1 50%;
		text-align: end;
		width: 100%;
		font-size: 0.8rem;
		font-family: 'MainRegular';
	}
	.sbc-info-label {
		font-family: 'MainRegular';
		font-size: 1rem;
		text-transform: uppercase;
		margin-bottom: 0.4rem;
		color: var(--col-purple-dark);
	}
	.sbc-info-data {
		margin-bottom: 0.25rem;
		font-size: 0.9rem;
	}
	.card--divider {
		border-top: 1px solid #99a3ba;
		padding: 0.5rem;
		margin-bottom: 0.5rem;

		text-transform: uppercase;
		color: var(--col-purple-dark);
	}
	/* MID */
	.sbc-mid__c {
		padding-bottom: 1rem 0;
	}
	.address__w {
		display: flex;
		justify-content: space-between;
	}
	.sbc-section--mid {
		padding: 0 0.5rem;
		margin-bottom: 0.5rem;
	}
	.sbc-course-details {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.detail__w {
		/* display: flex; */
		/* justify-content: space-between; */
		margin-bottom: 0.25rem;
	}

	.trainers__c {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
	.trainer__w {
		display: flex;
		align-items: center;
	}
	.trainer__w img {
		width: 48px;
		height: 48px;
		border-radius: 0.25rem;
		margin-right: 0.5rem;
	}
	.sbc-download {
		text-align: center;
		margin-bottom: 1rem;
	}
	/* FOOTER */
	.sbc-footer__c {
		text-align: center;
		padding: 0.5rem;
		border-top: 1px solid #99a3ba;
	}
.sbc-footer__c .sbc-info-data{
  margin-bottom: 1rem;
}
	button {
		text-transform: uppercase;
		border: none;
		border: 1px solid var(--col-bg-gray);
		background: transparent;
		padding: 0.5rem 1rem;
		color: var(--col-bg-gray);
		border-radius: 4px;
		letter-spacing: 0.05rem;
		cursor: pointer;
		text-decoration: none;
	}
</style>
