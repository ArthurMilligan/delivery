before('open delivery', () => {
  it('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });
  it('should open constructor page by default', function() {
    cy.contains('Соберите бургер');
  });
})
describe('check modals', ()=>{
  it('open modal', ()=>{
    cy.contains('Краторная булка N-200i').click()
  })
  it('check modal data ', ()=>{
    cy.contains('Краторная булка N-200i')
    cy.contains('Калории,ккал')
    cy.contains('420')
    cy.contains('Белки, г')
    cy.contains('80')
    cy.contains('Жиры, г')
    cy.contains('24')
    cy.contains('Углеводы, г')
    cy.contains('53')
  })
  it('close modal',()=>{
    cy.get('*[class^="modal_icon"]').click()
  })
})
describe('create order', () => {
  it('drag bun', () => {
    cy.contains('Краторная булка N-200i').trigger("dragstart").trigger("dragleave");
    cy.contains('Добавте товар')
     .trigger("dragenter")
     .trigger("dragover")
     .trigger("drop")
     .trigger("dragend");
  });
  it('drag some ingredients', () => {
    cy.contains('Соус Spicy-X').trigger("dragstart").trigger("dragleave");
    cy.get('*[class^="burger-constructor_constructorList"]')
     .trigger("dragenter")
     .trigger("dragover")
     .trigger("drop")
     .trigger("dragend");
     cy.contains('Мясо бессмертных моллюсков Protostomia').trigger("dragstart").trigger("dragleave");
     cy.get('*[class^="burger-constructor_constructorList"]')
     .trigger("dragenter")
     .trigger("dragover")
     .trigger("drop")
     .trigger("dragend");
  });
  it('failed order creation', () => {
    cy.contains('Оформить заказ').click()
  });
  it('login',()=>{
    cy.get('input[name="email"]').type('test124235@test.ru')
    cy.get('input[name="password"]').type('p_test')
    cy.contains('Войти').click()
  })
  it('return to constructor',()=>{
    cy.contains('Конструктор').click()
  })
  it('success order creation',()=>{
    cy.contains('Оформить заказ').click()
  })
  it('check order data',()=>{
    cy.contains('Ваш заказ начали готовить')
  })
  it('close order',()=>{
    cy.get('*[class^="modal_icon"]').click()
  })
})