describe('Test đăng nhập,Testcase nhập, sửa và xóa sinh viên', () => {
    before(() => {
    cy.visit('http://localhost/baithi/view/sign-in.php'); 
  
    cy.get('#userName').type('minh888');
    cy.get('#passWord').type('minh123');
    cy.get('button.btn.bg-gradient-primary').click();
    cy.url().should('eq', 'http://localhost/baithi/controller/Home.php');
  }); 
  
    it('thêm, sửa, xóa môn học thành công', () => {
      cy.visit('http://localhost/baithi/view/Dsmonhoc.php');
      cy.get('#maMH').type('MH05');
      cy.get('#tenMH').type('Vật lí ');
      cy.get('#soTinChi').type('3');
      cy.get('#addMH').click();
      cy.get('#viewMH').click().wait(5000);
  
      cy.get('#viewMH').click();
      cy.get('#maMH').type('MH05');
      cy.get('#tenMH').type('Vật lí - Sửa');
      cy.get('#soTinChi').type('4');
      cy.get('#editMH_5').click().wait(5000);

      cy.reload();
      cy.get('#viewMH').click();
      cy.get('#deleteMH_5').should('exist').click();
    });
  });