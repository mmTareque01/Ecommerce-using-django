const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const { Country } = require("../models/servicesCountry.model")


const Personal = sequelize.define("mentors_personal", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(1234),
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
    },
    whatsapp: {
        type: Sequelize.STRING,
    },
    present_address: {
        type: Sequelize.TEXT,
    },
    parmanent_address: {
        type: Sequelize.TEXT,
    },
    country: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING(1234),
    },
    gender: {
        type: Sequelize.STRING,
    },
    profile_pic: {
        type: Sequelize.TEXT,
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    is_blocked: {
        type: Sequelize.BOOLEAN
    }
}) //


const SocialMedia = sequelize.define("mentors_contacts", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    mentor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    facebook: {
        type: Sequelize.STRING,
    },
    linkedIn: {
        type: Sequelize.STRING,
    },
    instagram: {
        type: Sequelize.STRING,
    },
    student_email: {
        type: Sequelize.STRING,
    },
    bank_account: {
        type: Sequelize.STRING(1500),
    }
})

const moreAboutMentors = sequelize.define("more_about_mentors", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    mentor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        comment: "currently studying or working"
    },
    institution_name: {
        type: Sequelize.STRING,
        comment: "where the mentor is studing"
    },
    studying_in: {
        type: Sequelize.STRING,
        comment: "at which subject the mentor is studying"
    },
    working_for: {
        type: Sequelize.STRING,
        commnet: ""
    },
    mentoring_for: {
        type: Sequelize.STRING,
        commnet: "for which visa mentor is working"
    },
    position: {
        type: Sequelize.STRING,
        comment: "position in company"
    },
    latest_certificate: {
        type: Sequelize.STRING,
        comment: "last accademic certifiacte"
    },
    pre_scholarship_info: {
        type: Sequelize.STRING,
        comment: "info about scholership if you have perviously"
    },
    extra_activities: {
        type: Sequelize.STRING(1000),
        commnet: "extracurricular activities info"
    },
    experience_with_students: {
        type: Sequelize.STRING(1000),
        commnet: "involved with any community group for helping students for free or a higher study blogger"
    },
    experience: {
        type: Sequelize.STRING(1000),
        commnet: "extracurricular activities info"
    },
    intention: {
        type: Sequelize.STRING(1000),
        commnet: "any intention to leave us while working with us"
    },
    about_us: {
        type: Sequelize.STRING(1000),
        commnet: "write something about abroad inquiry"
    },
    comments: {
        type: Sequelize.STRING(1000),
        commnet: "comments about abroad inquiry"
    },
    about_yourself: {
        type: Sequelize.STRING(1000),
        commnet: "write something about yourself"
    },
    resident_permit_passport: {
        type: Sequelize.STRING(1000),
        // commnet : "write something about yourself"
    },
    campus_or_employee_card: {
        type: Sequelize.STRING(1000),
        // commnet : "write something about yourself"
    },
    signature: {
        type: Sequelize.STRING(1000),
        // commnet : "write something about yourself"
    },
    profession: {
        type: Sequelize.STRING(1000),
    }
})


const mentorResponsibility = sequelize.define("mentor_responsible", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    mentor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

})


const temp_mentor_data = sequelize.define("temp_mentor_data", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    mentor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    // personal information
    full_name: {
        type: Sequelize.STRING,
        // allowNull : false,
    },
    email: {
        type: Sequelize.STRING,
        // allowNull : false,
    },
    password: {
        type: Sequelize.STRING(1234),
        // allowNull : false,
    },
    phone: {
        type: Sequelize.STRING,
        // allowNull : false,
    },
    whatsapp: {
        type: Sequelize.STRING,
        // allowNull : false,
    },
    present_address: {
        type: Sequelize.TEXT,
        // allowNull : false,
    },
    parmanent_address: {
        type: Sequelize.TEXT,
        // allowNull : false,
    },
    country: {
        type: Sequelize.STRING,
        // allowNull : false,
    },
    city: {
        type: Sequelize.STRING(1234),
    },
    gender: {
        type: Sequelize.STRING,
        // allowNull : false,
    },
    profile_pic: {
        type: Sequelize.TEXT,
        // allowNull : false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        // allowNull : false,
    },

    facebook: {
        type: Sequelize.STRING,
        // allowNull : false,
    },
    linkedIn: {
        type: Sequelize.STRING,
        // allowNull : false,
    },
    instagram: {
        type: Sequelize.STRING,
        // allowNull : false,
    },
    location: {
        type: Sequelize.STRING,
        // allowNull : false,
        comment: "currently studying or working"
    },
    institution_name: {
        type: Sequelize.STRING,
        comment: "where the mentor is studing"
    },
    studying_in: {
        type: Sequelize.STRING,
        comment: "at which subject the mentor is studying"
    },
    working_for: {
        type: Sequelize.STRING,
        commnet: "where the mentor is working"
    },
    position: {
        type: Sequelize.STRING,
        comment: "position in company"
    },
    latest_certificate: {
        type: Sequelize.STRING,
        comment: "last accademic certifiacte"
    },
    pre_scholarship_info: {
        type: Sequelize.STRING,
        comment: "info about scholership if you have perviously"
    },
    extra_activities: {
        type: Sequelize.STRING(1000),
        commnet: "extracurricular activities info"
    },
    experience_with_students: {
        type: Sequelize.STRING(1000),
        commnet: "involved with any community group for helping students for free or a higher study blogger"
    },
    experience: {
        type: Sequelize.STRING(1000),
        commnet: "job experience with consultancy firm activities info"
    },
    intention: {
        type: Sequelize.STRING(1000),
        commnet: "any intention to leave us while working with us"
    },
    about_us: {
        type: Sequelize.STRING(1000),
        commnet: "write something about abroad inquiry"
    },
    comments: {
        type: Sequelize.STRING(1000),
        commnet: "comments about abroad inquiry"
    },
    about_yourself: {
        type: Sequelize.STRING(1000),
        commnet: "write something about yourself"
    },
    student_email: {
        type: Sequelize.STRING,
        // allowNull : false,
    },
    bank_account: {
        type: Sequelize.STRING(1500),
        // allowNull : false,
    }



})


Personal.hasOne(SocialMedia, { foreignKey: 'mentor_id' });
SocialMedia.belongsTo(Personal, { foreignKey: 'mentor_id' });

Personal.hasOne(moreAboutMentors, { foreignKey: 'mentor_id' });
moreAboutMentors.belongsTo(Personal, { foreignKey: 'mentor_id' });

Personal.hasMany(mentorResponsibility, { foreignKey: 'mentor_id' });
mentorResponsibility.belongsTo(Personal, { foreignKey: 'mentor_id' });

// Personal.belongsToMany(Country, {through: 'mentor_responsible', foreignKey: 'mentor_id'})
// Country.belongsTo(Personal, {through: mentorResponsibility, foreignKey: 'country_id'});
// mentorResponsibility.belongsTo(Country)



module.exports = { Personal, SocialMedia, temp_mentor_data, moreAboutMentors, mentorResponsibility };