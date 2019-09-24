module.exports = {
  mongoURI: "YOUR_MONGODB_URL",
  secretOrKey: "secret",

  cloudinary: {
    cloud_name: "YOUR_CLOUDINARY_CLOUD_NAME",
    api_key: "YOUR_CLOUDINARY_API_KEY",
    api_secret: "YOUR_CLOUDINARY_API_SECRET"
  },
  avatarPlaceholderUrl:
    "https://res.cloudinary.com/dxemu0gku/image/upload/v1557829466/avatar-placeholder_knb8nt.gif",

  API_URL: process.env.API_URL || "http://localhost:5000",
  FRONT_API_URL: process.env.API_URL || "http://localhost:3000",
  sendgrid_api_key: "YOUR_SENDGRID_API_KEY"
};
