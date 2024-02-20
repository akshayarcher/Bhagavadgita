import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;
let globalch;
let obj2;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://bhagavadgitaapi.in/chapters");
        const obj = result.data;
        res.render("index.ejs", { content: obj });
    } catch (error) {
        console.error("error", error.message);
    }
})

app.post("/gotoverses", async (req, res) => {
    try {
        const ch = req.body.getchapter;
        globalch = ch;
        const getchapter = await axios.get(`https://bhagavadgitaapi.in/chapter/${ch}`);
        obj2 = getchapter.data;
        const getverse = await axios.get(`https://bhagavadgitaapi.in/slok/${ch}/${1}`);
        const obj3 = getverse.data;
        res.render("verses.ejs", { content1: obj2, content2 : obj3, verse_num: obj2.verses_count });
    } catch (error) {
        console.log("error", error.message);
    }
})

app.post("/gotoverse", async (req, res) => {
    try {
        const vs = req.body.verse_number;
        const ch1 = globalch;
        const getverse = await axios.get(`https://bhagavadgitaapi.in/slok/${ch1}/${vs}`);
        const obj3 = getverse.data;
        res.render("verses.ejs", { content1: obj2, content2 : obj3, verse_num: obj2.verses_count });
    } catch (error) {
        console.error("error", error.message);
    }
})

app.listen(port, () => {
    console.log(`server started at port ${port}`);
})


