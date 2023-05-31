import Lekium from "../models/Lekium.model.js";

export const lekiumCtrl = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const findChapterName = await Lekium.findOne({
        chapterName: data.chapterName,
      });
      const findTypeOfForm = await Lekium.findOne({
        typeOfForm: data.typeOfForm,
      });
      const subChapterName = findChapterName?.subChapters
        .map((item) => item.subChapterName)
        .includes(data.subChapters.chapterName);
      if (findChapterName) {
        return res.status(400).json("Chapter name already exists!");
      }
      if (findTypeOfForm) {
        return res.status(400).json("Type of form already exists!");
      }
      if (subChapterName) {
        return res.status(400).json("Sub-Chapter name already exists!");
      }
      await Lekium.create({ ...data, userId: req.user.id });
      res.status(200).json("Successfully created!");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  getChaps: async (req, res) => {
    try {
      const data = await Lekium.find({ userId: req.user.id });
      let chapters = [];
      data?.forEach((item) => {
        return chapters.push({ typeOfForm: item.typeOfForm, id: item._id });
      });
      data?.forEach((item)=> {
        return chapters.push({image: item.image, chapterName: item.chapterName, id: item._id})
      })
      res.status(200).json(chapters);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getSubChaps: async (req, res) => {
    try {
      const data = await Lekium.findOne({
        chapterName: req.params.chapterName,
      });
      
      res.status(200).json(data?.subChapters)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  getLekium: async (req, res) => {
    try {
      const data = await Lekium.find({ userId: req.user.id });
      res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.body;
      const data = await Lekium.findById(id);
      const data2 = data.chapterName;
      res.status(200).json(data2);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getLekiumImage: async (req, res) => {
    try {
      const data = await Lekium.find({ userId: req.user.id });
      let img = [];
      data.forEach((item) => {
        if (item.image === "") {
          return;
        }
        return img.push({ image: item.image });
      });
      data.forEach((item) => {
        return img.push({ id: item._id });
      });
      res.status(200).json(img);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
