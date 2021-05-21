const router = require('express').Router();
const { User, Trail, Hike, Comment } = require('../models');

// Application homepage - list of trails and login/signup form
router.get('/', async (req, res) => {
  try {
    const trailData = await Trail.findAll();
    const trails = trailData.map((trail) => trail.get({ plain: true }));

    res.render('homepage', { trails });
    // res.send('<h1>Hike Tracker Homepage</h1>');
    // res.json({trails}) // for testing
  } catch (error) {
    res.status(500).json(error);
  }
});

// Trail Details
router.get('/trail/:id', async (req, res) => {
  try {
    const trailData = await Trail.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ['name'] }],
        },
      ],
    });
    const trail = trailData.get({ plain: true });

    res.render('trail', { ...trail, logged_in: req.session.loggedIn });
    // res.json({ ...trail, logged_in: req.session.loggedIn }); // for testing
  } catch (error) {
    res.status(500).json(error);
  }
});

// Trail - create new trail
router.get('/trail/new/', async (req, res) => {});

// Trail - edit saved trail
router.get('/trail/edit/:id', async (req, res) => {});

// User Dashboard
router.get('/dashboard/', async (req, res) => {});

// User Dashboard - log new hike
router.get('/dashboard/hike/new', async (req, res) => {});

// User Dashboard - edit saved hike
router.get('/dashboard/hike/edit/:id', async (req, res) => {});

// User Profile
// router.get('/profile/:id', async (req, res) => {});

module.exports = router;
