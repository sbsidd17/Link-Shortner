import { nanoid } from "nanoid";
import Links from "../model/links.model.js";
import User from "../model/user.model.js";

const generateShortLink = async (req, res) => {
  const { url } = req.body;
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  if (!urlRegex.test(url)) {
    return res.status(400).json({
      success: false,
      msg: "Enter a valid Url",
    });
  }

  const shortId = nanoid(10);
  let userId = ""
  try {
    if (req.user) {
      const id = req.user.id;
      const user = await User.findById(id);
      userId = user._id
    }

    const link = await Links.create({
      redirectUrl: url,
      shortId,
      userId,
      clickCounts: [],
      totalClicks: 0,
    });
    

    res.status(200).json({
      success: true,
      msg: "ShortLink Created Successfully",
      link,
      shortLink: `${process.env.BACKEND_URL}/${shortId}`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "Something Went Wrong, Try Again",
      error: error.message,
    });
  }
};

const redirect = async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const link = await Links.findOne({ shortId });
    if (!link) {
      return res.status(400).json({
        success: false,
        msg: "Invalid Url",
      });
    }
    link.clickCounts.push({
      clickedOn: Date.now(),
    });

    link.totalClicks = link.clickCounts.length;

    await link.save(); // Save the updated link with the new click count

    const targetUrl = link.redirectUrl;

    res.render('adView', { targetUrl });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};



export { generateShortLink, redirect };
