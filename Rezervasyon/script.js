document.getElementById("reservation-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var checkIn = document.getElementById("check-in").value;
    var checkOut = document.getElementById("check-out").value;
    var personCount = document.getElementById("person-count").value;

    var reservation = {
        name: name,
        email: email,
        checkIn: checkIn,
        checkOut: checkOut,
        personCount: personCount
    };

    var reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    window.location.href = "rezervasyonlar.html";
    showReservations();
});

function showReservations() {
    var reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    var reservationsContainer = document.getElementById("reservations");
    reservationsContainer.innerHTML = "";

    reservations.forEach(function(reservation, index) {
        var reservationElement = document.createElement("div");
        reservationElement.innerHTML = "<p><strong>Adı:</strong> " + reservation.name + "</p>" +
                                        "<p><strong>E-posta:</strong> " + reservation.email + "</p>" +
                                        "<p><strong>Giriş Tarihi:</strong> " + reservation.checkIn + "</p>" +
                                        "<p><strong>Çıkış Tarihi:</strong> " + reservation.checkOut + "</p>" +
                                        "<p><strong>Kişi Sayısı:</strong> " + reservation.personCount + "</p>" +
                                        "<button onclick='deleteReservation(" + index + ")'>Sil</button>" +
                                        "<button onclick='editReservation(" + index + ")'>Düzenle</button>";
        reservationsContainer.appendChild(reservationElement);
    });
}

function editReservation(index) {
    var reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    var reservationToEdit = reservations[index];
    localStorage.setItem("reservationToEdit", JSON.stringify(reservationToEdit));
    window.location.href = "rezervasyon-duzenle.html";
}


function clearReservations() {
    localStorage.removeItem("reservations");
    var reservationsContainer = document.getElementById("reservations");
    reservationsContainer.innerHTML = "";
}

function deleteReservation(index) {
    var reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    showReservations();
}