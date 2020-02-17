const express = require("express");

const db = require("./data/dbconfig.js");

const router = express.Router();


router.get("/", (req, res) => {
    db.select("*")
    .from('accounts')
    .then(account => {
        res.status(200).json(account)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "failed to get the list of accounts" });
      });
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts').where({ id })
    .then(accounts => {
      if (accounts.length) {
        res.json(accounts);
      } else {
        res.status(404).json({ message: 'Could not find account with given id.' })}
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to get account' });
    });
  });

router.post("/", (req, res) => {
    db("accounts")
      .insert(req.body) 
      .then(account => {
        res.status(201).json(account);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding account',
        });
      });
  });

  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db("accounts")
      .where({ id }) 
      .update(changes) 
      .then(account => {
        res.status(200).json(account);
      })
      .catch(error => {
        console.log(error);
  
        res.status(500).json({ error: "failed to update the account" });})
      });

      router.delete("/:id", (req, res) => {
     
        const id = req.params.id;
        db("accounts")
          .where({ id })
          .del()
          .then(account => {
            res.status(200).json(account);
          })
          .catch(error => {
            console.log(error);
      
            res.status(500).json({ error: "failed to remove the account" });
          });
      });

module.exports = router;