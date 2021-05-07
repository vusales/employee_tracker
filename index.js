var firebaseConfig = {
    apiKey: "AIzaSyCOf7UeTkeE9XbItgKWsIlvHQFzu_siA2c",
    authDomain: "employee-tracker-7a842.firebaseapp.com",
    projectId: "employee-tracker-7a842",
    storageBucket: "employee-tracker-7a842.appspot.com",
    messagingSenderId: "218273336525",
    appId: "1:218273336525:web:a518e804c3891d8fbcad84",
    measurementId: "G-2CLH9LRRF8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
db = firebase.database();

$('#add-employee-btn').on('click', function(e) {
    e.preventDefault();

    var employeeName = $('#employee-name-input').val().trim();
    var role = $('#role-input').val().trim();
    var startDate = $('#start-input').val().trim();
    var monthlyRate = $('#rate-input').val().trim();

    if(employeeName=== "" && role=== "" && startDate=== "" && monthlyRate===""){
        alert("Fill in the blanks");
    }else {
        var obj = {
            employeeName: employeeName,
            role: role,
            startDate: startDate,
            monthlyRate: monthlyRate,
        }
    
        db.ref('/employees').push(obj);
        Clear();
    }
});

db.ref('/employees').on('value', function (snapshot){
    $('#employee-table tbody').empty();
    for (let emp of Object.values(snapshot.val())) {
        console.log(emp.employeeName);
        var time = moment().diff(moment(emp.startDate , 'DD/MM/YYYY'), 'months');
        var totalRate = time*emp.monthlyRate ;

        $('#employee-table tbody').append(`
        <tr>
        <td>${emp.employeeName}</td>
        <td>${emp.role}</td>
        <td>${emp.startDate}</td>
        <td>${time}</td>
        <td>${emp.monthlyRate}</td>
        <td>${totalRate}</td>        
        </tr>
        `);
    }


});

function Clear() {
    $('#employee-name-input').val("");
    $('#role-input').val("");
    $('#start-input').val("");
    $('#rate-input').val("");
}

