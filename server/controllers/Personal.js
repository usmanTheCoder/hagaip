import Personal from "../models/Personal.model.js";

export const personalCtrl = {
  createPersonal: async (req, res) => {
    try {
      const data = req.body;
      const personal = await Personal.find({ userId: req.user.id });
      if (personal.length > 0) {
        await Personal.findOneAndUpdate(
          { userId: req.user.id },
          { ...data },
          { new: true }
        );
        return res.status(200).json("Successfully updated!");
      } else {
        await Personal.create({
          ...data,
          userId: req.user.id,
        });
        return res.status(200).json("Successfully created!");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const data = await Personal.find({ userId: req.user.id });
      res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  getPersonalById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Personal.findOne({ userId: id });
      res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};