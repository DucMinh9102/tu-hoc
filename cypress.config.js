const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ydpuz5',
  e2e: {
    specPattern: ["cypress/e2e/login.cy.js", "cypress/e2e/Khoatest.cy.js", "cypress/e2e/SinhVientest.cy.js",
     "cypress/e2e/MonHoctest.cy.js", "cypress/e2e/Loptest.cy.js", "cypress/e2e/Diemtest.cy.js"],
  },
});
