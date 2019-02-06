const router = require("express").Router();
const url = require("./urlInterface");
const validationRules = require("./validationRules");
const HashResponse = require("../../dtos/HashResponse");

const ERRORS = {
  NOT_VALID_URL:
    "url was nor provided in body or it does not have the right format",
  NOT_FOUND: "Hash was not found",
  UPDATE_VISIT_ERROR: "Record could not register the visit",
  VALIDATION_ERROR: "Validation Error has ocurred in url type",
  CREATE_USER: "Error ocurred while creating user",
  FECTH_USERS: "Error while fething users",
  FECTH_USERS: "Error happened while fething for a hash"
};

router.get("/urls/:hash", async (req, res, next) => {
  let source = null;
  try {
    source = await url.getUrl(req.params.hash);
    if (!source) {
      //Respond with 404 that is going to be handled by client side app
      const err = new Error(ERRORS.NOT_FOUND);
      err.status = 404;
      next(err);
      return;
    }
  } catch (err) {
    const error = new Error(ERRORS.FETCH_HASH);
    console.log(ERRORS.FETCH_HASH,err);
    error.status = 500;
    next(err);
    return;
  }
  //Register visit
  try {
    await url.registerVisit(source._id);
    //Hiding unused fields
    const { url: sourceUrl, hash, removeToken, createdAt, visits } = source;
    const hashResponse = new HashResponse(
      sourceUrl,
      hash,
      removeToken,
      createdAt,
      //LOCAL UPDATE
      visits + 1
    );
    res.json(hashResponse);
  } catch (err) {
    const error = new Error(ERRORS.UPDATE_VISIT_ERROR);
    console.log(ERRORS.UPDATE_VISIT_ERROR,err);
    error.status = 500;
    next(err);
    return;
  }

  //I DO NOT RECOMMEND THIS DUE TO THIS CAN LEAD TO MORE CONFIG ON CLIENT SIDE
  //LET'S FOLLOW KISS PRINCIPLE AND DO IT VERY STRAIGHTFORWARD BY RETURNING ALWAYS JSON
  //THIS WILL BE HANDLED BY CLIENT APP
  // Behave based on the requested format using the 'Accept' header.
  // If header is not provided or is */* redirect instead.
  // const accepts = req.get('Accept');

  // switch (accepts) {
  //   case 'text/plain':
  //     res.end(source.url);
  //     break;
  //   case 'application/json':
  //     res.json(hash);
  //     break;
  //   default:
  //     res.redirect(source.url);
  //     break;
  // }
});

router.post("/urls", validationRules["createUrl"], async (req, res, next) => {
  // We validate the object to receive tru middleware
  try {
    if (req.validationErrors.length) {
      const err = new Error(req.validationErrors.join(" \n "));
      err.status = 400;
      next(err);
      return;
    }
    let shortUrl = await url.shorten(
      req.body.url,
      url.generateHash(req.body.url)
    );
    res.json(shortUrl);
  } catch (err) {
    if (error.name == "ValidationError") {
      console.log(ERRORS.VALIDATION_ERROR, err);
      const error = new Error(
        [ERRORS.VALIDATION_ERROR, ERRORS.CREATE_USER].join(" ")
      );
      error.status = 500;
    } else {
      const error = new Error(ERRORS.CREATE_USER);
      console.log(ERRORS.CREATE_USER, err);
      error.status = 500;
    }
    next(e);
  }
});

router.get("/urls", async (req, res, next) => {
  try {
    let urls = await url.getUrls();
    if (!urls) {
      urls = [];
    }
    res.json(urls);
  } catch (err) {
    const error = new Error(ERRORS.FECTH_USERS);
    console.log(ERRORS.FECTH_USERS, err);
    error.status = 500;
    next(err);
  }
});

router.delete("/urls/:hash/:removeToken", async (req, res, next) => {
  const { hash } = req.params;
  try {
    const oldRecord = await url.deleteUrl(hash);
    if (oldRecord) {
      res.send(204);
      return;
    }
    const err = new Error(ERRORS.NOT_FOUND);
    err.status = 404;
    next(err);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
