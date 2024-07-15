import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
});

const Video = sequelize.define("Video", {
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Establish the relationship between User and Video
User.hasMany(Video, { foreignKey: "userId" });
Video.belongsTo(User, { foreignKey: "userId" });

export { User, Video };
// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
