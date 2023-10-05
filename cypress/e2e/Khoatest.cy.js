describe('Test đăng nhập,Testcase nhập, sửa và xóa khoa', () => {
  before(() => {
  cy.visit('http://localhost/baithi/view/sign-in.php'); 

  cy.get('#userName').type('minh888');
  cy.get('#passWord').type('minh123');
  cy.get('button.btn.bg-gradient-primary').click();
  cy.url().should('eq', 'http://localhost/baithi/controller/Home.php');
}); 

  it('thêm, sửa, xóa khoa thành công', () => {
    cy.visit('http://localhost/baithi/view/Dskhoa.php');
    cy.get('#maKhoa').type('BBC');
    cy.get('#tenKhoa').type('Kinh tế số');
    cy.get('#soLop').type('5');
    cy.get('#addKhoa').click();
    cy.get('#viewKhoa').click().wait(5000);
    cy.get('#maKhoa').type('BBC');

    cy.get('#viewKhoa').click();
    cy.get('#maKhoa').type('BBC');
    cy.get('#tenKhoa').type('Kinh tế số hóa - Sửa');
    cy.get('#soLop').type('20');
    cy.get('#editKhoa_5').click().wait(5000);

    cy.reload();
    cy.get('#viewKhoa').click();
    cy.get('#deleteKhoa_5').should('exist').click();
  });
});