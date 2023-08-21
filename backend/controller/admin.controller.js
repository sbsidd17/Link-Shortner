import Links from "../model/links.model.js";
import User from "../model/user.model.js";

const getAllLinks = async (req, res) => {
    const { limit, page } = req.params;
    const skip = (page - 1) * limit || 0;
    try {
      const totalCount = await Links.countDocuments({});
      if(limit && page){
        const allLinks = await Links.find({})
        .sort({ _id: -1 })  // Sort by _id in descending order
        .limit(limit)
        .skip(skip);

        res.status(200).json({
          success: true,
          totalLinks: totalCount,
          allLinks: allLinks
        });
      }else{
        const allLinks = await Links.find({})

        res.status(200).json({
          success: true,
          totalLinks: totalCount,
          allLinks: allLinks
        });
      }
  
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  const deleteLink = async (req, res)=>{
    const _id = req.params.id
    try {
        await Links.findByIdAndDelete({_id})
        res.status(200).json({
            success: true,
            msg: "Link Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Something Went Wrong"
        })
        console.log(error.message)
    }
  }

  const getAllUsers = async (req, res)=>{
      try {
        const totalUsers = await User.countDocuments({})
        const allUsers = await User.find({})
      res.status(200).json({
        success: true,
        msg: "Goted All Users Successfully",
        totalUsers,
        allUsers
      }) 
      } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Something Went Wrong",
        })
        console.log(error.message)
      }
  }

  const deleteUser = async (req, res)=>{
    const _id = req.params.id
    try {
        await User.findByIdAndDelete({_id})
        res.status(200).json({
            success: true,
            msg: "User Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Something Went Wrong"
        })
        console.log(error.message)
    }
  }

  export {
    getAllLinks,
    deleteLink,
    getAllUsers,
    deleteUser,
  }