const registerRules = () => [
  body("name", "Name is required").notEmpty(),
  body("lastName", "Last Name is required").notEmpty(),
  body("email", "Email is required").isEmail(),
  body("password", "Password must contain 6 characters").isLength({
    min: 6,
    max: 20,
  }),
];
module.export = registerRules;
