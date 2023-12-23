function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var department = document.getElementById("department").value;
    var position = document.getElementById("position").value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var dob = document.getElementById("dob").value;

    var nameError = document.getElementById("nameError");
    nameError.innerHTML = ""; 

    if (name.trim() === "") {
        nameError.innerHTML = "Name is required";
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        nameError.innerHTML = "Invalid characters in the name";
        return false;
    }

    var ageError = document.getElementById("ageError");
    ageError.innerHTML = ""; 

    if (age.trim() === "") {
        ageError.innerHTML = "Age is required";
        return false;
    } else if (isNaN(age) || age < 1) {
        ageError.innerHTML = "Invalid age value";
        return false;
    }

    var departmentError = document.getElementById("departmentError");
    departmentError.innerHTML = ""; 

    if (department === "") {
        departmentError.innerHTML = "Department is required";
        return false;
    }

    var positionError = document.getElementById("positionError");
    positionError.innerHTML = ""; 

    if (position.trim() === "") {
        positionError.innerHTML = "Position is required";
        return false;
    }

    var genderError = document.getElementById("genderError");
    genderError.innerHTML = "";

    if (!gender) {
        genderError.innerHTML = "Gender is required";
        return false;
    }

    var dobError = document.getElementById("dobError");
    dobError.innerHTML = "";

    if (dob.trim() === "") {
        dobError.innerHTML = "Date of Birth is required";
        return false;
    }

    return true;
}

function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.department + "</td>";
        html += "<td>" + element.position + "</td>";
        html += "<td>" + element.gender + "</td>";
        html += "<td>" + element.dob + "</td>";
        html +=
            '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
            index + ')" class="btn btn-warning m-2">Edit</button> </td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();

function AddData() {
    if (validateForm()) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var department = document.getElementById("department").value;
        var position = document.getElementById("position").value;
        var gender = document.querySelector('input[name="gender"]:checked').value;
        var dob = document.getElementById("dob").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            age: age,
            department: department,
            position: position,
            gender: gender,
            dob: dob,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("department").value = "";
        document.getElementById("position").value = "";
        document.querySelector('input[name="gender"]:checked').checked = false;
        document.getElementById("dob").value = "";
    }
}

function deleteData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("department").value = peopleList[index].department;
    document.getElementById("position").value = peopleList[index].position;

    // Gender radio buttons
    var gender = peopleList[index].gender;
    if (gender === "male") {
        document.getElementById("genderMale").checked = true;
    } else if (gender === "female") {
        document.getElementById("genderFemale").checked = true;
    }

    document.getElementById("dob").value = peopleList[index].dob;

    document.querySelector("#Update").onclick = function () {
        if (validateForm()) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].department = document.getElementById("department").value;
            peopleList[index].position = document.getElementById("position").value;
            peopleList[index].gender = document.querySelector('input[name="gender"]:checked').value;
            peopleList[index].dob = document.getElementById("dob").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("department").value = "";
            document.getElementById("position").value = "";
            document.querySelector('input[name="gender"]:checked').checked = false;
            document.getElementById("dob").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    };
}

