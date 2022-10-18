const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  const contact = req.body;
  if (Object.keys(contact).length === 0) {
    throw RequestError(400, "missing field favorite");
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = updateFavorite;
