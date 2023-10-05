describe('Test đăng nhập,Testcase nhập, sửa và xóa sinh viên', () => {
    before(() => {
    cy.visit('http://localhost/baithi/view/sign-in.php'); 
  
    cy.get('#userName').type('minh888');
    cy.get('#passWord').type('minh123');
    cy.get('button.btn.bg-gradient-primary').click();
    cy.url().should('eq', 'http://localhost/baithi/controller/Home.php');
  }); 
  
    it('thêm, sửa, xóa sinh viên thành công', () => {
      cy.visit('http://localhost/baithi/view/Qlysinhvien.php');
      cy.get('#maSV').type('71DCTT21065');
      cy.get('#tenSV').type('Tô Trường An Trung');
      cy.get('#tenLop').type('TT22');
      cy.get('#addSV').click();
      // cy.get('#viewSV').click().wait(5000);
  
      cy.get('#viewSV').click();
      cy.get('#maSV').type('71DCTT21065');
      cy.get('#tenSV').type('Tô Trường An Trung - mới');
      cy.get('#tenLop').type('TT22');
      cy.get('#editSV_3').click().wait(5000);
  
      cy.reload();
      cy.get('#viewSV').click();
      cy.get('#deleteSV_3').should('exist').click();
    });
  });