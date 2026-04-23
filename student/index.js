let students = [];


const studentForm = document.getElementById('studentForm');
const studentNameInput = document.getElementById('studentName');
const studentMarksInput = document.getElementById('studentMarks');
const addBtn = document.getElementById('addBtn');
const showAllBtn = document.getElementById('showAllBtn');
const showPassBtn = document.getElementById('showPassBtn');
const avgBtn = document.getElementById('avgBtn');
const topperBtn = document.getElementById('topperBtn');
const output = document.getElementById('output');

function displayResults(data, message = '') {
  output.innerHTML = message + data;
}

function displayError(message) {
  output.innerHTML = `<div class="error-message">${message}</div>`;
}

function addStudent() {
  const name = studentNameInput.value.trim();
  const marks = parseInt(studentMarksInput.value);

  // Validation
  if (!name) {
    displayError('Please enter student name!');
    return;
  }

  if (isNaN(marks) || marks < 0 || marks > 100) {
    displayError('Please enter valid marks (0-100)!');
    return;
  }

  const existingStudent = students.find(student => 
    student.name.toLowerCase() === name.toLowerCase()
  );

  if (existingStudent) {
    displayError('Student already exists! Please use a different name.');
    return;
  }

  const student = {
    name: name,
    marks: marks,
    id: Date.now() // Simple ID generation
  };

  students.push(student);
  
  // Clear form
  studentNameInput.value = '';
  studentMarksInput.value = '';
  
  displayResults(`<div class="student-item">
    <span class="student-name">✅ ${name} added successfully!</span>
    <span class="student-marks">Marks: ${marks}</span>
  </div>`, '');
}

function showAllStudents(callback) {
  if (students.length === 0) {
    callback('<div class="error-message">No students added yet!</div>');
    return;
  }

  const studentsHTML = students.map(student => {
    const passStatus = student.marks >= 40 ? 'passed' : 'failed';
    return `<div class="student-item ${passStatus}">
      <span class="student-name">${student.name}</span>
      <span class="student-marks">${student.marks} marks</span>
    </div>`;
  }).join('');

  callback(studentsHTML, `<h3>All Students (${students.length}):</h3>`);
}

// Using filter() to get students who passed (marks >= 40)
function showPassedStudents(callback) {
  if (students.length === 0) {
    callback('<div class="error-message">No students added yet!</div>');
    return;
  }

  const passedStudents = students.filter(student => student.marks >= 40);
  
  if (passedStudents.length === 0) {
    callback('<div class="error-message">No students have passed yet!</div>');
    return;
  }

  const passedHTML = passedStudents.map(student => 
    `<div class="student-item passed">
      <span class="student-name">${student.name}</span>
      <span class="student-marks">${student.marks} marks</span>
    </div>`
  ).join('');

  callback(passedHTML, `<h3>Passed Students (${passedStudents.length}):</h3>`);
}

// Using reduce() to calculate average marks
function calculateAverage(callback) {
  if (students.length === 0) {
    callback('<div class="error-message">No students added yet!</div>');
    return;
  }

  const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);
  const average = (totalMarks / students.length).toFixed(2);
  
  const averageHTML = `<div class="average-display">
    Average Marks: ${average}/100<br>
    <small>Based on ${students.length} students</small>
  </div>`;

  callback(averageHTML);
}

function findTopper(callback) {
  if (students.length === 0) {
    callback('<div class="error-message">No students added yet!</div>');
    return;
  }

  let topper = students[0];
  
  for (let i = 1; i < students.length; i++) {
    if (students[i].marks > topper.marks) {
      topper = students[i];
    }
  }

  const allToppers = students.filter(student => student.marks === topper.marks);
  
  let topperHTML;
  if (allToppers.length > 1) {
    const topperNames = allToppers.map(student => student.name).join(', ');
    topperHTML = `<div class="topper-display">
      🏆 Joint Toppers: ${topperNames}<br>
      <strong>Marks: ${topper.marks}/100</strong>
    </div>`;
  } else {
    topperHTML = `<div class="topper-display">
      🏆 Class Topper: ${topper.name}<br>
      <strong>Marks: ${topper.marks}/100</strong>
    </div>`;
  }

  callback(topperHTML);
}

addBtn.addEventListener('click', addStudent);

showAllBtn.addEventListener('click', () => {
  showAllStudents(displayResults);
});

showPassBtn.addEventListener('click', () => {
  showPassedStudents(displayResults);
});

avgBtn.addEventListener('click', () => {
  calculateAverage(displayResults);
});

topperBtn.addEventListener('click', () => {
  findTopper(displayResults);
});

// Allow Enter key to add student
studentNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    studentMarksInput.focus();
  }
});

studentMarksInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addStudent();
  }
});

// Initial message
displayResults('<strong>Welcome! Add students to get started...</strong>');