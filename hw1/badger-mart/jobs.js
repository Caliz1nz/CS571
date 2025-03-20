function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    let jobs = document.getElementsByName("job");
    let flag = false;
    for(let job of jobs){
        if(job.checked){
            flag = true;
            alert(`Thank you for applying to be a ${job.value}!`);
        }
    }
    if(!flag){
        alert("Please select a job!");
    }
}