const serviceWorkerLocation = "service-worker.js";
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
