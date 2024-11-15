const fetchInstagramProfile = require('../utils/instagram');

const getInstagramUserProfileData = async (req, res) => {
    try {
      const InstagramId = req.params.InstagramId;
      const profile = await fetchInstagramProfile(InstagramId);
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = { getInstagramUserProfileData };