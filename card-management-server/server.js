const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { MongoClient } = require("mongodb");
const app = express();
const io = new Server(server);

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "CardManagement";
const db = client.db(dbName);
const accountsCollection = db.collection("Accounts");
const cardsCollection = db.collection("Cards");
const eventsCollection = db.collection("Events");

client
  .connect()
  .then(() => {
    console.log("Connected successfully to server");

    app.use(express.json());
    app.use(cors());

    //api account
    app.get("/api/accounts", authenticate, (req, res) => {
      accountsCollection
        .find()
        .toArray()
        .then((_accounts) => {
          //console.log("aaaaaaaaaaaaaaa", _accounts);
          res.status(200).send(_accounts);
        });
    });

    app.get("/api/accounts/:id", authenticate, (req, res) => {
      let id = req.params.id;
      id = +id;
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      accountsCollection.findOne({ id }).then((_user) => {
        res.status(200).send(_user);
      });
    });

    app.post("/api/accounts", authenticate, async (req, res) => {
      // todo: checktoken
      // //console.log('aaaaaaaaaaaaaaaaa', req.headers.token);
      //console.log(req.body);
      let id = Math.ceil(Math.random() * 1000);
      let account = {
        id,
        userName: req.body.userName,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
      };
      const result = await accountsCollection.insertOne(account);
      if (result.acknowledged) return res.status(200).send(true);
      else return res.status(500).send("Internal server error");
    });

    app.patch("/api/accounts:id", authenticate, async (req, res) => {
      //console.log(req.body);
      //console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      //console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      accountsCollection.findOne({ id: id }).then((userInst) => {
        userInst.username = req.body.username;
        userInst.password = req.body.password;
        userInst.isAdmin = req.body.isAdmin;
        accountsCollection
          .updateOne({ id }, { $set: userInst })
          .then((_res) => {
            //console.log("22222222222222222", userInst);
            res.status(200).send();
          });
      });
    });

    app.put("/api/accounts/:id", authenticate, async (req, res) => {
      //console.log(req.body);
      //console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      //console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      accountsCollection.findOne({ id: id }).then((accountInst) => {
        accountInst.username = req.body.username || accountInst.username;
        accountInst.password = req.body.password || accountInst.password;
        accountInst.isAdmin = req.body.isAdmin || accountInst.isAdmin;
        accountsCollection
          .updateOne({ id }, { $set: accountInst })
          .then((_res) => {
            //console.log("22222222222222222", accountInst);
            res.status(200).send();
          });
      });
    });

    app.delete("/api/accounts/:id", authenticate, async (req, res) => {
      let id = req.params.id;
      id = +id;
      //console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      accountsCollection.deleteOne({ id: id }).then((_res) => {
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

    //api card
    app.get("/api/cards", async (req, res) => {
      try {
        const { keyword, page, limit } = req.query;
        const currentPage = parseInt(page, 10) || 1;
        const itemsPerPage = parseInt(limit, 10) || 10;

        const aggregateQuery = [];

        aggregateQuery.push({
          $project: {
            id: 1,
            cardCode: 1,
            identificationCode: 1,
            createdDate: 1,
            activeStatuses: 1,
            ownerName: 1,
            apartment: 1,
            floor01: 1,
            floor02: 1,
            floor03: 1,
            floor04: 1,
            floor05: 1,
            floor06: 1,
            floor07: 1,
            floor08: 1,
            floor09: 1,
            floor10: 1,
            floor11: 1,
            floor12: 1,
            floor13: 1,
            floor14: 1,
            floor15: 1,
            floor16: 1,
            floor17: 1,
            floor18: 1,
            floor19: 1,
            floor20: 1,
            floor21: 1,
            floor22: 1,
            floor23: 1,
            floor24: 1,
            floor25: 1,
            floor26: 1,
            floor27: 1,
            floor28: 1,
            floor29: 1,
            floor30: 1,
            floor31: 1,
            floor32: 1,
            floor33: 1,
            floor34: 1,
            floor35: 1,
            floor36: 1,
            floor37: 1,
            floor38: 1,
            floor39: 1,
            floor40: 1,
            floor41: 1,
            floor42: 1,
            floor43: 1,
            floor44: 1,
            floor45: 1,
            floor46: 1,
            floor47: 1,
            floor48: 1,
            floor49: 1,
            floor50: 1,
            floor51: 1,
            floor52: 1,
            floor53: 1,
            floor54: 1,
            floor55: 1,
            floor56: 1,
            floor57: 1,
            floor58: 1,
            floor59: 1,
            floor60: 1,
            floor61: 1,
            floor62: 1,
            floor63: 1,
            floor64: 1,
          },
        });

        if (typeof keyword === "string" && keyword.length > 0) {
          aggregateQuery.push({
            $match: {
              $or: [
                { cardCode: { $regex: keyword, $options: "i" } },
                { identificationCode: { $regex: keyword, $options: "i" } },
                { ownerName: { $regex: keyword, $options: "i" } },
              ],
            },
          });
        }

        const skip = (currentPage - 1) * itemsPerPage;
        aggregateQuery.push({ $skip: skip }, { $limit: itemsPerPage });

        const cardData = await cardsCollection
          .aggregate(aggregateQuery)
          .toArray();

        const totalItems = await eventsCollection.countDocuments();
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (currentPage > totalPages) {
          throw new Error("Error page");
        }
        res.json({
          currentPage,
          itemsPerPage,
          totalPages,
          totalItems,
          items: cardData,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/api/cards/:id", (req, res) => {
      let id = req.params.id;
      id = +id;
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      cardsCollection.findOne({ id }).then((_card) => {
        res.status(200).send(_card);
      });
    });

    app.post("/api/cards", async (req, res) => {
      // todo: checktoken
      // //console.log('aaaaaaaaaaaaaaaaa', req.headers.token);

      //console.log(req.body);
      let id = Math.ceil(Math.random() * 1000);
      let card = {
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
      const result = await cardsCollection.insertOne(card);
      if (result.acknowledged) return res.status(200).send(true);
      else return res.status(500).send("Internal server error");
    });

    app.patch("/api/cards/:id", async (req, res) => {
      //console.log(req.body);
      //console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      //console.log("33333333333333", id);
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
        cardsCollection.updateOne({ id }, { $set: cardInst }).then((_res) => {
          //console.log("22222222222222222", cardInst);
          res.status(200).send();
        });
      });
    });

    app.put("/api/cards/:id", async (req, res) => {
      //console.log(req.body);
      //console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      //console.log("33333333333333", id);
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
        cardsCollection.updateOne({ id }, { $set: cardInst }).then((_res) => {
          //console.log("22222222222222222", cardInst);
          res.status(200).send();
        });
      });
    });

    app.delete("/api/cards/:id", async (req, res) => {
      let id = req.params.id;
      id = +id;
      //console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      cardsCollection.deleteOne({ id: id }).then((_res) => {
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

    //api events
    app.get("/api/events", async (req, res) => {
      try {
        const { keyword, startDate, endDate, page, limit } = req.query;
        const currentPage = parseInt(page, 10) || 1;
        const itemsPerPage = parseInt(limit, 10) || 10;

        const aggregateQuery = [];

        aggregateQuery.push({
          $lookup: {
            from: "Cards",
            localField: "idCard",
            foreignField: "id",
            as: "matchedCards",
          },
        });

        aggregateQuery.push({
          $project: {
            id: 1,
            idCard: 1,
            eventDate: 1,
          },
        });

        if (typeof keyword === "string" && keyword.length > 0) {
          aggregateQuery.push({
            $match: {
              $or: [
                {
                  "matchedCards.identificationCode": {
                    $regex: keyword,
                    $options: "i",
                  },
                },
                {
                  "matchedCards.ownerName": {
                    $regex: keyword,
                    $options: "i",
                  },
                },
              ],
              eventDate: {
                $gte: startDate ? new Date(startDate) : new Date(0),
                $lte: endDate ? new Date(endDate) : new Date(),
              },
            },
          });
        }

        const skip = (currentPage - 1) * itemsPerPage;
        aggregateQuery.push({ $skip: skip }, { $limit: itemsPerPage });

        const eventsData = await eventsCollection
          .aggregate(aggregateQuery)
          .toArray();

        const totalItems = await eventsCollection.countDocuments();
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (currentPage > totalPages) {
          throw new Error("Error page");
        }

        res.json({
          currentPage,
          itemsPerPage,
          totalPages,
          totalItems,
          items: eventsData,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/api/events/:id", (req, res) => {
      let id = req.params.id;
      id = +id;
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      eventsCollection.findOne({ id }).then((_event) => {
        res.status(200).send(_event);
      });
    });

    app.post("/api/events", async (req, res) => {
      // todo: checktoken
      // ////console.log('aaaaaaaaaaaaaaaaa', req.headers.token);

      ////console.log(req.body);
      let id = Math.ceil(Math.random() * 1000);
      let event = {
        id,
        idCard: req.body.idCard,
        eventDate: req.body.eventDate,
      };
      const result = await eventsCollection.insertOne(event);
      if (result.acknowledged) return res.status(200).send(true);
      else return res.status(500).send("Internal server error");
    });

    app.patch("/api/events/:id", async (req, res) => {
      ////console.log(req.body);
      ////console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      ////console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      eventsCollection.findOne({ id: id }).then((eventInst) => {
        eventInst.idCard = req.body.idCard;
        eventInst.eventDate = req.body.eventDate;
        eventsCollection.updateOne({ id }, { $set: eventInst }).then((_res) => {
          ////console.log("22222222222222222", userInst);
          res.status(200).send();
        });
      });
    });

    app.put("/api/events/:id", async (req, res) => {
      ////console.log(req.body);
      ////console.log("11111111111", req.params.id);
      let id = req.params.id;
      id = +id;
      ////console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      eventsCollection.findOne({ id: id }).then((eventInst) => {
        eventInst.idCard = req.body.idCard || eventInst.idCard;
        eventInst.eventDate = req.body.eventDate || eventInst.eventDate;
        eventsCollection.updateOne({ id }, { $set: eventInst }).then((_res) => {
          ////console.log("22222222222222222", userInst);
          res.status(200).send();
        });
      });
    });

    app.delete("/api/events/:id", async (req, res) => {
      let id = req.params.id;
      id = +id;
      ////console.log("33333333333333", id);
      if (isNaN(id)) {
        return res.status(400).send("Id must be number");
      }
      eventsCollection.deleteOne({ id: id }).then((_res) => {
        ////console.log("22222222222222222", _res);
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
    app.post("/login", authenticate, (req, res) => {
      console.log("11111111111111111111", req.body);
      const username = req.body.username;
      const password = req.body.password;
      accountsCollection.findOne({ username: username }).then((userInst) => {
        console.log("aaaaaaaaaaaaaaaaaa", userInst);
        if (!userInst) return res.status(400).send("Username Not found");
        if (userInst.password != password)
          return res.status(400).send("Incorrent password");
      });
    });
  })
  .catch((err) => {
    console.log("Connect to db got error: ", err);
  });

function authenticate(req, res, next) {
  const { username, password } = req.body;

  const user = accountsCollection.find(
    (user) => user.username === username && user.password === password
  );

  if (user && user.isAdmin) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ error: "Invalid credentials or non-admin user" });
  }
}

function randomString() {
  return Math.random().toString(36).substr(3, 6);
}

app.listen(4001);
