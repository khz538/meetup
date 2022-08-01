'use strict';

const seedGroups = [
  {
    organizerId: 1,
    name: "Kevin's Group",
    about: "A group to test endpoints with this really verbose description in order to test the styling of this section. Here comes some stream-of-consciousness writing that I think I have a bad tendency of doing. What's a run-on sentence really? That's completely subjective and arbitrary. One can definitely write an insanely long, but grammatically-correct sentence. And look at Joyce's Ulysses those sentences will go an entire page! How can that be a celebrated work of literature when run-ons are frowned upon?",
    type: "Online",
    private: true,
    city: "Chicago",
    state: "IL",
    numMembers: 1,
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
  },
  {
    organizerId: 2,
    name: "Hansen's Group",
    about: "A group to test endpoints with this really verbose description in order to test the styling of this section. Here comes some stream-of-consciousness writing that I think I have a bad tendency of doing. What's a run-on sentence really? That's completely subjective and arbitrary. One can definitely write an insanely long, but grammatically-correct sentence. And look at Joyce's Ulysses those sentences will go an entire page! How can that be a celebrated work of literature when run-ons are frowned upon?",
    type: "In person",
    private: true,
    city: "Baltimore",
    state: "MD",
    numMembers: 5,
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
  },
  {
    organizerId: 3,
    name: "Dan's Group",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget gravida cum sociis natoque penatibus. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Vulputate ut pharetra sit amet aliquam id diam. Non arcu risus quis varius quam quisque id diam.",
    type: "Online",
    private: false,
    city: "Camden",
    state: "NJ",
    numMembers: 23,
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
  },
  {
    organizerId: 1,
    name: "Big Baller Brand",
    about: "A group all about basketball and anything related. My brother and I are in the NBA and I made my first all-star team this past year. I'm the best Ball brother. A group all about basketball and anything related. My brother and I are in the NBA and I made my first all-star team this past year. I'm the best Ball brother. A group all about basketball and anything related. My brother and I are in the NBA and I made my first all-star team this past year. I'm the best Ball brother. A group all about basketball and anything related. My brother and I are in the NBA and I made my first all-star team this past year. I'm the best Ball brother. A group all about basketball and anything related. My brother and I are in the NBA and I made my first all-star team this past year. I'm the best Ball brother. A group all about basketball and anything related. My brother and I are in the NBA and I made my first all-star team this past year. I'm the best Ball brother.",
    type: "In-person",
    private: false,
    city: "Chino Hills",
    state: "CA",
    numMembers: 42,
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
  },
  {
    organizerId: 4,
    name: "Lebron's Lakers",
    about: "Just trying to win that fifth ring in Los Angeles' Crypto.com Arena. Featuring who some may say is the greatest player of all time, it's a shame that they can't build the team aroudn him to win",
    type: "In-person",
    private: false,
    city: "Los Angeles",
    state: "LA",
    numMembers: 16,
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
  },
  {
    organizerId: 1,
    name: "Jenny's Group",
    about: "Run, Forrest! Run!, she said as Forrest sped off into the distance. Forrest is the fastest runner she's every seen, she said.",
    type: "In-person",
    private: false,
    city: "Montgomery",
    state: "Alabama",
    numMembers: 10,
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', seedGroups, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      name: { [Op.in]: ["Kevin's Group", "Jenny's Group", "Big Baller Brand", "Lebron's Lakers", "Hansen's Group", "Dan's Group"] }
    }, {});
  }
};
