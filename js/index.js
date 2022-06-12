const elStudentList = document.querySelector(".student__list");
const elModal = document.querySelector(".modal");
const elInputfullname = document.querySelector(".fullname");
const elInputuniversityName = document.querySelector(".university__name");
const elInputentranceYear = document.querySelector(".entrance__year");
const elInputgraduationYear = document.querySelector(".graduation__year");
const elInputfaculty = document.querySelector(".faculty");
const elInputspeciality = document.querySelector(".speciality");
const elInputstudyType = document.querySelector(".study-type");
const elInputacademicType = document.querySelector(".academic-type");
const elInputdiplomSeria = document.querySelector(".diplom__seria");
const elInputdiplomRegisterNum = document.querySelector(
  ".diplom__register__num"
);
const elInputgivenDate = document.querySelector(".given__date");
const elInputacademicLevel = document.querySelector(".academic__level");
const elInputappendixNum = document.querySelector(".appendix__num");
const elInputorganizationId = document.querySelector(".organization__id");
const elModalForm = document.querySelector(".modal__input-form");

let token = window.localStorage.getItem("token");

if (!token) {
  window.location.replace("login.html");
}

fetch("https://online-excel-heroku.herokuapp.com/student/list", {
  method: "POST",
})
  .then((res) => res.json())
  .then((data) => {
    let array = data.data.data;
    renderStudent(array, elStudentList);
    
  });
  
  elStudentList.addEventListener("click", (evt) => {
    if (evt.target.matches(".student__edit-btn")) {
      elModal.classList.toggle("modal--active");
      const studentId = evt.target.dataset.sutudentId;
      
      const handleEdit = (evt) => {
        evt.preventDefault();

        editStudent(studentId);
       
      };

      elModalForm.addEventListener("submit", handleEdit);
    }

    if(evt.target.matches('.student__del-btn')){
      const studentId = evt.target.dataset.sutudentId;
      handleDelete(studentId)
    }
  })

  function handleDelete(id){
    fetch(`https://online-excel-heroku.herokuapp.com/student/delete/${id}`, {
      method: 'DELETE'
    }).then(res=>console.log(res))
  }

  

elModal.addEventListener("click", (evt) => {
  if (evt.target.matches(".modal")) {
    elModal.classList.remove("modal--active");
  }
  if (evt.target.matches(".form__btn-close")) {
    elModal.classList.remove("modal--active");
  }

  if (evt.target.matches(".form__btn")) {
  }
});

function renderStudent(arr, element) {
  let count = 1;
  arr.map((el) => {
    let newLi = document.createElement("li");
    let newSpan = document.createElement("span");
    let newEditBtn = document.createElement("button");
    let newDelBtn = document.createElement("button");
    newEditBtn.textContent = "edit";
    newDelBtn.textContent = "del";
    newLi.setAttribute("class", "student__item");
    newSpan.setAttribute("class", "student__span");
    newEditBtn.setAttribute("class", "student__edit-btn");
    newDelBtn.setAttribute("class", "student__del-btn");
    newEditBtn.dataset.sutudentId = el.id;
    newDelBtn.dataset.sutudentId = el.id;
    newLi.textContent = count++ + ". " + el.fullName;

    newSpan.appendChild(newEditBtn);
    newSpan.appendChild(newDelBtn);
    newLi.appendChild(newSpan);
    element.appendChild(newLi);
  });
}



function editStudent(id) {
  let elInputfullnameValue = elInputfullname.value.trim();
  let elInputuniversityNameValue = elInputuniversityName.value.trim();
  let elInputentranceYearValue = elInputentranceYear.value.trim();
  let elInputgraduationYearValue = elInputgraduationYear.value.trim();
  let elInputfacultyValue = elInputfaculty.value.trim();
  let elInputspecialityValue = elInputspeciality.value.trim();
  let elInputstudyTypeValue = elInputstudyType.value.trim();
  let elInputacademicTypeValue = elInputacademicType.value.trim();
  let elInputdiplomSeriaValue = elInputdiplomSeria.value.trim();
  let elInputdiplomRegisterNumValue = elInputdiplomRegisterNum.value.trim();
  let elInputgivenDateValue = elInputgivenDate.value.trim();
  let elInputacademicLevelValue = elInputacademicLevel.value.trim();
  let elInputappendixNumValue = elInputappendixNum.value.trim();
  let elInputorganizationIdValue = elInputorganizationId.value.trim();

  fetch("https://online-excel-heroku.herokuapp.com/student/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      fullName: elInputfullnameValue,
      universityName: elInputuniversityNameValue,
      entranceYear: elInputentranceYearValue,
      graduationYear: elInputgraduationYearValue,
      faculty: elInputfacultyValue,
      speciality: elInputspecialityValue,
      studyType: elInputstudyTypeValue,
      academicType: elInputacademicTypeValue,
      diplomaSerial: elInputdiplomSeriaValue,
      diplomaRegistrationNumber: elInputdiplomRegisterNumValue,
      givenDate: elInputgivenDateValue,
      academicLevel: elInputacademicLevelValue,
      appendixNumber: elInputappendixNumValue,
      organizationId: elInputorganizationIdValue,
    }),
  }).then((res) => console.log(res));
}
