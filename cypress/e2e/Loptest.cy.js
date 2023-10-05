describe('Test đăng nhập,Testcase nhập, sửa và xóa lớp', () => {
    before(() => {
    cy.visit('http://localhost/baithi/view/sign-in.php'); 
  
    cy.get('#userName').type('minh888');
    cy.get('#passWord').type('minh123');
    cy.get('button.btn.bg-gradient-primary').click();
    cy.url().should('eq', 'http://localhost/baithi/controller/Home.php');
  }); 
  
    it('thêm, sửa, xóa lớp thành công', () => {
      cy.visit('http://localhost/baithi/view/Qlylop.php');
  
      cy.get('#maLop').type('71DCXT23');
      cy.get('#tenLop').type('XT23');
      cy.get('#siSo').type('47');
      cy.get('#addLop').click();
      cy.get('#viewLop').click().wait(5000);

      cy.get('#viewLop').click();
      cy.get('#maLop').type('71DCXT23');
      cy.get('#tenLop').type('XT23 - Sửa');
      cy.get('#siSo').type('49');
      cy.get('#editLop_4').click().wait(5000);
  
      cy.reload();
      cy.get('#viewLop').click();
      cy.get('#deleteLop_4').should('exist').click();
    });
  });