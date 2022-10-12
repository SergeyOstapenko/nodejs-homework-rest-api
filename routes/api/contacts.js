const express = require("express");
const Joi = require("joi");

const Contact = require('../../models/contact');


const { RequestError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.string().required(), 
});



router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw RequestError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if(!result) {
      throw RequestError(404)
    }
    res.json({message: "contact deleted"});
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const contact = req.body;
    if(Object.keys(contact).length === 0) {
      throw RequestError(400, "missing fields");
    }
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(404, error.message);
    }
    const {id} = req.params
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
      throw RequestError(404)
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
    try {
      const favoriteContact = req.body;
    if(Object.keys(favoriteContact).length === 0) {
      throw RequestError(400, "missing field favorite");
    }
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(404, error.message);
    }
    const {id} = req.params
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
      throw RequestError(404)
    }
    res.json(result);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
