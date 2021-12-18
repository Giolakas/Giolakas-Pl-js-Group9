window.addEventListener("load", ()=>{
//Create
    document.getElementById("add-student").addEventListener("click", function(event) {
      console.log("add-student")
       event.preventDefault();
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let grade = document.getElementById("grade").value;
        let section = document.getElementById("section").value;

        const createNewStudentReq = new XMLHttpRequest()
        let newStudentData = 
        {
         firstName: firstName,
         lastName: lastName,
         grade: grade,
         section: section
        }
   
        let newStudentDataJson = JSON.stringify(newStudentData)
         console.log(newStudentDataJson);
         createNewStudentReq.open("POST", "http://3.0.21.82:3000/students/new")
         createNewStudentReq.setRequestHeader("Content-Type", "application/json")
         createNewStudentReq.onload = function()
         {
          let result = JSON.parse(this.response)
          console.log("created new student",result) 
         }
         createNewStudentReq.send(newStudentDataJson)
});
//Read
    document.getElementById("load-student").addEventListener("click", function(event) 
    {
        let studentsNumber = document.getElementById("studentNum").value;
         event.preventDefault();
        const getOneStudent = new XMLHttpRequest()
         getOneStudent.open("GET","http://3.0.21.82:3000/students/" +studentsNumber)
         getOneStudent.setRequestHeader("Content-Type", "application/json")
         getOneStudent.onload = function()
    {
        let student = JSON.parse(this.response) 
         console.log(student);

    createTable(student);
    function createTable(data)
        {
        let table = document.getElementById("tbody")
           for(let i = 0; i < data.length; i++)
           {
             let row = `<tr id=${data[i].studentNumber}>
                <td>${data[i].studentNumber}</td>
                <td><input type="text" id="info1" value=${data[i].firstName}></td>
                <td><input type="text" id="info2" value=${data[i].lastName}></td>
                <td><input type="number" id="info3" value=${data[i].grade}></td>
                <td><input type="text" id="info4" value=${data[i].section}></td>       
                <td><button id='editData'>Edit</button> <button id='deleteData'>Delete</button></td>             
                        </tr>`
             table.innerHTML += row;
           }
                        
        }
//Edit
    document.getElementById("editData").addEventListener("click", function(event)
    {
    event.preventDefault();
        let editFirstName = document.getElementById("editedData1").value;
        let editLastName = document.getElementById("editedData2").value;
        let editGrade = document.getElementById("editedData3").value;
        let editSection = document.getElementById("editedData4").value;

        const editStudentReq = new XMLHttpRequest()
        let editStudentData =
            {
              firstName: editFirstName,
              lastName: editLastName,
              grade: editGrade,
              section: editSection
            }
        let studentUpdateDataJson = JSON.stringify(editStudentData)
         console.log(studentUpdateDataJson)
         editStudentReq.open("PUT", "http://3.0.21.82:3000/students/" +studentsNumber)
         editStudentReq.setRequestHeader("Content-Type", "application/json")
         editStudentReq.onload = function()
           {
             let result = JSON.parse(this.response)
             console.log("update student", result)
           }
            editStudentReq.send(studentUpdateDataJson)
    });
//Delete
    document.getElementById("deleteData").addEventListener("click", function(event) 
    {
    event.preventDefault();
        const deleteStudent = new XMLHttpRequest()
        let studentDelete = studentNum;
         deleteStudent.open("DELETE", "http://3.0.21.82:3000/students/" +studentDelete)
         deleteStudent.onload = function()
           {
             let result = JSON.parse(this.response)
             console.log("delete specific student", result)
           }
            deleteStudent.send()
    });
    }
     getOneStudent.send()
    });
//Read
        const getallStudent = new XMLHttpRequest()
         getallStudent.open("GET","http://3.0.21.82:3000/students")
         getallStudent.setRequestHeader("Content-Type", "application/json")
         getallStudent.onload = function()
          {
           let allStudent = JSON.parse(this.response) 
            console.log(allStudent);
            createTable(allStudent);

    function createTable(data)
    {
        let table = document.getElementById("tbody")
        for(let i = 0; i < data.length; i++)
           {
            let row = `<tr all-data-student-id=${data[i].studentNumber}>
                <td>${data[i].studentNumber}</td>
                <td><input type="text" class="c-firstName" value=${data[i].firstName}></td>
                <td><input type="text" class="c-lastName" value=${data[i].lastName}></td>
                <td><input type="number" class="c-grade" value=${data[i].grade}></td>
                <td><input type="text" class="c-section" value=${data[i].section}></td>       
                <td><button class='editData'>Edit</button> <button class='deleteData'>Delete</button></td>             
                      </tr>`
                        table.innerHTML += row;
            }    
                   
    }
//Delete
        let deleteButton = document.querySelectorAll(".deleteData")
        for (deleteButton of deleteButton)
           {
            deleteButton.addEventListener("click", (event)=>
    {
    event.preventDefault();
        let deleteStudent = event.target.parentElement.parentElement.getAttribute("all-data-student-id");
          console.log(deleteStudent)
        const deleteOneStudent = new XMLHttpRequest()
          deleteOneStudent.open("DELETE", "http:3.0.21.82:3000/students/" +deleteStudent)
          deleteOneStudent.onload = function()
            {
              let result = JSON.parse(this.response)
              console.log("delete one student", result)
            }
    deleteOneStudent.send()
    });
    }
              
//Update
        let editButton = document.querySelectorAll(".editData")
        for (editButton of editButton)
    {
    editButton.addEventListener("click", (event)=>
    {
    event.preventDefault();
        let editStudent = event.target.parentElement.parentElement.getAttribute("all-data-student-id");
          console.log(editStudent)
        let editFirstName = document.querySelector(`[all-data-student-id="${editStudent}"] .c-firstName`).value;
        let editLastName = document.querySelector(`[all-data-student-id="${editStudent}"] .c-lastName`).value;
        let editGrade = document.querySelector(`[all-data-student-id="${editStudent}"] .c-grade`).value;
        let editSection = document.querySelector(`[all-data-student-id="${editStudent}"] .c-section`).value;

        const editStudentReq = new XMLHttpRequest()
            let editStudentData =
             {
                firstName: editFirstName,
                lastName: editLastName,
                grade: editGrade,
                section: editSection
             }
        let studentUpdateDataJson = JSON.stringify(editStudentData)
          console.log(studentUpdateDataJson)
          editStudentReq.open("PUT", "http:3.0.21.82:3000/students/" +editStudent)
          editStudentReq.setRequestHeader("Content-Type", "application/json")
          editStudentReq.onload = function()
            {
             let result = JSON.parse(this.response)
             console.log("update student", result)
            }
            editStudentReq.send(studentUpdateDataJson)
    });
    }
              
         }
          getallStudent.send(); 
   });