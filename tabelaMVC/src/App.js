/**
 * Classe App
 * 
 * @summary - Classe principal que instancia as classes principais da aplicação,
 * ViewController e ProcessController.
 */

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js');
    }
})

var view = new View();
var processController = new ProcessController();
var dataBase = new DataBase();
var testDao = new TestDAO();