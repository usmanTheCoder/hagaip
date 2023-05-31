import Form from "../models/Form.model.js";

export const formCtrl = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const form = await Form.create({
        ...data,
        date: data.date,
        userId: req.user.id,
      });
      res.status(200).json(form);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const {
        firstName,
        lastName,
        email,
        mobileNo,
        selectOptions,
        typeOfForm,
        typeOfTest,
        propertyType,
        typeOfConstruction,
        numberOfRooms,
        propertyDescription,
        typeOfFlooring,
        exteriorCladding,
        interiorCoverings,
        area,
        chapterName,
        subChapterName,
        reference,
        recommendation,
        image,
        price,
        unit,
        amount,
        total,
      } = data;

      const editForm = await Form.findByIdAndUpdate(
        { _id: id },
        {
          firstName,
          lastName,
          email,
          mobileNo,
          selectOptions,
          typeOfForm,
          typeOfTest,
          propertyType,
          typeOfConstruction,
          numberOfRooms,
          propertyDescription,
          typeOfFlooring,
          exteriorCladding,
          interiorCoverings,
          area,
          chapterName,
          subChapterName,
          reference,
          recommendation,
          image,
          price,
          unit,
          amount,
          total,
        }
      );
      // editForm.save()
      res.status(200).json(editForm);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getForm: async (req, res) => {
    try {
      const data = await Form.find({ userId: req.user.id });
      res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteForm: async (req, res) => {
    try {
      const { id } = req.params;
      await Form.findByIdAndDelete(id);
      res.status(200).json("Form deleted successfully!");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getFormsById: async (req, res) => {
    try {
      const { id } = req.params;
      const forms = await Form.find({ userId: id });
      res.status(200).json(forms);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getSingleForm: async (req, res) => {
    try {
      const { id } = req.params;
      const form = await Form.findOne({ _id: id });
      res.status(200).json(form);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
