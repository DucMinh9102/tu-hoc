describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost/baithi/controller/Home.php')
    cy.wait(8000);
    cy.visit('http://localhost/baithi/view/Dskhoa.php')
    cy.wait(8000);
    cy.visit('http://localhost/baithi/view/Dsmonhoc.php')
    cy.wait(8000);
    cy.visit('http://localhost/baithi/view/Qlylop.php')
    cy.wait(8000);
    cy.visit('http://localhost/baithi/view/Qlysinhvien.php')
    cy.wait(8000);
    cy.visit('http://localhost/baithi/view/Qlydiem.php')
  })
})