let students = [];
let editId = 0;

const apiUrl = "https://localhost:7124/api/Students";

// Page Load
window.onload = function () {
    loadStudents();
};

// Add / Update Student
async function addStudent() {

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        age: parseInt(document.getElementById("age").value),
        admissionDate: document.getElementById("admissionDate").value,
        mobileNumber: document.getElementById("mobileNumber").value,
        address: document.getElementById("address").value
    };

    let response;

    if (editId == 0) {

        response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

    } else {

        response = await fetch(`${apiUrl}/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        editId = 0;
        document.querySelector(".form-box button").innerText = "Add Student";
    }

    if (response.ok) {

        alert("Saved Successfully");

        clearForm();
        loadStudents();

    } else {

        alert("Operation Failed");

    }
}

// Load Students
async function loadStudents() {

    const response = await fetch(apiUrl);
    const data = await response.json();
    students = data;

    const tableBody = document.getElementById("studentTableBody");

    tableBody.innerHTML = "";

    data.forEach(student => {

        tableBody.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.age}</td>
            <td>${student.admissionDate.substring(0, 10)}</td>
            <td>${student.mobileNumber}</td>
            <td>${student.address}</td>

            <td>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        </tr>
        `;

    });

}

// Edit Student
async function editStudent(id) {

   // const response = await fetch(apiUrl);
    //const data = await response.json();
    const student = students.find(x => x.id == id);


    if (!student) {
        alert("Student Not Found");
        return;
    }

  
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;
    document.getElementById("age").value = student.age;
    document.getElementById("admissionDate").value = student.admissionDate.split("T")[0];
    document.getElementById("mobileNumber").value = student.mobileNumber;
    document.getElementById("address").value = student.address;

    editId = id;

    document.querySelector(".form-box button").innerText = "Update Student";
}

// Delete Student
async function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {

        alert("Student Deleted Successfully");
        loadStudents();

    } else {

        alert("Delete Failed");

    }
}

// Clear Form
function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
    document.getElementById("age").value = "";
    document.getElementById("admissionDate").value = "";
    document.getElementById("mobileNumber").value = "";
    document.getElementById("address").value = "";

}