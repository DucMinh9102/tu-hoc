describe('Test đăng nhập', () => {
  it('should return an error with wrong username', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:1337/auth/login',
      failOnStatusCode: false,
      body: {
        Username: 'minh09123',
        Password: 'minh123'
      }
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.errorCode).to.equal('WRONG_USERNAME');
    });
  });

  it('should return an error with wrong password', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:1337/auth/login',
      failOnStatusCode: false,
      body: {
        Username: 'minh888',
        Password: 'ưeqqweqw'
      }
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.errorCode).to.equal('WRONG_PASS');
    });
  });
});
it('should log in successfully with correct credentials', () => {
  cy.visit('http://localhost/baithi/view/sign-in.php'); 

  cy.get('#userName').type('minh888');
  cy.get('#passWord').type('minh123');
  cy.get('button.btn.bg-gradient-primary').click();

  cy.request('POST', 'http://localhost:1337/auth/login', {
    Username: 'minh888',
    Password: 'minh123'
  }).then((response) => {
    expect(response.body.token).to.be.a('string');
  });

  cy.url().should('eq', 'http://localhost/baithi/controller/Home.php'); 
});

