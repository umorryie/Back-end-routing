const mongoose = require("mongoose");
const uri = require("./key").uri;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Cat = mongoose.model("Cat", { name: String });

const kitty = new Cat({ name: "Zildjian" });
kitty.save().then(() => console.log("meow"));
