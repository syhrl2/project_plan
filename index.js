const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")

app.use(express.static(path.join(__dirname, '../public')));

const templatesPath=path.join(__dirname, '../templates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatesPath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req, res)=>{
    res.render("beranda")
})

app.get("/ecommerce",(req, res)=>{
    res.render("ecommerce")
})

app.get("/login",(req, res)=>{
    res.render("login")
})

app.get("/register",(req, res)=>{
    res.render("register")
})
app.get("/beranda",(req, res)=>{
    res.render("beranda")
})

app.get("/pesan",(req, res)=>{
    res.render("pesan")
})

app.get("/antarjemput",(req, res)=>{
    res.render("antarjemput")
})
app.post("/register",async (req, res)=>{

    const data={
        nama:req.body.nama,
        alamat:req.body.alamat,
        tlp:req.body.tlp,
        username:req.body.username,
        password:req.body.password
    }

await collection.insertMany([data])
res.render("login")

})
app.post("/login",async (req, res)=>{

    

    try{
        const check= await collection.findOne({email:req.body.email})

    if(check.password===req.body.password){
        res.render("beranda")
    }
    else{
        res.send("Pasword Salah")
    }
        res.render("beranda")
    }
    catch{
        res.send("wrong details")
    }

})

app.listen(3000,()=>{
    console.log("port connected");
})