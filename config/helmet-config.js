const helmet = require("helmet");
const crypto = require("crypto");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString("hex");
    next();
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
          // Customize as needed
        },
      },
      // Disable unwanted protections if necessary
      // frameguard: false,
      // Additional helmet configurations...
      // hsts: { maxAge: 31536000 }, for example also can put this in single config
    })
  );
  app.use(helmet.hsts({ maxAge: 31536000 })); // preferred separate for better security practice
  app.disable("x-powered-by");
};
