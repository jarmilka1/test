// Připojení potřebných modulů
var express = require('express'); // Modul pro vytváření serveru
var app = express(); // Vytvoření instance aplikace
const port = 3000; // Port, na kterém bude aplikace poslouchat

app.listen(3000); // Nastavení serveru, aby naslouchal na daném portu

const path = require('path'); // Modul pro práci s cestami

const bodyParser = require('body-parser'); // Modul pro zpracování požadavků s tělem
app.use(bodyParser.urlencoded({ extended: false })); // Použití middleware pro zpracování požadavků s tělem

app.use(express.static('public')); // Nastavení složky 'public' jako veřejně dostupné pro statické soubory

const mysql = require('mysql2'); // Modul pro připojení k MySQL databázi

const connection = mysql.createConnection({ // Vytvoření připojení k databázi
   host: '192.168.1.161', // Adresa hostitele databáze
   user: 'petr.spacek', // Uživatelské jméno
   password: 'Spakator445', // Heslo
   database: 'petr.spacek', // Název databáze
   port: 3001 // Port databáze
});

// Šablonovací knihovna pro generování HTML stránek
const ejs = require('ejs');
app.set('view engine', 'ejs'); // Nastavení šablonovacího systému na EJS
app.set('views', path.join(__dirname, 'views')); // Nastavení složky 'views' pro EJS šablony

app.use(express.static(path.join(__dirname, 'images'))); // Nastavení složky 'images' jako veřejně dostupné pro obrázky

// Routa pro zobrazení galerie
app.get('/gallery', (req, res) => {
  const imagePath = 'w.PNG'; // Cesta k obrázku
  res.render('gallery', { imagePath }); // Renderování šablony 'gallery' s cestou k obrázku
});

// Routa pro vytvoření nového uživatele
app.get('/newuser', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'newuser.html')); // Odeslání souboru 'newuser.html' klientovi
});

// Zpracování POST požadavku na vytvoření nového uživatele
app.post('/newuser', function(request, response, next) {
   var sql = `INSERT INTO users (user_name, user_pass) VALUES('${request.body.user_name}','${request.body.user_pass}')`; // SQL dotaz pro vložení nového uživatele do databáze

   connection.query(sql, (error, results, fields) => { // Provedení SQL dotazu
      if (error) {
        console.error(error);
        return;
      }
      console.log(results);
   });

   response.sendFile(path.join(__dirname, 'views', 'konec_user.html')); // Odeslání odpovědi klientovi
   
});

// Routa pro zobrazení stránky
app.get('/page', (req, res) => {
   res.sendFile(path.join(__dirname, 'views', 'index.ejs')); // Odeslání souboru 'index.ejs' klientovi
});

// Routa pro zobrazení uživatelů
app.get('/users', (req, res) => {
   // SQL dotaz na všechny uživatele
   connection.query('SELECT * FROM users', (error, results, fields) => {
     if (error) {
       console.error(error);
       return;
     }
     console.log(results);
     res.render('users.ejs', { results }); // Renderování šablony 'users.ejs' s výsledky dotazu
   });
});

// Routa pro zobrazení navigace
app.get('/nav', (req, res) => {
   // SQL dotaz na všechny uživatele
   connection.query('SELECT * FROM users', (error, results, fields) => {
     if (error) {
       console.error(error);
       return;
     }
     res.render('index.ejs', { results }); // Renderování šablony 'index.ejs' s výsledky dotazu
   });
});

// Routa pro zobrazení obrázku s názvem 'joelito'
app.get('/joel', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'konec_joel.html')); // Odeslání HTML obsahu s obrázkem klientovi
});

app.get('/kuru', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'konec_kuru.html')); // Odeslání HTML obsahu s obrázkem klientovi
});

app.post('/deleteallusers',(req, res)=>{
  let sql = `DELETE FROM users`;

  connection.query(sql, (error, results, fields) => { // Provedení SQL dotazu
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
    console.log("Uživatele už nejsou")

    res.render('users',{results});
 });
})

// app.get('/table', (req, res) => {
 
//    //dotaz na SQL
//    connection.query('SELECT * FROM users', (error, results, fields) => {
//      if (error) {
//        console.error(error);
//        return;
//      }
//      console.log(results);
  
//      let tableRows = `<tr><td>Jméno</td><td>Příjmení</td></tr>`;
  
//      results.forEach(user => {
  
//        tableRows += `<tr><td style="border: 1px solid black">${user.user_name}</td><td style="border: 1px solid black">${user.user_pass}</td></tr>`;
  
//      });
  
//      const table = `<table>${tableRows}</table>`;
//      console.log(table)
//      res.send(table);
  
//    })
//  })


// connection.query('SELECT * FROM names', (error, results, field) => {
//    if (error) {
//       console.error(error)
//       return;
//    }
//    console.log(results);
   
// });

