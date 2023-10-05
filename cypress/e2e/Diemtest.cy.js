describe('Test đăng nhập,Testcase nhập, sửa và xóa điểm sinh viên', () => {
    before(() => {
    cy.visit('http://localhost/baithi/view/sign-in.php'); 
  
    cy.get('#userName').type('minh888');
    cy.get('#passWord').type('minh123');
    cy.get('button.btn.bg-gradient-primary').click();
    cy.url().should('eq', 'http://localhost/baithi/controller/Home.php');
  }); 
  
    it('thêm, sửa, xóa điểm thành công', () => {
      cy.visit('http://localhost/baithi/view/Qlydiem.php');
      cy.get('#maSV').type('71DCTT22114');
      cy.get('#tenSV').type('Phạm Đức Minh');
      cy.get('#tenLop').type('TT22');
      cy.get('#tenMH').type('Lập trình web');
      cy.get('#diemCC').type('10');
      cy.get('#diemKT').type('9');
      cy.get('#diemThi').type('9');
      cy.get('#addDiem').click();
      cy.get('#viewDiem').click().wait(5000);
  
      cy.get('#viewDiem').click();
      cy.get('#maSV').type('71DCTT22114');
      cy.get('#tenSV').type('Phạm Đức Minh');
      cy.get('#tenLop').type('TT22');
      cy.get('#tenMH').type('Lập trình web');
      cy.get('#diemCC').type('10');
      cy.get('#diemKT').type('8');
      cy.get('#diemThi').type('7');
      cy.get('#viewDiem').click();
      cy.get('#editDiem_3').should('exist').click().wait(5000);

      cy.reload();
      cy.get('#viewDiem').click();
      cy.get('#deleteDiem_3').should('exist').click();
    });
  });