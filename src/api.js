const express = require("express");
const sequelize = require("./db");
const logger = require("./logger");
const Link = require("./models/link");
const { getClientIp, getCurrentUser } = require("./auth");

const api = express();

const getLoggingAttributes = (req) => {
  const user = getCurrentUser(req);
  const ip = getClientIp(req);
  return {
    ...(user
      ? {
          "usr.id": user.id,
          "usr.email": user.email,
        }
      : {}),
    ...(ip
      ? {
          "network.client.ip": ip,
        }
      : {}),
  };
};

/**
 * GET links
 */
api.get("/links", async (req, res) => {
  const links = await Link.findAndCountAll({ limit: 1000 });
  res.json({ total: links.count, data: links.rows });
});

/**
 * GET by id
 */
api.get("/links/:id", async (req, res) => {
  const id = req.params.id || 1;
  try {
    const links = await sequelize.query(`SELECT * FROM links WHERE id = ${id}`);
    res.json({ data: links[0] });
  } catch {
    res.json({ errors: ["Cannot find link"] });
  }
});

/**
 * POST new link
 */
api.post("/links", async (req, res) => {
  if (req.body.url) {
    try {
      const createdLink = await Link.create({ url: req.body.url });
      logger.info("link created", getLoggingAttributes(req));
      return res.json({ data: createdLink });
    } catch (error) {
      logger.error(`cannot save link`, getLoggingAttributes(req));
      return res.status(500).json({ errors: ["Cannot save link"] });
    }
  }
  res.status(400).json({ errors: ["Missing url parameter"] });
});

/**
 * DELETE link
 */
api.delete("/links/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ errors: ["Missing id"] });
  }

  try {
    await Link.destroy({
      where: {
        id: id,
      },
    });
    logger.info(`link ${id} deleted`, getLoggingAttributes(req));
    res.json({ data: [] });
  } catch (error) {
    logger.error(`cannot delete ${id}`, getLoggingAttributes(req));
    res.status(500).json({ errors: ["Cannot delete link"] });
  }
});

module.exports = api;
