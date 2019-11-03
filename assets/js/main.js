const leagues = [
    "English Premier League",
    "German Bundesliga",
    "Italian Serie A",
    "French Ligue 1",
    "Spanish La Liga"
];

let sidenav = $('.sidenav');

$(document).ready(function () {
    M.Sidenav.init(sidenav);
    function loadNav()
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4){
                if(this.status !== 200) return;

                // Muat daftar tautan menu
                sidenav.append(xhttp.responseText);

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll('.sidenav a')
                    .forEach(function(elm){
                        elm.addEventListener('click', function(event){
                            if (window.screen.width < 992) {
                                M.Sidenav.getInstance(sidenav).close();
                            }

                            // Muat konten halaman yang dipanggil
                            page = event.target.getAttribute('href').substr(1);
                            loadPage(page);
                        });
                    });
            }
        };
        xhttp.open("GET", 'navigation.html', true);
        xhttp.send();
    }
    loadNav();

    // Load page content
    var page = window.location.hash.substr(1);
    loadPage(page);

    function loadPage(page)
    {
        console.log("page = "+page);
        let title = page.toString().split("_").map((word) => {
            return word[0].toUpperCase() + word.substr(1);
        }).join(" ");
        $('.brand-logo').html(title);

        if(page === '') return; // don't load any page on index, let it with welcoming screen

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4){
                var content = $('main');
                if(this.status === 200) {
                    content.html(xhttp.responseText);
                } else if(this.status === 404) {
                    content.html("<p>Halaman tidak ditemukan.</p>");
                } else {
                    content.html("<p>Ups.. halaman tidak dapat diakses.</p>");
                }
            }
        };
        xhttp.open("GET", 'pages/'+page+'.html', true);
        xhttp.send();
    }
});

const serviceWorkerLocation = "assets/js/service-worker.js";
// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register(serviceWorkerLocation)
            .then(function() {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function() {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}
