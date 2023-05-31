import Design from "../models/Design.model.js";

export const designCtrl = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const design = await Design.find({ userId: req.user.id });
      if (design.length > 0) {
        await Design.findOneAndUpdate(
          { userId: req.user.id },
          { ...data },
          { new: true }
        );
        return res.status(200).json("Successfully updated!");
      } else {
        await Design.create({
          ...data,
          userId: req.user.id,
        });
        return res.status(200).json("Successfully created!");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getDesign: async (req, res) => {
    try {
      const data = await Design.find({ userId: req.user.id });
      res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getDesignById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Design.findOne({ userId: id });
      res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
