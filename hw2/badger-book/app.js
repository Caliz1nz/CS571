function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	let createNode = document.createElement("div");
	let nameNode = document.createElement("h3");
	nameNode.innerText = studs.name.first + " " + studs.name.last;
	let majorNode = document.createElement("strong");
	majorNode.innerText = studs.major;
	let creditAndWiscNode = document.createElement("p");
	creditAndWiscNode.innerText = studs.name.first + "is taking " + studs.numCredits + " and " + (studs.fromWisconsin ? "is from Wisconsin." : "is not from Wisconsin.");
	let tableDescNode = document.createElement("p");
	tableDescNode.innerText = "They have " + studs.interests.length + " interests including...";
	let interestTableNode = document.createElement("ul");
	for(let interest of studs.interests){
		let interestNode = document.createElement("li");
		interestNode.innerText = interest;
		interestNode.addEventListener("click", e => {
			const selectedInterest = e.target.innerText;
			document.getElementById("search-name").value = "";
			document.getElementById("search-major").value = "";
			document.getElementById("search-interest").value = selectedInterest;
			document.getElementById("search-btn").click();
		})
		interestTableNode.appendChild(interestNode);
	}
	tableDescNode.appendChild(interestTableNode);
			createNode.appendChild(nameNode);
			createNode.appendChild(majorNode);
			createNode.appendChild(creditAndWiscNode);
			createNode.appendChild(tableDescNode);
	return createNode;
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!
	fetch("https://cs571.org/rest/s25/hw2/students", {
		headers: {
			"X-CS571-ID": CS571.getBadgerId()
		}
	}).then(res => {
		if(res.status === 200 || res.status === 304){
			console.log(res);
			return res.json();
		} else {
			throw new Error();
		}
	}).then(data => {
		console.log(data);
		const nameInCondition = document.getElementById("search-name").value;
		const majorInCondition = document.getElementById("search-major").value;
		const interestInCondition = document.getElementById("search-interest").value;
		let searchResult = data.filter(stu => {
			let searchWithName = nameInCondition === "" ? false : true;
			let searchWithMajor = majorInCondition === "" ? false : true;
			let searchWithInterest = interestInCondition === "" ? false : true;
			const stuName = stu.name.first + " " + stu.name.last;
			return (searchWithName ? stuName.toLowerCase().includes(nameInCondition.trim().toLowerCase()) : true)
				   && (searchWithMajor ? stu.major.toLowerCase().includes(majorInCondition.trim().toLowerCase()) : true)
			 	   && (searchWithInterest ? stu.interests.some(interest => interest.toLowerCase().includes(interestInCondition.trim().toLowerCase())) : true);
		})
		const numOfStu = document.getElementById("num-results");
		const insertLocation = document.getElementById("students");
		numOfStu.innerText = searchResult.length;
		insertLocation.innerHTML = "";
		for(let elem of searchResult){
			let createNode = buildStudents(elem);
			createNode.classList.add('col-12', 'col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'col-xxl-3');
			insertLocation.appendChild(createNode);
		}

	})
	// TODO Implement the search
	
}

document.getElementById("search-btn").addEventListener("click", handleSearch);