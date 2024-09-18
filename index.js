import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public")); // Public klasörünü belirttik
app.use(bodyParser.urlencoded({ extended: true })); // formun içindeki verileri okumak için
app.use(bodyParser.json()); 

let posts = [];

app.get("/", (req, res) => { // ana sayfa
    res.render("index.ejs", { posts: posts });
});

app.get("/create", (req, res) => { // yeni post oluşturma sayfası
    res.render("create.ejs"); // create.ejs sayfasını render et
});

app.post("/create", (req, res) => { // yeni post oluşturma
    const newPost = {
        title: req.body.title, // Yeni postun title'ı
        summary: req.body.summary, // Yeni postun summary'ı
        content: req.body.content, // Yeni postun content'ı
        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD formatında tarih
    };
    posts.unshift(newPost); // Yeni postu posts listesine ekle
    res.redirect("/"); // Postu ekleme işlemi tamamlandığında ana sayfaya yönlendir
});

app.listen(port, () => { // sunucuyu başlat
    console.log(`Server is running on port ${port}`);
});