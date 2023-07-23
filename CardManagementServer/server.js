const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "CardManagement";
const db = client.db(dbName);
const accountsCollection = db.collection("Accounts");
const cardsCollection = db.collection("Cards");
const eventsCollection = db.collection("Events");

const accountController = require("./controllers/accountController");
const cardController = require("./controllers/cardController");
const eventController = require("./controllers/eventController");
const loginController = require("./controllers/loginController");

client
  .connect()
  .then(() => {
    console.log("Connected successfully to server");

    app.use(express.json());
    app.use(cors());

    //api account
    app.get("/accounts", (req, res) => {
      accountsCollection
        .find()
        .toArray()
        .then((_accounts) => {
          console.log("aaaaaaaaaaaaaaa", _accounts);
          res.status(200).send(_accounts);
        });
    });

    app.get("/accounts/:id", (req, res) => {
      let id = req.params.id;
      id = +id;
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      accountsCollection.findOne({ id }).then((_user) => {
        res.status(200).send(_user);
      });
    });

    app.post("/accounts", async (req, res) => {
      // todo: checktoken
      // console.log('aaaaaaaaaaaaaaaaa', req.headers.token);

      console.log(req.body);
      let id = Math.ceil(Math.random() * 1000);
      let user = {
        id,
        userName: req.body.userName,
        password: req.body.password,
      };
      const result = await accountsCollection.insertOne(user);
      if (result.acknowledged) return res.status(200).send(true);
      else return res.status(500).send("Internal server error");
    });

    app.patch("/accounts:id", async (req, res) => {
      console.log(req.body);
      console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      accountsCollection.findOne({ id: id }).then((userInst) => {
        userInst.name = req.body.name;
        userInst.gender = req.body.gender;
        userInst.roleId = req.body.roleId;
        accountsCollection
          .updateOne({ id }, { $set: userInst })
          .then((_res) => {
            console.log("22222222222222222", userInst);
            res.status(200).send();
          });
      });
    });

    app.put("/accounts/:id", async (req, res) => {
      console.log(req.body);
      console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      accountsCollection.findOne({ id: id }).then((userInst) => {
        userInst.username = req.body.username || userInst.username;
        userInst.password = req.body.password || userInst.password;

        accountsCollection
          .updateOne({ id }, { $set: userInst })
          .then((_res) => {
            console.log("22222222222222222", userInst);
            res.status(200).send();
          });
      });
    });

    app.delete("/accounts/:id", async (req, res) => {
      let id = req.params.id;
      id = +id;
      console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      accountsCollection.deleteOne({ id: id }).then((_res) => {
        console.log("22222222222222222", _res);
        if (_res.acknowledged) {
          if (_res.deletedCount == 1) {
            return res.status(200).send("Delete successfuly");
          }
          if (_res.deletedCount == 0) {
            return res.status(400).send("Cannot find the given id");
          }
        } else {
          return res.status(500).send("Internal server error");
        }
      });
    });

    //api card
    app.get("/cards", (req, res) => {
      cardsCollection
        .find()
        .toArray()
        .then((_cards) => {
          console.log("aaaaaaaaaaaaaaa", _cards);
          res.status(200).send(_cards);
        });
    });

    app.get("/cards/:id", (req, res) => {
      let id = req.params.id;
      id = +id;
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      cardsCollection.findOne({ id }).then((_user) => {
        res.status(200).send(_user);
      });
    });

    app.post("/cards", async (req, res) => {
      // todo: checktoken
      // console.log('aaaaaaaaaaaaaaaaa', req.headers.token);

      console.log(req.body);
      let id = Math.ceil(Math.random() * 1000);
      let user = {
        id,
        cardCode: req.body.cardCode,
        identificationCode: req.body.identificationCode,
        createdDate: req.body.createdDate,
        expiredDate: req.body.expiredDate,
        activeStatuses: req.body.activeStatuses,
        ownerName: req.body.ownerName,
        apartment: req.body.apartment,
        floor01: req.body.floor01,
        floor02: req.body.floor02,
        floor03: req.body.floor03,
        floor04: req.body.floor04,
        floor05: req.body.floor05,
        floor06: req.body.floor06,
        floor07: req.body.floor07,
        floor08: req.body.floor08,
        floor09: req.body.floor09,
        floor10: req.body.floor10,
        floor11: req.body.floor11,
        floor12: req.body.floor12,
        floor13: req.body.floor13,
        floor14: req.body.floor14,
        floor15: req.body.floor15,
        floor16: req.body.floor16,
        floor17: req.body.floor17,
        floor18: req.body.floor18,
        floor19: req.body.floor19,
        floor20: req.body.floor20,
        floor21: req.body.floor21,
        floor22: req.body.floor22,
        floor23: req.body.floor23,
        floor24: req.body.floor24,
        floor25: req.body.floor25,
        floor26: req.body.floor26,
        floor27: req.body.floor27,
        floor28: req.body.floor28,
        floor29: req.body.floor29,
        floor30: req.body.floor30,
        floor31: req.body.floor31,
        floor32: req.body.floor32,
        floor33: req.body.floor33,
        floor34: req.body.floor34,
        floor35: req.body.floor35,
        floor36: req.body.floor36,
        floor37: req.body.floor37,
        floor38: req.body.floor38,
        floor39: req.body.floor39,
        floor40: req.body.floor40,
        floor41: req.body.floor41,
        floor42: req.body.floor42,
        floor43: req.body.floor43,
        floor44: req.body.floor44,
        floor45: req.body.floor45,
        floor46: req.body.floor46,
        floor47: req.body.floor47,
        floor48: req.body.floor48,
        floor49: req.body.floor49,
        floor50: req.body.floor50,
        floor51: req.body.floor51,
        floor52: req.body.floor52,
        floor53: req.body.floor53,
        floor54: req.body.floor54,
        floor55: req.body.floor55,
        floor56: req.body.floor56,
        floor57: req.body.floor57,
        floor58: req.body.floor58,
        floor59: req.body.floor59,
        floor60: req.body.floor60,
        floor61: req.body.floor61,
        floor62: req.body.floor62,
        floor63: req.body.floor63,
        floor64: req.body.floor64,
      };
      const result = await cardsCollection.insertOne(user);
      if (result.acknowledged) return res.status(200).send(true);
      else return res.status(500).send("Internal server error");
    });

    app.patch("/cards/:id", async (req, res) => {
      console.log(req.body);
      console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      cardsCollection.findOne({ id: id }).then((cardInst) => {
        cardInst.cardCode = req.body.cardCode;
        cardInst.identificationCode = req.body.identificationCode;
        cardInst.createdDate = req.body.createdDate;
        cardInst.expiredDate = req.body.expiredDate;
        cardInst.activeStatuses = req.body.activeStatuses;
        cardInst.ownerName = req.body.ownerName;
        cardInst.apartment = req.body.apartment;
        cardInst.floor01 = req.body.floor01;
        cardInst.floor02 = req.body.floor02;
        cardInst.floor03 = req.body.floor03;
        cardInst.floor04 = req.body.floor04;
        cardInst.floor05 = req.body.floor05;
        cardInst.floor06 = req.body.floor06;
        cardInst.floor07 = req.body.floor07;
        cardInst.floor08 = req.body.floor08;
        cardInst.floor09 = req.body.floor09;
        cardInst.floor10 = req.body.floor10;
        cardInst.floor11 = req.body.floor11;
        cardInst.floor12 = req.body.floor12;
        cardInst.floor13 = req.body.floor13;
        cardInst.floor14 = req.body.floor14;
        cardInst.floor15 = req.body.floor15;
        cardInst.floor16 = req.body.floor16;
        cardInst.floor17 = req.body.floor17;
        cardInst.floor18 = req.body.floor18;
        cardInst.floor19 = req.body.floor19;
        cardInst.floor20 = req.body.floor20;
        cardInst.floor21 = req.body.floor21;
        cardInst.floor22 = req.body.floor22;
        cardInst.floor23 = req.body.floor23;
        cardInst.floor24 = req.body.floor24;
        cardInst.floor25 = req.body.floor25;
        cardInst.floor26 = req.body.floor26;
        cardInst.floor27 = req.body.floor27;
        cardInst.floor28 = req.body.floor28;
        cardInst.floor29 = req.body.floor29;
        cardInst.floor30 = req.body.floor30;
        cardInst.floor31 = req.body.floor31;
        cardInst.floor32 = req.body.floor32;
        cardInst.floor33 = req.body.floor33;
        cardInst.floor34 = req.body.floor34;
        cardInst.floor35 = req.body.floor35;
        cardInst.floor36 = req.body.floor36;
        cardInst.floor37 = req.body.floor37;
        cardInst.floor38 = req.body.floor38;
        cardInst.floor39 = req.body.floor39;
        cardInst.floor40 = req.body.floor40;
        cardInst.floor41 = req.body.floor41;
        cardInst.floor42 = req.body.floor42;
        cardInst.floor43 = req.body.floor43;
        cardInst.floor44 = req.body.floor44;
        cardInst.floor45 = req.body.floor45;
        cardInst.floor46 = req.body.floor46;
        cardInst.floor47 = req.body.floor47;
        cardInst.floor48 = req.body.floor48;
        cardInst.floor49 = req.body.floor49;
        cardInst.floor50 = req.body.floor50;
        cardInst.floor51 = req.body.floor51;
        cardInst.floor52 = req.body.floor52;
        cardInst.floor53 = req.body.floor53;
        cardInst.floor54 = req.body.floor54;
        cardInst.floor55 = req.body.floor55;
        cardInst.floor56 = req.body.floor56;
        cardInst.floor57 = req.body.floor57;
        cardInst.floor58 = req.body.floor58;
        cardInst.floor59 = req.body.floor59;
        cardInst.floor60 = req.body.floor60;
        cardInst.floor61 = req.body.floor61;
        cardInst.floor62 = req.body.floor62;
        cardInst.floor63 = req.body.floor63;
        cardInst.floor64 = req.body.floor64;
        cardsCollection.updateOne({ id }, { $set: userInst }).then((_res) => {
          console.log("22222222222222222", userInst);
          res.status(200).send();
        });
      });
    });

    app.put("/cards/:id", async (req, res) => {
      console.log(req.body);
      console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      cardsCollection.findOne({ id: id }).then((cardInst) => {
        cardInst.cardCode = req.body.cardCode || cardInst.cardCode;
        cardInst.identificationCode =
          req.body.identificationCode || req.body.identificationCode;
        cardInst.createdDate = req.body.createdDate || req.body.createdDate;
        cardInst.expiredDate = req.body.expiredDate || req.body.expiredDate;
        cardInst.activeStatuses =
          req.body.activeStatuses || req.body.activeStatuses;
        cardInst.ownerName = req.body.ownerName || req.body.ownerName;
        cardInst.apartment = req.body.apartment || req.body.apartment;
        cardInst.floor01 = req.body.floor01 || req.body.floor01;
        cardInst.floor02 = req.body.floor02 || req.body.floor02;
        cardInst.floor03 = req.body.floor03 || req.body.floor03;
        cardInst.floor04 = req.body.floor04 || req.body.floor04;
        cardInst.floor05 = req.body.floor05 || req.body.floor05;
        cardInst.floor06 = req.body.floor06 || req.body.floor06;
        cardInst.floor07 = req.body.floor07 || req.body.floor07;
        cardInst.floor08 = req.body.floor08 || req.body.floor08;
        cardInst.floor09 = req.body.floor09 || req.body.floor09;
        cardInst.floor10 = req.body.floor10 || req.body.floor10;
        cardInst.floor11 = req.body.floor11 || req.body.floor11;
        cardInst.floor12 = req.body.floor12 || req.body.floor12;
        cardInst.floor13 = req.body.floor13 || req.body.floor13;
        cardInst.floor14 = req.body.floor14 || req.body.floor14;
        cardInst.floor15 = req.body.floor15 || req.body.floor15;
        cardInst.floor16 = req.body.floor16 || req.body.floor16;
        cardInst.floor17 = req.body.floor17 || req.body.floor17;
        cardInst.floor18 = req.body.floor18 || req.body.floor18;
        cardInst.floor19 = req.body.floor19 || req.body.floor19;
        cardInst.floor20 = req.body.floor20 || req.body.floor20;
        cardInst.floor21 = req.body.floor21 || req.body.floor21;
        cardInst.floor22 = req.body.floor22 || req.body.floor22;
        cardInst.floor23 = req.body.floor23 || req.body.floor23;
        cardInst.floor24 = req.body.floor24 || req.body.floor24;
        cardInst.floor25 = req.body.floor25 || req.body.floor25;
        cardInst.floor26 = req.body.floor26 || req.body.floor26;
        cardInst.floor27 = req.body.floor27 || req.body.floor27;
        cardInst.floor28 = req.body.floor28 || req.body.floor28;
        cardInst.floor29 = req.body.floor29 || req.body.floor29;
        cardInst.floor30 = req.body.floor30 || req.body.floor30;
        cardInst.floor31 = req.body.floor31 || req.body.floor31;
        cardInst.floor32 = req.body.floor32 || req.body.floor32;
        cardInst.floor33 = req.body.floor33 || req.body.floor33;
        cardInst.floor34 = req.body.floor34 || req.body.floor34;
        cardInst.floor35 = req.body.floor35 || req.body.floor35;
        cardInst.floor36 = req.body.floor36 || req.body.floor36;
        cardInst.floor37 = req.body.floor37 || req.body.floor37;
        cardInst.floor38 = req.body.floor38 || req.body.floor38;
        cardInst.floor39 = req.body.floor39 || req.body.floor39;
        cardInst.floor40 = req.body.floor40 || req.body.floor40;
        cardInst.floor41 = req.body.floor41 || req.body.floor41;
        cardInst.floor42 = req.body.floor42 || req.body.floor42;
        cardInst.floor43 = req.body.floor43 || req.body.floor43;
        cardInst.floor44 = req.body.floor44 || req.body.floor44;
        cardInst.floor45 = req.body.floor45 || req.body.floor45;
        cardInst.floor46 = req.body.floor46 || req.body.floor46;
        cardInst.floor47 = req.body.floor47 || req.body.floor47;
        cardInst.floor48 = req.body.floor48 || req.body.floor48;
        cardInst.floor49 = req.body.floor49 || req.body.floor49;
        cardInst.floor50 = req.body.floor50 || req.body.floor50;
        cardInst.floor51 = req.body.floor51 || req.body.floor51;
        cardInst.floor52 = req.body.floor52 || req.body.floor52;
        cardInst.floor53 = req.body.floor53 || req.body.floor53;
        cardInst.floor54 = req.body.floor54 || req.body.floor54;
        cardInst.floor55 = req.body.floor55 || req.body.floor55;
        cardInst.floor56 = req.body.floor56 || req.body.floor56;
        cardInst.floor57 = req.body.floor57 || req.body.floor57;
        cardInst.floor58 = req.body.floor58 || req.body.floor58;
        cardInst.floor59 = req.body.floor59 || req.body.floor59;
        cardInst.floor60 = req.body.floor60 || req.body.floor60;
        cardInst.floor61 = req.body.floor61 || req.body.floor61;
        cardInst.floor62 = req.body.floor62 || req.body.floor62;
        cardInst.floor63 = req.body.floor63 || req.body.floor63;
        cardInst.floor64 = req.body.floor64 || req.body.floor64;
        cardsCollection.updateOne({ id }, { $set: userInst }).then((_res) => {
          console.log("22222222222222222", userInst);
          res.status(200).send();
        });
      });
    });

    app.delete("/cards/:id", async (req, res) => {
      let id = req.params.id;
      id = +id;
      console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      cardsCollection.deleteOne({ id: id }).then((_res) => {
        console.log("22222222222222222", _res);
        if (_res.acknowledged) {
          if (_res.deletedCount == 1) {
            return res.status(200).send("Delete successfuly");
          }
          if (_res.deletedCount == 0) {
            return res.status(400).send("Cannot find the given id");
          }
        } else {
          return res.status(500).send("Internal server error");
        }
      });
    });

    //api events
    app.get("/events", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      try {
        const totalEvents = await eventsCollection.countDocuments();
        const events = await eventsCollection.find().skip(skip).limit(limit);
        res.json({
          total: totalEvents,
          currentPage: page,
          totalPages: Math.ceil(totalEvents / limit),
          data: events,
        });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.get("/events/date", async (req, res) => {
      let startDate = new Date(req.query.start);
      let endDate = new Date(req.query.end);

      try {
        const events = await eventsCollection.find({
          eventDate: { $gte: startDate, $lte: endDate },
        });

        res.json(events);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.get("/eventsidCard/:idCard", async (req, res) => {
      const idCard = req.params.idCard;

      try {
        const events = await eventsCollection.find({ idCard });
        res.json(events);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.post("/events", async (req, res) => {
      // todo: checktoken
      // //console.log('aaaaaaaaaaaaaaaaa', req.headers.token);

      //console.log(req.body);
      let id = Math.ceil(Math.random() * 1000);
      let user = {
        id,
        idCard: req.body.idCard,
        eventDate: req.body.eventDate,
      };
      const result = await usersCollection.insertOne(user);
      if (result.acknowledged) return res.status(200).send(true);
      else return res.status(500).send("Internal server error");
    });

    app.patch("/events/:id", async (req, res) => {
      //console.log(req.body);
      //console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      //console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      eventsCollection.findOne({ id: id }).then((userInst) => {
        (userInst.idCard = req.body.idCard),
          (userInst.eventDate = req.body.eventDate);
        eventsCollection.updateOne({ id }, { $set: userInst }).then((_res) => {
          //console.log("22222222222222222", userInst);
          res.status(200).send();
        });
      });
    });

    app.put("/events/:id", async (req, res) => {
      //console.log(req.body);
      //console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      //console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      eventsCollection.findOne({ id: id }).then((userInst) => {
        userInst.idCard = req.body.idCard || userInst.name;
        userInst.eventDate = req.body.eventDate || userInst.eventDate;
        eventsCollection.updateOne({ id }, { $set: userInst }).then((_res) => {
          //console.log("22222222222222222", userInst);
          res.status(200).send();
        });
      });
    });

    app.delete("/events/:id", async (req, res) => {
      let id = req.params.id;
      id = +id;
      //console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      eventsCollection.deleteOne({ id: id }).then((_res) => {
        //console.log("22222222222222222", _res);
        if (_res.acknowledged) {
          if (_res.deletedCount == 1) {
            return res.status(200).send("Delete successfuly");
          }
          if (_res.deletedCount == 0) {
            return res.status(400).send("Cannot find the given id");
          }
        } else {
          return res.status(500).send("Internal server error");
        }
      });
    });
    //app.use("/api/login", loginController);
  })
  .catch((err) => {
    console.log("Connect to db got error: ", err);
  });

app.listen(3002);
